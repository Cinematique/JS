class MyMap {
    constructor(){
        this.obj = {}
        this.updateSize()
    }

    updateSize(){
        this.size = Object.keys(this.obj).length
    }

    set(key,value){
        this.obj[key] = value
        this.updateSize()
    }

    get(key){
        return this.obj[key]
    }

    has(key){
        return this.obj.hasOwnProperty(key)
    }

    delete(key){
        delete this.obj[key]
        this.updateSize()
    }

    clear(){
        this.obj = {}
        this.updateSize()
    }

    /* 
    mmp.forEach(
        function(value,key,map){
            //this.updateSize()
        }
    )
    */
    forEach(handler){
        for(let key in this.obj){
            handler.apply(this,[this.obj[key],key,this])
        }
    }

    keys(){
        return Object.keys(this.obj)
    }

    values(){
        return Object.keys(this.obj).map(key=>this.obj[key])
    }

    entries(){
        return Object.keys(this.obj).map(key=>({key,value:this.obj[key]}))
    }
}