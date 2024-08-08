import pandas as pd
import time
from kafka import KafkaProducer
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Function to read the data from csv file and prepare the data
def read_data(file_path):
    try:
        # Parse dates explicitly
        data = pd.read_csv(file_path, parse_dates=['Captured Time'], infer_datetime_format=True)
        data.sort_values('Captured Time', inplace=True)
        return data
    except Exception as e:
        logger.error(f"Error reading CSV file: {e}")
        return pd.DataFrame()
    
# Function to send data to Kafka topics
def send_to_kafka(producer, topic, data, speed):
    current_time = None
    buffer = []

    for _, row in data.iterrows():
        try:
            captured_time = pd.to_datetime(row['Captured Time'])
        except Exception as e:
            logger.error(f"Error parsing date: {e}")
            continue
        
        if current_time is None:
            current_time = captured_time
        
        if captured_time != current_time:
            if buffer:
                message = json.dumps(buffer, default=str).encode('utf-8')
                producer.send(topic, message)
                for record in buffer:
                    logger.info(f"Sent data for timestamp {current_time}: Latitude={record['Latitude']}, Longitude={record['Longitude']}, Value={record['Value']}")
                buffer = []
            current_time = captured_time
            time.sleep(speed)
        
        record = {
            'Captured Time': captured_time.strftime('%Y-%m-%d %H:%M:%S'),
            'Latitude': row['Latitude'],
            'Longitude': row['Longitude'],
            'Value': row['Value'],          
            'Uploaded Time': pd.to_datetime(row['Uploaded Time']).strftime('%Y-%m-%d %H:%M:%S'),
        }
        buffer.append(record)
    
    if buffer:
        message = json.dumps(buffer, default=str).encode('utf-8')
        producer.send(topic, message)
        for record in buffer:
            logger.info(f"Sent data for timestamp {current_time}: Latitude={record['Latitude']}, Longitude={record['Longitude']}, Value={record['Value']}")

def main():
    kafka_topic = 'safecast-data1'
    kafka_bootstrap_servers = "kafka:9092"
    file_path = 'file_0.csv'  #data from csv file
    submission_speed = 1  # Adjustable speed in seconds

    producer = KafkaProducer(bootstrap_servers=kafka_bootstrap_servers)
    data = read_data(file_path)
    
    if data.empty:
        logger.error("No data to send. Exiting.")
        return

    logger.info("Starting data submission to Kafka")
    
    while True:
        send_to_kafka(producer, kafka_topic, data, submission_speed)
        producer.flush()
        logger.info("Completed one loop of data submission")
        time.sleep(5)  # Wait before replaying the data

    producer.close()

if __name__ == '__main__':
    main()

    
