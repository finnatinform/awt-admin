import { Store } from 'flux/utils' ;
import DataStore = require('./store-data');
import Stand = require('./../data/data-stand');
import AppDispatcher = require('./../app-dispatcher');
import DataItem = require('./../data/data-item');
import AppPageType = require('./../data/app-page-types');
import AppAction = require('./../actions/app-action');
import AppActionTypes = require('./../actions/app-action-types');

class StandStoreClass extends DataStore{
    setNewItem():void{
        super.setNewItem();
        this.NewItem = new Stand();
    }
    getViewType():AppPageType{
        return AppPageType.PT_STANDS;
    }
    getTempItem( _Data : DataItem ):any{
        let HResult : Stand = _Data as Stand;
        return {
            CAPTION : HResult.CAPTION,
            LOGO : HResult.LOGO,
            DESCRIPTION : HResult.DESCRIPTION,
            IDENT : HResult.IDENT,
            RANKING : HResult.RANKING
        };
    }
}

var ReferentStore : StandStoreClass = new StandStoreClass(AppDispatcher);
export = ReferentStore;