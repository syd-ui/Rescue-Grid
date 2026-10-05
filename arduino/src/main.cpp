#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";
 
const char* serverUrl = "http://host.wokwi.internal:3000";
const int ledPin = 2; // Pin de la LED intégrée

void setup() {
    Serial.begin(115200);
    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, HIGH); // Allume la LED pour indiquer que le setup est en cours

    Serial.println("TENTATIVE DE CONNEXION \n");
    
    // Connexion au WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connexion au WiFi...");
    
    int tentative = 0;
    while (WiFi.status() != WL_CONNECTED && tentative < 20) {
        delay(500);
        Serial.print(".");
        tentative++;
    }
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("\nÉchec de connexion Wi-Fi après 10s");
    }
    
    digitalWrite(ledPin, LOW); // Éteint la LED pour indiquer que la connexion est réussie
    Serial.println("\nConnecté !");
}

void loop() {

    static unsigned long lastPrint = 0;
    static int compteur = 0;

    if (millis() - lastPrint >= 1000) {
        lastPrint = millis();
        compteur++;
        Serial.print("Test serial print #");
        Serial.println(compteur);
    }


    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;

        // Début de la requête
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        // Préparation du message JSON
        String httpRequestData = "{\"message\": \"Bonjour du Rescue Grid !\"}";

        // Envoi de la requête POST
        int httpResponseCode = http.POST(httpRequestData);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.print("Code de réponse : ");
            Serial.println(httpResponseCode);
            Serial.print("Réponse du serveur : ");
            Serial.println(response);
        } else {
            Serial.print("Erreur lors de l'envoi : ");
            Serial.println(httpResponseCode);
        }

        http.end(); // Libération des ressources
    }

    delay(10000); // Attendre 10 secondes avant le prochain "Bonjour"
}