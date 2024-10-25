"""
Created on Sat Aug  3 10:35:18 2024

@author: Arpudha
"""

import logging
from flask import Flask, request, jsonify
import mysql.connector
 
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

db = mysql.connector.connect(
     host="localhost",
     user="Arpudha",
     password="Arpu_1234",
     database="sensor_data"
)
cursor=db.cursor()
 
@app.post('/mldata')
def receive_data():
    app.logger.info("Data Received")
    data = request.get_json()
    if data:
        temperature = data['temperature']
        humidity = data['humidity']
        query="INSERT INTO temperature_humidity (temperature, humidity) VALUES (%s, %s)"
        values= (temperature, humidity)
        cursor.execute(query, values)
        db.commit()
        app.logger.info(f"Temperature: {temperature}, Humidity: {humidity}")
        return jsonify({"status": "success"}), 200
    return jsonify({"status": "failure"}), 400
 
if __name__ == '__main__':
    app.logger.info("Server started")
    app.run(host="192.168.83.41")
