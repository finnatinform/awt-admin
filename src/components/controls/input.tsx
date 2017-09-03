import * as React from "react";

export interface IInputProps {
    iconName : string ;
    initialValue : any ;
    callback : any ;
    placeholder : string ;
    width: number ;
    marginLeft: number ;
    marginRight: number ;
    editKey : string ;
    inputType : string ;
}
export interface IInputState {
}

export class InputState {
}

export class Input extends React.Component<IInputProps, IInputState> {
    constructor( _Props : IInputProps ){
        super(_Props);
        this.state = new InputState();
        this.onChange = this.onChange.bind(this);
    }
    onChange( _Event : any ):void{
        this.props.callback(this.props.editKey, _Event.target.value);
    }
    getIconName():string{
        return "admin-input-icon " + this.props.iconName ;
    }
    getStyle():any{
        if( this.props.width !== -1 ){
            var HPadding = this.props.marginLeft + this.props.marginRight;
            return {
                width: 'calc( '+this.props.width+'% - '+ HPadding +'px)',
                marginLeft: this.props.marginLeft,
                marginRight: this.props.marginRight
            };
        }
        return {
            width: 100+'%'
        };
    }
    render() {
        return (
            <div className="admin-input" style={ this.getStyle()}>
                <div className={this.getIconName()}></div>
                <input type={this.props.inputType} className="admin-input-field" value={this.props.initialValue} placeholder={this.props.placeholder} onChange={this.onChange} />
            </div>
        );
    }
}