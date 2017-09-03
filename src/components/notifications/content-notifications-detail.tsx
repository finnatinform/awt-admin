import * as React from "react";
import { Detail } from './../content-detail';
import DataStore = require('./../../stores/store-data');
import NotificationStore = require('./../../stores/store-notification');
import Notification = require('./../../data/data-notification');
import { Input } from './../controls/input' ;
import { TextArea } from './../controls/textarea' ;
import { Select,SelectItem } from './../controls/select' ;
import DataItem = require('./../../data/data-item');
import Event = require('./../../data/data-event');

export class NotificationsDetail extends Detail{
    getStore() : DataStore{
        return NotificationStore;
    }
    getData():Notification{
        if( NotificationStore.NewItem !== null ){
            return this.state.NewItem as Notification ;
        } else {
            return this.state.Data as Notification ;
        }
        
    }
    fillEvents(_Events:DataItem[]):SelectItem[]{     
        var HResult : SelectItem[] = [] ;
        var HName : string = "";
        var HEvent : Event ;
        for( var HIndex : number = 0 ; HIndex<_Events.length ; HIndex++ ){
            HEvent = _Events[HIndex] as Event ;
            HName = HEvent.CAPTION ;
            HResult.push( new SelectItem ( HName , HEvent.IDENT ) );
        }
        return HResult ;
    }

    renderDetailContent():JSX.Element{
        return (
            <div className="notifications-detail">
                <Input placeholder="Titel" iconName="ion-upload" inputType="text" initialValue={this.getData().CAPTION} editKey='CAPTION' callback={this.onEditItem} width={-1} marginLeft={-1} marginRight={-1} />  
                <Select placeholder="Referent" iconName="ion-person" items={this.fillEvents(NotificationStore.EventData)} selectedIdent={this.getData().EVENT_IDENT} editKey='EVENT_IDENT' callback={this.onEditItem} width={50} marginLeft={0} marginRight={10} />
                <Input placeholder="Datum" iconName="ion-calendar" inputType="text" initialValue={this.getData().START_DATE} editKey='START_DATE' callback={this.onEditItem} width={50} marginLeft={10} marginRight={0}  />
                <TextArea placeholder="Beschreibung" initialValue={this.getData().DESCRIPTION} editKey='DESCRIPTION' callback={this.onEditItem} /> 
            </div>
        );
    }
}