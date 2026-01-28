-- Create the updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create complicity_entities table for the CCG Complicity Index
CREATE TABLE public.complicity_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_ge TEXT,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('individual', 'company', 'institution')),
  position TEXT,
  organization TEXT,
  total_donations_gel NUMERIC(15,2) DEFAULT 0,
  donation_recipients JSONB DEFAULT '[]',
  total_procurement_gel NUMERIC(15,2) DEFAULT 0,
  procurement_contracts JSONB DEFAULT '[]',
  beneficial_owner TEXT,
  beneficial_owner_verified BOOLEAN DEFAULT false,
  ownership_chain JSONB DEFAULT '[]',
  allegations JSONB DEFAULT '[]',
  severity TEXT CHECK (severity IN ('high', 'medium', 'low')),
  sources JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.complicity_entities ENABLE ROW LEVEL SECURITY;

-- Public read access (transparency data)
CREATE POLICY "Public can view complicity entities"
ON public.complicity_entities
FOR SELECT
USING (true);

-- Create index for search performance
CREATE INDEX idx_complicity_entities_name ON public.complicity_entities USING gin(to_tsvector('english', name));
CREATE INDEX idx_complicity_entities_type ON public.complicity_entities(entity_type);
CREATE INDEX idx_complicity_entities_severity ON public.complicity_entities(severity);

-- Create updated_at trigger
CREATE TRIGGER update_complicity_entities_updated_at
BEFORE UPDATE ON public.complicity_entities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();