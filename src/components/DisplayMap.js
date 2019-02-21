import React, { Component } from 'react';
import NeatMap from './NeatMap';

class DisplayMap extends Component { 
  render() {
    return (
      <NeatMap
        addresses={this.props.afterPreview}
        header={this.props.header}
        colorMap={this.props.colorMap}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAYBI5Ly31tWDuOEpbwXEQ0VbD-K602A0c&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
			/>
    );
  }
}
export default DisplayMap;