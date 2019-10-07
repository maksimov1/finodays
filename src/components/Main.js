import React, {Component} from 'react';
import {Header} from "./header/Header";
import {Gantt} from "./gantt/Gantt";
import {LeftPanel} from "./leftPanel/LeftPanel";
import "./gantt/Gantt.css"
import "./Main.css"

import HorizontalScroll from 'react-scroll-horizontal'

const data = {
    data: [
        { id: 1,text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
        { id: 2,text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoom: 'Days',
            modifiable: true,
        };
        this.toggleModifiable = this.toggleModifiable.bind(this);
    }

    toggleModifiable() {
        let temp = this.state.modifiable;
        this.setState({
            modifiable: !temp
        });
    }

    handleZoomChange = (e) => {
        this.setState({
            currentZoom: e.target.value
        });
    };

    render() {
        const zoomRadios = ['Days', 'Months'].map((value) => {
            const isActive = this.props.zoom === value;
            return (
                <label key={ value } className={ `radio-label ${isActive ? 'radio-label-active': ''}` }>
                    <input type='radio'
                           checked={ isActive }
                           onChange={ this.handleZoomChange }
                           value={ value }/>
                    { value }
                </label>
            );
        });
        return (
            <>
                <Header/>
                <div className="main_container">
                    <LeftPanel toggleModifiable={this.toggleModifiable}/>
                    <div className="gantt-container">
                        { zoomRadios }
                        <Gantt
                            tasks={data}
                            zoom={this.state.currentZoom}
                            modifiable={this.state.modifiable}
                        />
                    </div>
                </div>
            </>
        );
    }
}