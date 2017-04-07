<?php
$host_url = "database";
$username = "test";
$password = "test";
$database = "test";
$port = 3306;

$conn = mysqli_connect($host_url, $username, $password, $database, $port);

if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "It's possible the mysql database is still starting up. Check your logs.";
    exit;
}

$query = "SELECT * FROM messages;";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo "Looks like the database isn't initialized yet." . PHP_EOL;
    echo "Go to <pre>/reset_db.pyp</pre> to initialize the database.";
    exit;
}
?>

<!doctype html>
<html>
  <head>
    <title>PHP webserver using SQL database</title>
  </head>
  <body>
    <h1>Messages in the database</h1>
    <div>
      <?php
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            echo $row['id'] . " " . $row['message'];
            echo "<br />";
        }
      ?>
    </div>
    <h1>Add new messages</h1>
    <form action="add_message.php" method="post">
      Message: <input type="text" name="message"><br>
      <input type="submit">
    </form>
  </body>
</html>

<?php
mysqli_close($conn);
?>
