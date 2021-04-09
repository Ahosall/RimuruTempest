const GuildModel = require('../models/GuildModel');

exports.get = async (req, res, next) => {
    console.log('Guild - GET - ALL DATAS');
    const data = await GuildModel.find({});

    return res.json(data);
}

exports.getById = async (req, res, next) => {
    console.log('Guild - GET - BY ID - ID: ' + req.params.guild);
    const data = await GuildModel.findOne({ id: req.params.guild })

    if (data) {
        return res.json(data);
    } else {
        return res.sendStatus(404);
    }
}

exports.post = async (req, res, next) => {
    console.log('Guild - POST - DATA');
    const data = await GuildModel.create(req.body);

    return res.json(data);
}