import * as React from "react";
import { Master } from './../content-master';
import DataStore = require('./../../stores/store-data');
import EventStore = require('./../../stores/store-event');
import DataItem = require('./../../data/data-item');

export class EventsMaster extends Master{
    getStore() : DataStore{
        return EventStore;
    }
    getListItemClass( _Selected : boolean ):string{
        let HResult : string = "list-item";
        if( _Selected ){
            HResult += " list-item-active" ;
        }
        return HResult;
    }
    renderItem(_Item : DataItem, _Index : number, _Selected : boolean):JSX.Element{
        return <li className={this.getListItemClass(_Selected)} onClick={() => this.onItemClicked( _Index )} >{_Item.CAPTION}</li> ;
    }
    getSingleName():string{
        return "Event";
    }
}