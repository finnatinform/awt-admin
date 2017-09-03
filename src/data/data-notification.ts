import DataItem = require('./data-item');
class Notification extends DataItem{
    DESCRIPTION : string ;
    START_DATE : string ;
    EVENT_IDENT : number ;

    constructor(){
        super();
        this.DESCRIPTION = '' ;
        this.START_DATE = '' ;
        this.EVENT_IDENT = -1 ;
    }
}

export = Notification ;