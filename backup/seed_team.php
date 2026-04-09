<?php
require_once 'db.php';

try {
    $team = [
        [
            'full_name' => 'Emery TWAJAMAHORO',
            'role' => 'Founder & Lead Counselor',
            'description' => 'Experienced educational counselor dedicated to helping students achieve their academic dreams',
            'phone' => '+250 791 799 081',
            'tags' => 'Leadership, Strategy'
        ],
        [
            'full_name' => 'Jean D\'Amour UWAMBAYIKIREZI',
            'role' => 'Rwanda Applications Specialist',
            'description' => 'Local university expert with deep knowledge of Rwandan higher education system',
            'phone' => '+250 789 190 060',
            'tags' => 'Local Universities, Scholarships'
        ],
        [
            'full_name' => 'Jean Pierre NKUNDAMAHORO',
            'role' => 'Interview Coach',
            'description' => 'Expert in interview preparation and communication skills development',
            'phone' => '+250 781 460 960',
            'tags' => 'Interview Prep, Communication'
        ]
    ];

    foreach ($team as $member) {
        $stmt = $pdo->prepare("REPLACE INTO staff (full_name, role, description, phone, tags) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$member['full_name'], $member['role'], $member['description'], $member['phone'], $member['tags']]);
    }

    echo "Team seed completed successfully!";
} catch (PDOException $e) {
    die("Seed failed: " . $e->getMessage());
}
?>
