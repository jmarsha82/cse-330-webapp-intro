<?php
include 'util.php';
require 'database.php';

$name = POST('name');
$email = POST('email');
$age = POST('age');
$description = POST('description');
$filename = $_FILES['picture']['name'];

if(is_null($name) || is_null($email) || is_null($age)  || is_null($description) || is_null($filename)) {
    echo "Requires all fields!";
    exit;
}

$age = (int) $age;
$filename = htmlentities(basename($filename));

$full_path = sprintf("uploads/%s",$filename);
if(!move_uploaded_file($_FILES['picture']['tmp_name'], $full_path) ){
    echo "Fail to move the file.";
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO users (email, name, filename, age, description) VALUES (?, ?, ?, ?, ?)");

if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('sssds', $email, $name, $filename, $age, $description);
$stmt->execute();
$stmt->close();

header("Location: show-users.php");
exit;

?>