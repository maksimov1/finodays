import React, {Component} from 'react';
import './CreateProjectModal.css';

export class CreateProjectModal extends Component {
    constructor(props) {
        super(props);

        this.handler = props.handler;

        this.state = {
            name: '',
            price: '',
            startDate: new Date(),
            duration: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    addTask() {
        this.props.addTask({
            text: this.state.name,
            start_date: this.state.startDate,
            duration: this.state.duration,
            money: this.state.price
        });
        this.pushTask();
        this.props.closeCreateProjectModal();
    }

    pushTask() {
        this.handler.getMetamaskAddress().then(() =>
            this.handler.addTask("Tail", "Nice tail", 0, 1, 999, "Alexey"));
    }

    render() {
        return (
            <div className="new_request_modal">
                <div className="modal_wrapper">
                    <div className="modal_title">СОЗДАТЬ ПОДРЯД</div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="text_input"
                            name="name"
                            placeholder="Название подряда"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required/>
                        <div className="crt_pr_date">
                            <div className="crt_pr_date_label">Дата Начала:</div>
                            <input
                                className="date_input"
                                name="startDate"
                                type="date"
                                min="2019-01-01" max="2019-12-31"
                                value={this.state.startDate}
                                onChange={this.handleChange}
                                required/>
                        </div>
                        <input
                            className="text_input"
                            name="duration"
                            placeholder="Срок выполнения"
                            type="text"
                            value={this.state.duration}
                            onChange={this.handleChange}
                            required/>
                        <div className="pr_price_input">
                            <input
                                className="text_input"
                                name="price"
                                placeholder="Стоимость"
                                type="text"
                                value={this.state.price}
                                onChange={this.handleChange}
                                required/>
                        </div>

                    </form>
                    <div className="modal_btn">
                        <button onClick={this.props.closeCreateProjectModal}
                                className="cancel_btn"
                        >Отменить
                        </button>
                        <button
                            className="new_request_btn"
                            onClick={this.addTask}
                        >Создать
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}