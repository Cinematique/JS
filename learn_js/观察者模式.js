function observerDemo(){
    /* 被观察者 */
    class Observable {
        /* 创建对象时要初始化观察者队列 */
        constructor(name){
            this.name = name
            this.observers = []
        }
        /* 注册观察者 */
        register(...observers){
            this.observers.push(...observers)

            // 让每个注册进来的观察者o持有当前被观察者的实例
            observers.forEach(o=>o.observable=this)
        }
        /* 注销观察者 */
        unregister(ob){
            this.observers = this.observers.filter(o=>o!==ob)
        }
        /* 发布事件：令所有观察者响应事件 */
        emit(event){
            this.observers.forEach(
                o => o.onEvent(event)
            )
        }

    }

    class Observer {
        constructor(name){
            this.name = name
        }
        /* 响应事件 */
        onEvent(event){
            console.log(`${this.name}响应事件${JSON.stringify(event)}`);
        }
    }

    /* 彩票继承被观察者 */
    class Lottery extends Observable {
        constructor(name){
            super(name)
            this.timer = null
        }
        start(){
            if(!this.timer){
                this.timer = setInterval(() => {
                    // 对上一期开奖
                    const event = {
                        type:"check",
                        code:parseInt(Math.random()*3)
                    }
                    console.log(this.name,"发布事件",event);
                    this.emit(event)
    
                    // 对本期开售
                    this.emit({
                        type:"buy",
                    })
                }, 3000);
            }
        }

        stop(){
            if(this.timer){
                clearInterval(this.timer)
                this.timer = null
                console.log(this.name,"停止运行");
            }
        }
    }

    /* 玩家继承观察者 */
    class Player extends Observer{
        /* 每个玩家实例拥有一个中奖号码 */
        constructor(name){
            super(name)
            this.code = null
        }
        /* 兑奖 */
        check(event){
            const result =  this.code === event.code
            console.log(this.name,"中奖否",result);

            // 如果中奖让彩票机停止运行
            result && this.observable.stop()
            return result
        }
        /* 下注 */
        buy(){
            this.code = parseInt(Math.random()*3)
            console.log(this.name,"购买了",this.code);
        }
        /* 覆写override父类方法 */
        onEvent(event){
            super.onEvent(event)
            switch (event.type) {
                case "check":
                    this.check(event)
                    break;
                case "buy":
                    this.buy()
                    break;
            
                default:
                    break;
            }
        }
    }

    /* 业务逻辑 */
    const lot = new Lottery("双色球")
    const tiger = new Player("今晚打老虎")
    const gaojin = new Player("赌神高进")

    /* 注册与注销观察者 */
    lot.register(tiger,gaojin)
    lot.unregister(gaojin)

    /* 让彩票实例周期性地发布开售与开奖事件 */
    lot.start()
}
observerDemo()