(function () {
    emailjs.init("loJEMG8zNHWR6Xyv8");
})();

function sendmail() {
    let fullName = document.getElementById("name").value;
    let phoneNumber = document.getElementById("phone").value;
    let userEmail = document.getElementById("email").value;
    let userMessage = `Phone: {phoneNumber}\n` + document.getElementById("message").value;

        var contactParams = {
            from_name: fullName,
            from_email: userEmail,
            message: userMessage
        };

        emailjs.send('service_ih8qwig', 'template_50keonb', contactParams).then(function (res) {})
}