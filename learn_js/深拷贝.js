/* 深拷贝 */
function deepCopyByRecursion(data) {
    /* 如果obj直接是基本数据类型 直接返回一个值拷贝 */
    if (typeof data !== "object" && typeof data !== "function") {
      return data;
    }

    /* 
    如果obj是函数 直接返回函数地址（本质上是浅拷贝）   
    函数的拷贝并不担心相互影响：要修改函数=重新赋值=值变成新函数地址=与老的函数地址脱钩=依然并不影响
    */
    if (typeof data === "function") {
      return data;
    }

    /* 深拷贝数组 */
    if (Array.isArray(data)) {
      var arrCopy = [];
      // 对所有元素进行拷贝
      data.forEach(function (item, index) {
        // 直接将当前元素深拷贝一份 丢于副本数组中的相同序号下
        arrCopy[index] = deepCopyByRecursion(item);
      });
      return arrCopy;
    }

    /* obj是对象 */
    var objCopy = {};
    for (var key in data) {
      var value = data[key];
      objCopy[key] = deepCopyByRecursion(value);
    }
    return objCopy;
  }