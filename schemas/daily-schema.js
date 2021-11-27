const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const dailySchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
},{
    timestamps: true
})

module.exports = mongoose.model('dailyTaken', dailySchema);