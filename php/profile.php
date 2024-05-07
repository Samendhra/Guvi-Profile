<?php
// Start session
session_start();

// Include MongoDB library
require '../vendor/autoload.php';

// Include Redis library
require '../predis-2.x/autoload.php';

// Database configuration for MongoDB
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");

// Select the database and collection
$collection = $mongoClient->user_registration_details->user_profile_details;

// Connect to Redis server
$redis = new Predis\Client(array(
    'scheme' => 'tcp',
    'host'   => '127.0.0.1',
    'port'   => 6379,
));

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if email and password are set and not empty
    if (isset($_POST["email"]) && isset($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["password"])) {
        // Retrieve email and password from the POST data
        $email = $_POST["email"];
        $password = $_POST["password"];
        $sessionId = $_POST["sessionId"]; // Get the current session ID
        $loggedIn = $_POST["loggedIn"]; // Assuming the user is logged in after successful login 

        // Store email and session ID in Redis
        $redis->hmset('user:'.$sessionId, array(
            'email' => $email,
            'sessionId' => $sessionId,
            'loggedIn' => $loggedIn
        ));

        // Search for user with given email and password
        $user = $collection->findOne(['email' => $email, 'password' => $password]);

        if ($user) {
            // User found, store user details in session
            $_SESSION['userDetails'] = $user;

            // Return user details as JSON
            header('Content-Type: application/json');
            echo json_encode($user);
        } else {
            // No matching user found
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Invalid email or password']);
        }
    } else {
        // Email or password is missing or empty
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Email or password is missing or empty']);
    }
} else {
    // Not a POST request
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request method']);
}
?>
