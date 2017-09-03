import * as React from "react";

import { CompaniesMaster } from './content-companies-master';
import { CompaniesDetail } from './content-companies-detail';
import { DataView } from './../content-data-view' ;

export class Companies extends DataView {
    renderMaster():JSX.Element{
        return <CompaniesMaster /> ;
    }
    renderDetail():JSX.Element{
        return <CompaniesDetail /> ;
    }
}