import * as React from "react";
import { Master } from './../content-master';
import DataStore = require('./../../stores/store-data');
import CompanyStore = require('./../../stores/store-company');
import DataItem = require('./../../data/data-item');
import Company = require('./../../data/data-company');

export class CompaniesMaster extends Master{
    getStore() : DataStore{
        return CompanyStore;
    }
    getListItemClass( _Selected : boolean ):string{
        let HResult : string = "list-item";
        if( _Selected ){
            HResult += " list-item-active" ;
        }
        return HResult;
    }
    renderItem(_Item : DataItem, _Index : number, _Selected : boolean):JSX.Element{
        return <li onClick={() => this.onItemClicked( _Index )} className={this.getListItemClass(_Selected)} >{(_Item as Company).CAPTION}</li> ;
    }
    getSingleName():string{
        return "Kunde";
    }
}