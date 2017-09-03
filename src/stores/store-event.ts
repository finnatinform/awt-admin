import { Store } from 'flux/utils' ;
import DataStore = require('./store-data');
import Event = require('./../data/data-event');
import AppDispatcher = require('./../app-dispatcher');
import DataItem = require('./../data/data-item');
import AppPageType = require('./../data/app-page-types');
import * as $ from 'jquery';
import { Constants } from "./../constants";

class EventStoreClass extends DataStore{
    ReferentData : DataItem[] = [] ;

    setNewItem():void{
        super.setNewItem();
        this.NewItem = new Event();
    }
    getViewType():AppPageType{
        return AppPageType.PT_EVENTS;
    }
    additionalDataLoad():void{
        $.ajax({
            url: Constants.SERVER_URL + 'referents' + "/list",
            dataType: "json",
            method: "GET"
        }).done(function (_Data) {
            if(_Data === 'error'){
                console.log('Referents couldnt be loaded');
            }else{
                // this is againts flux, but works fine
                EventStore.ReferentData = _Data ;        
            }
        });
    }
    getTempItem( _Data : DataItem ):any{
        let HResult : Event = _Data as Event;
        return {
            CAPTION : HResult.CAPTION,
            PLACE : HResult.PLACE ,
            DESCRIPTION : HResult.DESCRIPTION ,
            START_DATE : HResult.START_DATE ,
            DURATION : HResult.DURATION ,
            REFERENT_IDENT : HResult.REFERENT_IDENT ,
            HAS_FEEDBACK : HResult.HAS_FEEDBACK ,
            IDENT : HResult.IDENT,
            ICON : HResult.ICON,
            CAN_BE_RESERVED : HResult.CAN_BE_RESERVED,
            HAS_START_NOTIFICATION : HResult.HAS_START_NOTIFICATION
        };
    }
}

var EventStore : EventStoreClass = new EventStoreClass(AppDispatcher);
export = EventStore;