function fn3(){
    function score(name){
        // 私有数据
        const obj = {}

        // 返回私有数据的操作API
        return {
            set(key,value){
                obj[key]=value
            },
            getAll(){
                return obj
            }
        }
    }
    const stus = ["张三","李四","王五"]
    const scoreObj = {}

    // 做出全班学生的闭包操作API对象
    stus.forEach(
        name => scoreObj[name] = score(name)
    )

    let name = "李四",key="语文",value=50

    // 设置任意学生的任意成绩
    scoreObj[name].set(key,50)
    scoreObj[name].set("数学",60)

    // 查询任意学生的全部成绩
    console.log(
        JSON.stringify(scoreObj[name].getAll())
    );
}
// fn3()