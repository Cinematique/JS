# 概述

本例实现数学运算服务+静态资源读取服务；
操作数据库时我们使用Express/Koa框架；
后续教程敬请期待（比V）；

NodeAPI官方文档
NodeAPI英文版官方文档
PS：看某中文网的API文档需要199大洋“打赏”，呵呵
安装一些必要的全局工具
# 全局安装源管理工具nrm
npm install --global nrm
# 或者简写如下：
npm i -g nrm
# 全局使用淘宝源
nrm use taobao;

# 全局安装热更新工具nodemon
npm i -g nodemon

# 全局安装文件删除工具rimraf
npm i -g rimraf
# rimraf <你要删除的文件路径>
复制代码
初始化工程
创建文件夹my_node_server
将文件夹初始化为一个node工程：
cd my_node_server
npm init -y
复制代码
创建全局配置
src/config.js
const path = require("path")

const port = 8001
const baseUrl = `http://localhost:${port}`

/* 
文件路径配置 
path.resolve(...paths) 默认以【工作路径】（即当前node工程根目录）为根路径 支持./ ../
path.join(...paths) 暴力拼接所有子路径为一个大字符串 类似于arr.join()
__dirname为当前文件路径
*/
const publicPath = path.resolve("public")
const imgPath = path.resolve(__dirname,"../public","img")
const htmlPath = path.resolve("public","pages")
const cssPath = path.resolve("public","css")
const jsPath = path.resolve("public","js")
const jsonPath = path.resolve("public","json")
const jsonpPath = path.resolve("public","jsonp")

module.exports = {
    baseUrl,
    port,
    publicPath,
    paths:{
        imgPath,
        htmlPath,
        cssPath,
        jsPath,
        jsonPath,
        jsonpPath
    }
}

// console.log("resolvedPath=",path.resolve("public"));
复制代码
创建http服务
创建server实例，运行在8001端口
src/app.js
const http = require("http")

const server = http.createServer(
    (req,res)=>{
        res.end("hello,im node server")
    }
)

server.listen(8001,()=>console.log("server is listening at 8001..."))
复制代码
配置快速启动脚本
package.json
"scripts": {
    "start":"nodemon ./src/app.js"
},
复制代码
启动服务
cd my_node_server
npm run start
复制代码
支持一下中文
res.setHeader("Content-Type","*/*;charset=utf8;")
res.end("hello,哥是一个NodeJS服务端应用")
复制代码
获取URL信息
熟悉一下URL文档
URL包文档

URL中的信息包括协议、主机名、路径、查询参数、锚点/哈希等，
这里我们主要用到NodeAPI中的URL包，以及URLSearchParams类中的相关API
看文档开发的能力至关重要！！！

工具封装
src/util/reqUtil.js
// const { baseUrl } = require("../config");
const baseUrl = "http://localhost:8001"

function getUrlInfo(req) {
    // 基于完整字符串构建一个URL对象
    const myUrl = new URL(baseUrl + req.url);
    // console.log(myUrl.search, myUrl.searchParams);

    /* 将myUrl.searchParams（一个URLSearchParams类的实例）重构为一个对象 */
    const searchParams = {};//{a:123,b:456}
    Array.from(myUrl.searchParams.keys()).forEach(
        (key) => (searchParams[key] = myUrl.searchParams.get(key) * 1)
    );

    /* 导出URL中的各种信息：http://localhost:8001/math/divide?a=123&b=456 */
    return {
        protocol:myUrl.protocol,//协议  http
        host:myUrl.host,//主机地址  localhost:8001
        pathname:myUrl.pathname,//路径  /math/divide
        searchParams,//查询参数 {a:123,b:456}
        hash:myUrl.hash,//锚点/哈希 null
    };
}

module.exports = {
    getUrlInfo,
};

复制代码
实现数学运算功能
派发接口给指定的模块
src/app.js
const http = require("http");
const helloView = require("./views/helloView");
const mathView = require("./views/mathView")

const server = http.createServer((req, res) => {
    switch (true) {
        case req.url==="/hello":
            helloView.sayHello(req,res)
            break;

        // 将math开头的路径派发给math模块处理
        case req.url.startsWith("/math/"):
            mathView.handle(req,res)
            break;

        default:
            // 处理默认情况
            res.end("im a node server")
            break;
    } 
});

server.listen(8001, () => console.log("server is listening at 8001..."));
复制代码
处理用户请求
src/views/mathView.js
// 导入URL信息提取函数
const { getUrlInfo } = require("../utils/reqUtil");

// 导入数学运算模块
const mathController = require("../controllers/mathController");

/* 从路径名/math/multiply中提取操作名multiply */
const regOperation = /\/math\/(\w+)/
function getOperation(pathname){
    return regOperation.exec(pathname)[1]
}

function handle(req, res) {
    /* 提取URL信息 */
    let urlInfo = getUrlInfo(req);
    let {
        pathname,
        searchParams,
        searchParams: { a, b },
    } = urlInfo;

    /* 从路径名提取用户想要执行的操作名 */
    const operation = getOperation(pathname)

    // 调用控制器模块mathController中的对应方法执行运算
    const result = mathController[operation].apply(null,[a,b])

    /* 向前端用户返回JSON */
    res.setHeader("Content-Type", "application/json;charset=utf8;");
    res.end(
        JSON.stringify({
            searchParams,
            operation,
            result,
        })
    );
}

/* commonjs模块化导出 */
module.exports = {
    handle,
};
复制代码
数学工具封装
src/controller/mathController.js
/* 封装一些复杂精密一般人玩不了的数学运算函数 */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

/* 模块化导出 */
// module.exports.add = add
// module.exports.subtract = subtract
// module.exports.multiply = multiply
// module.exports.divide = divide

/* 模块化导出 */
module.exports = {
    add,
    subtract,
    multiply,
    divide
}
复制代码
实现静态资源读取
主要API

path模块文档：nodejs.org/docs/latest…
fs模块文档：nodejs.org/docs/latest…
path的主用API： path.resolve path.join
fs主用API： fs.readFile fs.readFileSync

派发读取文件接口
src/app.js
...
// 将file开头的路径派发给fileView模块处理
case req.url.startsWith("/file/"):
    fileView.handle(req,res)
    break;
...
复制代码
fileView具体实现
src/views/fileView.js
const { getFile } = require("../controllers/fileController")

/* 直接调用fileController中的getFile方法读取文件 */
function handle(req,res){
    getFile(req,res)
}

module.exports = {
    handle
}
复制代码
fileController实现
src/controllers/fileController.js
/* 引入系统模块 */
const fs = require("fs");
const path = require("path");

// 读取URL信息模块
const { getUrlInfo } = require("../utils/reqUtil");

// 函数式编程的管道串联 + 同步函数的Promise化（选学内容）
const { pipe,promisify } = require("../utils/functionUtil");

// 从配置中引入静态资源根路径
const { publicPath } = require("../config");

// 从/file/xxx中读取静态资源的相对路径
const regFilePath = /\/file\/(.*)/;
const getFilePath = (pathname) => regFilePath.exec(pathname)[1];

// 从URL信息对象中提取pathname
const getPathName = (urlInfoObj) => urlInfoObj.pathname;

/* 同步读取文件信息 */
const readFile = (filePath) => {
    return fs.readFileSync(path.join(publicPath, filePath));
}

function getFile(req, res) {
    // 函数式编程之管道串联：
    // 从req中读取URL信息=>从URL信息对象中提取路径信息=>从路径信息中提取文件路径
    const filePath = pipe(getUrlInfo, getPathName, getFilePath)(req);

    /* 异步读取文件内容 */
    fs.readFile(
        // 拼合形成完整的文件路径
        path.join(publicPath, filePath),

        // 读取文件结果回调：成功时有data且err为空 失败时有err且data为空
        (err,data)=>{
            // 这里*/*代表忽略具体返回内容类型 字符编码一律设置为utf8
            res.setHeader("Content-Type","*/*;charset=utf8;")

            // 返回内容或或返回错误信息给前端
            data ? res.end(data) : res.end(JSON.stringify(err))
        }
    )

    /* 更高级的玩法 */
    // res.setHeader("Content-Type","*/*;charset=utf8;")
    // pipe(getUrlInfo, getPathName, getFilePath,promisify(readFile))(req).then(
    //     data => res.end(data)
    // ).catch(
    //     err => res.end(JSON.stringify(err))
    // )
}

module.exports = {
    getFile
}
复制代码
函数式编程的工具实现
src/utils/functionUtil.js
/* 串联多个函数为管道： pipe(fn1,fn2,fn3...) 从左向右执行 */
const pipe =
    (...fns) =>
    (v) =>
        fns.reduce((pv, fn) => fn(pv), v);

/* 串联多个函数为组合： compose(fn1,fn2,fn3...) 从右向左执行 */
const compose =
    (...fns) =>
    (v) =>
        fns.reverse().reduce((pv, fn) => fn(pv), v);

/* 将同步函数fn转换为返回Promise的函数 */
function promisify(fn) {
    // 返回一个新函数，接收传递给fn的所有参数
    return function (...args) {
        // 调用新函数暴力返回Promise对象
        return new Promise((resolve, reject) => {
            try {
                // 尝试调用原函数fn 不改变this指向 正常传递所有入参
                const ret = fn.apply(null, args);

                // 履约其执行结果
                resolve(ret);
            } catch (err) {
                // 发现错误时直接毁约
                reject(err);
            }
        });
    };
}

module.exports = {
    compose,
    pipe,
    promisify,
};

