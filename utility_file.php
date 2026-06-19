<?php 

// ensures the page uses a secure connection
$https_server = filter_input(INPUT_SERVER, 'HTTPS');
if(!$https_server) {
    $host = filter_input(INPUT_SERVER, 'HTTP_HOST');
    $url = filter_input(INPUT_SERVER, 'REQUEST_URI');
    $url = 'https://' . $host . $url;
    header("Location: " . $url);
    exit();
}

?>