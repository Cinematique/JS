/* 字符串操作 */
function fn1() {
  let str = "今晚0802,捉老女人,666";
  // 截取子串
  console.log(str.slice(2));
  console.log(str.slice(2, 4));

  // 拼接
  console.log(str.concat("让我们", "拭目以待"));

  // number与string做数学运算时的隐式类型转换
  console.log(123 + "4");
  console.log(123 - "4");
  console.log(123 * "4");
  console.log(123 / "4");

  // 分割
  console.log(str.split()); //返回单元素数组
  console.log(str.split(",")); //返回单元素数组

  /* 正则相关 */
  // 匹配
  console.log(str.match(/\d+/)); //reg.exec(str)
  console.log(str.match(/\d+/g)); //[ '0802', '666' ]

  // 检索 相当于str.indexOf(substr)
  console.log(str.search(/\d+/));

  // 替换
  console.log(str.replace("0802", "零八零二"));
  console.log(str.replace(/\d+/g, (sub) => sub.replace(/\d/g, "*")));
}
// fn1();

/* 数组操作 */
function fn2() {
  let arr = [0, 1, 2, 3, 44, 5];

  /* 追加元素 */
  // arr.push(6)
  // arr.unshift(0)

  // /* 删除元素 */
  // arr.shift()
  // arr.pop()

  /* 任意位置增删改 */
  // arr.splice(4,0,3.5)
  // arr.splice(4,1)
  // arr.splice(4,1,"四")
  // console.log(arr);

  /* 排序 */
  // console.log(arr.sort());
  // console.log(arr.sort((a,b)=>a-b));

  /* 颠倒 */
  // console.log(arr.reverse());

  // ----以上API皆修改原始数组-----

  // // 拼接
  // console.log(arr.concat([5,6],7));

  // // 检索元素
  // console.log(arr.indexOf(3));
  // console.log(arr.indexOf(7));

  // // 连接所有元素的字面量为一个字符串
  // console.log(arr.join());
  // console.log(arr.join("-"));
  // console.log(arr.join(""));

  // console.log(arr);

  /* 批处理函数：forEach,filter,map,every,some,find,reduce */
  arr = [3, 4, 5, 9, 2, 6, 8, 7, 0, 1];
  // arr.forEach(
  //   (value,index,arr)=>console.log(index,value)
  // );
  // arr = arr.filter(
  //   (value,index,arr)=>value>5
  // )
  // arr = arr.map(
  //   (value,index,arr)=>value*value
  // )

  // 有没有完全平方数
  // console.log(arr.some((value) => Math.sqrt(value) % 1 === 0));
  // 是否都是完全平方数
  // console.log((value) => Math.sqrt(value) % 1 === 0));
  // 找出第一个完全平方数
  // console.log(arr.find((value) => Math.sqrt(value) % 1 === 0));

  // 求数组各元素的和
  console.log(arr.reduce((pv, cv, index, arr) => pv + cv));
}
// fn2();

/* 对象操作 */
const obj = {
  name: "黑哥",
  age: 18,
  gender: "male",
};
function fn3() {
  /* 遍历键值 */
  // for(let key in obj){
  //   console.log(key,obj[key]);
  // }

  /* 查看所有key */
  console.log(Object.keys(obj));

  /* 查看是否包含自有属性（继承来的属性不算） */
  console.log(obj.hasOwnProperty("age")); //true
  console.log(obj.hasOwnProperty("toString")); //false

  /* 对象简写 */
  let hobby = "吃";
  let wife = "如花";
  const p = {
    hobby,
    wife,

    // sayHello:function(){}
    sayHello() {
      console.log("hello");
    },
  };

  /* 在当前对象基础上覆盖部分键值:Object.assign(targetObj,...sourceObj) */
  // 在obj的地址中 揉入p的全部键值
  Object.assign(obj, p, { name: "白鸽" });
  console.log("修改后的obj", obj);
  console.log("p", p);
}
// fn3();

/* 手封数据结构：MyMap */
function fn4() {
  class MyMap {
    constructor(sourceObj) {
      // this.obj = {}
      this.obj = sourceObj;
    }

    get(key) {
      return this.obj[key];
    }

    has(key) {
      return this.obj.hasOwnProperty(key);
    }

    keys() {
      return Object.keys(this.obj);
    }

    values() {
      return Object.keys(this.obj).map((key) => this.obj[key]);
    }

    entries() {
      return Object.keys(this.obj).map((key) => ({
        key,
        value: this.obj[key],
      }));
    }

    forEach(handler) {
      for (let key in this.obj) {
        handler.apply(null, [key, this.obj[key]]);
      }
    }

    delete(key) {
      delete this.obj[key];
    }

    size() {
      return Object.keys(this.obj).length;
    }

    set(key, value) {
      this.obj[key] = value;
    }
  }

  ~(function main() {
    const mmp = new MyMap(obj);
    // console.log(mmp.get("name"));
    // console.log(mmp.has("age"));
    // console.log(mmp.has("girlfriend"));
    // console.log(mmp.keys());
    // console.log(mmp.values());
    // console.log(mmp.entries());

    /* 数组本身属于迭代器 可以使用for-of循环遍历其元素 */
    // for(let entry of mmp.entries()) {
    //   console.log(entry);
    // }

    // mmp.forEach(
    //   (key,value)=>console.log(key,value)
    // )

    mmp.delete("age");
    console.log(mmp.has("age"));
    console.log(mmp.size());

    mmp.set("name", "白鸽");
    console.log(mmp);
  })();
}
// fn4()

/* 
改造原生Array 
随机抽取N个元素 const pickedArr = arr.pick(5) 
去重 const nrArr = arr.norepeat()
*/
function fn5() {
  Array.prototype.pick = function (n) {
    const retArr = [];
    while (retArr.length < n) {
      const rIndex = parseInt(Math.random() * this.length);
      const item = this[rIndex];
      !retArr.includes(item) && retArr.push(item);
    }
    return retArr;
  };

  Array.prototype.norepeat = function(){
    return this.filter((item,index)=>this.indexOf(item)===index)
  }

  const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3];
  console.log(arr.pick(5));
  console.log(arr.norepeat());
}
// fn5();
