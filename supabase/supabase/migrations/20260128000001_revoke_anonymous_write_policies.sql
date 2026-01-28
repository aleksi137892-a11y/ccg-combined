-- SECURITY FIX: Revoke anonymous INSERT/UPDATE policies on complicity_entities
-- These policies allowed any unauthenticated user to modify the Complicity Index
-- 
-- Created: 2026-01-28
-- Reason: Critical security vulnerability - data integrity risk

-- Drop the dangerous policies
DROP POLICY IF EXISTS "Allow anonymous inserts for data upload" ON public.complicity_entities;
DROP POLICY IF EXISTS "Allow anonymous updates for data upload" ON public.complicity_entities;

-- Create authenticated-only policies for data management
-- Only users with 'admin' role in auth.users metadata can modify data

-- For now, create a service_role only policy (edge functions with service key can still write)
-- This blocks anonymous browser-based attacks while allowing backend operations

CREATE POLICY "Service role can insert complicity entities"
ON public.complicity_entities
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update complicity entities"
ON public.complicity_entities
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Add comment explaining the security model
COMMENT ON TABLE public.complicity_entities IS 
'Complicity Index entries. Write access restricted to service_role only (backend operations). 
Anonymous reads allowed for public transparency. All modifications require authenticated admin access.';
