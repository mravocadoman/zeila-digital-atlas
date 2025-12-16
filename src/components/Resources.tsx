import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
const Resources = () => {
  const {
    toast
  } = useToast();
  const [email, setEmail] = useState("");
  const handleDownload = (resourceName: string) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to download the resource",
        variant: "destructive"
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Download Started",
      description: `${resourceName} is being sent to ${email}`
    });
    setEmail("");
  };
  
  const resources = [
    {
      title: "Scaling Paid Ad Campaigns",
      description: "Complete eBook on scaling advertising campaigns profitably across Meta, TikTok, and Pinterest",
      type: "eBook (PDF)"
    },
    {
      title: "Marketing Automation Guide",
      description: "Step-by-step checklist for implementing no-code automation workflows with Zapier and Make.com",
      type: "Checklist (PDF)"
    }
  ];
  
  return (
    <section id="resources" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="heading-elegant text-4xl lg:text-5xl mb-4">Free Resources</h2>
          <p className="body-clean text-lg lg:text-xl text-muted-foreground">Download guides and checklists to accelerate your marketing</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {resources.map((resource, index) => (
            <div key={index} className="bg-card border border-border rounded-sm p-8 hover:border-primary transition-colors">
              <Download className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="heading-elegant text-2xl mb-3">{resource.title}</h3>
              <p className="body-clean text-lg lg:text-xl text-muted-foreground mb-4">{resource.description}</p>
              <p className="text-sm text-muted-foreground">{resource.type}</p>
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto bg-card border border-border rounded-sm p-8">
          <h3 className="heading-elegant text-2xl mb-4">Get Instant Access</h3>
          <p className="body-clean text-lg lg:text-xl text-muted-foreground mb-6">Enter your email to receive all resources</p>
          <div className="flex gap-4">
            <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-background border-border" />
            <Button onClick={() => handleDownload("Resources")} className="bg-secondary text-foreground border border-border hover:border-primary transition-all">
              Download
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resources;