<?php
$client_id = "1000.2NG209AZQ63738IDR79FN4H62NQQHZ";
$client_secret = "dc131a2c34d7fd81a3afcac9c3cf9a7fe621166fa5";
$redirect_uri = "https://my.hillcollege.org/meeting/oauth_callback.php";

if (!isset($_GET['code'])) {
    echo "Authorization code not found.";
    exit;
}

$code = $_GET['code'];

$token_url = "https://accounts.zoho.com/oauth/v2/token";

$data = http_build_query([
    "grant_type" => "authorization_code",
    "client_id" => $client_id,
    "client_secret" => $client_secret,
    "redirect_uri" => $redirect_uri,
    "code" => $code
]);

$options = [
    'http' => [
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => $data,
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($token_url, false, $context);
$result = json_decode($response, true);

if (isset($result['access_token'])) {
    $access_token = $result['access_token'];

    // Fetch user info
    $opts = [
        "http" => [
            "header" => "Authorization: Zoho-oauthtoken $access_token\r\n"
        ]
    ];
    $context = stream_context_create($opts);
    $user_info = file_get_contents("https://accounts.zoho.com/oauth/user/info", false, $context);
    $user = json_decode($user_info, true);

    // Display user info or redirect
    echo "<h2>Welcome, " . htmlspecialchars($user['data']['Display_Name']) . "!</h2>";
    echo "<p>Email: " . htmlspecialchars($user['data']['Email']) . "</p>";

    // You can now redirect to their personal meeting page
    // header("Location: meeting_dashboard.php?user=" . urlencode($user['data']['Email']));
} else {
    echo "Failed to retrieve access token.";
    print_r($result);
}
?>
