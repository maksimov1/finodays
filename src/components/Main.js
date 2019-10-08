import React, {Component} from 'react';
import {Header} from "./header/Header";
import {Gantt} from "./gantt/Gantt";
import {LeftPanel} from "./leftPanel/LeftPanel";
import {ModalWindow} from "./ModalWindow";
import {Transition, animated} from 'react-spring/renderprops';
import "./gantt/Gantt.css"
import "./Main.css"
import classNames from "classnames";

import {CreateProjectModal} from "./modals/createProjectModal/CreateProjectModal";
import {MonthlyPaymentsModal} from "./modals/monthlyPaymentsModal/MonthlyPaymentsModal";
import "./dhtmlxgantt_material.css";
import {gantt} from "dhtmlx-gantt";
import {BlockchainHandler} from "./blockchain/BlockchainHandler";

const data = {
    data: [
        { id: 1,text: 'Самолёт 1000000₽', color: "grey", start_date: '2019-03-30', duration: 30, progress: 0.0 },
        { id: 2,text: 'Крыло 100₽', color: "grey", start_date: '2019-01-27', duration: 3, progress: 0.0 },
        { id: 3,text: 'Крыло 100₽', color: "grey", start_date: '2019-01-27', duration: 3, progress: 0.0 },
        { id: 4,text: 'Винт 33333₽', color: "cornflowerblue", start_date: '2019-01-25', duration: 5, progress: 0.56 },
        { id: 5,text: 'Двигатель 1020₽', color: "green", start_date: '2019-01-25', duration: 4, progress: 0.0 },
        { id: 6,text: 'Шасси 1100₽', color: "green", start_date: '2019-01-25', duration: 2, progress: 0.0 },
        { id: 7,text: 'Фюзеляж 10670₽', color: "grey", start_date: '2019-01-25', duration: 4, progress: 0.0 },
        { id: 8,text: 'Электроника 100₽ штраф 33₽', color: "red", start_date: '2019-01-22', duration: 6, progress: 0.3 },
        { id: 9,text: 'Сидения 10330₽', color: "green", start_date: '2019-01-24', duration: 2, progress: 0.0 },
        { id: 10,text: 'Салон 1030₽', color: "cornflowerblue", start_date: '2019-01-25', duration: 6, progress: 0.1 },
        { id: 11,text: 'Поставка заклепок 10₽', color: "cornflowerblue", start_date: '2019-01-25', duration: 4, progress: 0.95 },
        { id: 12,text: 'Поставка железа 1030₽', color: "green", start_date: '2019-01-25', duration: 4, progress: 1 }
    ],
    links: [
        {id: 1, source: 2, target: 1, type: '0'},
        {id: 2, source: 3, target: 1, type: '0'},
        {id: 3, source: 4, target: 1, type: '0'},
        {id: 4, source: 5, target: 1, type: '0'},
        {id: 5, source: 6, target: 1, type: '0'},
        {id: 6, source: 7, target: 1, type: '0'},
        {id: 7, source: 8, target: 7, type: '0'},
        {id: 8, source: 10, target: 7, type: '0'},
        {id: 9, source: 9, target: 10, type: '0'},
        {id: 10, source: 11, target: 3, type: '0'},
        {id: 11, source: 11, target: 2, type: '0'},
        {id: 11, source: 12, target: 2, type: '0'}
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
            zoom: true,
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
            text:task.text + "  " + task.money+"₽",
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
            currentZoom: e ? 'Days' : 'Months'
        });
    };

    componentDidMount() {
        let handler = new BlockchainHandler();
        handler.loadTasks().then((val) => console.log(val));
        this.handler = handler;
    }

    render() {

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
                    <div className="gantt_wrapper">
                        <div className="gantt-container">
                            <div className="control_panel">
                                <div className="navigation">
                                    <div className={classNames("nav_button", {
                                        active: this.state.currentZoom === 'Days',
                                    })}
                                         onClick={() => this.handleZoomChange(true)}>
                                        По дням
                                    </div>
                                    <div className={classNames("nav_button", {
                                        active: this.state.currentZoom === 'Months',
                                    })}
                                         onClick={() => this.handleZoomChange(false)}>
                                        По месяцам
                                    </div>
                                    <div className="legend">
                                        <div className="fuck_uped_container">
                                            <div className="pending_marker"></div>
                                            <div className="pending_text">Запланировано</div>
                                        </div>
                                        <div className="fuck_uped_container">
                                            <div className="in_progress_marker"></div>
                                            <div className="in_progress_text">Исполняется</div>
                                        </div>
                                        <div className="fuck_uped_container">
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
            </div>
        );
    }
}