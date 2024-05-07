<?php
// Include Redis library
require '../predis-2.x/autoload.php';

// Connect to Redis server
$redis = new Predis\Client(array(
    'scheme' => 'tcp',
    'host'   => '127.0.0.1',
    'port'   => 6379,
));

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if session ID is set and not empty
    if (isset($_POST["sessionId"]) && !empty($_POST["sessionId"])) {
        // Retrieve session ID from the POST data
        $sessionId = $_POST["sessionId"];

        // Remove session data from Redis
        $redis->del('user:'.$sessionId);

        // Return success response
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } else {
        // Session ID is missing or empty
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Session ID is missing or empty']);
    }
} else {
    // Not a POST request
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request method']);
}
?>
