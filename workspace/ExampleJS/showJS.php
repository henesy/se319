<?php
include_once('showJavascript.php'); 

echo '<div style="font-size:20px;">';
print format_javascript(file_get_contents($_GET["name"]));
echo '</div>';

?>
