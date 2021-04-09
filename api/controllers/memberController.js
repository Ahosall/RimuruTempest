const MemberModel = require('../models/memberModel');

exports.get = async (req, res, next) => {
    console.log('Member - GET - ALL DATAS');
    const data = await MemberModel.find({});

    return res.json(data);
}

exports.getById = async (req, res, next) => {
    console.log('Member - GET - BY ID - ID: ' + req.params.member);
    const data = await MemberModel.findOne({ id: req.params.member })

    return res.json(data);
}

exports.post = async (req, res, next) => {
    console.log('Member - POST - DATA');
    const data = await MemberModel.create(req.body);

    return res.json(data);
}