import * as React from "react";

import AppActionHandler = require('./../actions/app-action-handler');

export interface IDataViewProps {}
export interface IDataViewState {
    InLoading : boolean ;
}

export class DataViewState {
    InLoading : boolean ;
    constructor(){
        this.InLoading = false ;
    }
}

export class DataView extends React.Component<IDataViewProps, IDataViewState> {
    constructor( _Props : IDataViewProps ){
        super(_Props);
        this.state = new DataViewState();
    }
    componentDidMount():void{
        AppActionHandler.loadData( false );
    }
    renderContent(){
        if( this.state.InLoading ){
            return <div className="content-loading">Daten werden geladen</div>
        } else {
            return [this.renderMaster(),this.renderDetail()];
        }
    }
    renderMaster():JSX.Element{
        return null ;
    }
    renderDetail():JSX.Element{
        return null ;
    }
    render() {
        return (
            <div className="events master-detail">
                {this.renderContent()}
            </div>  
        );
    }
}