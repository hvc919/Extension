// window.onload = function(){
// alert("hi!");
//     chrome.storage.sync.get(["UserName"], function(result) {
//         if(result.UserName!=null && result.UserName!=undefined)
//         {
//             window.location.href = "popup.html";
//         }

//       });
// }


// function Register(){
// var User = document.getElementById("UserN").value
//     chrome.storage.sync.set({"UserName": User}, function() {
//     window.location.href = "popup.html";
//   });
  
// } 


function Register()
{
    var User = document.getElementById("UserName").value;
    var Password = document.getElementById("UserPass").value;
    
    var http = new XMLHttpRequest();
    var url = 'http://localhost:1942/Register'; //add Login Path to server
    http.open('POST', url, true);
    
    http.setRequestHeader('Content-Type','application/json'); 
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           let D = JSON.parse(http.responseText);          
            alert(D.status);
            if(D.status==true)
            {
                alert("Registered!");
                window.location.href = "LoginPage.html";
                //Redirect
            }
        }
    }
    http.send(JSON.stringify({"UserName":User,"Password":Password}));
}












document.addEventListener('DOMContentLoaded', function() {    
    var but = document.getElementById('RegisterButton');
    // onClick's logic below:
    but.addEventListener('click', function() {
        Register();
    });
});


 
