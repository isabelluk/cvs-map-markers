import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import PreviewCSV from '../components/PreviewCSV';
import DisplayMap from '../components/DisplayMap';
import randomColor from 'randomcolor';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import DisplayHistoryTable from '../components/DisplayHistoryTable';

class Dashboard extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props) {
        super(props);
        this.state = { 
            userId: props.cookies.get('userId') || '',
            history: props.cookies.get('history') || [],
            historyArr: [],
            filename: '',
            date:'',
            beforePreview: '',
            afterPreview:'', 
            header:'',
            colorMap:''}

        //get the most recent upload csv    
        this.state.history.map ((h) => {
            this.state.historyArr.push(this.props.cookies.get(h));
        });

        this.handleForce = this.handleForce.bind(this);
        this.afterPreviewAction = this.afterPreviewAction.bind(this);
        this.reloadHistory = this.reloadHistory.bind(this);
      }
   
    //handle uploaded cvs
    handleForce(data , filename) {
        if(data.length === 0) {
            throw new Error('Please upload valid CSV');
        }

        if(data.length > 20) {
            throw new Error('Please upload CSV with up to 20 rows of information');
        }

        if(data[0].length !== 5) {
            throw new Error('Please upload CSV with five columns');
        }
        this.setState({ filename: filename, date: new Date().toLocaleString(), beforePreview: data});
    }

    afterPreviewAction(result) {
        const { filename, date , beforePreview} = this.state;
        let { history, historyArr } = this.state;
        
        //assign color to category
        const index = result.indexOf("CATEGORY");
        const colorMap = new Map();
        beforePreview.map( (address) => {
            if(!colorMap.has(address[index])) {
                colorMap.set(address[index],randomColor());
            }
        });

        //add that uploaded file to history
        historyArr = [];
        if(history.length > 0) {
            if(history.length ===3) {
                const key = history.shift();
                this.props.cookies.remove(key);
            }

            history.map ((h) => {
                historyArr.push(this.props.cookies.get(h));
            });
        }

        history.push(date);
        historyArr.push({filename: filename, date: date, header: result, data: beforePreview, colorMap: JSON.stringify([...colorMap])});
        console.log(historyArr);
        this.props.cookies.set('history',history);
        this.props.cookies.set(date, {filename: filename, date: date, header: result, data: beforePreview, colorMap: JSON.stringify([...colorMap])}, { path: '/' });
    
       
        this.setState({ beforePreview: '', 
                        afterPreview: beforePreview, 
                        header: result, 
                        colorMap: colorMap,
                        history: history,
                        historyArr: historyArr});
    }

    reloadHistory(key) {
        const { historyArr } = this.state;
        console.log(historyArr[key]);
        this.setState({ beforePreview: '', 
                        afterPreview: historyArr[key].data,
                        header: historyArr[key].header, 
                        colorMap: new Map (JSON.parse(historyArr[key].colorMap))});
    }
      
    render() {      
        return (
            <div>
                <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV with five columns of up to 20 rows of information"
                    onFileLoaded={this.handleForce}
                />
                {this.state.history.length > 0 && <DisplayHistoryTable history={this.state.historyArr} onClickRow={this.reloadHistory}/>}
                {this.state.beforePreview && <PreviewCSV beforePreview={this.state.beforePreview} afterPreviewAction={this.afterPreviewAction} /> }
                {this.state.afterPreview && <DisplayMap 
                                            afterPreview={this.state.afterPreview}
                                            header={this.state.header}
                                            colorMap={this.state.colorMap}
                                        />}
            </div>
        );
    }
}

export default withCookies(Dashboard);