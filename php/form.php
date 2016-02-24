<?php

    $name = $_GET['name'];
    $email = $_GET['email'];
    $check = $_GET['check'];
    $language = $_GET['language'];

    if ($_GET['application'] == true) {

        echo $email;

    }

    if ($_GET['discount'] == true) {

        echo $name, $email, json_encode($language);

    }

    if ($_GET['registry'] == true) {

        echo $name, $email, $check;

    }

    exit;
?>

