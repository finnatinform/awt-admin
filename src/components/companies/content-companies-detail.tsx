import * as React from "react";
import { Detail } from './../content-detail';
import DataStore = require('./../../stores/store-data');
import CompanyStore = require('./../../stores/store-company');
import Company = require('./../../data/data-company');
import { Input } from './../controls/input' ;

export class CompaniesDetail extends Detail{
    getStore() : DataStore{
        return CompanyStore;
    }
    getData():Company{
        if( this.inNewItem() ){
            return this.state.NewItem as Company ;
        } else {
            return this.state.Data as Company ;
        }
    }
    renderDetailContent():JSX.Element{
        return (
            <div className="companies-detail">
                <Input placeholder="Kundenbezeichnung" iconName="ion-bag" inputType="text" initialValue={this.getData().CAPTION} editKey="CAPTION" callback={this.onEditItem} width={-1} marginLeft={-1} marginRight={-1} />
                <Input placeholder="Kundenkürzel" iconName="ion-key" inputType="text" initialValue={this.getData().SHORT_NAME} editKey="SHORT_NAME" callback={this.onEditItem} width={50} marginLeft={-1} marginRight={-1}/>     
            </div>
        );
    }
}