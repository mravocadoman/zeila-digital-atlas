import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

const Resources = () => {
  const { toast } = useToast();
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

  return (
    <section id="resources" className="py-20 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-elegant text-4xl lg:text-6xl mb-12">Free Resources</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* eBook */}
          <div className="card-luxury">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 border border-border rounded-sm">
                <Download className="w-8 h-8" />
              </div>
              <div>
                <h3 className="heading-elegant text-2xl mb-2">Scaling Paid Ad Campaigns</h3>
                <p className="body-clean text-sm text-muted-foreground">
                  A comprehensive 40-page guide on optimizing ad spend, improving ROAS, and building predictable acquisition systems.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border focus:border-primary"
                aria-label="Email for eBook download"
              />
              <Button 
                onClick={() => handleDownload("Scaling Paid Ad Campaigns eBook")}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                Download eBook
              </Button>
            </div>
          </div>

          {/* Checklist */}
          <div className="card-luxury">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 border border-border rounded-sm">
                <Download className="w-8 h-8" />
              </div>
              <div>
                <h3 className="heading-elegant text-2xl mb-2">Marketing Automation Guide</h3>
                <p className="body-clean text-sm text-muted-foreground">
                  Step-by-step checklist for implementing no-code automation workflows using Zapier and Make.com.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border focus:border-primary"
                aria-label="Email for checklist download"
              />
              <Button 
                onClick={() => handleDownload("Marketing Automation Guide")}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                Download Checklist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
