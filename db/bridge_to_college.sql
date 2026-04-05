-- Bridge to College Database Schema

CREATE DATABASE IF NOT EXISTS bridge_to_college;
USE bridge_to_college;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    contact_method VARCHAR(50),
    applicant_type VARCHAR(100),
    application_timing VARCHAR(100),
    major_highschool VARCHAR(255),
    gpa VARCHAR(50),
    target_countries TEXT,
    interested_universities TEXT,
    package VARCHAR(100),
    started_application VARCHAR(10),
    intended_field VARCHAR(255),
    start_year VARCHAR(20),
    goals TEXT,
    has_transcripts VARCHAR(10),
    status ENUM('Pending', 'Complete', 'Reject') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed an admin user (email: emery@gmail.com, pass: password123)
REPLACE INTO users (full_name, email, password, role) 
VALUES ('Emery Admin', 'emery@gmail.com', '$2y$10$RqqeGxaNFS1R9mskN/vy9O7CF8wVCH9a.4rMKWBhrSJGcmnU/X0NK', 'admin');

CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    phone VARCHAR(50),
    tags TEXT,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    university VARCHAR(255),
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    year VARCHAR(20),
    is_featured BOOLEAN DEFAULT FALSE,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS universities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial stats
REPLACE INTO site_stats (id, label, value, icon) VALUES 
(1, 'students assisted', '100 +', 'Users'),
(2, 'acceptance rate', '95%', 'CheckCircle'),
(3, 'scholarships secured', '330K +', 'DollarSign'),
(4, 'universities', '11+', 'GraduationCap');

-- Seed Testimonials from photo
REPLACE INTO testimonials (id, name, location, university, content, rating, year, is_featured) VALUES 
(1, 'Alice Mutoni', 'Kigali, Rwanda', 'University of Richmond', 'Never thought I would get into a top-tier University, but Bridge to College helped me find schools that were a great fit. Throughout the Application process, they were really supportive and helped me find my dream scholarship.', 5, '2023', 1),
(2, 'Jean Baptiste', 'Kigali, Rwanda', 'Bentley University', 'The team at Bridge to College didn\'t just help me with applications - they believed in me. With their help, I improved my writing, polished my application, and now I\'m studying project management at Bentley University with a Full Scholarship!', 5, '2023', 1),
(3, 'Mark Taylor', NULL, 'University of Washington', 'The training helped me a lot. They explored things that I never thought would be useful throughout my application process.', 5, '2023', 0),
(4, 'Sarah Mutoni', NULL, 'University of Rwanda', 'I was complicated with calculations but Success Stories helped me understand everything accurately.', 5, '2022', 0),
(5, 'David Kalisa', NULL, 'MIT', 'The intensive preparation helped me get where I am today. Don\'t hesitate to join Bridge to College.', 5, '2023', 0),
(6, 'Ann Johnson', NULL, 'Stanford University', 'They helped me find schools that I didn\'t know existed before. It was a life changing experience.', 5, '2023', 0),
(7, 'Blaise Niyomubona', NULL, 'Michigan State University', 'Professional, caring, and incredibly knowledgeable. They made my dream of studying abroad a reality.', 5, '2023', 0),
(8, 'Sandra Umurerwa', NULL, 'Yale University', 'The personalised attention and support they gave me throughout the entire process was exceptional. Highly recommend!', 5, '2021', 0),
(9, 'Lisa W.', NULL, 'Harvard University', 'The support and guidance I received was beyond my expectations. I am now at my dream school.', 5, '2023', 0);

-- Seed Universities from photo
REPLACE INTO universities (id, name) VALUES 
(1, 'University of Pennsylvania'),
(2, 'Duke University'),
(3, 'Yale University'),
(4, 'Michigan State'),
(5, 'NYU'),
(6, 'University of Rwanda'),
(7, 'MIT'),
(8, 'UOT'),
(9, 'Harvard University'),
(10, 'McGill University'),
(11, 'Stanford'),
(12, 'Columbia University'),
(13, 'Bentley University'),
(14, 'University of Toronto'),
(15, 'All-inclusive');
