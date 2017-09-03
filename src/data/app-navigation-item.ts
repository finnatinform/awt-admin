import AppPageType = require('./app-page-types');

class NavigationItem{
    icon : string ;
    caption : string ;
    type : AppPageType ;

    constructor( _Icon : string, _Caption : string , _Type : AppPageType ){
        this.icon = _Icon ;
        this.caption = _Caption ;
        this.type = _Type ;
    }
}

export = NavigationItem ;