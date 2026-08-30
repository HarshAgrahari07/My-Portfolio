/*
  Smart Water Level Monitoring System
  ------------------------------------
  Author: Harsh Kumar
  Year: 2025

  Description:
  Monitors water level in a tank using a water level sensor.
  Displays the live water level as a percentage on a 16x2 LCD along
  with a status message (Normal / Low / Alert), lights up LEDs for
  Low / Medium / Full levels, and sounds a buzzer when the tank is
  full — helping prevent overflow and unnecessary water wastage.

  Components used:
  - Arduino Uno
  - Water Level Sensor Module
  - 16x2 LCD Display (with I2C module)
  - 3x LED (Red, Yellow, Green)
  - Buzzer
  - Resistors, jumper wires, breadboard
*/

#include <LiquidCrystal_I2C.h>
#include <Wire.h>

// LCD setup (I2C address 0x27, 16 columns, 2 rows)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Pin definitions
const int sensorPin = A0;   // Water level sensor analog output
const int redLED    = 8;    // Low water level
const int yellowLED = 9;    // Medium water level
const int greenLED  = 10;   // Full water level
const int buzzerPin = 7;

// Calibration: raw analog readings at empty and full tank
// (adjust these two values based on your own sensor readings)
const int emptyReading = 0;
const int fullReading  = 900;

void setup() {
  Serial.begin(9600);

  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(buzzerPin, OUTPUT);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Smart Water");
  lcd.setCursor(0, 1);
  lcd.print("Level Monitor");
  delay(2000);
  lcd.clear();
}

void loop() {
  int rawValue = analogRead(sensorPin);
  Serial.print("Raw Value: ");
  Serial.println(rawValue);

  // Convert raw sensor reading to a 0-100% water level
  int percent = map(rawValue, emptyReading, fullReading, 0, 100);
  percent = constrain(percent, 0, 100);

  // Reset outputs
  digitalWrite(redLED, LOW);
  digitalWrite(yellowLED, LOW);
  digitalWrite(greenLED, LOW);
  digitalWrite(buzzerPin, LOW);

  String status;
  if (percent < 30) {
    digitalWrite(redLED, HIGH);
    status = "Low";
  }
  else if (percent < 90) {
    digitalWrite(yellowLED, HIGH);
    status = "Normal";
  }
  else {
    digitalWrite(greenLED, HIGH);
    digitalWrite(buzzerPin, HIGH);
    status = "Alert!";
  }

  lcd.setCursor(0, 0);
  lcd.print("Water Level: ");
  lcd.print(percent);
  lcd.print("% ");

  lcd.setCursor(0, 1);
  lcd.print("Status: ");
  lcd.print(status);
  lcd.print("    ");

  delay(1000);
}
