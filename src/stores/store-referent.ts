import { Store } from 'flux/utils' ;
import DataStore = require('./store-data');
import Referent = require('./../data/data-referent');
import AppDispatcher = require('./../app-dispatcher');
import DataItem = require('./../data/data-item');
import AppPageType = require('./../data/app-page-types');
import AppAction = require('./../actions/app-action');
import AppActionTypes = require('./../actions/app-action-types');

class ReferentStoreClass extends DataStore{
    setNewItem():void{
        super.setNewItem();
        this.NewItem = new Referent();
    }
    getViewType():AppPageType{
        return AppPageType.PT_REFERENTS;
    }
    getTempItem( _Data : DataItem ):any{
        let HResult : Referent = _Data as Referent;
        return {
            FORE_NAME : HResult.FORE_NAME,
            SURE_NAME : HResult.SURE_NAME,
            DESCRIPTION : HResult.DESCRIPTION,
            IDENT : HResult.IDENT,
            RANKING : HResult.RANKING
        };
    }
}

var ReferentStore : ReferentStoreClass = new ReferentStoreClass(AppDispatcher);
export = ReferentStore;