-- Create table for project submissions
CREATE TABLE public.project_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  enrollment_number TEXT NOT NULL,
  branch TEXT NOT NULL,
  year TEXT NOT NULL,
  project_title TEXT NOT NULL,
  project_link TEXT,
  project_description TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for student submissions)
CREATE POLICY "Anyone can submit projects" 
ON public.project_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading for now (you can update this later with admin roles)
CREATE POLICY "Allow read access for all" 
ON public.project_submissions 
FOR SELECT 
USING (true);

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', false);

-- Create storage policies for project files
CREATE POLICY "Anyone can upload project files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "Anyone can view project files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-files');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_submissions_updated_at
BEFORE UPDATE ON public.project_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();