<?php
// test_email.php
echo "<h2>🔧 Test de configuration email</h2>";
echo "<div style='font-family: monospace; background: #f5f5f5; padding: 20px; border-radius: 5px;'>";

// 1. Vérifier la fonction mail()
echo "<h3>1. Fonction mail() disponible :</h3>";
if (function_exists('mail')) {
    echo "<span style='color: green;'>✓ OUI</span><br>";
} else {
    echo "<span style='color: red;'>✗ NON</span><br>";
}

// 2. Vérifier la configuration
echo "<h3>2. Configuration PHP mail :</h3>";
$configs = [
    'sendmail_path' => ini_get('sendmail_path'),
    'SMTP' => ini_get('SMTP'),
    'smtp_port' => ini_get('smtp_port'),
    'mail.add_x_header' => ini_get('mail.add_x_header'),
    'mail.log' => ini_get('mail.log')
];

foreach ($configs as $key => $value) {
    echo "<strong>$key</strong>: " . ($value ?: '<em>non défini</em>') . "<br>";
}

// 3. Tester l'envoi
echo "<h3>3. Test d'envoi :</h3>";
$test_to = "chloe.larcherhachez@yahoo.com";
$test_subject = "Test configuration - " . date('H:i:s');
$test_message = "Ceci est un test de configuration.";
$test_headers = "From: test@portfolio.com\r\n";

if (mail($test_to, $test_subject, $test_message, $test_headers)) {
    echo "<span style='color: green;'>✓ Email de test envoyé</span><br>";
    echo "Vérifiez votre boîte mail (y compris spam)<br>";
} else {
    echo "<span style='color: red;'>✗ Échec de l'envoi</span><br>";
    echo "<pre>Dernière erreur: " . print_r(error_get_last(), true) . "</pre>";
}

// 4. Vérifier les permissions
echo "<h3>4. Permissions et logs :</h3>";
$log_file = __DIR__ . '/php_errors.log';
if (file_exists($log_file)) {
    echo "Fichier de log trouvé: " . $log_file . "<br>";
    echo "Taille: " . filesize($log_file) . " octets<br>";
} else {
    echo "Création du fichier de log...<br>";
    file_put_contents($log_file, "[" . date('Y-m-d H:i:s') . "] Log créé\n");
}

echo "</div>";

// Lien pour tester directement
echo "<br><br>";
echo "<a href='sendmail.php?test=1' style='padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;'>Tester sendmail.php directement</a>";
?>