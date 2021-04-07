const CommandModel = require('../models/commandModel');

exports.get = async (req, res, next) => {
    const data = await CommandModel.find({});

    return res.json(data);
}

exports.getByName = async (req, res, next) => {
    const data = await CommandModel.findOne({ name: req.params.command })

    return res.json(data);
}

exports.post = async (req, res, next) => {
    console.log(req.body);
    const data = await CommandModel.create(req.body);

    return res.json(data);
}