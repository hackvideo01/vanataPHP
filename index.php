<?php
/**
 * VANATA Co.,Ltd Website - Main Router
 * Author: Nguyễn Lực
 * Created: January 28, 2026
 * Version: 1.1
 * © 2026 VANATA Co.,Ltd
 */

    if (isset($_REQUEST['cate'])) {
        $cate = htmlspecialchars($_REQUEST['cate']);
    } else {
        $cate = '';
    }

    if ($cate == 'works') {
        require("./works.php");
        // require("./works.php");
    } elseif ($cate == 'company') {
        require("./company.php");
    } elseif ($cate == 'training') {
        require("./training.php");
    } elseif ($cate == 'cost') {
        require("./cost.php");
    } elseif ($cate == 'contact') {
        require("./contact.php");
    } elseif ($cate == 'sendmail') {
        require("./mail/sendmail.php");
    } elseif ($cate == 'thankyou') {
        include("./views/thankyou.html");
    } else {
        include("./views/index.html");
    }

?>
