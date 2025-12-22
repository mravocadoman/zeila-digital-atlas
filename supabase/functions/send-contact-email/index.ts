import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Allowed contact form types
const ALLOWED_TYPES = ["project", "cofounder", "cmo", "speaking", "other"];

// Input length limits
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_TYPE_LENGTH = 50;

interface ContactEmailRequest {
  name: string;
  email: string;
  type: string;
  message: string;
}

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Email validation regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate and sanitize input
function validateInput(data: ContactEmailRequest): { valid: boolean; error?: string; sanitized?: ContactEmailRequest } {
  const { name, email, type, message } = data;

  // Check required fields exist
  if (!name || !email || !type || !message) {
    return { valid: false, error: "All fields are required" };
  }

  // Check types
  if (typeof name !== 'string' || typeof email !== 'string' || typeof type !== 'string' || typeof message !== 'string') {
    return { valid: false, error: "Invalid input types" };
  }

  // Trim and check length limits
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedType = type.trim().toLowerCase();
  const trimmedMessage = message.trim();

  if (trimmedName.length === 0) {
    return { valid: false, error: "Name cannot be empty" };
  }
  if (trimmedName.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be less than ${MAX_NAME_LENGTH} characters` };
  }

  if (trimmedEmail.length === 0) {
    return { valid: false, error: "Email cannot be empty" };
  }
  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: `Email must be less than ${MAX_EMAIL_LENGTH} characters` };
  }
  if (!isValidEmail(trimmedEmail)) {
    return { valid: false, error: "Invalid email address" };
  }

  if (trimmedType.length === 0) {
    return { valid: false, error: "Type cannot be empty" };
  }
  if (trimmedType.length > MAX_TYPE_LENGTH) {
    return { valid: false, error: `Type must be less than ${MAX_TYPE_LENGTH} characters` };
  }
  if (!ALLOWED_TYPES.includes(trimmedType)) {
    return { valid: false, error: `Invalid inquiry type. Allowed: ${ALLOWED_TYPES.join(", ")}` };
  }

  if (trimmedMessage.length === 0) {
    return { valid: false, error: "Message cannot be empty" };
  }
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message must be less than ${MAX_MESSAGE_LENGTH} characters` };
  }

  return {
    valid: true,
    sanitized: {
      name: trimmedName,
      email: trimmedEmail,
      type: trimmedType,
      message: trimmedMessage
    }
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();

    // Validate and sanitize input
    const validation = validateInput(rawData);
    if (!validation.valid || !validation.sanitized) {
      console.warn("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, type, message } = validation.sanitized;

    console.log("Processing validated contact form submission:", { name, email, type, messageLength: message.length });

    // HTML-escape all user inputs before rendering in email
    const escapedType = escapeHtml(type);
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Send email to your inbox
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["rihards.zeila@gmail.com"],
      subject: `New ${escapedType} inquiry from ${escapedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${escapedType}</p>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
      `,
      replyTo: email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
