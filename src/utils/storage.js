import Subscribe from './subscribe'
import Arrays from './arrays'
import Params from '../components/settings/params'

let listener = Subscribe();

function get(name, empty){
    let value    = window.localStorage.getItem(name) || empty || '';
    let convert  = parseInt(value);

    if(!isNaN(convert) && /^\d+$/.test(value)) return convert;

    if(value == 'true' || value == 'false'){
        return value == 'true' ? true : false;
    }

    try {
        value = JSON.parse(value)
    } 
    catch (error) {}
    
    return value;
}

function set(name, value, nolisten){
    if(Arrays.isObject(value) || Arrays.isArray(value)) {
        let str = JSON.stringify(value)

        window.localStorage.setItem(name, str)
    } 
    else {
        window.localStorage.setItem(name, value)
    }
    
    if(!nolisten) listener.send('change', {name: name, value: value})
}

function add(name, new_value){
    let list = get(name, '[]')

    if(list.indexOf(new_value) == -1){
        list.push(new_value)

        set(name, list)

        listener.send('add', {name: name, value: new_value})

        return true
    }
}

function field(name){
    return Params.field(name)
}

function cache(name, max, empty){
    var result = get(name, JSON.stringify(empty))

    if(Arrays.isObject(empty)){
        var c = Arrays.getKeys(result)

        if(c.length > max) delete result[c[0]]

        set(name,result)
    }
    else if(result.length > max){
        result.shift()

        set(name,result)
    }

    return result
}


export default {
    listener,
    get,
    set,
    field,
    cache,
    add
}