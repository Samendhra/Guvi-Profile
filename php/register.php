<?php
require '../vendor/autoload.php';

// Retrieve form data from POST request
$email = $_POST['email'];
$user_pass = $_POST['password'];
$contactNumber = $_POST['contactNumber'];
$gender = $_POST['gender'];
$address = $_POST['address'];
$dob = $_POST['dob'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

// Database connection parameters for MySQL
$mysqlServername = "localhost";
$mysqlUsername = "root";
$mysqlPassword = ""; // Provide your MySQL password here
$mysqlDbname = "user_details";

// Create MySQL connection
$mysqlConn = new mysqli($mysqlServername, $mysqlUsername, $mysqlPassword, $mysqlDbname);

// Check MySQL connection
if ($mysqlConn->connect_error) {
    die("MySQL Connection failed: " . $mysqlConn->connect_error);
}

// Prepare and bind SQL statement to insert data into the MySQL database
$mysqlSql = "INSERT INTO users (email, password) VALUES (?, ?)";
$mysqlStmt = $mysqlConn->prepare($mysqlSql);
$mysqlStmt->bind_param("ss", $email, $user_pass);

// Execute the prepared MySQL statement
if ($mysqlStmt->execute() === TRUE) {
    $mysqlSuccess = true;
} else {
    $mysqlSuccess = false;
    echo "Error: " . $mysqlSql . "<br>" . $mysqlConn->error;
}

// Close MySQL statement and connection
$mysqlStmt->close();
$mysqlConn->close();

// MongoDB connection
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$collection = $mongoClient->user_registration_details->user_profile_details;

// Data to insert into MongoDB
$userData = [
    'firstName' => $firstName,
    'lastName' => $lastName,
    'email'=> $email,
    'password'=> $user_pass,
    'contactNumber' => $contactNumber,
    'gender' => $gender,
    'address' => $address,
    'dob' => $dob
];

// Insert data into MongoDB collection
$result = $collection->insertOne($userData);

if ($result->getInsertedCount() === 1) {
    $mongodbSuccess = true;
} else {
    $mongodbSuccess = false;
    echo "Error: Data insertion failed for MongoDB.";
}

// Response messages
$response_mysql = $mysqlSuccess ? "Email and password inserted into MySQL successfully.\n" : "";
$response_mongodb = $mongodbSuccess ? "Data inserted into MongoDB collection successfully." : "";

// Output response
echo $response_mysql;
echo $response_mongodb;

?>
