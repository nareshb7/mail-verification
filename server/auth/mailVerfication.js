const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nareshsit7@gmail.com',
        pass: 'xdocuqqhhnlwyllg'
    }
})
const options = {
    from: 'narehsit7@gmail.com',
    to: '',
    subject: 'Test Email Verification',
    html: ''
}
function convertToGMT(dateString, timeZone) {
  const date = new Date(dateString);

  // Format the date according to the specified time zone
  const options = {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
}
const htmlContent = (name, random) => {
    const isoString = new Date().toISOString(); // ISO date string
    const timeZone = 'Asia/Kolkata'; // GMT+5:30
    const formattedDate = convertToGMT(isoString, timeZone);
    const val = `<div>
        <h3>Name: <em> ${name}</em></h3>
        <h3>OTP: <em> ${random}</em></h3>
        <h3>Sent Time: <em> ${formattedDate} </em></h3>
    </div>`
    return val
}



const htmlPortfolioMessage =({name, email, subject, message}) => {
    const isoString = new Date().toISOString(); // ISO date string
    const timeZone = 'Asia/Kolkata'; // GMT+5:30
    const formattedDate = convertToGMT(isoString, timeZone);
    const val =  `<div>
        <h3>Name: <em> ${name}</em></h3>
        <h3>Email: <em> ${email}</em></h3>
        <h3>Subject: <em> ${subject} </em></h3>
        <h4>Message:</h4>
        <p>${message}</p>
        <br>
        <br>
        <br>
        <h6>Sent at : ${formattedDate}</h6>
    </div>`
    return val
}

module.exports.mailVerification = async (req, res) => {
    console.log('BODY::', req.body)
    const { email, content, name, age , gender} = req.body
    const random = Math.random().toString(36).slice(2, 10)
    options.to = email
    options.html = htmlContent(name, random)
    transporter.sendMail(options, (err, info) => {
        try {

            if (err) {
                res.status(401).json(err)
            }
            console.log('RESP:', err, info)
            res.send({ psd: random, message: `OTP sent to ur mail  - ${email}` })
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    })
}

module.exports.sendPortfolioMessage = async (req, res)=> {
    const {name, email, subject, message} = req.body
    console.log("BODY:::", req.body)
    options.to = "nareshbjava7@gmail.com"
    options.subject = "Portfolio Message"
    options.html = htmlPortfolioMessage(req.body)
    transporter.sendMail(options, (err, info) => {
        try {

            if (err) {
                res.status(401).json(err)
            }
            console.log('RESP:', err, info)
            res.json({message: "Mail Sent Successfully"})
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    })
    
}
