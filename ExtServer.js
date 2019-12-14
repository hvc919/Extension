const Express= require('express');
const ExpManager = Express();
const port = 1942;
var BodyPharser=require('body-parser');
var Queue = require("./ModifiedQueue.js");//quque
var User = require("./User.js");//User
var DataBaseCon = require("./DataBaseConnection.js");//DataBase Connection didnt use yet


//var UrlConnected = {}; //dictonary - UserName is key and value is url array in case im connected to more than 1 site (might need to think about a better way)
//var MsgTemp = {}; //dictonary - url is key and value is msg array (temp until i will use database prob)
// function Connect(req,res)
// {
//     if(UrlConnected[req.body.UserName]!=req.body.url)
//     {
//         UrlConnected[req.body.UserName] = req.body.url;
//         console.log("good1");
        
//     }
//     res.send(JSON.stringify({"status":true}));
    
    
// }
// function GetMesseages(req,res)
// {
//     if(MsgTemp[req.body.url]!=null&&MsgTemp[req.body.url]!=undefined)
//     {
//         console.log("sending msg");
//         console.log(MsgTemp[req.body.url]);
//         res.send(JSON.stringify({"MsgArray":MsgTemp[req.body.url],"status":true}));
//     }
//     else
//     {
//         console.log("doesnt00");
//         res.send(JSON.stringify({"status":false}))
//     }
    
// }
// function Messeage(req,res)
// {
//     if(MsgTemp[req.body.url]==undefined || MsgTemp[req.body.url]==null)
//     {
//         console.log("----");
//         var array = [];
//         MsgTemp[req.body.url] =array;
//         console.log("please");
//     }
//     console.log(MsgTemp[req.body.url]);
//     MsgTemp[req.body.url].push(req.body.msg);
//     console.log(MsgTemp[req.body.url]);
//     res.send(JSON.stringify({"status":true}));
// }




// function Login(req,res)
// {
//     var mysql = require('mysql');
//     var con = mysql.createConnection(
// {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
// });

// con.connect(function(err) {
//   var stat={'status':false};
//   con.query("select * from user where UserName=?",[req.body.UserName] ,function (err, result, fields) {
//     if (err)
//     {
//         console.log("There is no such user");
//         res.send(JSON.stringify(stat));
        
//     }
//     else
//     {   
//         if(result.length>0)
//             {    
//             if(req.body.Password==result[0].Password)
//              {
//                 stat={'status':true};
//                 console.log("managed to log-In");
//              }
//              else
//              {                
//                 console.log("Password was incorrect or invalied");                
//              }
//             }
//             else
//             {
//                 console.log("Username is wrong");

//             }            
//             res.send(JSON.stringify(stat))
//     }
//     con.end();
//   });
// });
// }

// function Register(req,res)
// {
//     console.log("im in");
//     var mysql = require('mysql');
//     var con = mysql.createConnection(
// {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
// });

// con.connect(function(err) {
//   var stat={'status':false};
//   con.query("INSERT INTO user (UserName,Password) VALUES (?,?);",[req.body.UserName,req.body.Password] ,function (err, result, fields) {
//     if (err)
//     { 
//         console.log("This User Name Already Exists");
//         res.send(JSON.stringify({'status':false}));
//     }
//     else
//     {   
//         console.log("works!");
//         res.send(JSON.stringify({'status':true}));
//     }
// });
// });
// }

// function LoginToChange(req,res)
// {

//     var mysql = require('mysql');
//     var con = mysql.createConnection(
// {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
// });

// con.connect(function(err) {
//   var stat={'status':false};
//   con.query("select * from user where UserName=?",[req.body.UserName] ,function (err, result, fields) {
//     if (err)
//     {
//         console.log("There is no such user");
//         res.send(JSON.stringify(stat));
        
        
//     }
//     else
//     {   
//         if(result.length>0)
//             {    
//             if(req.body.Password==result[0].Password)
//              {
//                 stat={'status':true};
//                 console.log("managed to log-In");
//                 ChangePassword(req.body.UserName,req.body.NewPassword,res)
//              }
//     }
    
//     }
//     con.end();
//   });
// });
// }




// function ChangePassword(UserName,NewPassword,res)
// {
//     var mysql = require('mysql');
//     var con = mysql.createConnection(
// {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
// });

// con.connect(function(err) {
//   var stat={'status':false};
//   con.query("UPDATE user SET Password=? WHERE UserName=?",[NewPassword,UserName] ,function (err, result, fields) {
//     if (err)
//     {
//         console.log("didnt change");
//         res.send(JSON.stringify({'status':false}));
        
        
//     }
//     else
//     {   
//         console.log("Changed");
//         res.send(JSON.stringify({'status':true}));

//     }
//     con.end();
//     })
// })
// }



//     function PublicMsgSend(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("INSERT INTO chatmessage (`Content`, `UserName`, `URL`, `Time`) VALUES (?, ?, ?, ?)",[req.body.Message,req.body.UserName,req.body.Url,req.body.Date] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
//             console.log("something went wrong:msg to db");
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   
//             UpdateStats(req,res);
//         }
//         con.end();
//         })
//     })
//     }

//     function InsertURL(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("INSERT INTO chat (`URL`,`EntranceCount`) VALUES (?, ?) ON DUPLICATE KEY UPDATE EntranceCount=EntranceCount+1",[req.body.Url,'1'] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
//             console.log("something went wrong: URL insertor");
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   
//             //res.send(JSON.stringify({'status':true}));
//             GetChatStats(req,res);
//         }
//         con.end();
//         })
//     })
// }


// //
//     function GetChatStats(req,res)// on client side send interval to this function inorder to get chat entrace count ever x time (5 sec interval or so)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("SELECT EntranceCount FROM chat WHERE URL=?",[req.body.Url] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
//             console.log("something went wrong:");//edit
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   
//             res.send(JSON.stringify({'status':true,'UrlCounter':result[0].EntranceCount}));
//         }
//         con.end();
//         })
//     })
//     }

//     function GetStats(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("SELECT MessageCounter FROM stats WHERE UserName=? AND URL=?",[req.body.UserName,req.body.Url] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
           
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   
//             if(result.length==0)//check
//             {
//                 InsertToStats(req,res);
//             }
//             else
//             {
//                 res.send(JSON.stringify({'status':true,"MessageCounter":result[0].MessageCounter}));//check
//             }    
//         }
//         con.end();
//         })
//     })
//     }


//     function InsertToStats(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("INSERT INTO stats (`MessageCounter`, `URL`, `UserName`) VALUES ('0', ?, ?)",[req.body.Url,req.body.UserName] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
           
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   

//             res.send(JSON.stringify({'status':true,"MessageCounter":0}));
  
//         }
//         con.end();
//         })
//     })
//     }

//     function UpdateStats(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("UPDATE stats SET MessageCounter = MessageCounter + 1 WHERE URL=? AND UserName=?",[req.body.Url,req.body.UserName] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
           
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   
//             res.send(JSON.stringify({'status':true}));
//         }
//         con.end();
//         })
//     })
//     }




//   function SendPrivateMessage(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//             host: "localhost",
//             user: "root",
//             password: "josh17rog",
//             database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("INSERT INTO privatemessage (`Content`, `Sender`, `SentTo`, `Time`) VALUES (?, ?,?,?)",[req.body.Message,req.body.UserName,req.body.SendTo,req.body.Date] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log(err);
//             console.log("something went wrong:private msg to db");
//             res.send(JSON.stringify({'status':false}));
//         }
//         else
//         {   
//             res.send(JSON.stringify({'status':true}));
//         }
//         con.end();
//         })
//     })
//     }

//     function GetAllPrivateMessages(req,res)
//     {
//         console.log("im in");
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("SELECT * FROM privatemessage WHERE SentTo=? ORDER BY ID DESC LIMIT 5",[req.body.UserName] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log("something went wrong: Private Get Chat Msg");
//             res.send(JSON.stringify({'status':false}));//check
//         }
//         else
//         {   
//             console.log("why?")
//             console.log(result)
//             res.send(JSON.stringify({'status':true,'Messages':result}));
//         }
//         con.end();
//         })
//     })
//     }

//     function GetPrivateMessages(req,res)
//     {
//         console.log("im in");
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("SELECT * FROM privatemessage WHERE SentTo=? AND ID>? ORDER BY ID DESC",[req.body.UserName,req.body.ID] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log("something went wrong: Private Get Chat Msg (not first time)");
//             res.send(JSON.stringify({'status':false}));//check
//         }
//         else
//         {   
//             console.log("why?")
//             console.log(result)
//             res.send(JSON.stringify({'status':true,'Messages':result}));
//         }
//         con.end();
//         })
//     })
//     } 


//     //


  








//     function GetAllMsg(req,res)//gets the 10 first msgs
//     {
//         console.log("im in");
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("SELECT * FROM chatmessage WHERE URL=? ORDER BY ID DESC LIMIT 10",[req.body.Url] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log("something went wrong: Get Chat Msg");
//             res.send(JSON.stringify({'status':false}));//check
//         }
//         else
//         {   
//             console.log("why?")
//             console.log(result)
//             res.send(JSON.stringify({'status':true,'Messages':result}));
//         }
//         con.end();
//         })
//     })
//     }


//     function GetMsgFromIndex(req,res)
//     {
//         var mysql = require('mysql');
//         var con = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "josh17rog",
//         database: "chatdata"
//     });
    
//     con.connect(function(err) {
//       con.query("SELECT * FROM chatmessage WHERE URL=? AND ID>? ORDER BY ID DESC",[req.body.Url,req.body.ID] ,function (err, result, fields) {
//         if (err)
//         {
//             console.log("something went wrong: Get Msg From Index");
//             res.send(JSON.stringify({'status':false}));//check
//         }
//         else
//         {   
//             console.log("Got Msg")
//             console.log(result)
//             res.send(JSON.stringify({'status':true,'Messages':result}));
//         }
//         con.end();
//         })
//     })
//     }












ExpManager.use(BodyPharser.json()); //server now u can pharse json to regular text
ExpManager.use(BodyPharser.urlencoded({ extended: true })); 
// ExpManager.post('/Messeage',Messeage);
// ExpManager.post('/Connect',Connect)
// ExpManager.post('/GetMesseages',GetMesseages);

ExpManager.post('/ChangePass',DataBaseCon.LoginToChange);
ExpManager.post('/Login',DataBaseCon.Login);
ExpManager.post('/Register',DataBaseCon.Register);
ExpManager.post('/PublicSendMessage',DataBaseCon.PublicMsgSend);
ExpManager.post('/UrlInsert',DataBaseCon.InsertURL);
ExpManager.post('/ConnectionMsg',DataBaseCon.GetAllMsg);
ExpManager.post('/FromIndexMsg',DataBaseCon.GetMsgFromIndex);//


ExpManager.post('/GetPersonalStats',DataBaseCon.GetStats);
ExpManager.post('/GetChatStats',DataBaseCon.GetChatStats)
ExpManager.post('/FirstGetPrivateMessage',DataBaseCon.GetAllPrivateMessages);
ExpManager.post('/GetPrivateMessage',DataBaseCon.GetPrivateMessages);
ExpManager.post('/PrivateSendMessage',DataBaseCon.SendPrivateMessage);

ExpManager.listen(port,() => console.log('Server On'));