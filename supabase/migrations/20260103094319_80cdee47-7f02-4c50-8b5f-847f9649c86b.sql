-- Create triage analytics table for tracking user intents
CREATE TABLE public.triage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  event_type TEXT NOT NULL,
  role_selected TEXT,
  user_intent TEXT,
  conversation_length INTEGER DEFAULT 0,
  routed_to TEXT,
  hotline_clicked TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for analytics queries
CREATE INDEX idx_triage_analytics_created ON public.triage_analytics(created_at DESC);
CREATE INDEX idx_triage_analytics_session ON public.triage_analytics(session_id);
CREATE INDEX idx_triage_analytics_event ON public.triage_analytics(event_type);
CREATE INDEX idx_triage_analytics_role ON public.triage_analytics(role_selected);

-- Enable RLS
ALTER TABLE public.triage_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for tracking (no PII stored)
CREATE POLICY "Allow anonymous inserts"
ON public.triage_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only service role can read (for admin dashboards)
CREATE POLICY "Service role can read all"
ON public.triage_analytics
FOR SELECT
TO service_role
USING (true);