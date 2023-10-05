console.log("HELLOOOOOO");
const otpSection = document.getElementById("otpSection")
otpSection.style.display = 'none'
let otp =''
const handleOtpSubmit = () => {
  const userOtp = document.getElementById('otpInput').value
  if (otp == userOtp) {
    document.getElementById('otpStatus').innerHTML = `<h3>Mail Verifed</h3>`
    otpSection.style.display = 'none'
  } else {
    document.getElementById('otpStatus').innerHTML = `<h3>OTP is not matching</h3>`
  }
}


function postdata(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name-input");
  const ageInput = document.getElementById("age-input");
  const genderInput = document.getElementById("gender-input");
  const emailInput = document.getElementById("email-input");
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const gender = genderInput.value.trim();
  const email = emailInput.value.trim();
  const data = { name, age, gender, email };
  console.log(data, "3232");
  document.getElementById('otpStatus').innerHTML = 'Otp is sending...'
  //https://mail-verification.onrender.com/mailverify
  // http://192.168.10.28:4040/mailverify
  fetch("https://mail-verification.onrender.com/mailverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response, "4242=")
      otp = response.psd
      document.getElementById('otpStatus').innerHTML = `<h3>${response.message}</h3>`
      otpSection.style.display = 'block'
      document.getElementById('otpSubmit').addEventListener('click', handleOtpSubmit)
    })
    .catch((err) => {
      console.log('ERROR::', err)
      document.getElementById('otpStatus').innerHTML =  `<h3>Error Occured Try again...</h3>`
    });
    const otpSubmitBtn = document.getElementById("otpSubmit");
}
const dataForm = document.getElementById("data-form");
dataForm.addEventListener("submit", postdata);
