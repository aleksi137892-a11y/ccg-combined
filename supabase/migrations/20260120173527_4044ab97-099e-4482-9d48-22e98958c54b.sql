-- Add new columns to complicity_entities for the Complicity Ledger
ALTER TABLE public.complicity_entities
ADD COLUMN IF NOT EXISTS sector text,
ADD COLUMN IF NOT EXISTS inclusion_reasons text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS profile_summary text,
ADD COLUMN IF NOT EXISTS profile_summary_ge text,
ADD COLUMN IF NOT EXISTS donation_years text,
ADD COLUMN IF NOT EXISTS beneficial_owner_english text,
ADD COLUMN IF NOT EXISTS has_allegations boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS allegation_summary text,
ADD COLUMN IF NOT EXISTS state_contracts_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS registry_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_sanctioned boolean DEFAULT false;

-- Create index for faster filtering on inclusion_reasons array
CREATE INDEX IF NOT EXISTS idx_complicity_entities_inclusion_reasons 
ON public.complicity_entities USING GIN (inclusion_reasons);

-- Create index for sanctioned entities filter
CREATE INDEX IF NOT EXISTS idx_complicity_entities_sanctioned 
ON public.complicity_entities (is_sanctioned) WHERE is_sanctioned = true;

-- Create index for allegations filter
CREATE INDEX IF NOT EXISTS idx_complicity_entities_allegations 
ON public.complicity_entities (has_allegations) WHERE has_allegations = true;

-- Create index for sector filtering
CREATE INDEX IF NOT EXISTS idx_complicity_entities_sector 
ON public.complicity_entities (sector);