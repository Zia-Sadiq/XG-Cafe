/*
# XG Cafe Kitab Klubu — Database Schema

## Purpose
Full database schema for the XG Cafe Kitab Klubu website. This is a single-tenant
public app (no sign-in). All data is intentionally public and shared.

## New Tables

### menu_items
- id (uuid, PK)
- name (text, not null) — name of the dish/drink
- description (text) — short description
- price (numeric, not null) — price in AZN
- category (text, not null) — 'coffee', 'tea', 'desserts', 'food', 'cold_drinks'
- image_url (text) — optional image URL
- is_featured (boolean, default false) — shown in featured section
- sort_order (int, default 0) — for ordering
- created_at (timestamptz)

### events
- id (uuid, PK)
- title (text, not null) — event title
- description (text) — event description
- event_date (date, not null) — date of the event
- event_time (text, not null) — time string like "18:00"
- location (text) — where it's held
- capacity (int) — max attendees
- image_url (text) — optional image
- created_at (timestamptz)

### reservations
- id (uuid, PK)
- name (text, not null) — guest name
- email (text, not null) — guest email
- phone (text) — phone number
- date (date, not null) — reservation date
- time (text, not null) — reservation time
- party_size (int, default 2) — number of people
- notes (text) — special requests
- status (text, default 'pending') — 'pending', 'confirmed', 'cancelled'
- created_at (timestamptz)

### messages
- id (uuid, PK)
- name (text, not null) — sender name
- email (text, not null) — sender email
- subject (text) — message subject
- message (text, not null) — message body
- created_at (timestamptz)

### reviews
- id (uuid, PK)
- name (text, not null) — reviewer name
- rating (int, not null, 1–5) — star rating
- comment (text) — review text
- is_approved (boolean, default true) — only approved reviews show
- created_at (timestamptz)

## Security
- RLS enabled on ALL tables.
- All tables use TO anon, authenticated because this is a no-auth public app.
- menu_items, events, reviews: public read, no public write (admin-managed data).
- reservations: public insert (guests submit), public read (to see status).
- messages: public insert (contact form), no public read.

## Important Notes
1. This is a single-tenant app — no user_id columns, no auth.uid() checks.
2. All policies use TO anon, authenticated so the anon-key frontend can operate.
3. menu_items, events, and reviews are read-only from the frontend; data is seeded via execute_sql.
4. reservations and messages accept public inserts from the website forms.
*/

-- ==================== MENU ITEMS ====================
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category text NOT NULL DEFAULT 'coffee',
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu_items" ON menu_items;
CREATE POLICY "anon_select_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

-- ==================== EVENTS ====================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  event_time text NOT NULL,
  location text,
  capacity int DEFAULT 20,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_events" ON events;
CREATE POLICY "anon_select_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

-- ==================== RESERVATIONS ====================
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  date date NOT NULL,
  time text NOT NULL,
  party_size int NOT NULL DEFAULT 2,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT
  TO anon, authenticated USING (true);

-- ==================== MESSAGES ====================
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ==================== REVIEWS ====================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating int NOT NULL DEFAULT 5,
  comment text,
  is_approved boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);