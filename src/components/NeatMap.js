import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from "./MapMarker";

const NeatMap = withScriptjs(withGoogleMap((props) =>{

  const markers = props.addresses.map( (address,index) => <MapMarker
                    colorMap={props.colorMap}
                    key={index}
                    category={address[props.header.indexOf("CATEGORY")]}
                    address={address[props.header.indexOf("ADDRESS")] + ', ' 
                            + address[props.header.indexOf("CITY")] + ', '
                            + address[props.header.indexOf("STATE")] + ' '
                            + address[props.header.indexOf("ZIPCODE")]}  
                  />);
                  
  return (
      <GoogleMap
        defaultZoom={4}
        center={ { lat:  37.09024, lng: -95.712891 } }
        >
        {markers}
      </GoogleMap>
    )
  }
))

export default NeatMap;