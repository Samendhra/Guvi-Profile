<?php
// Database configuration
$servername = "localhost";
$username = "root";
$database_password = "";
$dbname = "user_details";

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if email and password are set and not empty
    if (isset($_POST["email"]) && isset($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["password"])) {
        // Retrieve email and password from the POST data
        $email1 = $_POST["email"];
        $password1 = $_POST["password"];

        try {
            // Create a new PDO instance
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $database_password);
            
            // Set the PDO error mode to exception
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Prepare SQL statement to select user with given email and password
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND password = :password");
            $stmt->bindParam(':email', $email1);
            $stmt->bindParam(':password', $password1);
            $stmt->execute();
            
            // Check if a row was returned
            if ($stmt->rowCount() == 1) {
                // User exists, redirect to profile.html
                    echo "success";
                    exit();
            } else {
                // No matching user found
                echo "Invalid email or password.";
            }
        } catch(PDOException $e) {
            // Error handling
            echo "Connection failed: " . $e->getMessage();
        }

        // Close the database connection
        $pdo = null;
    } else {
        // Email or password is missing or empty
        echo "Email or password is missing or empty.";
    }
} else {
    // Not a POST request
    echo "Invalid request method.";
}
?>
