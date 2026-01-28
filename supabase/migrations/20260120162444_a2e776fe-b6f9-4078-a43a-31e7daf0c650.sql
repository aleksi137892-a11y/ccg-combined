-- Add INSERT policy for complicity_entities to allow data uploads
-- Using permissive policy for now since no auth is implemented
CREATE POLICY "Allow anonymous inserts for data upload"
ON public.complicity_entities
FOR INSERT
WITH CHECK (true);