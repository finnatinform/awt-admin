import AppDispatcher = require('./../app-dispatcher');
import AppActionTypes = require('./app-action-types');
import AppPageType = require('./../data/app-page-types');
import NavigationStore = require('./../stores/store-navigation');
import DataItem = require('./../data/data-item');

class ActionHandler {
    public showPage( _PageType : AppPageType ):void{
        AppDispatcher.dispatch({
            actionType : AppActionTypes.AT_TAB_CHANGED,
            data : {
                dataType : _PageType
            }
        });
    }
    public selectItem( _Index : number ):void{
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_SELECTION_CHANGED ,
            data : {
                dataType : NavigationStore.ActivePage,
                selectedIdx : _Index
            }
        });
    }
    public newItem():void{
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_NEW_ITEM_REQUESTED ,
            data : {
                dataType : NavigationStore.ActivePage
            }
        });
    }
    public loadData( _SelectLastItem : boolean ):void{
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_LOAD_DATA_REQUESTED,
            data: {
                dataType : NavigationStore.ActivePage,
                SelectLastItem : _SelectLastItem
            }
        });
    }
    public dataLoaded( _Data : any[] , _SelectLastItem : boolean ):void{
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_DATA_LOADED,
            data: {
                dataType :  NavigationStore.ActivePage,
                loadedData: _Data
            }
        });
        if( _SelectLastItem ){
            this.selectItem(_Data.length-1);
        } else if ( _Data.length>0 ) {
            this.selectItem(0);
        }
    }
    public dataLoadedFailed():void{
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_DATA_LOAD_FAILED,
            data:{
                dataType : NavigationStore.ActivePage
            }
        });
    }
    public editItem(_Data : DataItem){
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_ITEM_CHANGE_CONFIRMED,
            data:{
                dataType : NavigationStore.ActivePage,
                data: _Data
            }
        });
        this.loadData( false );
    }
    public saveNewItem(_Data : DataItem){
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_NEW_ITEM_CONFIRMED,
            data:{
                dataType : NavigationStore.ActivePage,
                data: _Data
            }
        });
        this.loadData( true );
    }
    public rejectChangeItem(){
        // der Einfachheit einfach ein reject Change Item
        this.loadData(false);
    }
    public deleteItem(_Data : DataItem){
        AppDispatcher.dispatch({
            actionType: AppActionTypes.AT_DELETE_ITEM,
            data:{
                dataType : NavigationStore.ActivePage,
                data: _Data
            }
        });
        this.loadData( false );
        this.selectItem(0);
    }
}

var AppActionHandler: ActionHandler = new ActionHandler();

export = AppActionHandler;