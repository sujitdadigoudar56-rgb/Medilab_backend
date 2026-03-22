const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const User = require('../models/User');
const Test = require('../models/Test');
const Package = require('../models/Package');
const Specialist = require('../models/Specialist');
const Stat = require('../models/Stat');
const Content = require('../models/Content');
const Appointment = require('../models/Appointment');
const ActivityLog = require('../models/ActivityLog');
const Prescription = require('../models/Prescription');
const Vitals = require('../models/Vitals');
const ProcessStep = require('../models/ProcessStep');

const testsData = [
  { name: "Complete Blood Count (CBC)", price: 299, report: "6 hrs", category: "blood" },
  { name: "Liver Function Test (LFT)", price: 449, report: "12 hrs", category: "blood" },
  { name: "USG Whole Abdomen", price: 899, report: "Same day", category: "usg" },
  { name: "X-Ray Chest (PA View)", price: 299, report: "2 hrs", category: "xray" },
  { name: "CT Scan Brain (Plain)", price: 2499, report: "4 hrs", category: "ctscan" },
  { name: "MRI Brain (Plain)", price: 4999, report: "6 hrs", category: "mri" },
];

const packagesData = [
  { name: "Full Body Checkup", tests: 72, price: 1499, originalPrice: 3500, tag: "Bestseller", category: "recommended" },
  { name: "Women's Health Package", tests: 55, price: 1799, originalPrice: 4000, tag: "Popular", category: "special" },
];

const specialistsData = [
  { name: "General Physicians", availableCount: 120, iconName: "Stethoscope" },
  { name: "Cardiologists", availableCount: 45, iconName: "Heart" },
];

const statsData = [
  { label: "Patients across India", value: "50,000+", type: "hero" },
  { label: "Total Patients", value: "1,240", type: "admin", iconName: "Users", color: "text-blue-500 bg-blue-500/10" },
  { label: "Today's Appointments", value: "8", type: "doctor", iconName: "Calendar", color: "text-primary bg-primary/10" },
  { label: "Assigned Patients", value: "18", type: "nurse", iconName: "Users", color: "text-primary bg-primary/10" },
  { label: "Upcoming Appointments", value: "2", type: "patient", iconName: "Calendar", color: "text-primary bg-primary/10" },
];

const contentData = [
  { section: "features", title: "Wide Range of Tests", description: "500+ lab tests including blood tests.", iconName: "TestTube", order: 1 },
  { section: "wellness", title: "Pregnancy Care", description: "Comprehensive prenatal care", iconName: "Heart", order: 1 },
];

const processStepsData = [
  { iconName: "Search", stepNumber: "01", title: "Choose Your Test", description: "Browse our catalog.", order: 1 },
  { iconName: "CalendarCheck", stepNumber: "02", title: "Book a Slot", description: "Select a convenient time.", order: 2 },
  { iconName: "Droplets", stepNumber: "03", title: "Sample Collection", description: "Home visit for collection.", order: 3 },
  { iconName: "FileCheck", stepNumber: "04", title: "Get Reports", description: "Digital reports in 24h.", order: 4 },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Test.deleteMany({});
    await Package.deleteMany({});
    await Specialist.deleteMany({});
    await Stat.deleteMany({});
    await Content.deleteMany({});
    await Appointment.deleteMany({});
    await ActivityLog.deleteMany({});
    await Prescription.deleteMany({});
    await Vitals.deleteMany({});
    await ProcessStep.deleteMany({});

    // Create Dummy Users
    const admin = await User.create({ fullName: "Admin User", email: "admin@test.com", password: "password123", role: "admin" });
    const doctor1 = await User.create({ fullName: "Dr. Smith", email: "doctor@test.com", password: "password123", role: "doctor" });
    const doctor2 = await User.create({ fullName: "Dr. Sarah Conor", email: "sarah@test.com", password: "password123", role: "doctor" });
    const nurse1 = await User.create({ fullName: "Nurse Joy", email: "nurse@test.com", password: "password123", role: "nurse" });
    const nurse2 = await User.create({ fullName: "Nurse Ratched", email: "ratched@test.com", password: "password123", role: "nurse" });
    const patient1 = await User.create({ fullName: "John Doe", email: "patient@test.com", password: "password123", role: "patient" });
    const patient2 = await User.create({ fullName: "Jane Smith", email: "jane@test.com", password: "password123", role: "patient" });
    const patient3 = await User.create({ fullName: "Robert Brown", email: "robert@test.com", password: "password123", role: "patient" });

    // Seed Data
    const tests = await Test.insertMany(testsData);
    const packages = await Package.insertMany(packagesData);
    const specialists = await Specialist.insertMany(specialistsData);
    await Stat.insertMany(statsData);
    await Content.insertMany(contentData);
    await ProcessStep.insertMany(processStepsData);

    // Seed Appointments
    await Appointment.create([
      { patient: patient1._id, doctor: specialists[0]._id, test: tests[0]._id, date: new Date(), type: 'test', status: 'confirmed' },
      { patient: patient1._id, doctor: specialists[0]._id, date: new Date(), type: 'consultation', status: 'pending' },
      { patient: patient2._id, doctor: specialists[1]._id, date: new Date(), type: 'consultation', status: 'confirmed' },
      { patient: patient3._id, doctor: specialists[0]._id, date: new Date(), type: 'consultation', status: 'cancelled' }
    ]);

    // Seed Activity Log
    await ActivityLog.create([
      { user: admin._id, action: "User Login", details: "Admin logged into the system" },
      { user: patient1._id, action: "Booked Test", details: "John Doe booked CBC test" },
      { user: doctor1._id, action: "Upload Prescription", details: "Dr. Smith uploaded prescription for John Doe" }
    ]);

    // Seed Prescriptions
    await Prescription.create([
      { 
        patient: patient1._id, 
        doctor: "Dr. Smith", 
        date: new Date(),
        medicines: [
          { name: "Paracetamol", dosage: "500mg", duration: "3 days" },
          { name: "Amoxicillin", dosage: "250mg", duration: "5 days" }
        ],
        notes: "Take rest and drink plenty of water."
      },
      { 
        patient: patient2._id, 
        doctor: "Dr. Sarah Conor", 
        date: new Date(),
        medicines: [{ name: "Ibuprofen", dosage: "400mg", duration: "2 days" }] 
      }
    ]);

    // Seed Vitals
    await Vitals.create([
      { 
        patient: patient1._id, 
        nurse: nurse1._id, 
        bloodPressure: "120/80", 
        temperature: "98.6 F", 
        pulse: "72 bpm",
        spO2: "98%"
      },
      { 
        patient: patient2._id, 
        nurse: nurse1._id, 
        bloodPressure: "130/85", 
        temperature: "99.1 F", 
        pulse: "80 bpm",
        spO2: "97%"
      }
    ]);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
