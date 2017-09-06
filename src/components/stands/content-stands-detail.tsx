import * as React from "react";
import { Detail } from './../content-detail';
import DataStore = require('./../../stores/store-data');
import StandStore = require('./../../stores/store-stand');
import Stand = require('./../../data/data-stand');
import { Input } from './../controls/input' ;
import { TextArea } from './../controls/textarea' ;
import { Constants } from "./../../constants";

export class StandsDetail extends Detail{
    getStore() : DataStore{
        return StandStore;
    }
    getData():Stand{
        if( this.inNewItem() ){
            return this.state.NewItem as Stand ;
        } else {
            return this.state.Data as Stand ;
        }
        
    }
    getAvatarUrl():string{
        return Constants.SERVER_URL +this.getData().LOGO+'.jpg' ;
    }
    renderDetailContent():JSX.Element{
        return (
            <div className="referents-detail">
                {/* <Image callback={this.onEditItem} defaultImage="ion-person" image={this.getAvatarUrl()} editKey='avatar' /> */}
                <div className="referent-image-wrapper">
                    <img src={this.getAvatarUrl()} className="referent-image" />
                </div>
                <Input placeholder="Titel" iconName="ion-map" inputType="text" initialValue={this.getData().CAPTION} editKey='CAPTION' callback={this.onEditItem} width={100} marginLeft={-1} marginRight={-1} /> 
                <Input placeholder="Logo" iconName="ion-image" inputType="text" initialValue={this.getData().LOGO} editKey='LOGO' callback={this.onEditItem}  width={50} marginLeft={-1} marginRight={10} />
                <Input placeholder="Ranking" iconName="ion-funnel" inputType="number" initialValue={this.getData().RANKING} editKey='RANKING' callback={this.onEditItem}  width={50} marginLeft={10} marginRight={-1} /> 
                <TextArea placeholder="Beschreibung" initialValue={this.getData().DESCRIPTION} editKey='DESCRIPTION' callback={this.onEditItem} />       
            </div>
        );
    }
}