class DataItem{
    date : Date ;
    CAPTION : string ;
    IDENT : number ;

    constructor( _Date : Date = new Date(), _Caption : string = '' ){
        this.IDENT = -1 ;
        this.date = _Date ;
        this.CAPTION = _Caption ;
    }
}

export = DataItem ;