import { Store } from 'flux/utils' ;
import DataStore = require('./store-data');
import Notification = require('./../data/data-notification');
import AppDispatcher = require('./../app-dispatcher');
import DataItem = require('./../data/data-item');
import AppPageType = require('./../data/app-page-types');
import * as $ from 'jquery';
import { Constants } from "./../constants";

class CompanyStoreClass extends DataStore{
    EventData : DataItem[] = [] ;

    additionalDataLoad():void{
        $.ajax({
            url: Constants.SERVER_URL + 'events' + "/listEventsForAdmin",
            dataType: "json",
            method: "GET"
        }).done(function (_Data) {
            if(_Data === 'error'){
                console.log('Events couldnt be loaded');
            }else{
                // this is againts flux, but works fine
                NotificationStore.EventData = _Data ;        
            }
        });
    }

    setNewItem():void{
        super.setNewItem();
        this.NewItem = new Notification();
    }
    getViewType():AppPageType{
        return AppPageType.PT_NOTIFICATIONS;
    }
    getTempItem( _Data : DataItem ):any{
        let HResult : Notification = _Data as Notification;
        return {
            CAPTION : HResult.CAPTION,
            DESCRIPTION : HResult.DESCRIPTION,
            START_DATE : HResult.START_DATE,
            EVENT_IDENT : HResult.EVENT_IDENT,
            IDENT : HResult.IDENT
        };
    }
}

var NotificationStore : CompanyStoreClass = new CompanyStoreClass(AppDispatcher);
export = NotificationStore;