const Host = "localhost"
const User = "root";
const Password = "josh17rog";
const DataBase = "chatdata";
var Account = require("./User.js");
var ChatMessage = require("./ChatMessage")
class DataBaseConnection
{


    static Login(req,res) //Login- gets username and password from client, validate and return true or false
    {
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

    con.connect(function(err) {
        var stat={'status':false};
        con.query("select * from user where UserName=?",[req.body.UserName] ,function (err, result, fields) {
    if (err)
    {
        console.log("There is no such user");
        res.send(JSON.stringify(stat));
        
    }
    else
    {   
        if(result.length>0)
            {    
            if(req.body.Password==result[0].Password)
             {
                stat={'status':true};
                console.log("managed to log-In");
                var ThisUser = new Account(result[0].UserName,result[0].Password)
                res.send(JSON.stringify({'status':true,"User":ThisUser}));
             }
             else
             {                
                console.log("Password was incorrect or invalied");           
                res.send(JSON.stringify(stat))     
             }
            }
            else
            {
                console.log("Username is wrong");
                res.send(JSON.stringify(stat))
            }            
            
    }
    con.end();
  });
});
}


static Register(req,res)//User sends username and password, server inserts to the database
{
    console.log("im in");
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  var stat={'status':false};
  con.query("INSERT INTO user (UserName,Password) VALUES (?,?);",[req.body.UserName,req.body.Password] ,function (err, result, fields) {
    if (err)
    { 
        console.log("This User Name Already Exists");
        res.send(JSON.stringify({'status':false}));
    }
    else
    {   
        console.log("works!");
        res.send(JSON.stringify({'status':true}));
    }
});
});
}



static LoginToChange(req,res)//Validate user in order to change password
{

    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  var stat={'status':false};
  con.query("select * from user where UserName=?",[req.body.UserName] ,function (err, result, fields) {
    if (err)
    {
        console.log("There is no such user");
        res.send(JSON.stringify(stat));
        
        
    }
    else
    {   
        if(result.length>0)
            {    
            if(req.body.Password==result[0].Password)
             {
                stat={'status':true};
                console.log("managed to log-In");
                DataBaseConnection.ChangePassword(req.body.UserName,req.body.NewPassword,res)
             }
    }
    
    }
    con.end();
  });
});
}


static ChangePassword(UserName,NewPassword,res)//Change password after user validation
{
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  var stat={'status':false};
  con.query("UPDATE user SET Password=? WHERE UserName=?",[NewPassword,UserName] ,function (err, result, fields) {
    if (err)
    {
        console.log("didnt change");
        res.send(JSON.stringify({'status':false}));
        
        
    }
    else
    {   
        console.log("Changed");
        res.send(JSON.stringify({'status':true}));

    }
    con.end();
    })
})
}

static PublicMsgSend(req,res)//Client sends message,UserName,URL and time- server inserts to the database
{
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  con.query("INSERT INTO chatmessage (`Content`, `UserName`, `URL`, `Time`) VALUES (?, ?, ?, ?)",[req.body.Message,req.body.UserName,req.body.Url,req.body.Date] ,function (err, result, fields) {
    if (err)
    {
        console.log(err);
        console.log("something went wrong:msg to db");
        res.send(JSON.stringify({'status':false}));
    }
    else
    {   
        DataBaseConnection.UpdateStats(req,res);
    }
    con.end();
    })
})
}

static InsertURL(req,res)
    {
        var mysql = require('mysql');
        var con = mysql.createConnection(
            {
                    host: Host,
                    user: User,
                    password: Password,
                    database: DataBase
            });
    
    con.connect(function(err) {
      con.query("INSERT INTO chat (`URL`,`EntranceCount`) VALUES (?, ?) ON DUPLICATE KEY UPDATE EntranceCount=EntranceCount+1",[req.body.Url,'1'] ,function (err, result, fields) {
        if (err)
        {
            console.log(err);
            console.log("something went wrong: URL insertor");
            res.send(JSON.stringify({'status':false}));
        }
        else
        {   
            //res.send(JSON.stringify({'status':true}));
            DataBaseConnection.GetChatStats(req,res);
        }
        con.end();
        })
    })
}

static GetChatStats(req,res)// on client side send interval to this function inorder to get chat entrace count ever x time (5 sec interval or so)
{
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  con.query("SELECT EntranceCount FROM chat WHERE URL=?",[req.body.Url] ,function (err, result, fields) {
    if (err)
    {
        console.log(err);
        console.log("something went wrong:");//edit
        res.send(JSON.stringify({'status':false}));
    }
    else
    {   
        res.send(JSON.stringify({'status':true,'UrlCounter':result[0].EntranceCount}));
    }
    con.end();
    })
})
}


static GetStats(req,res)
{
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  con.query("SELECT MessageCounter FROM stats WHERE UserName=? AND URL=?",[req.body.UserName,req.body.Url] ,function (err, result, fields) {
    if (err)
    {
        console.log(err);
       
        res.send(JSON.stringify({'status':false}));
    }
    else
    {   
        if(result.length==0)//check
        {
           DataBaseConnection.InsertToStats(req,res);
        }
        else
        {
            res.send(JSON.stringify({'status':true,"MessageCounter":result[0].MessageCounter}));//check
        }    
    }
    con.end();
    })
})
}


static InsertToStats(req,res)
{
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  con.query("INSERT INTO stats (`MessageCounter`, `URL`, `UserName`) VALUES ('0', ?, ?)",[req.body.Url,req.body.UserName] ,function (err, result, fields) {
    if (err)
    {
        console.log(err);
       
        res.send(JSON.stringify({'status':false}));
    }
    else
    {   

        res.send(JSON.stringify({'status':true,"MessageCounter":0}));

    }
    con.end();
    })
})
}


static UpdateStats(req,res)
{
    var mysql = require('mysql');
    var con = mysql.createConnection(
        {
                host: Host,
                user: User,
                password: Password,
                database: DataBase
        });

con.connect(function(err) {
  con.query("UPDATE stats SET MessageCounter = MessageCounter + 1 WHERE URL=? AND UserName=?",[req.body.Url,req.body.UserName] ,function (err, result, fields) {
    if (err)
    {
        console.log(err);
       
        res.send(JSON.stringify({'status':false}));
    }
    else
    {   
        res.send(JSON.stringify({'status':true}));
    }
    con.end();
    })
})
}

static SendPrivateMessage(req,res)
    {
        var mysql = require('mysql');
        var con = mysql.createConnection(
            {
                    host: Host,
                    user: User,
                    password: Password,
                    database: DataBase
            });
    
    con.connect(function(err) {
      con.query("INSERT INTO privatemessage (`Content`, `Sender`, `SentTo`, `Time`) VALUES (?, ?,?,?)",[req.body.Message,req.body.UserName,req.body.SendTo,req.body.Date] ,function (err, result, fields) {
        if (err)
        {
            console.log(err);
            console.log("something went wrong:private msg to db");
            res.send(JSON.stringify({'status':false}));
        }
        else
        {   
            res.send(JSON.stringify({'status':true}));
        }
        con.end();
        })
    })
    }

    
    static GetAllPrivateMessages(req,res)
    {
        console.log("im in");
        var mysql = require('mysql');
        var con = mysql.createConnection(
            {
                    host: Host,
                    user: User,
                    password: Password,
                    database: DataBase
            });
    
    con.connect(function(err) {
      con.query("SELECT * FROM privatemessage WHERE SentTo=? ORDER BY ID DESC LIMIT 5",[req.body.UserName] ,function (err, result, fields) {
        if (err)
        {
            console.log("something went wrong: Private Get Chat Msg");
            res.send(JSON.stringify({'status':false}));//check
        }
        else
        {   
            console.log("why?")
            console.log(result)
            var MessagesArray = [];
            for(var i = 0;i<result.length;i++)
            {
                let Message = new ChatMessage(result[i].Sender,result[i].Content,result[i].Time,result[i].ID);
                MessagesArray.push(Message);
            }

            res.send(JSON.stringify({'status':true,'Messages':MessagesArray}));
        }
        con.end();
        })
    })
    }

    
    static GetPrivateMessages(req,res)
    {
        console.log("im in");
        var mysql = require('mysql');
        var con = mysql.createConnection(
            {
                    host: Host,
                    user: User,
                    password: Password,
                    database: DataBase
            });
    
    con.connect(function(err) {
      con.query("SELECT * FROM privatemessage WHERE SentTo=? AND ID>? ORDER BY ID DESC",[req.body.UserName,req.body.ID] ,function (err, result, fields) {
        if (err)
        {
            console.log("something went wrong: Private Get Chat Msg (not first time)");
            res.send(JSON.stringify({'status':false}));//check
        }
        else
        {   
           // console.log("why?")
            console.log(result)
            var MessagesArray = [];
            for(var i = 0;i<result.length;i++)
            {
                let Message = new ChatMessage(result[i].Sender,result[i].Content,result[i].Time,result[i].ID);
                MessagesArray.push(Message);
            }
            res.send(JSON.stringify({'status':true,'Messages':MessagesArray}));
        }
        con.end();
        })
    })
    }
    
    static GetAllMsg(req,res)//gets the 10 first msgs
    {
        console.log("im in");
        var mysql = require('mysql');
        var con = mysql.createConnection(
            {
                    host: Host,
                    user: User,
                    password: Password,
                    database: DataBase
            });
    
    con.connect(function(err) {
      con.query("SELECT * FROM chatmessage WHERE URL=? ORDER BY ID DESC LIMIT 10",[req.body.Url] ,function (err, result, fields) {
        if (err)
        {
            console.log("something went wrong: Get Chat Msg");
            res.send(JSON.stringify({'status':false}));//check
        }
        else
        {   
            console.log("why?")
            console.log(result)

            var MessagesArray = [];
            for(var i = 0;i<result.length;i++)
            {
                let Message = new ChatMessage(result[i].UserName,result[i].Content,result[i].Time,result[i].ID);
                MessagesArray.push(Message);
            }

            res.send(JSON.stringify({'status':true,'Messages':MessagesArray}));
        }
        con.end();
        })
    })
    }

    static GetMsgFromIndex(req,res)
    {
        var mysql = require('mysql');
        var con = mysql.createConnection(
            {
                    host: Host,
                    user: User,
                    password: Password,
                    database: DataBase
            });
    
    con.connect(function(err) {
      con.query("SELECT * FROM chatmessage WHERE URL=? AND ID>? ORDER BY ID DESC",[req.body.Url,req.body.ID] ,function (err, result, fields) {
        if (err)
        {
            console.log("something went wrong: Get Msg From Index");
            res.send(JSON.stringify({'status':false}));//check
        }
        else
        {   
            console.log("Got Msg");
            console.log(result);

            var MessagesArray = [];
            for(var i = 0;i<result.length;i++)
            {
                let Message = new ChatMessage(result[i].UserName,result[i].Content,result[i].Time,result[i].ID);
                MessagesArray.push(Message);
            }

            res.send(JSON.stringify({'status':true,'Messages':MessagesArray}));
        }
        con.end();
        })
    })
    }























}









module.exports = DataBaseConnection;