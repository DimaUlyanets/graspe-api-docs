import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist/build/pdf';

class PdfPage extends Component {
    componentDidMount() {
        var page = this.props.page;

        var scale = 1.5,
            viewport = page.getViewport(scale);

        var canvas = this.canvas,
            context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext);
        this.setState({
            page: canvas
        })
    }

    render () {
        return <div className='pdf-page' ref={el => this.wrapper = el }>
            <canvas ref={el => this.canvas = el }></canvas>
        </div>;
    }
}

export default PdfPage;