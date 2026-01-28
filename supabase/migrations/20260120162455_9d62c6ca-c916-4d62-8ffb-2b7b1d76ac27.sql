-- Add UPDATE policy for complicity_entities to allow upserts
CREATE POLICY "Allow anonymous updates for data upload"
ON public.complicity_entities
FOR UPDATE
USING (true)
WITH CHECK (true);