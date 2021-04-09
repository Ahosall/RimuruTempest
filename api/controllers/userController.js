const UserModel = require('../models/userModel');

exports.get = async (req, res, next) => {
    console.log('User - GET - ALL DATAS');
    const data = await UserModel.find({});

    return res.json(data);
}

exports.getById = async (req, res, next) => {
    console.log('User - GET - BY ID - ID: ' + req.params.user);
    const data = await UserModel.findOne({ id: req.params.user })

    return res.json(data);
}

exports.post = async (req, res, next) => {
    console.log('User - POST - DATA');
    const data = await UserModel.create(req.body);

    return res.json(data);
}

exports.put = async (req, res, next) => {
    console.log('User - PUT - DATA');
    const data = await UserModel.findOneAndUpdate({ id: req.params.user }, req.body);;

    return res.json(data);
}