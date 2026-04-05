<?php
require_once 'db.php';

try {
    // 1. Stats (Corrected to 330K)
    $stats = [
        ['label' => 'students assisted', 'value' => '100 +', 'icon' => 'Users'],
        ['label' => 'acceptance rate', 'value' => '95%', 'icon' => 'CheckCircle'],
        ['label' => 'scholarships secured', 'value' => '330K +', 'icon' => 'DollarSign'],
        ['label' => 'universities', 'value' => '11+', 'icon' => 'GraduationCap']
    ];

    foreach ($stats as $idx => $s) {
        $stmt = $pdo->prepare("REPLACE INTO site_stats (id, label, value, icon) VALUES (?, ?, ?, ?)");
        $stmt->execute([$idx + 1, $s['label'], $s['value'], $s['icon']]);
    }

    // 2. Testimonials
    $testimonials = [
        [
            'id' => 1,
            'name' => 'Alice Mutoni',
            'location' => 'Kigali, Rwanda',
            'university' => 'University of Richmond',
            'content' => 'Never thought I would get into a top-tier University, but Bridge to College helped me find schools that were a great fit. Throughout the Application process, they were really supportive and helped me find my dream scholarship.',
            'rating' => 5, 'year' => '2023', 'is_featured' => 1
        ],
        [
            'id' => 2,
            'name' => 'Jean Baptiste',
            'location' => 'Kigali, Rwanda',
            'university' => 'Bentley University',
            'content' => 'The team at Bridge to College didn\'t just help me with applications - they believed in me. With their help, I improved my writing, polished my application, and now I\'m studying project management at Bentley University with a Full Scholarship!',
            'rating' => 5, 'year' => '2023', 'is_featured' => 1
        ],
        [
            'id' => 3,
            'name' => 'Mark Taylor',
            'university' => 'University of Washington',
            'content' => 'The training helped me a lot. They explored things that I never thought would be useful throughout my application process.',
            'rating' => 5, 'year' => '2023', 'is_featured' => 0
        ],
        [
            'id' => 4,
            'name' => 'Sarah Mutoni',
            'university' => 'University of Rwanda',
            'content' => 'I was complicated with calculations but Success Stories helped me understand everything accurately.',
            'rating' => 5, 'year' => '2022', 'is_featured' => 0
        ],
        [
            'id' => 5,
            'name' => 'David Kalisa',
            'university' => 'MIT',
            'content' => 'The intensive preparation helped me get where I am today. Don\'t hesitate to join Bridge to College.',
            'rating' => 5, 'year' => '2023', 'is_featured' => 0
        ],
        [
            'id' => 6,
            'name' => 'Ann Johnson',
            'university' => 'Stanford University',
            'content' => 'They helped me find schools that I didn\'t know existed before. It was a life changing experience.',
            'rating' => 5, 'year' => '2023', 'is_featured' => 0
        ],
        [
            'id' => 7,
            'name' => 'Blaise Niyomubona',
            'university' => 'Michigan State University',
            'content' => 'Professional, caring, and incredibly knowledgeable. They made my dream of studying abroad a reality.',
            'rating' => 5, 'year' => '2023', 'is_featured' => 0
        ],
        [
            'id' => 8,
            'name' => 'Sandra Umurerwa',
            'university' => 'Yale University',
            'content' => 'The personalised attention and support they gave me throughout the entire process was exceptional. Highly recommend!',
            'rating' => 5, 'year' => '2021', 'is_featured' => 0
        ],
        [
            'id' => 9,
            'name' => 'Lisa W.',
            'university' => 'Harvard University',
            'content' => 'The support and guidance I received was beyond my expectations. I am now at my dream school.',
            'rating' => 5, 'year' => '2023', 'is_featured' => 0
        ]
    ];

    foreach ($testimonials as $t) {
        $stmt = $pdo->prepare("REPLACE INTO testimonials (id, name, location, university, content, rating, year, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$t['id'], $t['name'], $t['location'] ?? null, $t['university'], $t['content'], $t['rating'], $t['year'], $t['is_featured']]);
    }

    // 3. Universities
    $unis = [
        'University of Pennsylvania', 'Duke University', 'Yale University', 
        'Michigan State', 'NYU', 'University of Rwanda', 
        'MIT', 'UOT', 'Harvard University', 'McGill University', 
        'Stanford', 'Columbia University', 'Bentley University', 
        'University of Toronto', 'All-inclusive'
    ];

    foreach ($unis as $idx => $uni) {
        $stmt = $pdo->prepare("REPLACE INTO universities (id, name) VALUES (?, ?)");
        $stmt->execute([$idx + 1, $uni]);
    }

    echo "Full seed completed successfully!";
} catch (PDOException $e) {
    die("Seed failed: " . $e->getMessage());
}
?>
