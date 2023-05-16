const geoip = require('geoip-lite');

// --------->>>> Logs Model Location <<<<<---------
const { logModel } = require("../models/logModel");


const logsData = async (req,res,next) => {
    try {
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userIPAddress = `${clientIP}`;
        const location = geoip.lookup(userIPAddress);
        console.log(location);
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