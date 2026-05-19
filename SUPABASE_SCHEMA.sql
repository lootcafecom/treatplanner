-- TreatPlanner Complete Supabase Schema
-- Run this in your Supabase SQL editor

-- USERS (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT, email TEXT, phone TEXT, country TEXT, dob DATE,
  blood_type TEXT, allergies TEXT, medications TEXT, health_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COUNTRIES
CREATE TABLE countries (
  id SERIAL PRIMARY KEY, name TEXT NOT NULL, code TEXT UNIQUE,
  flag TEXT, avg_savings_pct INT, description TEXT, visa_on_arrival TEXT[],
  best_for TEXT[], created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HOSPITALS
CREATE TABLE hospitals (
  id SERIAL PRIMARY KEY, name TEXT NOT NULL, country_id INT REFERENCES countries(id),
  city TEXT, address TEXT, latitude DECIMAL, longitude DECIMAL,
  accreditation TEXT[] DEFAULT '{}', jci_certified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0, review_count INT DEFAULT 0,
  founded_year INT, total_beds INT, success_rate INT,
  specialty TEXT, description TEXT, website TEXT, phone TEXT, email TEXT,
  languages TEXT[] DEFAULT '{}', insurance_accepted TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE,
  flight_cost_from_usa INT, hotel_cost_per_night INT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROCEDURES
CREATE TABLE procedures (
  id SERIAL PRIMARY KEY, name TEXT NOT NULL, category TEXT,
  description TEXT, recovery_days INT, risk_level TEXT,
  slug TEXT UNIQUE, icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HOSPITAL_PROCEDURES (prices per hospital per procedure)
CREATE TABLE hospital_procedures (
  id SERIAL PRIMARY KEY,
  hospital_id INT REFERENCES hospitals(id) ON DELETE CASCADE,
  procedure_id INT REFERENCES procedures(id) ON DELETE CASCADE,
  price_usd INT NOT NULL, success_rate INT,
  notes TEXT, is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(hospital_id, procedure_id)
);

-- DOCTORS
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY, hospital_id INT REFERENCES hospitals(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL, specialty TEXT, experience_years INT,
  cases_performed INT, education TEXT, languages TEXT[] DEFAULT '{}',
  bio TEXT, photo_url TEXT, is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY, booking_ref TEXT UNIQUE DEFAULT ('TP-'||floor(random()*9000+1000)::TEXT),
  user_id UUID REFERENCES profiles(id), hospital_id INT REFERENCES hospitals(id),
  procedure_id INT REFERENCES procedures(id), doctor_id INT REFERENCES doctors(id),
  travel_date DATE, return_date DATE, status TEXT DEFAULT 'pending',
  package_type TEXT DEFAULT 'complete', has_insurance BOOLEAN DEFAULT FALSE,
  insurance_type TEXT, has_concierge BOOLEAN DEFAULT FALSE,
  total_price_usd INT, deposit_paid_usd INT, balance_usd INT,
  notes TEXT, medical_records TEXT[],
  stripe_payment_intent TEXT, stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY, user_id UUID REFERENCES profiles(id),
  hospital_id INT REFERENCES hospitals(id), booking_id INT REFERENCES bookings(id),
  rating INT CHECK(rating>=1 AND rating<=5),
  title TEXT, body TEXT, procedure TEXT, country TEXT,
  is_verified BOOLEAN DEFAULT FALSE, is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE payments (
  id SERIAL PRIMARY KEY, booking_id INT REFERENCES bookings(id),
  user_id UUID REFERENCES profiles(id),
  amount_usd INT, payment_type TEXT, status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT, stripe_receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PRICE ALERTS
CREATE TABLE price_alerts (
  id SERIAL PRIMARY KEY, email TEXT NOT NULL,
  procedure_id INT REFERENCES procedures(id),
  target_price_usd INT, country TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SAVED HOSPITALS
CREATE TABLE saved_hospitals (
  id SERIAL PRIMARY KEY, user_id UUID REFERENCES profiles(id),
  hospital_id INT REFERENCES hospitals(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, hospital_id)
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_hospitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Hospitals are viewable by everyone" ON hospitals FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Procedures are viewable by everyone" ON procedures FOR SELECT USING (TRUE);
CREATE POLICY "Approved reviews are public" ON reviews FOR SELECT USING (is_approved = TRUE);

-- Indexes
CREATE INDEX idx_hospitals_country ON hospitals(country_id);
CREATE INDEX idx_hospital_procedures_hospital ON hospital_procedures(hospital_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_hospital ON reviews(hospital_id);
