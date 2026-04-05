<?php
require_once 'db.php';

try {
    // 1. Seed Testimonials (Extract from photo)
    $testimonials = [
        [
            'name' => 'Alice Mutoni',
            'location' => 'Kigali, Rwanda',
            'university' => 'University of Richmond',
            'content' => 'Never thought I would get into a top-tier University... Bridge to College helped me find schools that were a great fit. Throughout the Application process, they were really supportive and helped me find my dream scholarship.',
            'rating' => 5,
            'year' => '2023',
            'is_featured' => 1
        ],
        [
            'name' => 'Jean Baptiste',
            'location' => 'Kigali, Rwanda',
            'university' => 'Bentley University',
            'content' => 'The team at Bridge to College didn\'t just help me with applications - they believed in me. With their help, I improved my writing, polished my application, and now I\'m studying project management at Bentley University with a Full Scholarship!',
            'rating' => 5,
            'year' => '2023',
            'is_featured' => 1
        ],
        [
            'name' => 'Mark Taylor',
            'university' => 'University of Washington',
            'content' => 'The training helped me a lot. They explored things that I never thought would be useful throughout my application process.',
            'rating' => 5,
            'year' => '2023',
            'is_featured' => 0
        ],
        [
            'name' => 'Sarah Mutoni',
            'university' => 'University of Rwanda',
            'content' => 'I was complicated with calculations but Success Stories helped me understand everything accurately.',
            'rating' => 5,
            'year' => '2022',
            'is_featured' => 0
        ],
        [
            'name' => 'David Kalisa',
            'university' => 'MIT',
            'content' => 'The intensive preparation helped me get where I am today. Don\'t hesitate to join Bridge to College.',
            'rating' => 5,
            'year' => '2023',
            'is_featured' => 0
        ],
        [
            'name' => 'Ann Johnson',
            'university' => 'Stanford University',
            'content' => 'They helped me find schools that I didn\'t know existed before. It was a life changing experience.',
            'rating' => 5,
            'year' => '2023',
            'is_featured' => 0
        ],
        [
            'name' => 'Blaise Niyomubona',
            'university' => 'Michigan State University',
            'content' => 'Professional, caring, and incredibly knowledgeable. They made my dream of studying abroad a reality.',
            'rating' => 5,
            'year' => '2023',
            'is_featured' => 0
        ],
        [
            'name' => 'Sandra Umurerwa',
            'university' => 'Yale University',
            'content' => 'The personalised attention and support they gave me throughout the entire process was exceptional. Highly recommend!',
            'rating' => 5,
            'year' => '2021',
            'is_featured' => 0
        ]
    ];

    foreach ($testimonials as $t) {
        $stmt = $pdo->prepare("REPLACE INTO testimonials (name, location, university, content, rating, year, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$t['name'], $t['location'] ?? null, $t['university'], $t['content'], $t['rating'], $t['year'], $t['is_featured']]);
    }

    // 2. Seed Universities
    $unis = [
        'University of Pennsylvania', 'Duke University', 'Yale University', 
        'Michigan State University', 'NYU', 'University of Rwanda', 
        'MIT', 'Harvard University', 'McGill University', 
        'Stanford University', 'Columbia University', 'Bentley University'
    ];

    foreach ($unis as $uni) {
        $stmt = $pdo->prepare("REPLACE INTO universities (name) VALUES (?)");
        $stmt->execute([$uni]);
    }

    echo "Seed completed successfully!";
} catch (PDOException $e) {
    die("Seed failed: " . $e->getMessage());
}
?>
