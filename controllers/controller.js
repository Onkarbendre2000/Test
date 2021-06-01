module.exports = function(app) {
      var axios = require('axios')
      const nodemailer = require('nodemailer');
      function sendMail(msg) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                  user: 'o.bendre123@gmail.com',
                  pass: 'onkar512'
                  }
                });
                var mailOptions = {
                    from: 'o.bendre123@gmail.com',
                    to: 'o.bendre93@gmail.com',
                    subject: 'Vaccine',
                    text: msg
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
          }

      function func() {
        header = {"Accept-Language":"en_US","user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}

        today = ''
        try {
          today = new Date().toLocaleString('en-In', {year: 'numeric', month: '2-digit', day: '2-digit',timeZone: 'Asia/Kolkata'}).split(',')[0]
        } catch (e) {
          today = '31-03-2021'
        }

        today = today.replace(/\//g,'-')
        console.log(today)
        param = {"district_id":'389',"date":today}
      //  console.log(param)
        arr = 0
        axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict",{headers: header, params:param}).then((e) => {
          data = e.data.sessions
          data.forEach((i) => {
            if(i["min_age_limit"] == 18 && i["available_capacity_dose1"]) {
              arr++;
            }
          });
          if(arr) {
            sendMail("Slot available");
          }
        }).catch((error) => {
          console.log(error)
        })
}
      setInterval(func,1000*60*5);
      // setTimeout(
      // }, 1000*60*5)

}
