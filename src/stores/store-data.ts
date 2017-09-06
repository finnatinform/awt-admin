import flux = require('flux');
import { Store } from 'flux/utils';
import AppAction = require('./../actions/app-action');
import AppActionTypes = require('./../actions/app-action-types');
import DataItem = require('./../data/data-item');
import AppPageType = require('./../data/app-page-types');
import AppActionHandler = require('./../actions/app-action-handler');
import * as $ from 'jquery';
import NavigationStore = require('./store-navigation');
import { Constants } from "./../constants";

class DataStore extends Store<AppAction>{
    SelectedIdx: number = 0;
    NewItem: DataItem = null;
    Data: DataItem[] = [];
    InLoadingData: boolean = false;
    LoadingDataHasFailed: boolean = false;

    setNewItem(): void {
        this.SelectedIdx = -1;
        // to override
    }
    additionalDataLoad():void{
        // Just to override 
    }
    loadData( _Async : boolean = false , _SelectLastItem : boolean ): void {
        this.InLoadingData = true;
        this.additionalDataLoad();
        var HListCommand = "/list";
        if(this.getViewType()===AppPageType.PT_EVENTS){
            HListCommand = "/listEventsForAdmin";
        }
        console.log(HListCommand);
        $.ajax({
            url: Constants.SERVER_URL + this.getApiUrl() + HListCommand,
            dataType: "json",
            method: "GET"
        }).done(function (_Data) {
            if(_Data === 'error'){
                AppActionHandler.dataLoadedFailed();
            }else{
                AppActionHandler.dataLoaded(_Data , _SelectLastItem);              
            }
        });
    }

    finishedLoadingData(_LoadedData: DataItem[]) {
        this.Data = _LoadedData;
        this.InLoadingData = false;
    }

    GetIsInNewItem(): boolean {
        return this.NewItem !== null;
    }

    getViewType(): AppPageType {
        return -1;
    }
    getSelectedData(): DataItem {
        return this.Data[this.SelectedIdx];
    }
    getNewData(): DataItem {
        return this.NewItem;
    }
    loadDataFailed(): void {
        this.LoadingDataHasFailed = true;
    }
    changeItem(_Data: DataItem): void {
        $.ajax({
            url: Constants.SERVER_URL + this.getApiUrl() + "/change",
            dataType: 'json',
            method: "POST",
            data: this.getTempItem( _Data )
        }).done(function (_DataResult: any) {
            alert('response');
        });
    }
    getTempItem( _Data : DataItem ):any{
        alert('baseclass getTEmpITem');
        return {};
    }
    saveNewItem(_Data: DataItem): void {
        $.ajax({
            url: Constants.SERVER_URL + this.getApiUrl() + "/add",
            dataType: 'json',
            method: "POST",
            data: this.getTempItem( _Data )
        }).done(function (_DataResult: any) {
            alert('response');
        });
    }
    getApiUrl(): string {
        switch (this.getViewType()) {
            case AppPageType.PT_COMPANIES: return "companies";
            case AppPageType.PT_EVENTS: return "events";
            case AppPageType.PT_NOTIFICATIONS: return "notifications";
            case AppPageType.PT_REFERENTS: return "referents";
            case AppPageType.PT_STANDS: return "stands";
        }
        return "";
    }
    deleteItem( _Data : DataItem ):void{
        $.ajax({
            url: Constants.SERVER_URL + this.getApiUrl() + "/delete",
            dataType: 'json',
            method: "DELETE",
            data: this.getTempItem( _Data )
        }).done(function (_DataResult: any) {
            alert('response');
        });     
    }
    rejectItemChange():void{
        this.SelectedIdx = -1 ;
        alert('rejectItemStore funktioniert noch nicht');
    }
    beforeEmitChange( _Action : AppAction ):void{
        // to override
    }
    __onDispatch(_Action: AppAction) {
        this.beforeEmitChange(_Action);
        if (_Action.data.dataType == this.getViewType()) {
            var HError: boolean = false;
            switch (_Action.actionType) {
                case AppActionTypes.AT_SELECTION_CHANGED:
                    this.SelectedIdx = _Action.data.selectedIdx;
                    this.NewItem = null;
                    break;
                case AppActionTypes.AT_NEW_ITEM_REQUESTED:
                    this.setNewItem();
                    break;
                case AppActionTypes.AT_NEW_ITEM_ABORTED:
                    this.NewItem = null;
                    break;
                case AppActionTypes.AT_ITEM_CHANGE_ABORTED:
                    this.rejectItemChange();
                    break;
                case AppActionTypes.AT_LOAD_DATA_REQUESTED:
                    this.loadData( false , _Action.data.SelectLastItem );
                    break;
                case AppActionTypes.AT_DATA_LOADED:
                    this.finishedLoadingData(_Action.data.loadedData);
                    break;
                case AppActionTypes.AT_DATA_LOAD_FAILED:
                    this.loadDataFailed();
                    break;
                case AppActionTypes.AT_ITEM_CHANGE_CONFIRMED:
                    this.changeItem(_Action.data.data);
                    break;
                case AppActionTypes.AT_NEW_ITEM_CONFIRMED:
                    this.saveNewItem(_Action.data.data);
                    break;
                case AppActionTypes.AT_DELETE_ITEM:
                    this.deleteItem(_Action.data.data);
                    break;
                default:
                    HError = true;
            }
            if (!HError) {
                this.__emitChange();
            }
        }
    }
}

export = DataStore;