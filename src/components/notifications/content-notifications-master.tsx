import * as React from "react";
import { Master } from './../content-master';
import DataStore = require('./../../stores/store-data');
import NotificationStore = require('./../../stores/store-notification');
import DataItem = require('./../../data/data-item');
import Notification = require('./../../data/data-notification');

export class NotificationsMaster extends Master{
    getStore() : DataStore{
        return NotificationStore;
    }
    getListItemClass( _Selected : boolean ):string{
        let HResult : string = "list-item";
        if( _Selected ){
            HResult += " list-item-active" ;
        }
        return HResult;
    }
    renderItem(_Item : DataItem, _Index : number, _Selected : boolean):JSX.Element{
        return <li onClick={() => this.onItemClicked( _Index )} className={this.getListItemClass(_Selected)} >{(_Item as Notification).CAPTION}</li> ;
    }
    getSingleName():string{
        return "Notification";
    }
}