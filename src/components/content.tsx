import * as React from "react";

import AppPageType = require('./../data/app-page-types');
import NavigationStore = require('./../stores/store-navigation');

import { ContentHeader } from './content-header';
import { NotFound } from './content-not-found';
import { Events } from './events/content-events';
import { Companies } from './companies/content-companies' ;
import { Notifications } from './notifications/content-notifications' ;
import { Referents } from './referents/content-referents' ;
import { Stands } from './stands/content-stands' ;

export interface IContentProps {}
export interface IContentState {
    SelectedPage : AppPageType ;
}

export class ContentState {
    SelectedPage : AppPageType ;
    constructor(){
        this.SelectedPage = NavigationStore.ActivePage;
    }
}

export class Content extends React.Component<IContentProps, IContentState> {
    navigationStoreListener : any ;

    constructor( _Props : IContentProps ){
        super(_Props);
        this.state = new ContentState();
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
            SelectedPage : NavigationStore.ActivePage
        });
    }
    renderContent():JSX.Element{
        // Hier könnte man per switch case auch anderen Inhalt anzeigen
        switch( this.state.SelectedPage ){
            case AppPageType.PT_EVENTS:
                return <Events /> ;
            case AppPageType.PT_COMPANIES:
                return <Companies /> ;
            case AppPageType.PT_NOTIFICATIONS:
                return <Notifications />
            case AppPageType.PT_REFERENTS:
                return <Referents />
            case AppPageType.PT_STANDS:
                return <Stands />

            default: return <NotFound />
        }
    }
    render() {
        return (
            <div className="content">
                <ContentHeader />
                <div className="content-wrapper">
                    {this.renderContent()}
                </div>
            </div>  
        );
    }
}