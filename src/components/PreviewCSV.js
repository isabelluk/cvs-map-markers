import React, { Component } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';

class PreviewCSV extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  //when the user specified the header
  handleSubmit() {
    const header = [this.refs.col0.value,this.refs.col1.value,this.refs.col2.value,this.refs.col3.value,this.refs.col4.value];
    
    // check the input of columns
    let header_sorted = [...header];
    header_sorted.sort();
    const isDuplicated = () => {
      for(let i = 0; i < 4; i++) {
          if(header_sorted[i] === header_sorted[i+1]) {
              return true;
          }
      }
      return false;
    };

    //throw error
    if(isDuplicated()) {
      throw new Error('Duplicate Header');
    }
  
    //return header to parent
    this.props.afterPreviewAction(header);
  }

  //render the dropdown lists for headers
  renderTableHeader = () => {
    const items = []

    for (let i = 0; i < 5; i++) {
      let defaultValue;
      
      switch(i) {
          case 0:
            defaultValue = "ADDRESS";
            break;
          case 1:
            defaultValue = "CITY";
            break;
          case 2:
            defaultValue = "STATE";
            break;
          case 3:
            defaultValue = "ZIPCODE";
            break;
          case 4:
            defaultValue = "CATEGORY";
            break;
          default:
            defaultValue = "ADDRESS";
      }

      items.push(<th key={i}>
                      <select ref={'col' + i} defaultValue={defaultValue}>
                        <option value="ADDRESS">ADDRESS</option>
                        <option value="CITY">CITY</option>
                        <option value="STATE">STATE</option>
                        <option value="ZIPCODE">ZIPCODE</option>
                        <option value="CATEGORY">CATEGORY</option>
                      </select>
                    </th>)
    }
    
    return items;
  };
  
  render() {  
    return (
      <div>
        <Alert variant="primary">Please specify which column is the ADDRESS, CITY, STATE, ZIPCODE, and CATEGORY!</Alert>       
        <Button onClick={this.handleSubmit}>Confirm</Button>
        <Table striped bordered hover>
          <thead>
            <tr key="header">{this.renderTableHeader()}</tr>
          </thead>
          <tbody>
            {this.props.beforePreview.map((value,index) => {
                return (
                  <tr key={index}>
                    <td>{value[0]}</td>
                    <td>{value[1]}</td>
                    <td>{value[2]}</td>
                    <td>{value[3]}</td>
                    <td>{value[4]}</td>
                  </tr>
                )
            })}
          </tbody>
        </Table> 
      </div>
    )     
  }
}

export default PreviewCSV;