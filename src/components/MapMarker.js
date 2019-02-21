import React, {Component} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import Geocode from 'react-geocode';

class MapMarker extends Component {

    constructor(props) {
        super(props);
        Geocode.setApiKey("AIzaSyAYBI5Ly31tWDuOEpbwXEQ0VbD-K602A0c");
        const color = props.colorMap.get(props.category);
        this.state = {  location: { lat:  37.09024, lng: -95.712891 }, 
                        isOpen: false,
                        color: color
                    };
    }

    componentWillMount() {
        Geocode.fromAddress(this.props.address).then(
            response => {
              this.setState({location: response.results[0].geometry.location});
            },
            error => {
              console.error(error);
            }
        );
    }

    render(){
        return(
            <div>
                <Marker
                    icon={{ path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, 
                            strokeColor: this.state.color,  
                            fillColor: this.state.color ,
                            strokeWidth:3, 
                            strokeWeight: 2, 
                            scale: 6 }}
                    position={this.state.location}
                    onClick={() => this.setState({isOpen: true})}>
                    {this.state.isOpen &&
                        <InfoWindow onCloseClick={() => this.setState({isOpen: false})}>
                            <p><b>{this.props.category}</b><br/>{this.props.address}</p>
                    </InfoWindow>}
                </Marker>
            </div>
        );
    }
}

export default MapMarker;