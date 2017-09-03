import DataItem = require('./data-item');
class Event extends DataItem {
    PLACE: string;
    DESCRIPTION: string;
    START_DATE: string;
    DURATION: string;
    REFERENT_IDENT: number;
    HAS_FEEDBACK: number;
    CAN_BE_RESERVED : number;
    ICON : string;
    HAS_START_NOTIFICATION : number;

    constructor() {
        super();
        this.PLACE = "";
        this.DESCRIPTION = "";
        this.START_DATE = "";
        this.DURATION = "";
        this.REFERENT_IDENT = -1;
        this.HAS_FEEDBACK = 1; // Events haben immer Feedback
        this.CAN_BE_RESERVED = 1 ;
        this.ICON = "";
        this.HAS_START_NOTIFICATION = 1 ;
    }
}

export = Event;