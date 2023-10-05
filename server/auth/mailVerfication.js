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
const htmlContent = (name, random) => {
    const d = new Date().toLocaleString()
    const val = `<div>
        <h3>Name: <em> ${name}</em></h3>
        <h3>OTP: <em> ${random}</em></h3>
        <h3>Sent Time: <em> ${d} </em></h3>
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