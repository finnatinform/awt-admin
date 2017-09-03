import { Store } from 'flux/utils';
import AppAction = require('./../actions/app-action');
import AppDispatcher = require('./../app-dispatcher');
import AppPageType = require('./../data/app-page-types');
import AppActionTypes = require('./../actions/app-action-types');
import NavigationItem = require('./../data/app-navigation-item');

class NavigationStoreStatic extends Store<AppAction>{
    ApplicationTitle: string = 'Anwendertreffen';
    ActivePage: AppPageType = this.GetInitialTab();
    MenuData: NavigationItem[] = [
        new NavigationItem('ion-calendar', 'Events', AppPageType.PT_EVENTS),
        new NavigationItem('ion-upload', 'Notifications', AppPageType.PT_NOTIFICATIONS),
        new NavigationItem('ion-person', 'Referenten', AppPageType.PT_REFERENTS),
        new NavigationItem('ion-bag', 'Kunden', AppPageType.PT_COMPANIES)
    ];
    InNewItem: boolean = false;

    GetSelectedPageTitle(): string {
        return this.MenuData[this.ActivePage].caption;
    }
    GetInitialTab(): AppPageType {
        var HCookie = document.cookie;
        if (HCookie !== '') {
            var HLastSelected : string = this.getCookie('LastSelectedPage') ;
            return JSON.parse(HLastSelected);
        }
        return AppPageType.PT_EVENTS;
    }
    getCookie(_Cookie: string): string {
        var name = _Cookie + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    saveLastSelectedPage( _LastSelectedPage : AppPageType ){
        document.cookie = "LastSelectedPage="+JSON.stringify( _LastSelectedPage ) ;
    }
    __onDispatch(_Action: AppAction) {
        var HError: boolean = false;
        switch (_Action.actionType) {
            case AppActionTypes.AT_TAB_CHANGED:
                this.ActivePage = _Action.data.dataType;
                this.saveLastSelectedPage(_Action.data.dataType);
                this.InNewItem = false;
                break;
            case AppActionTypes.AT_NEW_ITEM_REQUESTED:
                this.InNewItem = true;
                break;
            case AppActionTypes.AT_NEW_ITEM_CONFIRMED,
                AppActionTypes.AT_NEW_ITEM_ABORTED,
                AppActionTypes.AT_SELECTION_CHANGED:
                this.InNewItem = false;
                break;
            default:
                HError = true;
        }
        if (!HError) {
            this.__emitChange();
        }
    }
}

var NavigationStore: NavigationStoreStatic = new NavigationStoreStatic(AppDispatcher);
export = NavigationStore;