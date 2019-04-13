const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addAlert = functions.https.onRequest((req, res) => {
    return admin.firestore().collection('sensors').doc(req.body.sensorId).get().then(sensorRecord => {
        const sensor = sensorRecord.data()

        return admin.firestore().collection('alerts').add({
            humidity: req.body.humidity,
            temp: req.body.temp,
            time: new Date(),
            sensorId: req.body.sensorId,
            bed: sensor.bedNo
        }).then(ref => {
            return res.json({ result: `Added document with ID: ${ref.id}` });
        });
    });

});