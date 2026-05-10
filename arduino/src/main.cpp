#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  delay(2000); // Petit délai pour laisser le temps au simulateur de se connecter
  Serial.println("Connexion etablie !");
  pinMode(2, OUTPUT);
}

void loop() {
  Serial.println("Hello, World!");
  delay(1000);
  digitalWrite(2, HIGH);
  Serial.println("LED ON");
  delay(500);
  digitalWrite(2, LOW);
  Serial.println("LED OFF");
  delay(500);
}