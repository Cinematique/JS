function objToParams(obj) {
    let str = "";
    for (let key in obj) {
      str += `&${key}=${obj[key]}`;
    }
    // &name=heige&pwd=123456
    return str.slice(1);
  }
  
  function ajax({ url, method, dataType, data, onSuccess, onFail }) {
    let reqBody = null;
  
    /*  */
    method = method || "GET";
    onSuccess = onSuccess || ((data) => console.log("defaultSuccess:data", data));
    onFail = onFail || ((err) => console.log("defaultFail:err", err));
  
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
  
    /* dataType */
    switch (dataType) {
      case "form":
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        reqBody = objToParams(data);
        break;
      case "json":
        xhr.setRequestHeader("Content-Type", "application/json");
        reqBody = JSON.stringify(data);
        break;
      default:
        break;
    }
  
    xhr.onload = function () {
      onSuccess(xhr.responseText);
    };
    xhr.onerror = function (err) {
      onFail(err);
    };
  
    xhr.send(reqBody);
  }
  
  // ajax({
  //   url: "http://www.httpbin.org/post",
  //   method: "POST",
  //   dataType: "form",
  //   data: { name: "heige", pwd: "123456" },
  //   onSuccess: (data) => console.log("data=", data),
  //   onFail: (err) => console.log("err=", err),
  // });
  
  function ajaxPromise(config) {
    return new Promise((resolve, reject) => {
      ajax({
        ...config,
        onSuccess: (data) => resolve(data),
        onFail: (err) => reject(err),
      });
    });
  }