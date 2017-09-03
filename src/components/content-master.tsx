import * as React from "react";
import AppActionHandler = require('./../actions/app-action-handler');
import DataStore = require('./../stores/store-data');
import DataItem = require('./../data/data-item');

export interface IMasterProps { }
export interface IMasterState {
    SelectedIdx: number;
    Data: DataItem[];
}

export class MasterState {
    SelectedIdx: number;
    Data: DataItem[];
    constructor(_Index: number) {
        this.SelectedIdx = _Index;
        this.Data = [];
    }
}

export class Master extends React.Component<IMasterProps, IMasterState> {
    dataStoreListener : any ;

    constructor(_Props: IMasterProps) {
        super(_Props);
        this.state = new MasterState(this.getStore().SelectedIdx);
        this.onDataStoreChanged = this.onDataStoreChanged.bind(this);
    }
    onDataStoreChanged():void{
        this.setState({
            SelectedIdx:this.getStore().SelectedIdx,
            Data:this.getStore().Data
        });
    }
    public componentDidMount() : void {
        this.dataStoreListener = this.getStore().addListener(this.onDataStoreChanged);
    }
    public componentWillUnmount() : void{
        this.dataStoreListener.remove();
    }
    getStore(): DataStore {
        return null;
    }

    onItemClicked(_Index: number): void {
        AppActionHandler.selectItem(_Index);
    }

    onNewItemClick(): void {
        AppActionHandler.newItem();
    }
    renderItem(_Item: DataItem, _Index : number, _Selected : boolean): JSX.Element {
        // to override ;
        return null;
    }
    renderGroupItem( _Date : Date ):JSX.Element{
        return <li>{_Date}</li>
    }
    isDateList(){
        return false ;
    }
    renderItems(): JSX.Element[] {
        var HResult: JSX.Element[] = [];
        var HAktItem: DataItem = null;
        for(let HIndex = 0; HIndex < this.state.Data.length; HIndex++) {
            HAktItem = this.state.Data[HIndex];
            if(this.isDateList()){
                if(HIndex>=1) {
                    if (HAktItem.date.getDay !== this.state.Data[HIndex-1].date.getDay) {
                        HResult.push(this.renderGroupItem(HAktItem.date));
                    }
                }
            }
            HResult.push(this.renderItem(this.state.Data[HIndex],HIndex,HIndex==this.state.SelectedIdx));
        }
        return HResult;
    }
    getSingleName():string{
        return "Datensatz";
    }
    render() {
        return (
            <div className="content-master">
                <ul>
                    <li onClick={this.onNewItemClick} className="master-new-item">
                        {this.getSingleName()} anlegen
                    </li>
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}