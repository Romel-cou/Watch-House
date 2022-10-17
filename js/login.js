var userInfo;
var isMatch = false;

fetch('../localDB.json')
.then(res => res.json())
.then(data => userInfo = data.data)
.then(() => sessionStorage.setItem("info", JSON.stringify(userInfo)))



document.getElementById('submit-btn').addEventListener('click', function(){
    const emailField = document.getElementById('email');
    const userEmail = emailField.value;
    const passwordField = document.getElementById('pass');
    const userPassword = passwordField.value;
    

    // console.log(typeof(userInfo[0].email));
    // console.log(userEmail);

    userInfo.forEach((data) => {
      var userName = data.name
      var userPhone = data.phone
        if(data.email === userEmail && data.pass === userPassword) {
            console.log("credentials match");
            isMatch = true;
            window.location.href = '../index.html'
          sessionStorage.setItem('email', userEmail)
          sessionStorage.setItem('pass', userPassword)
          sessionStorage.setItem('name', userName)
          sessionStorage.setItem('phone', userPhone)
        } 
    });
    if (!isMatch) {
        // only logs once even though there are multiple users
        alert("Credentials didn't match")
      }

  
})





