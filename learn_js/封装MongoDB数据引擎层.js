var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("runoob");
  var myobj = { name: "菜鸟教程", url: "www.runoob" };
  dbo.collection("site").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("文档插入成功");
    db.close();
  });
});
async function fn3() {
    /* 通用的获取collection连接 */
    function getCollection(dbName, collectionName) {
      //实现之
      // 连接数据库需要时间 并不能立刻返回err/collection
      return new Promise(
        /* excutor 在执行器内部去连接数据库*/
        (resolve, reject) => {
          var MongoClient = require("mongodb").MongoClient;
          var url = "mongodb://localhost:27017/";
  
          MongoClient.connect(url, function (err, conn) {
            if (err) {
              //   reject(err)
              resolve({
                err,
                collection: undefined,
                conn: undefined,
              });
              return;
            }
  
            var dbo = conn.db(dbName);
            const collection = dbo.collection(collectionName);
            resolve({
              err: undefined,
              collection,
              conn,
            });
          });
        }
      );
    }
  
    /* 通用插入数据 */
    async function doCreate(dbName, collectionName, dataObj) {
      //实现之
      // 延迟满足：稍后获得{err,collection}
      const { err, collection, conn } = await getCollection(
        dbName,
        collectionName
      );
  
      /* await以下的代码 全部相当于写在then的回调中 */
      if (err) {
        // 在then的回调中 return就是向后履约
        return {
          err,
          res: undefined,
        };
      }
  
      collection.insertOne(dataObj, function (err, res) {
        conn.close();
  
        // 将数据和插入的一并履约
        return {
          err,
          res,
        };
      });
    }
  
    // 模型层调用
    async function addUser(user) {
      // 对控制层返回的是一个Promise对象
      const ret = await doCreate(dbName, collectionName, user);
      return ret;
    }
  }
  // fn3();
  