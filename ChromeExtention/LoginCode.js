

document.addEventListener('DOMContentLoaded', function() {    
    var but = document.getElementById('LoginButton');
    but.addEventListener('click', Login);
});

function Login()
{
    var User = document.getElementById("UserName").value;
    var Password = document.getElementById("UserPass").value;
    
    var http = new XMLHttpRequest();
    var url = 'http://localhost:1942/Login'; //add Login Path to server
    http.open('POST', url, true);
    
    http.setRequestHeader('Content-Type','application/json'); 
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           let D = JSON.parse(http.responseText);          
            alert(D.status);           
            if(D.status==true)
            {
                alert("worked");
                alert(D.User.UserName);
                alert(D.User.Password);
                chrome.storage.sync.set({"User": D.User}, function() {});
                //chrome.storage.sync.set({"Password": Password}, function() {}); 
                window.location.href = "popup.html";
                //Redirect
            }
        }
    }
    http.send(JSON.stringify({"UserName":User,"Password":Password}));
}
