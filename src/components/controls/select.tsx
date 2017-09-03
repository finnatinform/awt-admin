import * as React from "react";

export class SelectItem{
    caption : string ;
    ident : number ;

    constructor( _Caption : string = '' , _Ident: number = -1 ){
        this.caption = _Caption ;
        this.ident = _Ident ;
    }
}

export interface ISelectProps {
    iconName : string ;
    selectedIdent : number ; // IDENT
    items : SelectItem[] ;
    callback : any ;
    placeholder : string ;
    width: number ;
    marginLeft: number ;
    marginRight: number ;
    editKey : string ;
}
export interface ISelectState {

}

export class SelectState {

}

export class Select extends React.Component<ISelectProps, ISelectState> {
    constructor( _Props : ISelectProps ){
        super(_Props);
        this.state = new SelectState();
        this.onChange = this.onChange.bind(this);
    }
    onChange( _Event : any ):void{
        var HIndex = _Event.target.selectedIndex - 1 ;
        if( HIndex !== -1 ){
            this.props.callback(this.props.editKey, this.props.items[HIndex].ident);
        }
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
    getSelectedString():string{
        if(this.props.selectedIdent !== -1){
            for( let HIndex : number = 0 ; HIndex<this.props.items.length; HIndex++ ){
                if( this.props.items[HIndex].ident == this.props.selectedIdent ){
                    return this.props.items[HIndex].caption ;
                }
            }
        }
        return "" ;
    }
    renderSelectOptions():JSX.Element[]{
        var HResult : JSX.Element[] = [] ;
        HResult.push(<option disabled>Bitte wählen</option>);
        for( let HIndex : number = 0; HIndex<this.props.items.length; HIndex++ ){
            HResult.push(<option>{this.props.items[HIndex].caption}</option>);
        }
        return HResult ;
    }
    renderDropDownGgf():JSX.Element{
        return <select className="admin-input-select-dropdown" onChange={this.onChange} value={this.getSelectedString()}>
                {this.renderSelectOptions()}
            </select> ;
    }
    render() {
        return (
            <div className="admin-input" style={ this.getStyle()}>
                <div className={this.getIconName()}></div>
                {this.renderDropDownGgf()}
            </div>
        );
    }
}