import * as React from "react";

import { ReferentsMaster } from './content-referents-master';
import { ReferentsDetail } from './content-referents-detail';
import { DataView } from './../content-data-view' ;

export class Referents extends DataView {
    renderMaster():JSX.Element{
        return <ReferentsMaster /> ;
    }
    renderDetail():JSX.Element{
        return <ReferentsDetail /> ;
    }
}