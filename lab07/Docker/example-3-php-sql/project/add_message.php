<?php

if (!isset($_POST['message'])) {
    header("Location: index.php");
    exit;
}

$host_url = "database";
$username = "test";
$password = "test";
$database = "test";
$port = 3306;

$conn = mysqli_connect($host_url, $username, $password, $database, $port);

if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    header("Location: index.php");
    exit;
}

$query = "INSERT INTO messages values (?);";
$statement = $conn->prepare($query);
$statement->bind_param('s', $_POST['message']);
if (!$statement->execute()) {
    echo "Query failed.";
}

header("Refresh:0; url=index.php");
?>
