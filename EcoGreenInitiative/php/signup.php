<?php
// Database configuration
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_db_name";

// Create connection
$conn = new mysqli($servername, $username, $Password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$form_username = $_POST['username'];
$form_password = $_POST['password'];

// Hash the password
$hashed_password = password_hash($form_password, PASSWORD_DEFAULT);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (username, Password) VALUES (?, ?)");
$stmt->bind_param("ss", $form_username, $hashed_password);

if ($stmt->execute()) {
    echo "Sign-up successful!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();

