
-- Add English language fields to the projects table
ALTER TABLE public.projects 
ADD COLUMN title_en TEXT,
ADD COLUMN description_en TEXT,
ADD COLUMN role_en TEXT,
ADD COLUMN challenge_en TEXT,
ADD COLUMN solution_en TEXT;
