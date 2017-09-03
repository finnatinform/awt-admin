import * as React from "react";
import { Master } from './../content-master';
import DataStore = require('./../../stores/store-data');
import ReferentStore = require('./../../stores/store-referent');
import DataItem = require('./../../data/data-item');
import Referent = require('./../../data/data-referent');

export class ReferentsMaster extends Master{
    getStore() : DataStore{
        return ReferentStore;
    }
    getReferentName(_Item : Referent) : string {
        let HResult : string = "" ;
        HResult = _Item.FORE_NAME + " " + _Item.SURE_NAME ;
        return HResult ;
    }
    getListItemClass( _Selected : boolean ):string{
        let HResult : string = "list-item";
        if( _Selected ){
            HResult += " list-item-active" ;
        }
        return HResult;
    }
    renderItem(_Item : DataItem, _Index : number, _Selected : boolean):JSX.Element{
        return <li onClick={() => this.onItemClicked( _Index )} className={this.getListItemClass(_Selected)} >{this.getReferentName(_Item as Referent)}</li> ;
    }
    getSingleName():string{
        return "Referent";
    }
}