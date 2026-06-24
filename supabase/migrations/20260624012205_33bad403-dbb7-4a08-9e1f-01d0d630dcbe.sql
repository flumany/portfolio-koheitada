
-- Public read for images and 3ddata
CREATE POLICY "Public read images"
ON storage.objects FOR SELECT
USING (bucket_id IN ('images', '3ddata'));

CREATE POLICY "Authenticated upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('images', '3ddata') AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('images', '3ddata') AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('images', '3ddata') AND auth.uid() IS NOT NULL);
