import DataItem = require('./data-item');
class Stand extends DataItem{
    LOGO : string ;
    DESCRIPTION : string ;
    RANKING : number ;

    constructor(){
        super();
        this.LOGO = "" ;
        this.DESCRIPTION = "";
        this.RANKING = 100 ;
    }
}

export = Stand ;