import DataItem = require('./data-item');
class Company extends DataItem{
    SHORT_NAME : string ;
    constructor(){
        super();
        this.SHORT_NAME = "";
    }
}

export = Company ;