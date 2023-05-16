const axios = require('axios');
require("dotenv").config();
// --------->>>> Logs Model Location <<<<<---------
const { logModel } = require("../models/logModel");


const logsData = async (req,res,next) => {
    try {
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const apiKey = process.env.GOOGLEAPIKEY;

        axios
        .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)
        .then(response => {
          const { lat, lng } = response.data.location;
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
          axios
            .get(geocodingUrl)
            .then(response => {
              const city = extractCityFromGeocodingResponse(response.data);
            console.log(lat);
            console.log(lng);
            console.log(city);
            })
            .catch(error => {
              console.error('Error:', error.message);
              res.status(500).json({ error: 'Failed to retrieve location' });
            });
        })


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