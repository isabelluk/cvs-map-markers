import React, {Component} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import Geocode from 'react-geocode';

class MapMarker extends Component {

    constructor(props) {
        super(props);
        Geocode.setApiKey("AIzaSyAYBI5Ly31tWDuOEpbwXEQ0VbD-K602A0c");
        this.state = {  location: { lat:  37.09024, lng: -95.712891 }, 
                        isOpen: false,
                        colorMap: props.colorMap,
                        category: props.category,
                        address: props.address
                    };
    }

    fromAddressToCoordinator(){
        Geocode.fromAddress(this.state.address).then(
            response => {
              this.setState({location: response.results[0].geometry.location});
            },
            error => {
              console.error(error);
            }
        );
    }

    componentWillMount() {
        this.fromAddressToCoordinator();
    }

    componentWillReceiveProps(nextProps) { 

        this.setState({ address: nextProps.address,
                        category: nextProps.category,
                        colorMap: nextProps.colorMap});
        
        this.fromAddressToCoordinator();
    }

    render(){
        const color = this.state.colorMap.get(this.state.category);

        return(
            <div>
                <Marker
                    icon={{ path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, 
                            strokeColor: color,  
                            fillColor: color ,
                            strokeWidth:3, 
                            strokeWeight: 2, 
                            scale: 6 }}
                    position={this.state.location}
                    onClick={() => this.setState({isOpen: true})}>
                    {this.state.isOpen &&
                        <InfoWindow onCloseClick={() => this.setState({isOpen: false})}>
                            <p><b>{this.state.category}</b><br/>{this.state.address}</p>
                    </InfoWindow>}
                </Marker>
            </div>
        );
    }
}

export default MapMarker;