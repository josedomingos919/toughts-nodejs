const { Tought } = require("../models/Tought");
const { User } = require("../models/User");

class ToughtController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }
}

module.exports = { ToughtController };
