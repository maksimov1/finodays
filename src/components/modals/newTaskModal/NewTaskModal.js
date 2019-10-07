import React, {Component} from 'react';
import './NewTaskModal.css';

export class NewTaskModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            price: '',
            executor: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //TODO
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Название:
                    <input type="text" value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                    Описание:
                    <input type="text" value={this.state.desc} onChange={this.handleChange} />
                </label>
                <label>
                    Дата начала:
                    <input type="date" value={this.state.startDate} onChange={this.handleChange} />
                </label>
                <label>
                    Дата окончания:
                    <input type="date" value={this.state.endDate} onChange={this.handleChange} />
                </label>
                <label>
                    Стоимость:
                    <input type="number" value={this.state.price} onChange={this.handleChange} />
                </label>
                <label>
                    Исполнитель:
                    <input type="text" value={this.state.executor} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}