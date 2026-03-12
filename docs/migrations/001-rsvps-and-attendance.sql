-- Migration: 001-rsvps-and-attendance
-- Description: Add RSVP and attendance tracking tables
-- Date: 2026-03-12

-- RSVP table for event responses
CREATE TABLE IF NOT EXISTS rsvps (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    schedule_id VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'going', 'not_going', 'maybe')),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, schedule_id)
);

-- Attendance table for tracking actual event participation
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES registrations(id) ON DELETE CASCADE,
    discord_id VARCHAR(255),
    event_date DATE NOT NULL,
    event_type VARCHAR(100),
    attended BOOLEAN DEFAULT FALSE,
    arrived_late BOOLEAN DEFAULT FALSE,
    left_early BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rsvps_user_id ON rsvps(user_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_schedule_id ON rsvps(schedule_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON rsvps(status);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at);

CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON attendance(member_id);
CREATE INDEX IF NOT EXISTS idx_attendance_discord_id ON attendance(discord_id);
CREATE INDEX IF NOT EXISTS idx_attendance_event_date ON attendance(event_date);
CREATE INDEX IF NOT EXISTS idx_attendance_attended ON attendance(attended);

-- Comments
COMMENT ON TABLE rsvps IS 'RSVP responses for scheduled events';
COMMENT ON TABLE attendance IS 'Actual attendance records for events';

COMMENT ON COLUMN rsvps.status IS 'RSVP status: pending, going, not_going, maybe';
COMMENT ON COLUMN attendance.arrived_late IS 'Member arrived after event start';
COMMENT ON COLUMN attendance.left_early IS 'Member left before event end';
