import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class DisplayHistoryTable extends Component { 

    handleClickRow(index) {
        this.props.onClickRow(index);
    }
  
    render() {
        return (
            <div>   
                <p>Or reload the recent updated csv</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Filename</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.history.map((row,index) => {
                            return (
                            <tr onClick={() => this.handleClickRow(index)} key={index}>
                                <td>{row.date}</td>
                                <td>{row.filename}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table> 
            </div>
        )
    }
}
export default DisplayHistoryTable;