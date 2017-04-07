<?php
$host_url = "database";
$username = "test";
$password = "test";
$database = "test";
$port = 3306;

error_log("Trying to initialize db.");
$conn = mysqli_connect($host_url, $username, $password, $database, $port);

if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$query = "DROP TABLE IF EXISTS messages;";
mysqli_query($conn, $query);

$query = "CREATE TABLE messages (message VARCHAR(255));";
mysqli_query($conn, $query);

$query = "INSERT INTO messages (message) VALUES ('hello world!');";
mysqli_query($conn, $query);

$query = "INSERT INTO messages (message) VALUES ('hi  world!');";
mysqli_query($conn, $query);

mysqli_close($conn);

echo "Database successfully initialized. You can return to the home page.";
error_log("Database successfully initialized.");

?>
