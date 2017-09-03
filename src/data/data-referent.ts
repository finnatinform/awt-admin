import DataItem = require('./data-item');
class Referent extends DataItem{
    FORE_NAME : string ;
    SURE_NAME : string ;
    DESCRIPTION : string ;
    RANKING : number ;

    constructor(){
        super();
        this.FORE_NAME = "" ;
        this.SURE_NAME = "" ;
        this.DESCRIPTION = "";
        this.RANKING = 100 ;
    }
}

export = Referent ;