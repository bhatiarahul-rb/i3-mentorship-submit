import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle, GraduationCap, Users, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  fullName: string;
  enrollmentNumber: string;
  branch: string;
  year: string;
  projectTitle: string;
  projectLink: string;
  projectDescription: string;
  file: File | null;
}

const branches = [
  { value: "AI&DS", label: "AI & Data Science" },
  { value: "AI&ML", label: "AI & Machine Learning" },
  { value: "IIOT", label: "Industrial IoT" },
  { value: "AR", label: "Augmented Reality" },
];

const yearRanges = [
  "2021–2025", "2022–2026", "2023–2027", "2024–2028", 
  "2025–2029", "2026–2030", "2027–2031", "2028–2032", 
  "2029–2033", "2030–2034"
];

export default function ProjectSubmissionForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    enrollmentNumber: "",
    branch: "",
    year: "",
    projectTitle: "",
    projectLink: "",
    projectDescription: "",
    file: null,
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }
    setFormData(prev => ({ ...prev, file }));
  };

  const validateForm = () => {
    const required = ['fullName', 'enrollmentNumber', 'branch', 'year', 'projectTitle'];
    return required.every(field => formData[field as keyof FormData]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = null;

      // Upload file if present
      if (formData.file) {
        const fileName = `${Date.now()}_${formData.file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(fileName, formData.file);

        if (uploadError) {
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        fileUrl = uploadData.path;
      }

      // Insert form data into database
      const { error: insertError } = await supabase
        .from('project_submissions')
        .insert({
          full_name: formData.fullName,
          enrollment_number: formData.enrollmentNumber,
          branch: formData.branch,
          year: formData.year,
          project_title: formData.projectTitle,
          project_link: formData.projectLink || null,
          project_description: formData.projectDescription || null,
          file_url: fileUrl,
        });

      if (insertError) {
        throw new Error(`Submission failed: ${insertError.message}`);
      }

      setIsSubmitted(true);
      toast({
        title: "Project submitted successfully!",
        description: "Your project has been recorded. You'll hear back from our team soon.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto shadow-elegant border-0 bg-gradient-to-br from-card to-primary/5">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Submission Successful!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you for submitting your project to Team I3 Mentorship. 
            Our team will review your submission and get back to you soon.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: "",
                enrollmentNumber: "",
                branch: "",
                year: "",
                projectTitle: "",
                projectLink: "",
                projectDescription: "",
                file: null,
              });
            }}
            variant="outline"
            className="border-primary/20 hover:bg-primary/5"
          >
            Submit Another Project
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-elegant border-0 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="text-center pb-8">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Code className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
          Project Submission Portal
        </CardTitle>
        <CardDescription className="text-base">
          Submit your project details for Team I3 Mentorship review
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="transition-smooth focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="enrollmentNumber">Enrollment/Application Number *</Label>
              <Input
                id="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={(e) => handleInputChange('enrollmentNumber', e.target.value)}
                placeholder="Enter your enrollment number"
                className="transition-smooth focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch *</Label>
              <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                <SelectTrigger className="transition-smooth focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.value} value={branch.value}>
                      {branch.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Academic Year *</Label>
              <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="transition-smooth focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select your year range" />
                </SelectTrigger>
                <SelectContent>
                  {yearRanges.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title *</Label>
            <Input
              id="projectTitle"
              value={formData.projectTitle}
              onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              placeholder="Enter your project title"
              className="transition-smooth focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectLink">Project Link (GitHub/Demo)</Label>
            <Input
              id="projectLink"
              type="url"
              value={formData.projectLink}
              onChange={(e) => handleInputChange('projectLink', e.target.value)}
              placeholder="https://github.com/yourproject or demo link"
              className="transition-smooth focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              placeholder="Briefly describe your project, technologies used, and key features..."
              rows={4}
              className="transition-smooth focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Project Files (Optional)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-smooth">
              <input
                id="file"
                type="file"
                accept=".pdf,.docx,.zip"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  {formData.file ? formData.file.name : "Click to upload project files"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX, or ZIP files (max 10MB)
                </p>
              </label>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-elegant text-base py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}