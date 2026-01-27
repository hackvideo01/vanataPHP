<?php
/**
 * VANATA Co.,Ltd - Contact Form Handler
 * Author: Nguyễn Lực
 * Created: January 28, 2026
 * © 2026 VANATA Co.,Ltd
 */

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require __DIR__ . '/mail/sendmail.php';

    header('Location: ./?cate=thankyou');
    exit;
}

// GET: chỉ hiển thị form
include __DIR__ . '/views/contact.html';
