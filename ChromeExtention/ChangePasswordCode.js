document.addEventListener('DOMContentLoaded', function() {    
    var but = document.getElementById('ChangePass');
    // onClick's logic below:
    but.addEventListener('click', function() {
        PassChange();
    });
});

function PassChange()
{

    var User = document.getElementById("UserName").value;
    var Password = document.getElementById("UserPass").value;
    var NewPassword = document.getElementById("UserPassNew").value;
    var http = new XMLHttpRequest();
    var url = 'http://localhost:1942/ChangePass'; 
    http.open('POST', url, true);
    
    http.setRequestHeader('Content-Type','application/json'); 
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           let D = JSON.parse(http.responseText);          
            alert(D.status);
            if(D.status==true)
            {
                alert("Changed!");
                window.location.href = "LoginPage.html";
                //Redirect
            }
        }
    }
    http.send(JSON.stringify({"UserName":User,"Password":Password,"NewPassword":NewPassword}));




}