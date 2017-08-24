import React, {Component} from 'react';
import pdfExample from '../public/examples/small(0.4mb).pdf';
import './App.css';
import PDFContainer from './modules/pdf/PDFContainer';

class App extends Component {
    render() {
        let manual = {title: 'Flight Attendants Manual'};
        return (
            <div className="App">
                <PDFContainer source={pdfExample} manual={manual} />
            </div>
        );
    }
}

export default App;
