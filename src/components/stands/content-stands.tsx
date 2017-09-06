import * as React from "react";

import { StandsMaster } from './content-stands-master';
import { StandsDetail } from './content-stands-detail';
import { DataView } from './../content-data-view' ;

export class Stands extends DataView {
    renderMaster():JSX.Element{
        return <StandsMaster /> ;
    }
    renderDetail():JSX.Element{
        return <StandsDetail /> ;
}
    }