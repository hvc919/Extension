var pageUrl;
var UserName;
//var Password;
var PLastID;
var LastID;//i will get a value for it on the first DisplayMsgs
var PIntervaler;
var Intervaler;

var PButtonClicked=false;


window.onload = function(){ 
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) 
    {
        alert(tabs[0].url);
        pageUrl=tabs[0].url;
        chrome.storage.sync.get("User", function(result) {
            UserName = result.User.UserName;
            //Password = result.User.Password;
            // UrlCheck();
            UrlConnector();//instead of urlcheck
            setInterval(PersonalStats, 3000);
            DisplayMsgs();    
        });
    })
}

document.addEventListener('DOMContentLoaded', function() {    
    var button = document.getElementById('Disconnect');
    var PrivateButton = document.getElementById('PrivateB');
    var sa = document.getElementById("SendButton");
    sa.addEventListener('click',SendMessage);
    button.addEventListener('click', function() {
        chrome.storage.sync.remove("User", function(Items) {
        window.location.href = "LoginPage.html";
        });
    });
    PrivateButton.addEventListener('click',function(){
        if(PButtonClicked==false)
        { 
        OnClickGetPrivateMessage();
        //setInterval(GetPrivateMessage,3000);
        PButtonClicked=true;
        }
    });
});
function SendMessage() //send msg
{
        var text =document.getElementById("tex").value;
        var DateTime=GetTime();
       if(text[0]=='/'&&text[1]=='w')
       {
           alert("hihih");
            SendPrivateMessage();
       }
       else
       {

       

    var http = new XMLHttpRequest();
    var url = 'http://localhost:1942/PublicSendMessage';
    http.open('POST', url, true);
    
    http.setRequestHeader('Content-Type','application/json'); 
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            let D = JSON.parse(http.responseText);          
            alert(D.status);
            if(D.status==true)
            {
                alert("yey");
            }
        }
    }
    http.send(JSON.stringify({"Url":pageUrl,"Message":text,"Date":DateTime,"UserName":UserName}));
    }
}

function GetTime()   //Current time
{
    var Current = new Date();
    var DateString =Current.getFullYear()+"-";
    DateString+=""+Padding(Current.getMonth()+1)+"-";
    DateString+=""+Padding(Current.getDate())+" ";
    DateString+=""+Padding(Current.getHours())+":";
    DateString+=""+Padding(Current.getMinutes())+":";
    DateString+=""+Padding(Current.getSeconds());
    return DateString;
}
function Padding(val)
{
    if(val<10)
    {
        val="0"+val;
    }
    return val;
}

// function UrlCheck()   //On Connection send url (if exists +1 else create new url)
// {
//     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) 
//     {
//         pageUrl = tabs[0].url;
//         var http = new XMLHttpRequest();
//         var url = 'http://localhost:1942/UrlInsert';
//         http.open('POST', url, true);
    
//         http.setRequestHeader('Content-Type','application/json'); 
    
//         http.onreadystatechange = function() {//Call a function when the state changes.
//             if(http.readyState == 4 && http.status == 200) 
//             {
//                 let D = JSON.parse(http.responseText);          
//                 alert(D.status);
//                 if(D.status==true)
//                 {
//                     alert("Url Premmision: Pass");
//                     return D.status;
//                 }
//             }
//         }
//         http.send(JSON.stringify({"Url":pageUrl}));
//     });
// }

    function UrlConnector() 
    {

            var http = new XMLHttpRequest();
            var url = 'http://localhost:1942/UrlInsert';
            http.open('POST', url, true);
        
            http.setRequestHeader('Content-Type','application/json'); 
        
            http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4 && http.status == 200) 
                {
                    let D = JSON.parse(http.responseText);          
                    alert(D.status);
                    if(D.status==true)
                    {
                        alert("Url Premmision: Pass");
                        document.getElementById("ChatStats").innerHTML =D.UrlCounter+" Connections were made to this URL";//UrlCounter
                        setInterval(UrlStats, 5000);
                    }
                }
            }
            http.send(JSON.stringify({"Url":pageUrl,"UserName":UserName}));
    }


    function DisplayMsgs(Array)
    {

        var http = new XMLHttpRequest();
        var url = 'http://localhost:1942/ConnectionMsg';
        http.open('POST', url, true);
    
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) 
            {
                let D = JSON.parse(http.responseText);          
                alert(D.status);
                if(D.status==true)
                {
                    if(D.Messages.length>0&&LastID==undefined)
                    {
                        if(Intervaler!=undefined)
                        {
                            
                            clearInterval(Intervaler);
                            Intervaler = undefined;
                            alert(Intervaler);
                        }
                        MsgArrayToHtml(D.Messages);
                        setInterval(IncomingMsg,2000);  //check if works 10/12
                    }
                    else if(LastID==undefined)
                    {
                        if(Intervaler==undefined)
                        {
                            Intervaler = setInterval(DisplayMsgs,3000);
                        }    
                    }
                    else
                    {  
                        MsgArrayToHtml(D.Messages);
                    }
                }
            }
        }      
        http.send(JSON.stringify({"Url":pageUrl}));
    }

    function MsgArrayToHtml(array)
    {
        if(array!=undefined&&array!=null&&array.length>0)
        {
            var Div = document.getElementById('Display');
            alert("why im here");
            LastID = array[0].ID;
            for(var i = array.length-1;i>=0;i--)
            {
                let temp =array[i];
                Div.innerHTML +=temp.UserName+" ("+TimeFix(temp.Time)+"):"+temp.Content+"<br/>";    
            }
        }

    }

    function TimeFix(Time)
    {
        var Fixed = Time.substring(0,19);
        return Fixed;
    }
 

    function IncomingMsg()
    {

        var http = new XMLHttpRequest();
        var url = 'http://localhost:1942/FromIndexMsg';
        http.open('POST', url, true);
    
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) 
            {
                let D = JSON.parse(http.responseText);          
                
                if(D.status==true)
                {
                    
                    MsgArrayToHtml(D.Messages)
                }
            }
        }      
        http.send(JSON.stringify({"Url":pageUrl,"ID":LastID}));
    }
   // setInterval(IncomingMsg,2000); //check if works








    function PersonalStats() //new
    {
        var http = new XMLHttpRequest();
        var url = 'http://localhost:1942/GetPersonalStats';//
        http.open('POST', url, true);
    
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) 
            {
                let D = JSON.parse(http.responseText);          
                
                if(D.status==true)
                {
                    MsgCounter = D.MessageCounter;
                    document.getElementById("PersonalStats").innerHTML = "I Sent:"+MsgCounter+" Messages";
                }
            }
        }      
        http.send(JSON.stringify({"Url":pageUrl,"UserName":UserName}));
    }

    function UrlStats()
    {
        var http = new XMLHttpRequest();
        var url = 'http://localhost:1942/GetChatStats';//
        http.open('POST', url, true);
    
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) 
            {
                let D = JSON.parse(http.responseText);          
                
                if(D.status==true)
                {
                    document.getElementById("ChatStats").innerHTML =D.UrlCounter+" Connections were made to this URL";//UrlCounter
                }
            }
        }      
        http.send(JSON.stringify({"Url":pageUrl,"UserName":UserName}));
    }

    function OnClickGetPrivateMessage()
    {

        var http = new XMLHttpRequest();
        var url = 'http://localhost:1942/FirstGetPrivateMessage';//
        http.open('POST', url, true);
    
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) 
            {
                let D = JSON.parse(http.responseText);          
                
                if(D.status==true)
                {
                    if(D.Messages.length>0&&PLastID==undefined)
                    {
                        if(PIntervaler!=undefined)
                        {
                            clearInterval(PIntervaler);
                            PIntervaler = undefined;
                        }
                        PrivateMsgArrayToHtml(D.Messages);
                        setInterval(GetPrivateMessage,3000);  //check if works 10/12
                    }
                    else if(PLastID==undefined)
                    {
                        if(PIntervaler==undefined)
                        {
                            PIntervaler = setInterval(OnClickGetPrivateMessage,3000);
                        }    
                    }
                    else
                    {  
                        PrivateMsgArrayToHtml(D.Messages);
                    }
                  
                }
            }
        }      
        http.send(JSON.stringify({"UserName":UserName}));
    }

    function GetPrivateMessage()
    {
        var http = new XMLHttpRequest();
        var url = 'http://localhost:1942/GetPrivateMessage';//
        http.open('POST', url, true);
    
        http.setRequestHeader('Content-Type','application/json'); 
    
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) 
            {
                let D = JSON.parse(http.responseText);          
                
                if(D.status==true)
                {
                    PrivateMsgArrayToHtml(D.Messages);
                }
            }
        }      
        http.send(JSON.stringify({"UserName":UserName,"ID":PLastID}));
    }

    function PrivateMsgArrayToHtml(array)
    {   
        if(array.length>0)
        {
        var Div = document.getElementById('Display');
        PLastID = array[0].ID;
        for(var i = array.length-1;i>=0;i--)
        {
            let temp = array[i];
            Div.innerHTML +="/W-"+temp.UserName+" ("+TimeFix(temp.Time)+"):"+temp.Content+"<br/>";    
        }
        }

    }


function SendPrivateMessage()
{
    var text =document.getElementById("tex").value;
    var DateTime=GetTime();
    var SendTo = text.substring(3);
    SendTo = SendTo.substring(0,SendTo.indexOf(' '));
    alert(SendTo);
    text=text.substring(3);
    text=text.substring(text.indexOf(' ')+1);

var http = new XMLHttpRequest();
var url = 'http://localhost:1942/PrivateSendMessage';
http.open('POST', url, true);

http.setRequestHeader('Content-Type','application/json'); 

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        let D = JSON.parse(http.responseText);          
        
        if(D.status==true)
        {
            alert("yey");
        }
    }
}
http.send(JSON.stringify({"SendTo":SendTo,"Message":text,"Date":DateTime,"UserName":UserName}));
}

























// function Connect(){
//     var pageUrl;
//     var username;
//     chrome.storage.sync.get(['UserName'], function(result) {
//         username = result.UserName;
//       });
//     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) { //chrome.tabs.query is an async function
//         pageUrl = tabs[0].url;
//         var http = new XMLHttpRequest();
//     var url = 'http://localhost:1942/Connect';
//     http.open('POST', url, true);
    
//     http.setRequestHeader('Content-Type','application/json'); 
    
//     http.onreadystatechange = function() {//Call a function when the state changes.
//         if(http.readyState == 4 && http.status == 200) {
//             let D = JSON.parse(http.responseText); 
//             if(D.status==true)
//             {
//                 setInterval(GetNewMessages,500);
//             }
//         }
//     }
//     http.send(JSON.stringify({"url":pageUrl,"UserName":username}));
//     });
// }



// function SendMessage(){
//     var pageUrl;
//     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//         pageUrl = tabs[0].url;
//         var text =document.getElementById("tex").value;
//     var http = new XMLHttpRequest();
//     var url = 'http://localhost:1942/Messeage';
//     http.open('POST', url, true);
    
//     http.setRequestHeader('Content-Type','application/json'); 
    
//     http.onreadystatechange = function() {//Call a function when the state changes.
//         if(http.readyState == 4 && http.status == 200) {
//            let D = JSON.parse(http.responseText);          
//             alert(D.status);
//             if(D.status==true)
//             {
//             }
//         }
//     }
//     http.send(JSON.stringify({"url":pageUrl,"msg":text}));
//     });
//     }

//     function GetNewMessages()
//     {
//         var pageUrl;
//         chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//             pageUrl = tabs[0].url;
//             var http = new XMLHttpRequest();
//         var url = 'http://localhost:1942/GetMesseages';
//         http.open('POST', url, true);
        
//         http.setRequestHeader('Content-Type','application/json'); 
        
//         http.onreadystatechange = function() {//Call a function when the state changes.
//             if(http.readyState == 4 && http.status == 200) {
//                let D = JSON.parse(http.responseText);          
//                 console.log(D.status);
//                 if(D.status==true)
//                 {
//                     document.getElementById("divd").innerHTML = D.MsgArray[0];  
//                 }
//             }
//         }
//         http.send(JSON.stringify({"url":pageUrl}));
//         });
        
        
//     }


