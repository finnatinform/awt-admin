import * as React from "react";
import { Detail, DetailState, IDetailState} from './../content-detail';
import DataStore = require('./../../stores/store-data');
import EventStore = require('./../../stores/store-event');
import Event = require('./../../data/data-event');
import Referent = require('./../../data/data-referent');
import { Input } from './../controls/input' ;
import { Select,SelectItem } from './../controls/select' ;
import { TextArea } from './../controls/textarea' ;
import DataItem = require('./../../data/data-item');

export class EventsDetail extends Detail{
    getStore() : DataStore{
        return EventStore;
    }
    getData():Event{
        if( this.inNewItem() ){
            return this.state.NewItem as Event ;
        } else {
            return this.state.Data as Event ;
        }
    }
    fillReferents(_Referents:DataItem[]):SelectItem[]{     
        var HResult : SelectItem[] = [] ;
        var HName : string = "";
        var HReferent : Referent ;
        for( var HIndex : number = 0 ; HIndex<_Referents.length ; HIndex++ ){
            HReferent = _Referents[HIndex] as Referent ;
            HName = HReferent.FORE_NAME + ' ' + HReferent.SURE_NAME ;
            HResult.push( new SelectItem ( HName , HReferent.IDENT ) );
        }
        return HResult ;
    }
    renderDetailContent():JSX.Element{
        return (
            <div className="events-detail">
                <Input placeholder="Titel" iconName="ion-calendar" inputType="text" initialValue={this.getData().CAPTION} editKey='CAPTION' callback={this.onEditItem} width={-1} marginLeft={-1} marginRight={-1} />
                <Select placeholder="Referent" iconName="ion-person" items={this.fillReferents(EventStore.ReferentData)} selectedIdent={this.getData().REFERENT_IDENT} editKey='REFERENT_IDENT' callback={this.onEditItem} width={50} marginLeft={0} marginRight={10} />
                <Input placeholder="Veranstaltungsort" iconName="ion-location" inputType="text" initialValue={this.getData().PLACE} editKey='PLACE' callback={this.onEditItem} width={50} marginLeft={10} marginRight={0} />
                <Input placeholder="Datum/Uhrzeit" iconName="ion-calendar" inputType="text" initialValue={this.getData().START_DATE} editKey='START_DATE' callback={this.onEditItem} width={50} marginLeft={0} marginRight={10}  />
                <Input placeholder="Dauer" iconName="ion-clock" inputType="text" initialValue={this.getData().DURATION} editKey='DURATION' callback={this.onEditItem} width={50} marginLeft={10} marginRight={0}  />
                <Input placeholder="Kann reserviert werden" iconName="ion-person" inputType="number" initialValue={this.getData().CAN_BE_RESERVED} editKey='CAN_BE_RESERVED' callback={this.onEditItem} width={50} marginLeft={0} marginRight={10}  />
                <Input placeholder="Kann bewertet werden" iconName="ion-star" inputType="number" initialValue={this.getData().HAS_FEEDBACK} editKey='HAS_FEEDBACK' callback={this.onEditItem} width={50} marginLeft={10} marginRight={0}  />
                <Input placeholder="Hat Erinnerung" iconName="ion-calendar" inputType="number" initialValue={this.getData().HAS_START_NOTIFICATION} editKey='HAS_START_NOTIFICATION' callback={this.onEditItem} width={50} marginLeft={0} marginRight={10}  />
                <Input placeholder="Icon des Events" iconName="ion-image" inputType="text" initialValue={this.getData().ICON} editKey='ICON' callback={this.onEditItem} width={50} marginLeft={10} marginRight={0}  />                
                <TextArea placeholder="Beschreibung" editKey='DESCRIPTION' initialValue={this.getData().DESCRIPTION} callback={this.onEditItem} />             
            </div>
        );
    }
}