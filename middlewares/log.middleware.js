const axios = require('axios');
require("dotenv").config();
// --------->>>> Logs Model Location <<<<<---------
const { logModel } = require("../models/logModel");


const logsData = async (req,res,next) => {
    try {
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const apiKey = process.env.GOOGLEAPIKEY;

        const PostingData = axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)
        const respo = await PostingData.json();
        const { lat, lng } = respo.data.location;

        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
        const GetData = axios.get(geocodingUrl)
        const respon = await GetData.json();
        const city = extractCityFromGeocodingResponse(respon.data);
        console.log(city);
        console.log(lat);
        console.log(lng);

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