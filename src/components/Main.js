import React, {Component} from 'react';
import {Header} from "./header/Header";
import {Gantt} from "./gantt/Gantt";
import {LeftPanel} from "./leftPanel/LeftPanel";
import {ModalWindow} from "./ModalWindow";
import {Transition, animated} from 'react-spring/renderprops';
import "./gantt/Gantt.css"
import "./Main.css"

import HorizontalScroll from 'react-scroll-horizontal'
import {CreateProjectModal} from "./modals/createProjectModal/CreateProjectModal";
import {MonthlyPaymentsModal} from "./modals/monthlyPaymentsModal/MonthlyPaymentsModal";
import {gantt} from "dhtmlx-gantt";
import {BlockchainHandler} from "./blockchain/BlockchainHandler";

const data = {
    data: [
        { id: 1,text: 'Task #1', color: "red", start_date: '2019-04-15', duration: 3, progress: 0.0 },
        { id: 2,text: 'Task #2',color: "yellow", start_date: '2019-04-18', duration: 3, progress: 0.0 }
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
            showCreateProjectModal: false,
            showMonthlyPaymentsModal: false,
            newTask: null,
            id: 100
        };
        this.toggleModifiable = this.toggleModifiable.bind(this);
        this.handleOpenCreateProjectModal = this.handleOpenCreateProjectModal.bind(this);
        this.handleCloseCreateProjectModal = this.handleCloseCreateProjectModal.bind(this);
        this.handleOpenMonthlyPaymentsModal = this.handleOpenMonthlyPaymentsModal.bind(this);
        this.handleCloseMonthlyPaymentsModal = this.handleCloseMonthlyPaymentsModal.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleOpenCreateProjectModal() {
        this.setState({showCreateProjectModal: true})
    }

    handleOpenMonthlyPaymentsModal() {
        this.setState({showMonthlyPaymentsModal: true})
    }

    handleCloseCreateProjectModal() {
        this.setState({showCreateProjectModal: false})
    }

    handleCloseMonthlyPaymentsModal() {
        this.setState({showMonthlyPaymentsModal: false})
    }

    addTask(task) {
        let _id = this.state.id + 1;

        gantt.addTask({
            id:_id,
            text:task.text,
            start_date:task.start_date,
            duration:parseInt(task.duration)
        }, null, 1);
        this.setState({id: _id})
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

    componentDidMount() {
        let handler = new BlockchainHandler();
        handler.loadTasks().then((val) => console.log(val));
        this.handler = handler;
    }

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
            <div className="main">
                <Header/>
                <ModalWindow>
                    <Transition
                        native
                        items={this.state.showCreateProjectModal}
                        from={{
                            opacity: 0, transform: "translateY(-1000px)",
                        }}
                        enter={{
                            opacity: 1, transform: "translateY(0px)",
                        }}
                        leave={{
                            opacity: 0, transform: "translateY(-1000px)",
                        }}
                    >
                        {show => show && (props =>
                            <animated.div style={props} className="modal_container">
                                <CreateProjectModal
                                    closeCreateProjectModal={this.handleCloseCreateProjectModal}
                                    handler={this.handler}
                                    addTask={this.addTask}
                                />
                            </animated.div>)}
                    </Transition>
                </ModalWindow>

                <ModalWindow>
                    <Transition
                        native
                        items={this.state.showMonthlyPaymentsModal}
                        from={{
                            opacity: 0, transform: "translateY(-1000px)",
                        }}
                        enter={{
                            opacity: 1, transform: "translateY(0px)",
                        }}
                        leave={{
                            opacity: 0, transform: "translateY(-1000px)",
                        }}
                    >
                        {show => show && (props =>
                            <animated.div style={props} className="modal_container">
                                <MonthlyPaymentsModal
                                    closeMonthlyPaymentsModal={this.handleCloseMonthlyPaymentsModal}
                                />
                            </animated.div>)}
                    </Transition>
                </ModalWindow>
                <div className="main_container">
                    <LeftPanel
                        openMonthlyPaymentsModal={this.handleOpenMonthlyPaymentsModal}
                        openCreateProjectModal={this.handleOpenCreateProjectModal}
                        toggleModifiable={this.toggleModifiable}/>
                    <div className="gantt-container">
                        { zoomRadios }
                        <Gantt
                            ref={gantt => (this.gantt = gantt)}
                            tasks={data}
                            zoom={this.state.currentZoom}
                            newTask={this.state.newTask}
                            modifiable={this.state.modifiable}
                        />
                    </div>
                </div>
            </div>
        );
    }
}