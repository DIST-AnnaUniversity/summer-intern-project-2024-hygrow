#include <Wire.h>
#include <LiquidCrystal_PCF8574.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "ESPAsyncWebServer.h"
#include <WiFiClient.h>
#include <DHT.h> // Include the DHT library

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_PCF8574 lcd(0x27);
AsyncWebServer server(80);

#define SERVER_URL "http://192.168.83.41:5000/mldata"
// Define DHT sensor type and pin
#define DHTPIN 23 // Pin where the DHT22 is connected
#define DHTTYPE DHT22 // DHT 22 (AM2302)

DHT dht(DHTPIN, DHTTYPE); // Initialize DHT sensor

int sensor_pin = 33; // Soil moisture sensor pin (Analog pin on ESP32)
int relay_pin = 4;  // Example pin for relay control on ESP32

float temperature=0;
float humidity=0;

char ssid[] = "Arpu";              // WiFi SSID
char pass[] = "arpu$sv29e_52k4";          // WiFi Password
//char ssid[]="AirFiber";
//char pass[]="20042009";

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, pass);
 
   while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println(WiFi.localIP());
  lcd.begin(16, 2);     // Initialize the LCD with 16 columns and 2 rows
  lcd.setBacklight(255); // Adjust backlight brightness (0-255)
  lcd.home();            // Move cursor to top-left corner
  dht.begin();           // Initialize DHT sensor


  pinMode(sensor_pin, INPUT);
  pinMode(relay_pin, OUTPUT);

//Motor off
  server.on("/relay/off", HTTP_GET   , [](AsyncWebServerRequest *request){
    digitalWrite(relay_pin, HIGH);

    // send response back to client
    Serial.print("AsyncWebServerRequest from client with IP: ");
    Serial.println(request->client()->remoteIP());
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "Motor OFF");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);

  });

//Motor on
   server.on("/relay/on", HTTP_GET, [](AsyncWebServerRequest *request){    
    digitalWrite(relay_pin, LOW);
    Serial.print("AsyncWebServerRequest from client with IP: ");
    Serial.println(request->client()->remoteIP());
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "Motor On");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
   // request->send(200, "text/plain","Motor ON");
  });

  //Temperature
  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request){ 
    String str1;
    str1 = String(temperature);  

    Serial.print("AsyncWebServerRequest from client with IP: ");
    Serial.println(request->client()->remoteIP());
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", str1);
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  //Humidity
  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest *request){ 
    String str2;
    str2 = String(humidity);  

    Serial.print("AsyncWebServerRequest from client with IP: ");
    Serial.println(request->client()->remoteIP());
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", str2);
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  server.begin();
}

void loop() {

  // Read soil moisture sensor
  int soil_moisture = analogRead(sensor_pin);
  // Read temperature and humidity from DHT sensor
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();

  // Check if any reads failed
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("H:");
    Serial.print(humidity);
    Serial.print(" %\t");
    Serial.print("T:");
    Serial.print(temperature);
    Serial.println(" °C");
  }
// Display sensor data on LCD
  lcd.clear(); // Clear LCD display
  lcd.setCursor(0, 0);
  lcd.print("H:");
  lcd.print(humidity);
  lcd.print("%");

  lcd.setCursor(8, 0);
  lcd.print("T:");
  lcd.print(temperature);
  lcd.print("C");

  // Control relay based on soil moisture
  if (soil_moisture > 950) {
    Serial.println("No moisture, Soil is dry");
    //digitalWrite(relay_pin, LOW);
    lcd.setCursor(0, 1);
    lcd.print("Soil Dry");
    lcd.setCursor(9, 1);
    lcd.print("MotorON");
 
  } else if (soil_moisture >= 400 && soil_moisture <= 950) {
    Serial.println("There is some moisture, Soil is wet");
    //digitalWrite(relay_pin, HIGH);
    lcd.setCursor(12, 1);
    lcd.print("Motor OFF");

  } else if (soil_moisture < 400) {
    Serial.println("Soil is wet");
    //digitalWrite(relay_pin, HIGH);
    lcd.setCursor(12, 1);
    lcd.print("Motor OFF");
  }

  static unsigned long lastRequestTime = 0;
  unsigned long currentTime = millis();
  
  if (currentTime - lastRequestTime >= 10000) {
    lastRequestTime = currentTime;

    if (WiFi.status()==WL_CONNECTED){
      Serial.println("connecting to server...");
      HTTPClient http;
      http.begin(SERVER_URL);
      
      http.addHeader("Content-Type","application/json");
      String postData="{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "}";

      int httpResponseCode=http.POST(postData);
      if (httpResponseCode > 0){
        String response=http.getString();
        Serial.println(response);
      }
      else{
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
  }
  delay(2000); // Adjust delay as needed
}
