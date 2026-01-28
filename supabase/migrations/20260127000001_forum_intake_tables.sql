-- Forum Intake Tables
-- Migration for Forum for Justice appeal submission system
-- Implements draft sessions (pause/save) and appeal storage

-- =============================================================================
-- DRAFT SESSIONS TABLE
-- Stores paused form sessions with encrypted data and recovery phrase hash
-- Implements Istanbul Protocol "Do No Harm" psychosocial off-ramp
-- =============================================================================

CREATE TABLE IF NOT EXISTS draft_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Recovery mechanism (SHA-256 hash of 6-word phrase)
  recovery_phrase_hash TEXT NOT NULL,
  
  -- Form context
  pathway TEXT NOT NULL CHECK (pathway IN ('harm', 'wrongdoing', 'inside')),
  current_step INTEGER NOT NULL DEFAULT 0,
  
  -- Encrypted form data (AES-256)
  form_data_encrypted TEXT NOT NULL,
  
  -- Language preference
  language TEXT DEFAULT 'en',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '72 hours',
  
  -- Cleanup tracking
  accessed_at TIMESTAMPTZ,
  is_consumed BOOLEAN DEFAULT false
);

-- Index for phrase lookup
CREATE INDEX IF NOT EXISTS idx_draft_sessions_phrase_hash 
  ON draft_sessions(recovery_phrase_hash);

-- Index for expiry cleanup
CREATE INDEX IF NOT EXISTS idx_draft_sessions_expires 
  ON draft_sessions(expires_at);

-- =============================================================================
-- FORUM APPEALS TABLE
-- Stores submitted appeals with remedy selection and consent matrix
-- Implements UN Res 60/147 remedy categories and OHCHR granular consent
-- =============================================================================

CREATE TABLE IF NOT EXISTS forum_appeals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Pathway classification
  pathway TEXT NOT NULL CHECK (pathway IN ('harm', 'wrongdoing', 'inside')),
  
  -- ==========================================================================
  -- FACTS (Step 1-3)
  -- ==========================================================================
  
  -- Narrative description of harm/wrongdoing/knowledge
  narrative TEXT NOT NULL,
  
  -- Temporal information
  date_range JSONB, -- {start: date, end: date, ongoing: boolean, approximate: boolean}
  
  -- Location information
  location TEXT,
  location_details TEXT,
  
  -- Actor identification
  actors JSONB, -- [{type: 'state'|'agent'|'private'|'unknown', name?, role?, description?}]
  
  -- ==========================================================================
  -- EVIDENCE (Step 4)
  -- ==========================================================================
  
  has_evidence BOOLEAN DEFAULT false,
  evidence_description TEXT,
  evidence_file_refs TEXT[], -- References to uploaded files
  
  -- ==========================================================================
  -- REMEDY SELECTION (Step 5) - UN Basic Principles 19-23
  -- ==========================================================================
  
  -- Selected remedy types (multi-select)
  remedies_sought TEXT[] NOT NULL CHECK (
    remedies_sought <@ ARRAY['restitution', 'compensation', 'rehabilitation', 'satisfaction', 'guarantees']::TEXT[]
  ),
  
  -- Additional context per remedy
  remedy_details JSONB, -- {restitution: "specific details", compensation: "amount/nature", etc.}
  
  -- ==========================================================================
  -- CONSENT MATRIX (Step 6) - OHCHR Manual
  -- ==========================================================================
  
  -- Granular consent levels
  consent_internal BOOLEAN NOT NULL DEFAULT true,  -- Required: count in statistics
  consent_legal_referral BOOLEAN DEFAULT false,     -- Share with ICC/ECHR/courts
  consent_public_record BOOLEAN DEFAULT false,      -- Publish in Ledger
  
  -- Consent timestamp for audit trail
  consent_timestamp TIMESTAMPTZ NOT NULL,
  
  -- ==========================================================================
  -- INSIDER-SPECIFIC (Inside pathway only)
  -- ==========================================================================
  
  insider_position_category TEXT, -- Anonymized category (e.g., 'judicial', 'law_enforcement')
  protection_needs JSONB, -- {identity: boolean, family: boolean, relocation: boolean}
  
  -- ==========================================================================
  -- CONTACT (Optional)
  -- ==========================================================================
  
  contact_info TEXT,
  preferred_contact TEXT CHECK (preferred_contact IN ('email', 'signal', 'protonmail', 'none')),
  
  -- ==========================================================================
  -- METADATA
  -- ==========================================================================
  
  -- Session tracking
  session_id TEXT,
  
  -- Language
  language TEXT DEFAULT 'en',
  
  -- Integrity verification
  sha256_hash TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Triage status
  triage_status TEXT DEFAULT 'pending' CHECK (
    triage_status IN ('pending', 'in_review', 'routed', 'closed', 'referred')
  ),
  triage_notes TEXT,
  triaged_at TIMESTAMPTZ,
  triaged_by TEXT
);

-- Index for triage queries
CREATE INDEX IF NOT EXISTS idx_forum_appeals_triage 
  ON forum_appeals(triage_status, created_at DESC);

-- Index for pathway filtering
CREATE INDEX IF NOT EXISTS idx_forum_appeals_pathway 
  ON forum_appeals(pathway);

-- Index for consent-based queries (e.g., finding public-consent records)
CREATE INDEX IF NOT EXISTS idx_forum_appeals_consent 
  ON forum_appeals(consent_public_record, consent_legal_referral);

-- =============================================================================
-- AUTO-UPDATE TIMESTAMP TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION update_forum_appeals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_forum_appeals_updated_at
  BEFORE UPDATE ON forum_appeals
  FOR EACH ROW
  EXECUTE FUNCTION update_forum_appeals_updated_at();

-- =============================================================================
-- CLEANUP FUNCTION FOR EXPIRED DRAFTS
-- =============================================================================

CREATE OR REPLACE FUNCTION cleanup_expired_draft_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM draft_sessions
  WHERE expires_at < NOW()
  OR is_consumed = true;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS
ALTER TABLE draft_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_appeals ENABLE ROW LEVEL SECURITY;

-- Draft sessions: Allow insert/select by anyone (phrase-based auth)
CREATE POLICY "Allow insert draft sessions" ON draft_sessions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow select draft sessions by phrase" ON draft_sessions
  FOR SELECT TO anon, authenticated
  USING (true); -- Phrase hash validation done in application

-- Forum appeals: Allow insert by anyone
CREATE POLICY "Allow insert forum appeals" ON forum_appeals
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Forum appeals: Read only by authenticated users (staff)
CREATE POLICY "Staff can read forum appeals" ON forum_appeals
  FOR SELECT TO authenticated
  USING (true);

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE draft_sessions IS 
  'Paused intake form sessions for Istanbul Protocol "Do No Harm" psychosocial off-ramp. 72-hour recovery window.';

COMMENT ON TABLE forum_appeals IS 
  'Submitted appeals to the Forum for Justice with UN Res 60/147 remedy selection and OHCHR granular consent.';

COMMENT ON COLUMN forum_appeals.remedies_sought IS 
  'UN Basic Principles on Remedy (Principles 19-23): restitution, compensation, rehabilitation, satisfaction, guarantees';

COMMENT ON COLUMN forum_appeals.consent_internal IS 
  'Required baseline: count case in statistics while protecting identity';

COMMENT ON COLUMN forum_appeals.consent_legal_referral IS 
  'Share with international courts/prosecutors (ICC, ECHR) if case is relevant';

COMMENT ON COLUMN forum_appeals.consent_public_record IS 
  'High-risk: publish story in public Ledger with informed consent';
