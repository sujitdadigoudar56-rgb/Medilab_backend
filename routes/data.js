const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/tests', (req, res) => dataController.getTests(req, res));
router.get('/packages', (req, res) => dataController.getPackages(req, res));
router.get('/specialists', (req, res) => dataController.getSpecialists(req, res));
router.get('/stats/:type', (req, res) => dataController.getStats(req, res));
router.get('/content/:section', (req, res) => dataController.getContent(req, res));
router.get('/process-steps', (req, res) => dataController.getProcessSteps(req, res));
router.get('/dashboard', (req, res) => dataController.getDashboardData(req, res));
router.post('/appointments', (req, res) => dataController.createAppointment(req, res));

module.exports = router;
