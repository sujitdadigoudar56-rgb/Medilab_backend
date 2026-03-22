const Appointment = require('../models/Appointment');
const ActivityLog = require('../models/ActivityLog');
const Prescription = require('../models/Prescription');
const Vitals = require('../models/Vitals');
const ProcessStep = require('../models/ProcessStep');
const Test = require('../models/Test');
const Package = require('../models/Package');
const Specialist = require('../models/Specialist');
const Stat = require('../models/Stat');
const Content = require('../models/Content');

class DataService {
  async getTests() {
    return await Test.find();
  }

  async getPackages() {
    return await Package.find();
  }

  async getSpecialists() {
    return await Specialist.find();
  }

  async getStats(type) {
    return await Stat.find({ type });
  }

  async getContent(section) {
    return await Content.find({ section }).sort({ order: 1 });
  }

  async getProcessSteps() {
    return await ProcessStep.find().sort({ order: 1 });
  }

  async getAppointmentsByRole(userId, role) {
    const query = role === 'patient' ? { patient: userId } : {};
    return await Appointment.find(query).populate('patient').populate('test').populate('package');
  }

  async getRecentActivity() {
    return await ActivityLog.find().sort({ timestamp: -1 }).limit(10).populate('user');
  }

  async getPrescriptions(patientId) {
    return await Prescription.find({ patient: patientId });
  }

  async getVitals(patientId) {
    return await Vitals.find({ patient: patientId }).sort({ timestamp: -1 });
  }

  async createAppointment(data) {
    const appointment = new Appointment(data);
    return await appointment.save();
  }
}

module.exports = new DataService();
