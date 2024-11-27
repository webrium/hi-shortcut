class ShortCut {

    prevent_default = true;
    listen_keys = [];
    active_timer = false;
    timer = 1000;
    event_type = 'keydown'
    timeoutid = null
    listeners = {}


    constructor(controll_key) {
        this.controll_key = controll_key;
        return this;
    }

    setPreventDefault(value) {
        this.prevent_default = value;
        return this;
    }

    setEventType(type = 'keydown') {
        this.event_type = type;
        return this;
    }

    check(event, key) {

        const is_control_key = event[this.controll_key + 'Key'];

        if (is_control_key && ((Array.isArray(key) && key.indexOf(event.key) > -1) || (typeof key == 'string' && event.key == key))) {
            return true;
        }

        return false;
    }




    runTimer() {
        if (this.active_timer == false) {
            this.active_timer = true;

            this.timeoutid = setTimeout(() => {
                this.active_timer = false;
                this.listen_keys = [];
            }, this.timer)
        }
    }


    listen(name, key, callback) {
        const eventfunction = event => this.action(event , key, callback);
        this.listeners[name] = eventfunction;
        document.addEventListener(this.event_type, this.listeners[name])

        return this;
    }


    listenMulti(name,keys, callback) {
        const eventfunction = event => this.multiAction(event, [...keys,callback]);
        this.listeners[name] = eventfunction;
        document.addEventListener(this.event_type, this.listeners[name])
        return this;
    }

    remove(name){
        document.removeEventListener(this.event_type,this.listeners[name])
    }

    
    action(event, key, callback){

        if (this.check(event, key)) {

            if (this.prevent_default) {
                event.preventDefault();
            }

            callback()
        }
    }
    
    multiAction(event, args=[]) {

        if(!event){
            return
        }
        
        var callback = null;
        console.log(event);

        this.runTimer();


        for (const key of args) {
            if (typeof key == 'function') {
                callback = key;
                continue;
            }
            else if (event.key.toLowerCase() == this.controll_key) {
                if (this.prevent_default) {
                    event.preventDefault()
                }
                continue;
            }
            else if (this.check(event, key) && this.listen_keys.indexOf(event.key) == -1) {
                if (this.prevent_default) {
                    event.preventDefault()
                }
                this.listen_keys.push(event.key)
            }
        }

        if (callback == null) {
            throw 'callback is not defined';
        }

        if (this.listen_keys.length == args.length - 1) {
            this.listen_keys = [];
            clearTimeout(this.timeoutid);
            this.active_timer = false;
            callback()
        }

    }
}


export { ShortCut };