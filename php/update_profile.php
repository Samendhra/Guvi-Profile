<?php

require '../vendor/autoload.php';

// Start session
session_start();

// Check if any required field is missing in the request
$requiredFields = ['updatedValues', 'sessionEmail', 'sessionPassword'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field])) {
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is missing in the request.']);
        exit;
    }
}

// Retrieve form data from POST request
$updatedValues = $_POST['updatedValues'];
$session_email = $_POST['sessionEmail'];
$session_password = $_POST['sessionPassword'];

// Extract individual updated values
$email = $updatedValues['email'];
$user_pass = $updatedValues['password'];
$contactNumber = $updatedValues['contactNumber'];
$gender = $updatedValues['gender'];
$address = $updatedValues['address'];
$dob = $updatedValues['dob'];
$firstName = $updatedValues['firstName'];
$lastName = $updatedValues['lastName'];

// MongoDB connection
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");
$collection = $mongoClient->user_registration_details->user_profile_details;

// Prepare filter to identify the document to update
$filter = [
    'email' => $session_email,
    'password' => $session_password
];

// Prepare update data
$updateData = [
    '$set' => [
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'password' => $user_pass,
        'contactNumber' => $contactNumber,
        'gender' => $gender,
        'address' => $address,
        'dob' => $dob
    ]
];

// Update data in MongoDB collection
$updateResult = $collection->updateOne($filter, $updateData);

// Check if update was successful
if ($updateResult->getModifiedCount() > 0) {
    // Return success message
    echo json_encode(['success' => true, 'message' => 'User information updated successfully.']);
} else {
    // Return error message if update failed
    echo json_encode(['success' => false, 'message' => 'Failed to update user information.']);
}

?>
