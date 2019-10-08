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
                    <button onClick={this.props.openCreateProjectModal}>создать подряд</button>
                    <button onClick={this.props.openMonthlyPaymentsModal}>показать</button>
                    <div className="legend">
                        <div className="pending_container">
                            <div className="pending_marker"></div>
                            <div className="pending_text">В ожидании</div>
                        </div>
                        <div className="in_progress_container">
                            <div className="in_progress_marker"></div>
                            <div className="in_progress_text">Исполняется</div>
                        </div>
                        <div className="done_container">
                            <div className="done_marker"></div>
                            <div className="done_text">Сделано</div>
                        </div>
                        <div className="fuck_uped_container">
                            <div className="fuck_uped_marker"></div>
                            <div className="fuck_uped_text">Просрочено</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
