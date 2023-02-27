const Tracking = require('../models/trackingModel');

const getAllTracking = (req,res)=>{
    Tracking.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
}

const getTrackingById =(req,res)=>{
    const id = req.params.id;
    Tracking.findById(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(`Interal Server Error: ${err}`);
      });
}

const addTracking = (req,res)=>{
    const input = req.body;
    const newTracking = new Tracking(input);
  
    newTracking
      .save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json(`Interal Server Error: ${err}`);
      });
}

const deleteTracking = (req,res)=>{
    const id = req.params.id;
  Tracking.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(`Interal Server Error: ${err}`);
    });
}

const updateTracking = (req,res)=>{
    const id = req.params.id;
    const data = req.body;
  
    Tracking.findByIdAndUpdate(id, data,{returnDocument: "after"}).then((data) => {
      res.status(200).json(data);
    });
}

module.exports ={
    getAllTracking,
    getTrackingById,
    addTracking,
    deleteTracking,
    updateTracking
}

