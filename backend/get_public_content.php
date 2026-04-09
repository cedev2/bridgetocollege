<?php
require_once 'db.php';

try {
    // Fetch Stats
    $stmt = $pdo->query("SELECT * FROM site_stats");
    $stats = $stmt->fetchAll();

    // Fetch Featured Testimonials
    $stmt = $pdo->query("SELECT * FROM testimonials WHERE is_featured = 1 ORDER BY created_at DESC");
    $featured_testimonials = $stmt->fetchAll();

    // Fetch Regular Testimonials
    $stmt = $pdo->query("SELECT * FROM testimonials WHERE is_featured = 0 ORDER BY created_at DESC");
    $testimonials = $stmt->fetchAll();

    // Fetch Universities
    $stmt = $pdo->query("SELECT * FROM universities ORDER BY name ASC");
    $universities = $stmt->fetchAll();

    // Fetch Partners
    $stmt = $pdo->query("SELECT * FROM partners ORDER BY name ASC");
    $partners = $stmt->fetchAll();

    json_response([
        'stats' => $stats,
        'featured_testimonials' => $featured_testimonials,
        'testimonials' => $testimonials,
        'universities' => $universities,
        'partners' => $partners
    ]);

} catch (PDOException $e) {
    json_response(['error' => 'Failed to fetch content: ' . $e->getMessage()], 500);
}
?>
