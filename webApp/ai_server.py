from flask import Flask, jsonify
import pymongo

app = Flask(__name__)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["quant_saas"]
collection = db["clients"]  # Adjust based on your dataset

@app.route('/process', methods=['GET'])
def process_data():
    """Fetch data from MongoDB and process it."""
    data = list(collection.find({}, {"_id": 0}))  # Fetch data, exclude _id

    # Example AI/ML processing (convert names to uppercase for demo)
    for doc in data:
        doc["name"] = doc["name"].upper()  

    return jsonify({"status": "success", "data": data})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
