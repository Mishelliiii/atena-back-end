const Client = require("../models/Client");

module.exports = {
  async create(req, res) {
    try {
      const result = await Client.create(req.body);

      console.log(`result: ${result}`);

      return res.json({status: "ok", result});
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async list(req, res) {
    try {
      const result = await Client.findAll({
        attributes: [
          'id',
          'name',
          'email',
          'cpf',
          'phone',
          'address',
          'lat',
          'long'
        ]
      });

      console.log(`result: ${result}`);

      return res.json({status: "ok", result});
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async login(req, res) {
    try {
      const result = await Client.findOne({
        attributes: ['id', 'name'],
        where: {email: req.body.email, password: req.body.password}
      });

      console.log(`result: ${result}`);

      if (result != null) {
        return res.json({status: "ok", result});
      } else {
        return res.json({status: "fail", message: 'Authentication failed'});
      }

    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async get(req, res) {
    try {
      const result = await Client.findByPk(req.body.id);

      console.log(`result: ${result}`);

      if (result == null) {
        return res.json({status: "fail", message: "not found"});
      } else {
        return res.json({status: "ok", result});
      }

    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async remove(req, res) {
    try {
      const result = await Client.destroy({
        where: {id: req.body.id}
      });

      if (result) {
        return res.json({status: "ok", result});
      } else {
        return res.json({status: "fail", message: "not found"});
      }
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  }
};
