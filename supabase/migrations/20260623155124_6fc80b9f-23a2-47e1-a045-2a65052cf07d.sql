
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    slug text NOT NULL UNIQUE,
    published boolean DEFAULT false,
    images text[] DEFAULT '{}'::text[],
    models text[] DEFAULT '{}'::text[],
    technologies text[] DEFAULT '{}'::text[],
    role text,
    duration text,
    challenge text,
    solution text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    modelurl text,
    iframes text[] DEFAULT '{}'::text[],
    display_order integer DEFAULT 0,
    title_en text,
    description_en text,
    role_en text,
    challenge_en text,
    solution_en text,
    work_type text,
    work_type_en text
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT SELECT ON public.projects TO anon;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published projects" ON public.projects
  FOR SELECT USING (published = true);
CREATE POLICY "Authenticated can view all projects" ON public.projects
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.project_media (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    type text NOT NULL,
    file_path text NOT NULL,
    title text,
    description text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT project_media_type_check CHECK ((type = ANY (ARRAY['image'::text, '3d_model'::text])))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_media TO authenticated;
GRANT SELECT ON public.project_media TO anon;
GRANT ALL ON public.project_media TO service_role;

ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view media for published projects" ON public.project_media
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_media.project_id AND p.published = true)
  );
CREATE POLICY "Authenticated can view all project media" ON public.project_media
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert project media" ON public.project_media
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update project media" ON public.project_media
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete project media" ON public.project_media
  FOR DELETE TO authenticated USING (true);

CREATE TABLE public.category_order (
    id integer DEFAULT 1 NOT NULL PRIMARY KEY,
    categories text[] DEFAULT '{}'::text[]
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.category_order TO authenticated;
GRANT SELECT ON public.category_order TO anon;
GRANT ALL ON public.category_order TO service_role;

ALTER TABLE public.category_order ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to category_order" ON public.category_order
  FOR SELECT USING (true);
CREATE POLICY "Allow insert access to category_order" ON public.category_order
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update access to category_order" ON public.category_order
  FOR UPDATE USING (true) WITH CHECK (true);
