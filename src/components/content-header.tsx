import * as React from "react";

import NavigationStore = require('./../stores/store-navigation');

export interface IContentHeaderProps {}
export interface IContentHeaderState {
    PageTitle : string ;
}

export class ContentHeaderState {
    PageTitle : string ;
    constructor(){
        this.PageTitle = NavigationStore.GetSelectedPageTitle();
    }
}

export class ContentHeader extends React.Component<IContentHeaderProps, IContentHeaderState> {
    navigationStoreListener : any ;

    constructor( _Props : IContentHeaderProps ){
        super(_Props);
        this.state = new ContentHeaderState();
        this.onNavigationStoreChange = this.onNavigationStoreChange.bind(this);
    }
    public componentDidMount() : void {
        this.navigationStoreListener = NavigationStore.addListener(this.onNavigationStoreChange);
    }
    public componentWillUnmount() : void{
        this.navigationStoreListener.remove();
    }

    onNavigationStoreChange():void{
        this.setState({
           PageTitle : NavigationStore.GetSelectedPageTitle()
        });
    }
    render() {
        return (
            <div className="content-header">
                {this.state.PageTitle}
            </div>  
        );
    }
}