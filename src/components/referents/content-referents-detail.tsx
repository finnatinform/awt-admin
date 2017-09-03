import * as React from "react";
import { Detail } from './../content-detail';
import DataStore = require('./../../stores/store-data');
import ReferentStore = require('./../../stores/store-referent');
import Referent = require('./../../data/data-referent');
import { Input } from './../controls/input' ;
import { TextArea } from './../controls/textarea' ;
import { Constants } from "./../../constants";

export class ReferentsDetail extends Detail{
    getStore() : DataStore{
        return ReferentStore;
    }
    getData():Referent{
        if( this.inNewItem() ){
            return this.state.NewItem as Referent ;
        } else {
            return this.state.Data as Referent ;
        }
        
    }
    getAvatarUrl():string{
        return Constants.SERVER_URL +this.getData().FORE_NAME+'_'+this.getData().SURE_NAME+'.jpg' ;
    }
    renderDetailContent():JSX.Element{
        return (
            <div className="referents-detail">
                {/* <Image callback={this.onEditItem} defaultImage="ion-person" image={this.getAvatarUrl()} editKey='avatar' /> */}
                <div className="referent-image-wrapper">
                    <img src={this.getAvatarUrl()} className="referent-image" />
                </div>
                <Input placeholder="Vorname" iconName="ion-person" inputType="text" initialValue={this.getData().FORE_NAME} editKey='FORE_NAME' callback={this.onEditItem} width={50} marginLeft={-1} marginRight={10} /> 
                <Input placeholder="Nachname" iconName="ion-person" inputType="text" initialValue={this.getData().SURE_NAME} editKey='SURE_NAME' callback={this.onEditItem} width={50} marginLeft={10} marginRight={-1} />
                <Input placeholder="Referentenranking" iconName="ion-person" inputType="number" initialValue={this.getData().RANKING} editKey='RANKING' callback={this.onEditItem} width={100} marginLeft={-1} marginRight={-1} /> 
                <TextArea placeholder="Beschreibung" initialValue={this.getData().DESCRIPTION} editKey='DESCRIPTION' callback={this.onEditItem} />       
            </div>
        );
    }
}