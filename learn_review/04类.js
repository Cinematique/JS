/* 经典三级继承原型实现：Animal=>Person=>Student */
function fn1(){
    function Animal(type){
        this.type = type
    }
    Animal.prototype.eat = function(){
        console.log("Animal:",this.type,"正在吃");
    }
    Animal.chinese = "动物"
    Animal.selfTell = function(){
        console.log("动物是一种碳基生物");
    }

    /* Person */
    function Person(name){
        /* 从Animal类继承type属性 */
        // this.type = "人类"
        Animal.call(this,"人类")
        this.name = name
    }

    /* 继承Animal的全部方法: 娶一个Animal实例做原型 */
    Person.prototype = new Animal("人类")
    Person.prototype.think = function(){
        console.log("Person:",this.name,"正在思考");
    }
    Person.prototype.eat = function(){
        // 先调用父类的eat方法
        Animal.prototype.eat.call(this)
        console.log("Person:",this.name,"正在吃");
    }

    const zs = new Person("张三")
    zs.eat()
    zs.think()

    console.log(Animal.chinese);
    Animal.selfTell()
}
fn1()

/* 经典三级继承class实现：Animal=>Person=>Student */
function fn2(){
    class Animal {
        constructor(type){
            this.type = type
        }

        /* 实例方法默认挂载在原型Animal.prototype上 */
        eat(){
            console.log("Animal:",this.type,"正在吃");
        }

        static chinese = "动物"
        static selfTell(){
            console.log("动物是一种碳基生物");
        }
    }

    class Person extends Animal{
        /* 只要重写构造器 必须调用super */
        constructor(name){
            // 从Animal中继承type属性
            super("人类")
            this.name = name
        }
        think(){
            console.log("Person:",this.name,"正在思考");
        }
        eat(){
            super.eat()
            console.log("Person:",this.name,"正在吃");
        }
    }

    const zs = new Person("张三")
    zs.eat()
    zs.think()

    console.log(Animal.chinese);
    Animal.selfTell()
}
fn2()