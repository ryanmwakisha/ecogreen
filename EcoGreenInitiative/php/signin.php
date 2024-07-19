<?php
session_start();

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

// Prepare and bind
$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $form_username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $username, $hashed_password);
    $stmt->fetch();
    if (password_verify($form_password, $hashed_password)) {
        // Password is correct
        $_SESSION['userid'] = $id;
        $_SESSION['username'] = $username;
        header("Location: ../index.html"); // Redirect to home page after successful sign-in
        exit();
    } else {
        // Invalid password
        echo "Invalid username or password";
    }
} else {
    // No user found
    echo "Invalid username or password";
}

$stmt->close();
$conn->close();

