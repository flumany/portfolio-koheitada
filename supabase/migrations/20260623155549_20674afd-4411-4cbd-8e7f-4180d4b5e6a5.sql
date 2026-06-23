
-- projects
DROP POLICY IF EXISTS "Authenticated can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated can delete projects" ON public.projects;

CREATE POLICY "Authenticated can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- project_media
DROP POLICY IF EXISTS "Authenticated can insert project media" ON public.project_media;
DROP POLICY IF EXISTS "Authenticated can update project media" ON public.project_media;
DROP POLICY IF EXISTS "Authenticated can delete project media" ON public.project_media;

CREATE POLICY "Authenticated can insert project media" ON public.project_media
  FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update project media" ON public.project_media
  FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete project media" ON public.project_media
  FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- category_order
DROP POLICY IF EXISTS "Authenticated can insert category_order" ON public.category_order;
DROP POLICY IF EXISTS "Authenticated can update category_order" ON public.category_order;

CREATE POLICY "Authenticated can insert category_order" ON public.category_order
  FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update category_order" ON public.category_order
  FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
