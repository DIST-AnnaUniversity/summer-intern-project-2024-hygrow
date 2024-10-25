import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import mysql.connector
import matplotlib.pyplot as plt

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="Arpudha",
    password="Arpu_1234",
    database="sensor_data"
)
cursor = db.cursor()
cursor.execute("SELECT temperature, humidity, timestamp FROM temperature_humidity")
data = cursor.fetchall()

# Convert to DataFrame
df = pd.DataFrame(data, columns=['temperature', 'humidity', 'timestamp'])

# Preprocessing
df['temperature'] = df['temperature'].astype(float)
df['humidity'] = df['humidity'].astype(float)
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Feature and target variables
X = df[['temperature']]
y = df[['humidity']]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model training
model = LinearRegression()
model.fit(X_train, y_train)

# Model predictions for humidity
y_pred_humidity = model.predict(X_test)

# Model evaluation
score = model.score(X_test, y_test)
print(f"Model R^2 score for humidity: {score}")

# Model for temperature prediction based on humidity
model_temp = LinearRegression()
model_temp.fit(y_train.values.reshape(-1, 1), X_train)
y_pred_temperature = model_temp.predict(y_test.values.reshape(-1, 1))
score_temp = model_temp.score(y_test.values.reshape(-1, 1), X_test)
print(f"Model R^2 score for temperature: {score_temp}")

# Create a figure with multiple subplots
plt.figure(figsize=(12, 8))

# Histogram for temperature and humidity
plt.subplot(2, 3, 1)
plt.hist(df['temperature'], bins=20, color='red', edgecolor='black')
plt.title('Temperature Distribution')
plt.xlabel('Temperature (°C)')
plt.ylabel('Frequency')

plt.subplot(2, 3, 2)
plt.hist(df['humidity'], bins=20, color='skyblue', edgecolor='black')
plt.title('Humidity Distribution')
plt.xlabel('Humidity (%)')
plt.ylabel('Frequency')

# Scatter plot: Temperature vs Humidity
plt.subplot(2, 3, 3)
plt.scatter(df['temperature'], df['humidity'], color='purple')
plt.title('Temperature vs Humidity')
plt.xlabel('Temperature (°C)')
plt.ylabel('Humidity (%)')
plt.xlim([15,35])
plt.ylim([75,95])

# Scatter plot: Humidity vs Temperature
plt.subplot(2, 3, 4)
plt.scatter(df['humidity'], df['temperature'], color='orange')
plt.title('Humidity vs Temperature')
plt.xlabel('Humidity (%)')
plt.ylabel('Temperature (°C)')
plt.xlim([75,95])
plt.ylim([15,35])

# Actual vs Predicted Humidity
plt.subplot(2, 3, 5)
plt.plot(y_test.values, color='purple', label='Actual Humidity')
plt.plot(y_pred_humidity, color='red', linestyle='--', label='Predicted Humidity')
plt.title('Actual vs Predicted Humidity')
plt.xlabel('Samples')
plt.ylabel('Humidity (%)')
plt.legend()

# Actual vs Predicted Temperature
plt.subplot(2, 3, 6)
plt.plot(X_test.values, color='skyblue', label='Actual Temperature')
plt.plot(y_pred_temperature, color='red', linestyle='--', label='Predicted Temperature')
plt.title('Actual vs Predicted Temperature')
plt.xlabel('Samples')
plt.ylabel('Temperature (°C)')
plt.legend()

plt.tight_layout()

# Line Chart for temperature and humidity over time
plt.figure(figsize=(12, 6))
plt.plot(df['timestamp'], df['temperature'], label='Temperature', color='red', linewidth=2)
plt.plot(df['timestamp'], df['humidity'], label='Humidity', color='blue', linewidth=2)
plt.title('Temperature and Humidity Over Time')
plt.xlabel('Timestamp')
plt.ylabel('Values')
plt.legend()
plt.grid(True)
plt.show()

