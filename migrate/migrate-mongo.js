import { MongoClient } from "mongodb";
import fs from "fs";

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const dbName = "javascript-handbook";
const collectionName = "blogs"; // update the collection name here

// Read JSON file - try both possible paths
let jsonFilePath = "blogs.json";
console.log(`Using JSON file at: ${jsonFilePath}`);

// Read file contents
const fileContents = fs.readFileSync(jsonFilePath, "utf8");

// Try to parse JSON
let jsonData;
try {
  jsonData = JSON.parse(fileContents);
  console.log(`Successfully parsed JSON data. Found ${jsonData.length} items.`);
} catch (err) {
  console.error("Error parsing JSON:", err.message);
  
  // Try to identify the problematic part
  const errorMatch = err.message.match(/position\s+(\d+)/);
  if (errorMatch && errorMatch[1]) {
    const position = parseInt(errorMatch[1]);
    const context = fileContents.substring(
      Math.max(0, position - 50), 
      Math.min(fileContents.length, position + 50)
    );
    console.error(`Error near position ${position}:\n${context}`);
  }
  
  // If the content is large, try writing to a temp file with line numbers
  try {
    const lines = fileContents.split("\n");
    const numberedLines = lines.map((line, i) => `${i+1}: ${line}`).join("\n");
    fs.writeFileSync("topic_contents_numbered.txt", numberedLines);
    console.log("Created topic_contents_numbered.txt to help you find the error");
  } catch (writeErr) {
    console.error("Failed to create debug file:", writeErr);
  }
  
  process.exit(1);
}

// Function to insert data into MongoDB
async function migrateData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert JSON data into the collection
    const result = await collection.insertMany(jsonData);
    console.log(`Inserted ${result.insertedCount} documents into MongoDB`);
  } catch (error) {
    console.error("Error inserting data: ", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

migrateData();
