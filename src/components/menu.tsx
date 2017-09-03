import * as React from "react";

import AppPageType = require('./../data/app-page-types');
import NavigationItem = require('./../data/app-navigation-item');
import NavigationStore = require('./../stores/store-navigation');
import AppActionHandler = require('./../actions/app-action-handler');

export interface IMenuProps {}
export interface IMenuState {
    ApplicationTitle : string ;
    MenuData : NavigationItem[] ;
    SelectedPage : AppPageType ;
}

export class MenuState {
    ApplicationTitle : string ;
    MenuData : NavigationItem[] ;
    SelectedPage : AppPageType ;
    constructor(){
        this.ApplicationTitle = NavigationStore.ApplicationTitle;
        this.MenuData = NavigationStore.MenuData;
        this.SelectedPage = NavigationStore.ActivePage;
    }
}

export class Menu extends React.Component<IMenuProps, IMenuState> {
    navigationStoreListener : any ;

    constructor( _Props : IMenuProps ){
        super(_Props);
        this.state = new MenuState();

        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onNavigationStoreChange = this.onNavigationStoreChange.bind(this);
    }
    public componentDidMount() : void {
        this.navigationStoreListener = NavigationStore.addListener(this.onNavigationStoreChange);
    }
    public componentWillUnmount() : void{
        this.navigationStoreListener.remove();
    }

    onMenuItemClick( _PageType : AppPageType ):void{
        AppActionHandler.showPage( _PageType );
    }

    onNavigationStoreChange():void{
        this.setState({
            ApplicationTitle : NavigationStore.ApplicationTitle,
            MenuData : NavigationStore.MenuData,
            SelectedPage : NavigationStore.ActivePage
        });
    }

    getActiveGgf( _PageType : AppPageType ):string{
        if(this.state.SelectedPage==_PageType){
            return " menu-active"
        }
        return ""
    }

    renderMenuItems():JSX.Element[]{
        var HResult : JSX.Element[] = [] ;
        for(let HMenuItem of NavigationStore.MenuData){
            HResult.push( <li className={HMenuItem.icon + this.getActiveGgf( HMenuItem.type )} title={HMenuItem.caption} onClick={() => this.onMenuItemClick(HMenuItem.type)} /> );
        }
        return HResult;
    }
    render() {
        return (
            <div className="menu">
                <ul>
                    <li className="ion-planet" title={this.state.ApplicationTitle} ></li>
                    {this.renderMenuItems()}
                </ul>
            </div>  
        );
    }
}