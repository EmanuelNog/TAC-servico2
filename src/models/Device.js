const mongoose = require('mongoose')

const Device = mongoose.model('Device',{
    name: String,
    measurements: String,
})

module.exports = Device;
