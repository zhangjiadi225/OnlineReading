var express = require('express');
var router = express.Router();
var db = require("../util/dbconfig");  // 引入数据库方法


//注册 
router.get('/register', (req, res) => {
  console.log(req.query);
  let sql1 = `select * from users where tel = '${req.query.tel}'`  // 查找数据表中是否已经存在用户
  // let sql1 = `select * from users where FIND_IN_SET('${req.query.user}', user)`  // 查找数据表中是否已经存在用户
  let sql2 = `INSERT INTO users(tel,paw) VALUES(?,?)`    // 插入语句，将前端传递过来的手机号和密码插入到数据库中
  db.query(sql1,function(err,data){
      if(err){
          res.send({
                  msg:"注册失败",
                  code:500
          });
      }else {
          if(data.length==0){  // data 为查询出来的结果，如果查询的手机号不存在，将会返回一个空数据 所有此时 data[0]==undefined, 执行插入语句操作;
              db.query(sql2,[req.query.tel,req.query.paw],function(err,data){
                  if(err){
                      res.send({
                          code:500,
                          msg:"注册失败!",
                      });
                      console.log(err)
                  }else {
                      // console.log(data);
                      // res.redirect("/users"); 重定向，添加完后返回到用户首页
                      res.send({
                              msg:"注册成功",
                              code:200
                      });
                  }
              });
          }else{
              // 当tel用户存在时
              res.send({code:0, msg:'用户名已存在'})
          }
      }
  });
});

// 登录
router.get('/signIn', (req, res)=>{
  let {
  tel,
  paw
  } = req.query;

  console.log(req.query)

let sql = `select * from users where FIND_IN_SET('${tel}', tel)`
db.query(sql,(err,data) => {
  // console.log(data)
  if (err) {
      console.log(err);
      return res.json({
          code: -1,
          msg: '登录失败'
      })
  } else {
      console.log("c")
      console.log(data);
      // 当data数组不为空时，代表该手机号注册过，然后匹对密码
      if(data.length==0){
          // 当 data 为空数组时，代表该手机号没有注册
          res.send({
              data:data,
              code:0,
              msg:"该用户没有注册"
          });
      }else{
          if(data[0].paw == paw){
              res.send({
                  data:data[0],
                  code:200,
                  token:"jk1235468956dasldsa",
                  msg:"登录成功！"
              });
          }else{
              res.send({
                  code:500,
                  msg:"密码错误"
              });
          }
      }
  }
  })
});


//查询所有的书籍
router.get('/getBooks', (req, res) => {    
  var sql = "select * from books";
  db.query(sql, (err, data) => {
      if (err) {
          res.send({
              code: 500,
              msg: "获取失败"
          })
      } else {
          res.send({
              list: data,
              code: 200,
               msg: "获取数据成功"
          })
      }
  });
});

// 添加到书架
router.post('/addShujia', (req, res) => {
    console.log(req.body);
    let sql1 = `select * from shujia where tel = '${req.body.tel}' && book_id = '${req.body.book_id}'`  // 查看用户是否将书是否已经添加到书架
    // let sql1 = `select * from users where FIND_IN_SET('${req.query.user}', user)`  // 查找数据表中是否已经存在用户
    let sql2 = `INSERT INTO shujia(book_id,title,img,miaoshu,num,msg,tel) VALUES(?,?,?,?,?,?,?)`    // 插入语句，将前端传递过来的手机号和密码插入到数据库中
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"添加失败",
                    code:500
            });
        }else {
            if(data.length==0){  // data 为查询出来的结果，如果查询的手机号不存在，将会返回一个空数据 所有此时 data[0]==undefined, 执行插入语句操作;
                db.query(sql2,[req.body.book_id,req.body.title,req.body.img,req.body.miaoshu,req.body.num,req.body.msg,req.body.tel],function(err,data){
                    if(err){
                        res.send({
                            code:500,
                            msg:"添加失败!",
                        });
                        console.log(err)
                    }else {
                        // console.log(data);
                        // res.redirect("/users"); 重定向，添加完后返回到用户首页
                        res.send({
                                msg:"添加成功!",
                                code:200
                        });
                    }
                });
            }else{
                // 当tel用户存在时
                res.send({code:0, msg:'该书已添加过！'})
            }
        }
    });
});

// 分类
router.get('/getFenlei', (req, res) => {
    let sql1 = `select * from books where num = '${req.query.num}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
});

// 我的书架
router.get('/getMyShujia', (req, res) => {
    console.log(req.query);
    let sql1 = `select * from shujia where tel = '${req.query.tel}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"获取失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"获取成功！",
                code:"200"
            });
        }
    });
});

// 删除图书 
  router.get('/delShujia', (req, res) => {
        let sql = `delete from shujia where shujia_id = ${req.query.shujia_id}`;
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                res.send({
                    code: 500,
                    msg: "删除失败"
                })
            } else {
                res.send({
                    code: 200,
                    msg: "删除成功"
            })
        }
    })
})

// 发布图书
router.post('/addBook', (req, res) => {
    // req.body.name
    console.log(req.body);
    let sql = `INSERT INTO books(msg,title,img,miaoshu,num,shijian) VALUES(?,?,?,?,?,?)`   
        db.query(sql,[req.body.msg,req.body.title,req.body.img,req.body.miaoshu,req.body.num,req.body.shijian],function(err,data){
                if(err){
                    res.send({
                        code:500,
                        msg:"添加失败!",
                    });
                        console.log(err)
                    }else {
                        // console.log(data);
                        // res.redirect("/users"); 重定向，添加完后返回到用户首页
                        res.send({
                            msg:"添加成功!",
                             code:200
                    });
                }
        });
});

  // 搜索
router.get('/search', (req, res)=>{
    console.log(req.query)
// 查询语句
let sql = `select * from books where title REGEXP '${req.query.title}'`
db.query(sql,(err,data) => {
    // console.log(data)
    if (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '搜索失败'
        })
    } else {
            console.log(data)
            res.send({
                list:data,
                code:200,
                msg:"搜索成功"
            });
        }
  })
});

// 用户管理


// 获取所有用户
  // 分类
router.get('/getUser', (req, res) => {
    let sql1 = `select * from users`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
});

 // 修改用户信息
 // 修改列表,根据id修改
 router.get('/updateUser', (req,res)=>{
    var sql = `update users set paw='${req.query.paw}',xingming='${req.query.xingming}',xingbie='${req.query.xingbie}',nicheng='${req.query.nicheng}' where id='${req.query.id}'`;
    console.log(req);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// admin 修改密码
 router.get('/updatePost', (req,res)=>{
    var sql = `update users set paw='${req.query.paw}' where id='${req.query.id}'`;
    console.log(req);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// 获取用户个人信息
router.get('/getUserInfo', (req, res) => {
    let sql1 = `select * from users where id = '${req.query.id}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
});


// 删除用户
router.get('/delUser', (req, res) => {
    let sql = `delete from users where id = ${req.query.id}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
})
})

// 修改图书
router.get('/updateBook', (req,res)=>{
    var sql = `update books set title='${req.query.title}',miaoshu='${req.query.miaoshu}',shijian='${req.query.shijian}' where book_id='${req.query.book_id}'`;
    console.log(req);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// 删除图书
// 删除用户
router.get('/delBook', (req, res) => {
    let sql = `delete from books where book_id = ${req.query.book_id}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
})
})

// 获取所有的书架信息
// 我的书架
router.get('/getShujia', (req, res) => {
    let sql1 = `select * from shujia`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"获取失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"获取成功！",
                code:"200"
            });
        }
    });
});


   

  

module.exports = router;
