const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, '../data/services.json');

let savedServices = [];
let hiredServices = [];

const getServices = (req, res) => {
    try {
        const data = fs.readFileSync(servicesPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: "Error reading services data" });
    }
};

const getServiceById = (req, res) => {
    try {
        const data = fs.readFileSync(servicesPath, 'utf8');
        const services = JSON.parse(data);
        const service = services.find(s => s.id === parseInt(req.params.id));
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error reading services data" });
    }
};

const saveService = (req, res) => {
    const { serviceId } = req.body;
    if (!serviceId) return res.status(400).json({ message: "Service ID is required" });
    
    if (!savedServices.includes(serviceId)) {
        savedServices.push(serviceId);
        res.status(200).json({ message: "Service saved successfully", savedServices });
    } else {
        res.status(400).json({ message: "Service already saved" });
    }
};

const hireService = (req, res) => {
    const { serviceId } = req.body;
    if (!serviceId) return res.status(400).json({ message: "Service ID is required" });

    if (!hiredServices.includes(serviceId)) {
        hiredServices.push(serviceId);
        res.status(200).json({ message: "Service hired successfully", hiredServices });
    } else {
        res.status(400).json({ message: "Service already hired" });
    }
};

const getSavedServices = (req, res) => {
    try {
        const data = fs.readFileSync(servicesPath, 'utf8');
        const services = JSON.parse(data);
        const results = services.filter(s => savedServices.includes(s.id));
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved services" });
    }
};

const getHiredServices = (req, res) => {
    try {
        const data = fs.readFileSync(servicesPath, 'utf8');
        const services = JSON.parse(data);
        const results = services.filter(s => hiredServices.includes(s.id));
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hired services" });
    }
};

module.exports = {
    getServices,
    getServiceById,
    saveService,
    hireService,
    getSavedServices,
    getHiredServices
};
