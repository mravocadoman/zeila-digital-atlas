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
  return;
};
export default Resources;