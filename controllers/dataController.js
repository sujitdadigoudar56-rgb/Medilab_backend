const dataService = require('../services/dataService');

class DataController {
  async getTests(req, res) {
    try {
      const tests = await dataService.getTests();
      res.json(tests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPackages(req, res) {
    try {
      const packages = await dataService.getPackages();
      res.json(packages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getSpecialists(req, res) {
    try {
      const specialists = await dataService.getSpecialists();
      res.json(specialists);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getStats(req, res) {
    try {
      const stats = await dataService.getStats(req.params.type);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getContent(req, res) {
    try {
      const contents = await dataService.getContent(req.params.section);
      res.json(contents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getProcessSteps(req, res) {
    try {
      const steps = await dataService.getProcessSteps();
      res.json(steps);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getDashboardData(req, res) {
    try {
      const { role, userId } = req.query;
      const data = {};
      
      if (role === 'admin') {
        data.recentActivity = await dataService.getRecentActivity();
        data.recentAppointments = await dataService.getAppointmentsByRole(null, 'admin');
      } else if (role === 'doctor') {
        data.upcomingAppointments = await dataService.getAppointmentsByRole(userId, 'doctor');
      } else if (role === 'nurse') {
        data.vitals = await dataService.getVitals(userId); // Simplified for now
      } else if (role === 'patient') {
        data.prescriptions = await dataService.getPrescriptions(userId);
        data.upcomingAppointments = await dataService.getAppointmentsByRole(userId, 'patient');
      }
      
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  async createAppointment(req, res) {
    try {
      const appointment = await dataService.createAppointment(req.body);
      res.status(201).json(appointment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new DataController();
