
-- Disable RLS for category_order table to allow updates
ALTER TABLE public.category_order DISABLE ROW LEVEL SECURITY;

-- Ensure the table has the correct structure
CREATE TABLE IF NOT EXISTS public.category_order (
    id integer PRIMARY KEY DEFAULT 1,
    categories text[] DEFAULT '{}'::text[]
);

-- Insert default row if it doesn't exist
INSERT INTO public.category_order (id, categories) 
VALUES (1, '{}') 
ON CONFLICT (id) DO NOTHING;
