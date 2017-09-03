import * as React from "react";

export interface INotFoundProps {}
export interface INotFoundState {
}

export class NotFoundState {
}

export class NotFound extends React.Component<INotFoundProps, INotFoundState> {
    constructor( _Props : INotFoundProps ){
        super(_Props);
    }
    render() {
        return (
            <div className="not-found">
                Oh no! You broke the internet :(
            </div>  
        );
    }
}