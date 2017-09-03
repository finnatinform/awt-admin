import * as React from "react";

export interface IImageProps {
    image : string ;
    defaultImage : string ;
    callback : any ;
    editKey : string ;
}
export interface IImageState {
}

export class ImageState {
}

export class Image extends React.Component<IImageProps, IImageState> {
    constructor( _Props : IImageProps ){
        super(_Props);
        this.state = new ImageState();
        this.onChange = this.onChange.bind(this);
        
    }
    onChange( _Event : any ):void{
        let HFileReader : FileReader = new FileReader();
        let HFile = _Event.target.files[0] ;

        HFileReader.onloadend = () => {
            this.props.callback(this.props.editKey,HFileReader.result);
        }
        HFileReader.readAsDataURL(HFile) ;
    }
    getDefaultImage() : JSX.Element{
        return (
            <div className={"admin-image-default "+this.props.defaultImage} />
        );
    }
    getSelectedImage() : JSX.Element{
        var HResult : JSX.Element = <img title="Ausgewähltes Bild" src={'file://'+this.props.image} className="admin-image-selected" /> ;
        return HResult ;
    }

    getContent():JSX.Element{
        if( this.props.image == null ){
            return this.getDefaultImage();
        } else {
            return this.getSelectedImage();
        }
    }

    render() {
        return (
            <div className="admin-image" >
                <input className="admin-image-select-new" type="file" accept=".jpg" onChange={this.onChange} />
                {this.getContent()}
            </div>
        );
    }
}