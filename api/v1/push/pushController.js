require('dotenv').config();
const OneSignal = require('onesignal-node');
const client = new OneSignal.Client(process.env.OnesignalAppId, process.env.OnesignalApi);

exports.pushNotification = (req, res, next)=>{

      const message = { 
      contents: {"en": req.data.mailMessage},
      include_player_ids: [req.data.playerId]
      }
      
      client.createNotification(message)
      .then(res => {
          next();
      }).catch(e => {
          console.log(e)
          next();
      });
}