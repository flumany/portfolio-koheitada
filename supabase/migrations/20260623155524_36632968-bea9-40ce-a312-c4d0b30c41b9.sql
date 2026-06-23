
-- Tighten category_order: only authenticated users can insert/update
DROP POLICY IF EXISTS "Allow insert access to category_order" ON public.category_order;
DROP POLICY IF EXISTS "Allow update access to category_order" ON public.category_order;

CREATE POLICY "Authenticated can insert category_order" ON public.category_order
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update category_order" ON public.category_order
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
