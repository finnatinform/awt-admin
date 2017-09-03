import * as React from "react";

export interface ITextAreaProps {
    initialValue : string ;
    callback : any ;
    placeholder : string ;
    editKey : string ;
}
export interface ITextAreaState {
}

export class TextAreaState {

}

export class TextArea extends React.Component<ITextAreaProps, ITextAreaState> {
    constructor( _Props : ITextAreaProps ){
        super(_Props);
        this.state = new TextAreaState();
        this.onChange = this.onChange.bind(this);
    }
    onChange( _Event : any ):void{
        this.props.callback(this.props.editKey, _Event.target.value);
    }
    render() {
        return (
            <div className="admin-textarea">
                <textarea className="admin-textarea-field"  value={this.props.initialValue} placeholder={this.props.placeholder} onChange={this.onChange}  />
            </div>
        );
    }
}