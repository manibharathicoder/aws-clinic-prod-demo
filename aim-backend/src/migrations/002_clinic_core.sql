-- 002_clinic_core.sql
-- Core clinic management tables

-- ── FAMILIES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS families (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  full_name     VARCHAR(255) NOT NULL,
  phone         VARCHAR(50),
  address       TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── CHILDREN ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS children (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  diagnosis     TEXT,
  notes         TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── THERAPISTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS therapists (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  full_name     VARCHAR(255) NOT NULL,
  specialties   TEXT[], -- Array of specialties
  specialty     VARCHAR(255),
  bio           TEXT,
  hourly_rate   DECIMAL(10, 2),
  certifications TEXT[],
  hire_date     DATE,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── SERVICES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  code          VARCHAR(50) UNIQUE, -- e.g. SLP-01
  description   TEXT,
  rate_per_hour DECIMAL(10, 2),
  duration_min  INTEGER DEFAULT 60,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── SESSIONS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id      UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  therapist_id  UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  service_id    UUID REFERENCES services(id) ON DELETE SET NULL,
  scheduled_at  TIMESTAMPTZ NOT NULL,
  duration_min  INTEGER DEFAULT 60,
  location      VARCHAR(255) DEFAULT 'Brampton',
  status        VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','no_show')),
  notes         TEXT,
  cancellation_reason TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── INVOICES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id     UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  amount        DECIMAL(10, 2) NOT NULL,
  status        VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft','sent','paid','void')),
  due_date      DATE,
  paid_at       TIMESTAMPTZ,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
