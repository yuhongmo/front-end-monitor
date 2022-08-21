const express = require("express");
const router = express.Router();
const { getData } = require("./db/operation");

// 导入数据库操作模块
const db = require("./db/index");
const dbOperation = require("./db/operation");

router.get("/get", (req, res) => {
	const query = req.query;
	dbOperation.getData(req.query.table_name, results => {
		res.send({
			status: 0, // 0 表示处理成功，1 表示处理失败
			msg: "GET 请求成功!",
			data: results
		});
	});

	/* const sqlStr = "select * from timing";
	db.query(sqlStr, (err, results) => {
		// 查询数据失败
		if (err) return console.log(err.message);
		// 查询数据成功
		// 注意：如果执行的是 select 查询语句，则执行的结果是数组
		// console.log(results);
		// datas = results;
		res.send({
			status: 0, // 0 表示处理成功，1 表示处理失败
			msg: "GET 请求成功!",
			data: results
		});
  }); */
});

module.exports = router;
