const CommandModel = require('../models/commandModel');

exports.get = async (req, res, next) => {
    console.log('Command - GET - ALL DATA');
    const data = await CommandModel.find({});

    return res.json(data);
}

exports.getByName = async (req, res, next) => {
    console.log('Command - GET - BY NAME - NAME: ' + req.params.command);
    const data = await CommandModel.findOne({ name: req.params.command })

    return res.json(data);
}

exports.post = async (req, res, next) => {
    console.log('Command - POST - DATA');
    const data = await CommandModel.create(req.body);

    return res.json(data);
}