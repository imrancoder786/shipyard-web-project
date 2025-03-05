require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const DEFAULT_PORT = 5001;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(cors());


app.use(bodyParser.json());


const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/todoDB";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const inquirySchema = new mongoose.Schema({
  budget: Number,
  technology: String,
  shipType: String,
});

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const complaintSchema = new mongoose.Schema({
  shipModel: String,
  yearManufacture: Number,
  shipType: String,
  issueDescription: String,
});


const Inquiry = mongoose.model("Inquiry", inquirySchema);
const Complaint = mongoose.model("Complaint", complaintSchema);
const Message = mongoose.model("Message", messageSchema);


app.post("/submit-inquiry", async (req, res) => {
  try {
    console.log("📩 Received Inquiry:", req.body); 
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();
    res.status(201).json({ message: "✅ Inquiry stored successfully!" });
  } catch (error) {
    console.error("❌ Inquiry Submission Error:", error);
    res.status(500).json({ message: "❌ Server Error", error });
  }
});

app.post("/submit-complaint", async (req, res) => {
  try {
    console.log("📩 Received Complaint:", req.body); 
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: "✅ Complaint stored successfully!" });
  } catch (error) {
    console.error("❌ Complaint Submission Error:", error);
    res.status(500).json({ message: "❌ Server Error", error });
  }
});

app.post("/submit-Message", async (req, res) => {
  try {
    console.log("📩 Received Message:", req.body); 
    const newInquiry = new Message(req.body);
    await newInquiry.save();
    res.status(201).json({ message: "✅ Message stored successfully!" });
  } catch (error) {
    console.error("❌ Message Submission Error:", error);
    res.status(500).json({ message: "❌ Server Error", error });
  }
});

app.get("/inquiries", async (req, res) => {
  try {
    console.log("📤 Fetching inquiries...");
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    console.error("❌ Error fetching inquiries:", error);
    res.status(500).json({ message: "❌ Error fetching data", error });
  }
});

app.get("/complaints", async (req, res) => {
  try {
    console.log("📤 Fetching complaints...");
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error("❌ Error fetching complaints:", error);
    res.status(500).json({ message: "❌ Error fetching data", error });
  }
});


const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${port} is in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server Error:", err);
    }
  });
};

startServer(PORT);
