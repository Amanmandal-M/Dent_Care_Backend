const geoip = require('geoip-lite');

// --------->>>> Logs Model Location <<<<<---------
const { logModel } = require("../models/logModel");


const logsData = async (req,res,next) => {
    try {
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userIPAddress = `${clientIP}`;
        const location = geoip.lookup(userIPAddress);
        console.log('Country:', location.country);
        console.log('City:', location.city);
        console.log('Latitude:', location.ll[0]);
        console.log('Longitude:', location.ll[1]);
        const data = new logModel({
            DateandTime: `${new Date()}`,
            Method: `${req.method}`,
            URL: `${req.url}`,
            IP: `${clientIP}`
        })

        await data.save();
        next();
    } catch (error) {
        res.status(404).send({
            "Message": "Error in Middleware Logs"
        })
    }
}

module.exports = { logsData }