-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2026 at 08:15 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bridge_to_college`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` enum('Rwandan University','Rwandan High School','International University','Scholarship & Funding','Educational Organization') NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`id`, `name`, `category`, `logo_path`, `website_url`, `created_at`) VALUES
(1, 'University of Rwanda', 'Rwandan University', NULL, 'https://ur.ac.rw', '2026-04-07 10:24:15'),
(2, 'Kigali Parents School', 'Rwandan High School', NULL, '', '2026-04-07 10:24:15'),
(5, 'REB', 'Educational Organization', NULL, 'https://reb.rw', '2026-04-07 10:24:16');

-- --------------------------------------------------------

--
-- Table structure for table `site_stats`
--

CREATE TABLE `site_stats` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `site_stats`
--

INSERT INTO `site_stats` (`id`, `label`, `value`, `icon`, `created_at`) VALUES
(1, 'students assisted', '100 +', 'Users', '2026-04-07 11:13:57'),
(2, 'acceptance rate', '95%', 'CheckCircle', '2026-04-07 11:13:57'),
(3, 'scholarships secured', '330K +', 'DollarSign', '2026-04-07 11:13:57'),
(4, 'universities', '11+', 'GraduationCap', '2026-04-07 11:13:57');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `full_name`, `role`, `description`, `phone`, `tags`, `image_path`, `created_at`) VALUES
(1, 'Emery TWAJAMAHORO', 'Founder & Lead Counselor', 'Experienced educational counselor dedicated to helping students achieve their academic dreams', '+250 791 799 081', 'Leadership, Strategy', 'backend/uploads/team/69d7eb9b377ef.png', '2026-04-05 07:36:01'),
(2, 'Jean D\'Amour UWAMBAYIKIREZI', 'Rwanda Applications Specialist', 'Local university expert with deep knowledge of Rwandan higher education system', '+250 789 190 060', 'Local Universities, Scholarships', 'backend/uploads/team/69d7eb89e5efc.png', '2026-04-05 07:36:01'),
(3, 'Jean Pierre NKUNDAMAHORO', 'Interview Coach', 'Expert in interview preparation and communication skills development', '+250 781 460 960', 'Interview Prep, Communication', 'backend/uploads/team/69d7eb9369170.png', '2026-04-05 07:36:01');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `contact_method` varchar(50) DEFAULT NULL,
  `applicant_type` varchar(100) DEFAULT NULL,
  `application_timing` varchar(100) DEFAULT NULL,
  `major_highschool` varchar(255) DEFAULT NULL,
  `gpa` varchar(50) DEFAULT NULL,
  `target_countries` text DEFAULT NULL,
  `interested_universities` text DEFAULT NULL,
  `package` varchar(100) DEFAULT NULL,
  `started_application` varchar(10) DEFAULT NULL,
  `intended_field` varchar(255) DEFAULT NULL,
  `start_year` varchar(20) DEFAULT NULL,
  `goals` text DEFAULT NULL,
  `has_transcripts` varchar(10) DEFAULT NULL,
  `status` enum('Pending','Complete','Reject') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `user_id`, `full_name`, `email`, `phone`, `contact_method`, `applicant_type`, `application_timing`, `major_highschool`, `gpa`, `target_countries`, `interested_universities`, `package`, `started_application`, `intended_field`, `start_year`, `goals`, `has_transcripts`, `status`, `created_at`) VALUES
(1, 2, 'cedrick', 'cedrickrwa@gmail.com', '09876543', 'Email', 'High school graduate (first-year/freshman) applicant', 'Early Decision applicant', 'pcm', '40/100', 'Rwanda', 'Washington and Lee University', 'Comprehensive', 'No', 'engeeniring', '2028', 'succcess', 'Yes', 'Reject', '2026-04-05 08:24:44'),
(2, NULL, 'wqertyuiop', 'ce@gmail.com', '0791801839', 'SMS', 'University Student (transfer applicant)', 'Regular decision applicant', 'meg', '60/100', 'Rwanda', 'University of Southern California', 'Premium', 'Yes', 'swd', '2028', 'wqertyuiop;lkjhgfdsadfghjkl;opoiuytrewqasdfghjkliouytr', 'Yes', 'Reject', '2026-04-05 18:00:53'),
(3, 10, 'Nibishaka Cedrick', 'ccedrickrwa@gmail.com', '123456789', 'WhatsApp', 'High school graduate (first-year/freshman) applicant', 'Regular decision applicant', 'heg', '56/100', 'Canada', '', 'Comprehensive', 'No', 'tech', '2026', 'Manually added by Admin', 'No', 'Complete', '2026-04-07 12:44:29'),
(4, 2, 'cedrick', 'cedrickrwa@gmail.com', '0791801839', 'Phone Call', 'University Student (transfer applicant)', 'Regular decision applicant', 'gg', '40/100', 'United States', 'Vanderbilt University', 'Comprehensive', 'No', 'uu', '2027', 'hhh', 'No', 'Complete', '2026-04-07 15:44:27'),
(5, 11, 'test2', 'test2@gmail.com', '0791801839', 'WhatsApp', 'High school graduate (first-year/freshman) applicant', 'Regular decision applicant', 'hgl', '56', 'Rwanda', 'Oberlin College', 'Premium', 'Yes', 'swd', '2027', 'test 2', 'No', 'Pending', '2026-04-09 13:21:42');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `year` varchar(20) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `location`, `university`, `content`, `rating`, `year`, `is_featured`, `image_path`, `created_at`) VALUES
(1, 'Alice Mutoni', 'Kigali, Rwanda', 'University of Richmond', 'Never thought I would get into a top-tier University, but Bridge to College helped me find schools that were a great fit. Throughout the Application process, they were really supportive and helped me find my dream scholarship.', 5, '2023', 1, NULL, '2026-04-07 11:13:57'),
(2, 'Jean Baptiste', 'Kigali, Rwanda', 'Bentley University', 'The team at Bridge to College didn\'t just help me with applications - they believed in me. With their help, I improved my writing, polished my application, and now I\'m studying project management at Bentley University with a Full Scholarship!', 5, '2023', 1, NULL, '2026-04-07 11:13:57'),
(3, 'Mark Taylor', NULL, 'University of Washington', 'The training helped me a lot. They explored things that I never thought would be useful throughout my application process.', 5, '2023', 0, NULL, '2026-04-07 11:13:57'),
(4, 'Sarah Mutoni', NULL, 'University of Rwanda', 'I was complicated with calculations but Success Stories helped me understand everything accurately.', 5, '2022', 0, NULL, '2026-04-07 11:13:57'),
(5, 'David Kalisa', NULL, 'MIT', 'The intensive preparation helped me get where I am today. Don\'t hesitate to join Bridge to College.', 5, '2023', 0, NULL, '2026-04-07 11:13:57'),
(6, 'Ann Johnson', NULL, 'Stanford University', 'They helped me find schools that I didn\'t know existed before. It was a life changing experience.', 5, '2023', 0, NULL, '2026-04-07 11:13:57'),
(7, 'Blaise Niyomubona', NULL, 'Michigan State University', 'Professional, caring, and incredibly knowledgeable. They made my dream of studying abroad a reality.', 5, '2023', 0, NULL, '2026-04-07 11:13:57'),
(8, 'Sandra Umurerwa', NULL, 'Yale University', 'The personalised attention and support they gave me throughout the entire process was exceptional. Highly recommend!', 5, '2021', 0, NULL, '2026-04-07 11:13:57'),
(9, 'Lisa W.', NULL, 'Harvard University', 'The support and guidance I received was beyond my expectations. I am now at my dream school.', 5, '2023', 0, NULL, '2026-04-07 11:13:57');

-- --------------------------------------------------------

--
-- Table structure for table `universities`
--

CREATE TABLE `universities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `universities`
--

INSERT INTO `universities` (`id`, `name`, `logo_path`, `created_at`) VALUES
(1, 'University of Pennsylvania', NULL, '2026-04-07 11:13:58'),
(2, 'Duke University', NULL, '2026-04-07 11:13:58'),
(3, 'Yale University', NULL, '2026-04-07 11:13:58'),
(4, 'Michigan State', NULL, '2026-04-07 11:13:58'),
(5, 'NYU', NULL, '2026-04-07 11:13:58'),
(6, 'University of Rwanda', NULL, '2026-04-07 11:13:58'),
(7, 'MIT', NULL, '2026-04-07 11:13:58'),
(8, 'UOT', NULL, '2026-04-07 11:13:58'),
(9, 'Harvard University', NULL, '2026-04-07 11:13:58'),
(10, 'McGill University', NULL, '2026-04-07 11:13:58'),
(11, 'Stanford', NULL, '2026-04-07 11:13:58'),
(12, 'Columbia University', NULL, '2026-04-07 11:13:58'),
(13, 'Bentley University', NULL, '2026-04-07 11:13:58'),
(14, 'University of Toronto', NULL, '2026-04-07 11:13:58'),
(15, 'All-inclusive', NULL, '2026-04-07 11:13:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `requires_password_change` tinyint(1) DEFAULT 0,
  `reset_code` varchar(10) DEFAULT NULL,
  `reset_code_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `profile_picture`, `created_at`, `requires_password_change`, `reset_code`, `reset_code_expires`) VALUES
(2, 'cedrick', 'cedrickrwa@gmail.com', '$2y$10$i3an1Zag2M1861cj5vZ1keGdKTvuJsBgNoesMy2ym/fpzSbSTFIeK', 'user', NULL, '2026-04-05 08:23:16', 0, '142083', '2026-04-09 20:22:07'),
(6, 'we', 'we@gmail.com', '$2y$10$d2K5ak87kQnwO4Hl2HMz5uarhQ5b4RN6sftXCHydDJRh1hQIjHIL6', 'user', NULL, '2026-04-06 11:55:20', 0, NULL, NULL),
(8, 'Emery Admin', 'emery@gmail.com', '$2y$10$5bmuhJZNDZoU1lGFShaASO7irkRzyhaGsktQrUvLkjGFi0a1JrnJ.', 'admin', 'http://localhost/brigdetocollege/backend/uploads/profiles/admin_8_1775578203.png', '2026-04-07 11:13:57', 0, NULL, NULL),
(9, 'ce', 'ce@gmail.com', '$2y$10$6WJmPHEsKmbOit8WgisxBulcOHs7TnXdEXJcVrYI/t0Ui6VtJ6RQu', 'user', NULL, '2026-04-07 12:31:50', 0, NULL, NULL),
(10, 'Nibishaka Cedrick', 'ccedrickrwa@gmail.com', '$2y$10$vfZzZofoN6au9J2FiEySROgynykKqov7H5rcy7gLpcbbW6C6goluC', 'user', NULL, '2026-04-07 12:44:28', 0, NULL, NULL),
(11, 'test2', 'test2@gmail.com', '$2y$10$6PGrIDhKB9erNmLIuZyGUetB1UjD19RMwYxLHQCtjk9iG886WlATC', 'user', NULL, '2026-04-09 13:19:42', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_stats`
--
ALTER TABLE `site_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `universities`
--
ALTER TABLE `universities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `site_stats`
--
ALTER TABLE `site_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `universities`
--
ALTER TABLE `universities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
