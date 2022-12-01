const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MeasurementSchema = new Schema({
    name: String,
    measurements: String,
    deviceId: String,
    userId: String
})

module.exports = mongoose.model("Measurement", MeasurementSchema);
