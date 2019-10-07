import React, {Component} from 'react';
import "./LeftPanel.css"

export class LeftPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifiable: true
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.props.toggleModifiable();
    }

    render() {
        return (
            <div className="left_panel">
                <div className="left_panel_wrapper">
                    <button onClick={this.handleToggle}>песочница</button>
                </div>
            </div>
        );
    }
}
