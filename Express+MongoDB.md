准备工作
安装一些必要的全局依赖
# 全局暴力设置淘宝源
npm config set registry http://registry.npm.taobao.org/

# 安装热更新工具nodemon（代码更新自动重启服务器）
npm i -g nodemon
复制代码
创建Express工程
创建工程
# 创建文件夹并使用终端开发
cd my_express_server

# 初始化工程
npm init -y

# 安装依赖
npm i express mongodb multer jsonwebtoken
复制代码
编辑入口文件
src/app.js
/* 引入依赖 */
const express = require("express");

/* 创建express实例 */
const app = express();

/* 定义路由接口 */
app.get("/", function (req, res) {
    res.send("Hello Express");
});

/* 挂载到指定端口 */
const server = app.listen(8002, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
复制代码
配置启动脚本
package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/app.js"
  },
复制代码
运行工程
npm run start
复制代码
路由派发
定义路由模块
定义首页路由
src/views/indexRouter.js
const express = require("express");

const router = express.Router();

/* 定义路由接口 */
// GET /
router.get("/", function (req, res) {
    res.send("Hello From indexRouter");
});

// GET /headers
router.get("/headers", (req, res, next) => {
    res.send(JSON.stringify({
        headers: req.headers,
    }));
});

/* 使用自定义中间件 */
router.get("/testtoken", loginCheck, (req, res, next) => res.end("test ok"));

module.exports = router;
复制代码
定义用户路由
src/views/userRouter.js
const express = require("express");
const controller = require("../controllers/userController");
const { getUser, updateUser } = require("../models/userModel");

const userRouter = express.Router();

userRouter.get("/", function (req, res, next) {
    res.send("用户首页");
});

userRouter.post("/register", async (req, res) => {
    res.send("register")
});

userRouter.post("/login", async (req, res) => {
    res.send("login")
});

module.exports = userRouter;
复制代码
派发路由到指定模块
src/app.js 核心代码
/* 引入路由 */
const indexRouter = require("./views/indexRouter");
const userRouter = require("./views/userRouter");
const fileRouter = require("./views/fileRouter");

/* 添加路由中间件 */
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);
复制代码
使用Postman测试接口
GET http://localhost:8002/get
POST http://localhost:8002/post
POST http://localhost:8002/user/register
POST http://localhost:8002/user/login
复制代码
读取GET/POST数据
配置全局中间件
src/app.js
const multer = require("multer");

/* 添加全局中间件 */
app.use(express.json());//json读写支持
app.use(express.urlencoded({ extended: false }));//表单支持
复制代码
读取查询参数
// GET http://localhost:8002/get?a=12&b=34
router.get("/get", function (req, res) {
    res.send(
        JSON.stringify({
            ...req.query,
        })
    );
});
复制代码
读取请求体
// POST http://localhost:8002/post
// router.post("/post", urlencodedParser, function (req, res) {
router.post("/post", function (req, res) {
    // res.send(
    //     JSON.stringify({
    //         msg:"msg from /post",
    //         ...req.body
    //     })
    // );

    res.json({
        msg: "msg from /post",
        ...req.body,
    });
});
复制代码
MongoDB的安装和基本使用
MongoDB数据库简介

非关系型数据库（不能做关联查询），但小快轻，适合中小复杂度的工程
存储形式为【集合+Bson文档】，可以理解为【文件夹+JSON文件】（Bson即二进制存储的Json）
Json数据形式为对象和数组的嵌套组合，跟JS语言具有天然亲和性
因此，NodeJS后台 + MongoDB数据库成为常用的黄金组合

下载安装MongoDB
社区版下载地址

windows版一路傻瓜式安装即可
mac版安装请参见：www.runoob.com/mongodb/mon…

MongoDB官方文档
MongoDB中文网文档
初始化数据库

使用客户端MongoDB Compass手动创建数据库
在Compass终端中输入命令use 数据库名称;即可切换到指定数据库

基本增删改查CRUD命令
# MongoDB数据存储结构
# MongoDB数据服务(后台进程-无界面)
#     其它数据库
#     my_express_server数据库
#         user        collection(文件夹)
#         xx.bson     文档(文件) 
# MongoDB Compass(前台进程-有界面)

# 切换到指定数据库（不存在则创建）
use my_express_server;

# CRUD操作
# Create创建/增加 Retrieve获取 Update更新 Delete删除

# 添加一条数据（如果集合user不存在会默认创建）
db.user.insertOne(
   { username:"heige",password:"123456" }
);

# 一次性插入多条数据（如果集合products不存在会默认创建）
db.products.insertMany( [
    { item: "card", qty: 15 },
    { item: "envelope", qty: 20 },
    { item: "stamps" , qty: 30 },
    { item: "stamps" , qty: 40 },
    { item: "stamps" , qty: 50 },
] );

# 删除一条数据
db.products.deleteOne( 
    { "_id" : ObjectId("62eb3d94ad6e2095b8ea917c") } 
);

# 删除多条数据
db.products.deleteMany( 
    { "item" : "stamps" } 
);

# $gt = greaterThan 
# $lt = lessThan gte
# $gte = greaterThan or Equal
# $lte = lessThan or Equal
# qty>40的producets数据都死光光
db.products.deleteMany( 
    { "qty" : { $gte : 40 } } 
);
# name为heige 且qty位于[40,80)区间
db.products.deleteMany( 
    { 
        "name":"heige",
        "qty" : 
        { $and:
            [
                { $gte : 40 },
                { $lt : 80 },
            ]
        } 
    } 
);
# name为heige 且qty小于40或大于80
db.products.deleteMany( 
    { 
        "name":"heige",
        "qty" : 
        { $or:
            [
                { $lt : 40 },
                { $gt : 80 },
            ]
        } 
    } 
);

# 修改数据：item为card的第一条数据 设置qty为3
db.products.updateOne(
  { "item" : "card" },
  { $set: { "qty" : 3 } }
);

# 将所有item为card数据记录的qty设为3
db.products.updateMany(
  { "item" : "card" },
  { $set: { "qty" : 3 } }
);

# 查询所有产品数据
db.products.find();
db.products.find({});

# 按条件查询：查询存货小于20的所有产品数据
db.products.find( 
    { qty: { $lt: 20 } } 
);

# 每页10条 取第5页 （跳过前40条然后取10条）
db.products.find( 
    { qty: { $lt: 20 } } 
)
.skip(40)
.limit(10)
复制代码
NodeJS操作MongoDB数据库
安装依赖
npm i mongodb
复制代码
基本CRUD
参考 菜鸟教程
工具封装
基本配置
src/db/dbconfig.js
const url = "mongodb://localhost:27017/";
const dbname = "my_express_server"
const collections = {
    user:"user",
}

module.exports = {
    url,
    dbname,
    collections
}
复制代码
增删改查工具封装
src/db/operation.js
const { MongoClient, ObjectId } = require("mongodb");
const { url, dbname } = require("./config");

/* 获取指定集合的连接对象 */
function getCollection(collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            // if (err) throw err;
            if (err) {
                reject(err);
            } else {
                resolve({
                    collection: db.db(dbname).collection(collectionName),
                    db,
                });
            }
        });
    });
}

/* 通用回调：无论成败皆关闭数据库连接 */
function callback({ db, resolve, reject }, { res, err }) {
    console.log("db callback:res/err=",res,err);
    db.close();

    if (err) {
        reject(err);
    } else {
        resolve(res);
    }
}

/* 向指定集合中添加数据 */
function execCreate(collectionName, content) {
    return new Promise(async (resolve, reject) => {
        try {
            const { collection, db } = await getCollection(collectionName);
            collection.insertOne(content, function (err, res) {
                callback({ db, resolve, reject }, { res, err });
            });
        } catch (err) {
            reject(err);
        }
    });
}

/* 根据条件从指定集合查询数据 */
function execRetrieve(collectionName, whereOption = {}, { skip, limit } = {}) {
    console.log("db execRetrieve:whereOption", whereOption);
    console.log("db execRetrieve:skip/limit", skip, limit);
    const { MongoClient } = require("mongodb");
    // const url = "mongodb://localhost:27017/";

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            // if (err) throw err;
            if (err) {
                reject(err);
            } else {
                const dbo = db.db(dbname);

                let data = dbo.collection(collectionName).find(whereOption);

                if (skip && limit) {
                    data = data.skip(skip).limit(limit);
                }

                data.toArray(function (err, result) {
                    db.close();

                    // 返回集合中所有数据
                    // if (err) throw err;
                    if (err) {
                        reject(err);
                    } else {
                        // console.log("db execRetrieve:result=", result);
                        resolve(result);
                    }
                });
            }
        });
    });
}

/* 更新数据 */
function execUpdate(collectionName, id, content) {
    console.log("db execUpdate:id/content=", id, content);
    return new Promise(async (resolve, reject) => {
        try {
            const { collection, db } = await getCollection(collectionName);
            collection.updateOne(
                { _id: ObjectId(id) },
                {$set:content},
                function (err, res) {
                    callback({ db, resolve, reject }, { res, err });
                }
            );
        } catch (err) {
            console.log("err=",err);
            reject(err);
        }
    });
}

/* 删除数据 */
function execDelete(collectionName, id) {
    return new Promise(async (resolve, reject) => {
        try {
            const { collection, db } = await getCollection(collectionName);
            collection.deleteOne({ _id: ObjectId(id) }, function (err, obj) {
                db.close();
                if (err) {
                    reject(err);
                } else {
                    // console.log("文档删除成功");
                    resolve({ msg: "删除文档成功" });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

/* 对外导出增删改查四大操作 */
module.exports = {
    execCreate,
    execRetrieve,
    execUpdate,
    execDelete,
};

复制代码
MVC架构简介

M = model = 模型层 = 只负责数据的CRUD操作
V = view = 视图层 = 只负责对接用户请求
C = controller = 控制层 = 负责具体业务逻辑的处理，其上游是视图层，下游是模型层；
视图层与模型层通常具有高度可复用性，不同工程的业务逻辑处理不同，只需修改控制层代码即可；
一个用户请求的真正流转次序是：View=>Controller=>Model，即视图层=>调度控制层=>数据模型层；
MVC架构设计思想广泛应用于各种Web项目的前后端开发中；

实现注册
视图层实现
src/views/userRouter.js
...
const controller = require("../controllers/userController");
userRouter.post("/register", async (req, res) => {
    const ret = await controller.register(req.body);
    res.json(ret)
});
...
复制代码
控制层实现
src/controllers/userController.js
const model = require("../models/userModel");

/* 实际处理注册请求 */
async function register({ username, password }) {
    // 首先查询用户名是否存在
    const users = await model.getUser({ username });
    console.log("register:existedUsers=", users);
    if (!users.length) {
        return model.addUser({ username, password });
    } else {
        return Promise.resolve({ msg: "用户名已存在" });
    }
}

module.exports = {
    register,
};
复制代码
模型层实现
src/models/userModel.js
const db = require("../db/operation");
const collectionName = "user"

function addUser(user) {
    console.log("userModel addUser");
    return db.execCreate(collectionName, user);
}

module.exports = {
    addUser,
};
复制代码
Token验证登录
什么是JWT登录鉴权
请参考 面试官系列
JWT-Token工具封装
src/utils/jwtUtil.js
const jsonwebtoken = require("jsonwebtoken");
// const jwtSecret = "test_key";
const { jwtSecret } = require("../config");

class JWT {
    /* 生成token 返回token*/
    static generate(value, expires = "7 days") {
        console.log("JWT generate value",value);
        // value 为传入值， expires为过期时间，这两者都会在token字符串中题先
        try {
            return jsonwebtoken.sign(value, jwtSecret, { expiresIn: expires });
        } catch (e) {
            console.error("jwt sign error --->", e);
            return "";
        }
    }

    /* 校验token 返回载荷或false*/
    static verify(token) {
        try {
            // 如果过期将返回false
            return jsonwebtoken.verify(token, jwtSecret);
        } catch (e) {
            console.error("jwt verify error --->", e);
            return false;
        }
    }
}
module.exports = JWT;

/* 小案例 */
// (function () {
//     /* 载荷（角色/权限描述信息） */
//     const payload = {
//         // uuid: "3455445-acuya7skeasd-iue7",
//         // phone: 133409899625,
//         username:"admin",
//         password:"123456"
//     };

//     // 生成token 有效时长20s
//     const token = JWT.generate(payload, "3s");
//     console.log("token", token);

//     // 校验token 得到payload
//     const info = JWT.verify(token);
//     console.log("verifiedRet", info);

//     /* 3秒后再次校验 */
//     setTimeout(() => {
//         console.log("检验过期token");
//         const info2 = JWT.verify(token);
//         console.log("info2", info2); // false
//     }, 3000);
// })();
复制代码
登录实现
视图层实现
src/views/userRouter.js
const express = require("express");
const controller = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
    const ret = await controller.login(req.body);
    res.json(ret)
});

module.exports = userRouter;
复制代码
控制层实现
src/controllers/userController.js
const model = require("../models/userModel");
const JWT = require("../utils/jwtUtil");

/* 实际处理登录请求 */
async function login({ username, password }) {
    const users = await model.getUser({ username, password });
    console.log("register:existedUsers=", users);

    // 如果登录成功 记录之
    let token = null;
    if (users.length) {
        token = JWT.generate({ username, password });
        console.log("login:token=", token);
    }

    return Promise.resolve({
        code: users.length > 0 ? 1 : 0,
        msg: users.length > 0 ? "登录成功" : "登录失败",
        token,
    });
}

module.exports = {
    login,
};
复制代码
模型层实现
src/model/userModel.js
const db = require("../db/operation");
const collectionName = "user"

function getUser(user) {
    console.log("userModel getUser");
    return db.execRetrieve(collectionName,user);
}

module.exports = {
    getUser,
};
复制代码
登录鉴权
封装登录校验中间件
src/middlewars/loginCheck.js
/* cookie校验登录 */
// const loginCheck = function (req, res, next) {
//     if (!req.cookies["username"]) {
//         res.send("请先登录!");
//     } else {
//         next();
//     }
// };

/* session校验登录 */
// const loginCheck = function (req, res, next) {
//     console.log("req.session", req.session);
//     if (!req.session["username"]) {
//         res.send("请先登录!");
//     } else {
//         next();
//     }
// };

/* token校验登录 */
const JWT = require("../utils/jwtUtil");
const regToken = /Bearer (.+)/
const loginCheck = function (req, res, next) {
    const token = regToken.exec(req.headers["authorization"])[1]
    const info = JWT.verify(token);
    console.log("verifiedRet", info);

    info ? next() : res.json({
        token,
        info,
        msg:"请先登录"
    });
};

module.exports = loginCheck
复制代码
为接口添加登录守卫
src/views/indexRouter.js
/* 登录校验中间件 */
const loginCheck = require("../middlewares/loginCheck");

const router = express.Router();

// GET /headers
router.get("/headers", (req, res, next) => {
    res.json({
        headers: req.headers,
    });
});

/* 使用自定义中间件 */
router.get("/testtoken", loginCheck, (req, res, next) => res.end("test ok"));
复制代码
提供静态资源服务
配置全局中间件
src/config.js
const path = require("path");

const publicPath = path.resolve("public");
const imgPath = path.join(publicPath, "img");

module.exports = {
    jwtSecret: "jinwandalaohu",
    publicPath,
    imgPath,
};
复制代码
src/app.js
/* 引入配置项 */
const { publicPath } = require("./config");
console.log("publicPath", publicPath);

app.use(express.static(publicPath));//静态文件支持
复制代码
从浏览器发起测试
http://localhost:8002/img/fuckoff.jpg
复制代码
上传文件
配置全局上传支持中间件
npm install multer
复制代码
const multer = require("multer");
app.use(multer({ dest: "/tmp/" }).array("avitar"));//上传支持
复制代码
控制层实现
src/views/fileRouter.js
const express = require("express");
const fs = require("fs");
const { imgPath } = require("../config");

const fileRouter = express.Router();

fileRouter.post("/upload", function (req, res) {
    console.log(req.files[0]); // 上传的文件信息
    // res.json({
    //     files:req.files
    // })

    const des_file = imgPath + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                response = {
                    username:req.body.username,
                    message: "File uploaded successfully",
                    filename: req.files[0].originalname,
                };
            }
            console.log(response);
            res.json(response);
        });
    });

});

module.exports = fileRouter;
复制代码
从前端页面发起POST上传请求
public/page/file_upload.html
<h3>单文件上传</h3>
<!-- 注意：enctype  type="file" -->
<!-- action="/demo/upload" method="POST" name="avitar" 都要与服务端的配置吻合 -->
<form action="/file/upload" method="POST" enctype="multipart/form-data">
    <input name="username" type="text">
    <input type="file" name="avitar"><br>
    <input type="submit" value="单个上传">
</form>

<h3>多文件上传</h3>
<!-- 注意：enctype  type="file" -->
<!-- action="/file/upload" method="POST" name="avitar" 都要与服务端的配置吻合 -->
<form action="/file/upload" method="post" enctype="multipart/form-data">
    <input name="username" type="text">
    <input type="file" name="avitar" multiple />
    <input type="file" name="avitar" multiple />
    <br />
    <input type="submit" value="多个上传" />
</form>
复制代码
获取与修改用户信息
视图层实现
src/views/userRouter.js
const express = require("express");
const controller = require("../controllers/userController");

const userRouter = express.Router();

/* PUT /user/heige */
userRouter.put(/\w+/, async (req, res) => {
    const users = await controller.getUser({ username: req.path.slice(1) })
    const result = await controller.updateUser(users[0]._id,req.body)
    res.json(result)
});

/* GET /user/heige */
userRouter.get(/\w+/, async (req, res) => {
    const users = await controller.getUser({ username: req.path.slice(1) })
    res.json(users[0])
});

module.exports = userRouter;
复制代码
控制层实现
src/controllers/userController.js
const model = require("../models/userModel");

/* 更新用户信息 */
async function updateUser(id,user){
    return model.updateUser(id,user)
}

/* 获取用户信息 */
async function getUser(user){
    return model.getUser(user)
}

module.exports = {
    updateUser,
    getUser
};
复制代码
模型层实现
src/models/userModel.js
const db = require("../db/operation");
const collectionName = "user"


function updateUser(id, user) {
    console.log("userModel updateUser:id",id);
    return db.execUpdate(collectionName, id, user);
}

function getUser(user) {
    console.log("userModel getUser");
    return db.execRetrieve(collectionName,user);
}

module.exports = {
    updateUser,
    getUser,
};

