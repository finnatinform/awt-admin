import * as React from "react";

import { NotificationsMaster } from './content-notifications-master';
import { NotificationsDetail } from './content-Notifications-detail';
import { DataView } from './../content-data-view' ;

export class Notifications extends DataView {
    renderMaster():JSX.Element{
        return <NotificationsMaster /> ;
    }
    renderDetail():JSX.Element{
        return <NotificationsDetail /> ;
    }
}