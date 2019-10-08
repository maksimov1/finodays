import React, {Component} from 'react';
import "./LeftPanel.css"
import worker from "./worker.svg";
import classNames from "classnames";

export class LeftPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifiable: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        let temp = this.state.modifiable;
        this.props.toggleModifiable();
        this.setState({modifiable: !temp})
    }

    render() {
        return (
            <div className="left_panel">
                <div className="left_panel_wrapper">
                    <div className="user_profile">
                        <img src={worker} alt="Логотип Worker"/>
                        <div>Самолётстрой</div>
                    </div>
                    <div className="buttons_group">
                        <div className="payments_button">
                            <button onClick={this.props.openMonthlyPaymentsModal}>Платежи</button>
                        </div>
                        <div className="sim_label">Симуляция:</div>
                        <button className={classNames("sim", {
                            active: this.state.modifiable === true,
                        })} onClick={this.handleToggle}/>
                    </div>

                    <div className="user_button">
                        <button onClick={this.props.openCreateProjectModal}>Создать подряд</button>
                    </div>
                </div>
            </div>
        );
    }
}
