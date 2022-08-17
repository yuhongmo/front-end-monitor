// 引入http作为服务器
const http = require("http");
// 引入数据库
const mysql = require("mysql");

// 连接数据库
var connection = mysql.createConnection({
    host     : 'localhost',         //服务器地址，连接本机可以使用localhost或者127.0.0.1
    user     : 'root',              //连接数据库的用户名
    password : '***',               //连接数据库的密码
    database : 'front_data',          //数据库的名称
    port     : 3306                 //数据库端口号，默认3306，可以省略不写
});
//初始化
function addData( datas ) { 
    // 打开数据库连接
    connection.connect();
    // 执行简单的数据库插入操作
    let sql = "insert into data values( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
    // 执行插入操作
    connection.query(sql,datas,function (err, result) {
        if(err){
            console.log('插入失败',err.message);
            return;
        }     
        console.log('插入成功:',result);        
    });
    // 释放数据库连接
    connection.end();
}


//test
//var obj={a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9, j:10, k:11, l:12};
//插入object
/*var data=[];
for(var item in obj){
    data.push(item);
}
addData(data);
*/

//addData(["前端监控系统",  "http://localhost:8080/","1590817024490", "Chrome","stability","error","jsError","/success","http://localhost:8080/", "0:0","btnclick","HTML BODY"]);


// 查询操作，封装函数，查询当前表的所有数据
function selectAll() { 
    // 打开数据库连接
    connection.connect();
    // 编写sql语句
    let sql = "select * from data";
    // 执行sql，并处理执行的结果，查询的结果在results变量中，results其实是一个数组
    connection.query(sql, function (error, results, fields) {
        if (error)
            throw error;
        console.log('查询的结果：', results);
    });
    // 释放数据库连接
    connection.end();
}
selectAll();
