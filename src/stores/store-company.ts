import { Store } from 'flux/utils' ;
import DataStore = require('./store-data');
import Company = require('./../data/data-company');
import AppDispatcher = require('./../app-dispatcher');
import DataItem = require('./../data/data-item');
import AppPageType = require('./../data/app-page-types');

class CompanyStoreClass extends DataStore{
    setNewItem():void{
        super.setNewItem();
        this.NewItem = new Company();
    }
    getViewType():AppPageType{
        return AppPageType.PT_COMPANIES;
    }
    getTempItem( _Data : DataItem ):any{
        let HResult : Company = _Data as Company;
        return {
            CAPTION : HResult.CAPTION,
            SHORT_NAME : HResult.SHORT_NAME
        };
    }
}

var CompanyStore : CompanyStoreClass = new CompanyStoreClass(AppDispatcher);
export = CompanyStore;