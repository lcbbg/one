var express = require('express')
var path = require("path");
var mysql = require('mysql')
var router = express.Router()
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'20000824lcbbg',//修改为自己的密码
    database:'runoob'//修改为自己的数据库
})
connection.connect()
router.get('/',function(req,res){
    res.sendfile(path.join(__dirname,"../public/login.html"))
    //_dirname:当前文件的路径，path.join():合并路径
})
/**
*登录验证功能
*/
   router.use(bodyParser.urlencoded({extended: false}));

    router.use(bodyParser.json());

    router.post('/login',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    var data =req.body;
    console.log(data);
    var id= data.username
    var passworld= data.password;

    var query1 = "select * from user where id='"+id+"' and passworld ='"+passworld+"'"
    connection.query(query1,function(err,result){
        if (err) throw err;
        if(result.length==0){
               console.log("登录失败!")
               return res.json({failed:404});
        }else{
                //res.status(200);
               return  res.json(data);
                console.log("登录成功!")
               }
        res.end();
        res.sendfile(path.join(__dirname,"../public/main.html"))
    })
})
/***
 * 注册功能
 */
    router.post('/register',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    var data =req.body;
    console.log(data);
    var id= data.username
    var passworld= data.password;
    var user = [id,passworld];
    var query1 = 'insert into user(id,passworld) values(?,?)';
    connection.query(query1,user,function(err,result){
    if(err) throw err;
     if(result.length==0){
               console.log("注册失败!")
               res.json({failed:404});
        }else{
                res.status(200);
                res.json(data);
                console.log("注册成功!")
               }
        res.end();
    console.log("***")
    res.sendfile(path.join(__dirname,"../public/login.html"))
    })
})

module.exports = router;