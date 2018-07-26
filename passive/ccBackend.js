const sqlite3 = require('sqlite3').verbose();
const ccinfo = require("../commands/ccinfo.js");
const config = require("../config.json");
const db = new sqlite3.Database('ccUserData');

exports.get = (userId, ...lookups) => {

}