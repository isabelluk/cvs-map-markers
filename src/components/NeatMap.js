import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from "./MapMarker";

class NeatMap extends Component {

  constructor(props) {
    super(props)
    this.state = {addresses: props.addresses,
                  colorMap: props.colorMap,
                  header: props.header}
  }

  componentWillReceiveProps(nextProps) {  
    if(nextProps.addresses !== this.props.address){
      this.setState({ addresses: nextProps.addresses,
                      header: nextProps.header,
                      colorMap: nextProps.colorMap});
    }
  }
  
  render() {
    return (
      <GoogleMap
        defaultZoom={4}
        center={ { lat:  37.09024, lng: -95.712891 } }
        >
        {this.state.addresses.map( (address,index) => <MapMarker
                    colorMap={this.state.colorMap}
                    key={index}
                    category={address[this.state.header.indexOf("CATEGORY")]}
                    address={address[this.state.header.indexOf("ADDRESS")] + ', ' 
                            + address[this.state.header.indexOf("CITY")] + ', '
                            + address[this.state.header.indexOf("STATE")] + ' '
                            + address[this.state.header.indexOf("ZIPCODE")]}  
          />)}
      </GoogleMap>
    )
  }
}
export default NeatMap = withScriptjs(withGoogleMap(NeatMap))