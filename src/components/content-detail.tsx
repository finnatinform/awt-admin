import * as React from "react";
import AppActionHandler = require('./../actions/app-action-handler');
import DataStore = require('./../stores/store-data');
import DataItem = require('./../data/data-item');

export interface IDetailProps { }
export interface IDetailState {
    Data: DataItem;
    NewItem: DataItem;
}

export class DetailState implements IDetailState {
    Data: DataItem;
    NewItem: DataItem;
    constructor() {
        this.Data = null;
        this.NewItem = null;
    }
}

export class Detail extends React.Component<IDetailProps, IDetailState> {
    dataStoreListener: any;

    constructor(_Props: IDetailProps) {
        super(_Props);
        this.state = this.getState();
        this.onDataStoreChanged = this.onDataStoreChanged.bind(this);
        this.onSaveItem = this.onSaveItem.bind(this);
        this.onRejectItem = this.onRejectItem.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }
    getState():IDetailState{
        return new DetailState() ;
    }
    onDataStoreChanged(): void {
        this.setState({
            Data: this.getStore().getSelectedData(),
            NewItem: this.getStore().getNewData()
        });
    }
    public componentDidMount(): void {
        this.dataStoreListener = this.getStore().addListener(this.onDataStoreChanged);
    }
    public componentWillUnmount(): void {
        this.dataStoreListener.remove();
    }
    getStore(): DataStore {
        return null;
    }
    renderDetailContent(): JSX.Element {
        alert('getData is null');
        return null;
        // to override
    }
    renderContent(): JSX.Element {
        if (this.state.Data !== null) {
            return this.renderDetailContent()
        } else {
            return <div className="select-data">Bitte wählen sie einen Datensatz aus</div>
        }
    }
    inNewItem(): boolean {
        return this.state.NewItem !== null;
    }
    onEditItem(_Key: string, _Value: any): void {
        var HItem: any;
        if (this.inNewItem()) {
            HItem = this.state.NewItem;
            HItem[_Key] = _Value;
            this.setState({
                NewItem: HItem,
                Data:this.state.Data
            });
        } else {
            HItem = this.state.Data;
            HItem[_Key] = _Value;
            this.setState({
                Data: HItem,
                NewItem: this.state.NewItem
            });
        }
    }
    getSaveCaption() {
        if (this.inNewItem()) {
            return "Anlegen";
        } else {
            return "Speichern";
        }
    }
    onSaveItem() {
        if (this.inNewItem()) {
            AppActionHandler.saveNewItem(this.state.NewItem);
        } else {
            AppActionHandler.editItem(this.state.Data);
        }
    }
    onRejectItem() {
        AppActionHandler.rejectChangeItem();
    }
    onDeleteItem(){
        AppActionHandler.deleteItem(this.state.Data);
    }
    getData(): DataItem {
        alert('base class shouldnt be called');
        return null;
    }
    renderDeleteGgf(){
        if( !this.inNewItem() ){
            return [<button onClick={this.onDeleteItem} className="content-detail-options-delete">Löschen</button>,
                    <button onClick={this.onRejectItem} className="content-detail-options-reject">Verwerfen</button>] ;
        }
    }
    render() {
        return (
            <div className="content-detail">
                {this.renderContent()}
                <div className="content-detail-options">
                    {this.renderDeleteGgf()}
                    <button onClick={this.onSaveItem} className="content-detail-options-save">{this.getSaveCaption()}</button>
                </div>
            </div>
        );
    }
}