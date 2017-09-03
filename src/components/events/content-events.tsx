import * as React from "react";

import { EventsMaster } from './content-events-master';
import { EventsDetail } from './content-events-detail';
import { DataView } from './../content-data-view' ;

export class Events extends DataView {
    renderMaster():JSX.Element{
        return <EventsMaster /> ;
    }
    renderDetail():JSX.Element{
        return <EventsDetail /> ;
    }
}