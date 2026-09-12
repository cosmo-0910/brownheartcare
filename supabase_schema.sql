-- Supabase Database Schema SQL Script for Brown's Heart Care Foundation
-- Copy and run this script in Supabase Dashboard > SQL Editor

-- 1. Create Donations Table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
    payment_method TEXT DEFAULT 'Direct Bank Transfer',
    tax_receipt_status TEXT DEFAULT 'Issued',
    transaction_ref TEXT DEFAULT gen_random_uuid()::text
);

-- 2. Create Volunteers Table
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    interests TEXT[], -- Array of interests e.g. ['Medical Outreach', 'Community Events']
    schedule_availability TEXT DEFAULT 'Weekends',
    medical_qualifications TEXT,
    invitation_status TEXT DEFAULT 'Pending'
);

-- Idempotent column additions for Volunteers Table (ignores if exists, adds if missing)
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS detailed_address TEXT;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS occupation TEXT;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS motivation TEXT;
ALTER TABLE public.volunteers ADD COLUMN IF NOT EXISTS event_title TEXT;

-- Idempotent column additions for Donations Table
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS event_title TEXT;

-- 3. Create Outreach Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    type_label TEXT DEFAULT 'Community Outreach',
    event_date TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT true
);

-- Idempotent column addition for Events Table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS story_record TEXT;

-- 4. Create Program Highlights & Media Table
CREATE TABLE IF NOT EXISTS public.highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'medical',
    category_label TEXT DEFAULT 'Medical Outreach',
    duration TEXT DEFAULT '04:30',
    views TEXT DEFAULT '1.2K views',
    description TEXT,
    video_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT true
);

-- 5. Create Site Settings & Content Table (Stores stats, social links, taglines, timeline stories)
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SECURITY AUDIT & ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to avoid duplicate errors on re-run
DROP POLICY IF EXISTS "Allow public read events" ON public.events;
DROP POLICY IF EXISTS "Allow public read highlights" ON public.highlights;
DROP POLICY IF EXISTS "Allow public read site_content" ON public.site_content;
DROP POLICY IF EXISTS "Allow public insert donations" ON public.donations;
DROP POLICY IF EXISTS "Allow public insert volunteers" ON public.volunteers;
DROP POLICY IF EXISTS "Restrict public select donations" ON public.donations;
DROP POLICY IF EXISTS "Restrict public select volunteers" ON public.volunteers;

-- Public read permissions
CREATE POLICY "Allow public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read highlights" ON public.highlights FOR SELECT USING (true);
CREATE POLICY "Allow public read site_content" ON public.site_content FOR SELECT USING (true);

-- Public insert permissions
CREATE POLICY "Allow public insert donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert volunteers" ON public.volunteers FOR INSERT WITH CHECK (true);

-- Restricted read permissions for donor and volunteer PII
CREATE POLICY "Restrict public select donations" ON public.donations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Restrict public select volunteers" ON public.volunteers FOR SELECT USING (auth.role() = 'authenticated');

