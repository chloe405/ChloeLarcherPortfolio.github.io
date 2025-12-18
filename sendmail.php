<?php
// sendmail_simple.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Journalisation
    $log = "[" . date('Y-m-d H:i:s') . "] " . $_SERVER['REMOTE_ADDR'] . "\n";
    $log .= "Nom: " . $_POST['name'] . "\n";
    $log .= "Email: " . $_POST['email'] . "\n";
    $log .= "Message: " . $_POST['message'] . "\n\n";

    file_put_contents('contact_log.txt', $log, FILE_APPEND);

    // Préparation de l'email
    $to = "chloe.larcherhachez@yahoo.com";
    $subject = "Message portfolio: " . $_POST['name'];
    $message = "Nom: " . $_POST['name'] . "\n";
    $message .= "Email: " . $_POST['email'] . "\n";
    $message .= "Message:\n" . $_POST['message'] . "\n";
    $headers = "From: " . $_POST['email'] . "\r\n";

    // Envoi
    if (mail($to, $subject, $message, $headers)) {
        echo "Message envoyé avec succès !";
    } else {
        echo "Erreur lors de l'envoi. Votre message a été sauvegardé.";
    }
    exit;
}
?>