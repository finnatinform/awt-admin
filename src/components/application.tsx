import * as React from "react";

import NavigationStore = require('./../stores/store-navigation');

import { Menu } from './menu' ;
import { Content } from './content' ;

export interface IApplicationProps {}
export interface IApplicationState {
    ApplicationTitle : string ;
    SelectedPageTitle : string ;
    InNewItem : boolean ;
}

export class ApplicationState {
    ApplicationTitle : string ;
    SelectedPageTitle : string ;
    InNewItem : boolean ;

    constructor(){
        this.ApplicationTitle = NavigationStore.ApplicationTitle;
        this.SelectedPageTitle = NavigationStore.GetSelectedPageTitle();
        this.InNewItem = NavigationStore.InNewItem ;
    }
}

export class Application extends React.Component<IApplicationProps, IApplicationState> {
    navigationStoreListener : any ;
    constructor( _Props : IApplicationProps ){
        super(_Props);
        this.state = new ApplicationState();
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
            ApplicationTitle : NavigationStore.ApplicationTitle,
            SelectedPageTitle : NavigationStore.GetSelectedPageTitle(),
            InNewItem : NavigationStore.InNewItem
        });
    }

    renderTitle():void{
        let HInNewItemTitle : string = "" ;
        if( this.state.InNewItem ){
            HInNewItemTitle = '(*)' ;
        }
        document.title=HInNewItemTitle+this.state.ApplicationTitle + " | " + this.state.SelectedPageTitle ;
    }
    render() {
        {this.renderTitle()}
        return (
            <div className="application">
                <Menu />
                <Content />
            </div>
        );
    }
}