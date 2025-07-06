
-- Add work_type and work_type_en columns to the projects table
ALTER TABLE public.projects 
ADD COLUMN work_type text,
ADD COLUMN work_type_en text;
