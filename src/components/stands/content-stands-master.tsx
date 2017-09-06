import * as React from "react";
import { Master } from './../content-master';
import DataStore = require('./../../stores/store-data');
import StandStore = require('./../../stores/store-stand');
import DataItem = require('./../../data/data-item');
import Stand = require('./../../data/data-stand');

export class StandsMaster extends Master{
    getStore() : DataStore{
        return StandStore;
    }
    getListItemClass( _Selected : boolean ):string{
        let HResult : string = "list-item";
        if( _Selected ){
            HResult += " list-item-active" ;
        }
        return HResult;
    }
    renderItem(_Item : DataItem, _Index : number, _Selected : boolean):JSX.Element{
        return <li onClick={() => this.onItemClicked( _Index )} className={this.getListItemClass(_Selected)} >{_Item.CAPTION}</li> ;
    }
    getSingleName():string{
        return "Fachschaustand";
    }
}