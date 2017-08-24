import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist/build/pdf';
import PDFPageContainer from './PDFPageContainer';
import './pdfPage.css';

class PDFContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            pagenum: 0,
            currentPage: 0
        };
        this.addPage = this.addPage.bind(this);
       
    }

    componentDidMount() {
        PDFJS.getDocument(this.props.source).promise.then((pdf) => {

            var pages = pdf.numPages;
            this.pdf = pdf;
            this.setState({
                pagenum: pages
            });
            for(let i = 1; i <= pages; i++) {
                pdf.getPage(i).then((page) => {
                    
                    this.addPage(page, i)
                });
            }
        });
    }
    pageDown() {
        this.setState({currentPage: this.state.currentPage + 1})
    }

    pageUp() {
        this.setState({currentPage: this.state.currentPage - 1})
    }
    addPage(page, i) {
        const state = this.state.pages.concat(<PDFPageContainer page={page} key={i} />);
        this.setState({
            pages: state
        });
    }

    render() {
        return (
            <div style={{overflow: 'scroll', position: 'absolute'}} className="pdf-viewer">
                <header>
                    <div className='pdf-control'>
                        <div>
                            Page <input className='page-num' id="page-num" type='number' value={this.state.currentPage !== undefined ? this.state.currentPage : ''}/> of {this.state.pagenum}
                        </div>
                    </div>
                    {this.props.manual.title}
                </header>
                <section style={{display: 'flex', justifyContent: "center", marginTop: '80px'}}>
                    <div>
                        {this.state.pages}
                    </div>
                </section>
            </div>
        )
    }
}

export default PDFContainer;