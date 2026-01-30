-- SQL Query to create students table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS students (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    father_name TEXT NOT NULL,
    class_grade TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Create an index on created_at for faster queries
CREATE INDEX idx_students_created_at ON students(created_at DESC);

-- Optional: Add some comments for documentation
COMMENT ON TABLE students IS 'Stores student admission records';
COMMENT ON COLUMN students.id IS 'Auto-incrementing primary key';
COMMENT ON COLUMN students.full_name IS 'Full name of the student';
COMMENT ON COLUMN students.father_name IS 'Father''s name';
COMMENT ON COLUMN students.class_grade IS 'Class/Grade of the student';
COMMENT ON COLUMN students.created_at IS 'Timestamp when the record was created';
