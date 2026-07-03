<?php

$dbHost = getenv('MATCHMAKER_DB_HOST') ?: 'localhost';
$dbUser = getenv('MATCHMAKER_DB_USER') ?: 'root';
$dbPassword = getenv('MATCHMAKER_DB_PASSWORD') ?: '';
$dbName = getenv('MATCHMAKER_DB_NAME') ?: 'matchmaker';

$mysqli = new \mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if($mysqli->connect_errno) {
    printf("Connection Failed: %s\n", $mysqli->connect_error);
    exit;
}

?>
