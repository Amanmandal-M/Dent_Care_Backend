const { ServiceModel } = require("../models/services.model");

// --------->>>> GET <<<<<---------
const getService = async (req, res) => {
    try {
        const data = await ServiceModel.find()
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
}

// --------->>>> POST <<<<<---------
const addService = async (req, res) => {
    const payload = req.body;
    try {
        const data = new ServiceModel(payload);
        await data.save();
        res.status(200).send({
            Message: "Service added successfully",
        });
    } catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
}

// --------->>>> PATCH <<<<<---------
const updateService = async (req, res) => {
    const ID = req.params.id;
    const payload = req.body
    console.log(ID,payload)
    try {
        await ServiceModel.findByIdAndUpdate({ _id: ID }, payload)
        res.status(200).send({
            Message: "Service successfully Updated",
        });
    }
    catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
}

// --------->>>> DELETE <<<<<---------
const deleteService = async (req, res) => {
    const ID = req.params.id;
    try {
        await ServiceModel.findByIdAndDelete({ _id: ID })
        res.status(200).send({
            Message: "Service successfully deleted",
        });
    }
    catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
}

module.exports = {  getService, addService, updateService, deleteService }


