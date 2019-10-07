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
            price: 0,
            executor: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                    Описание:
                    <input type="text" name="description" value={this.state.desc} onChange={this.handleChange} />
                </label>
                <label>
                    Дата начала:
                    <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
                </label>
                <label>
                    Дата окончания:
                    <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
                </label>
                <label>
                    Стоимость:
                    <input type="number" name="price" value={this.state.price} onChange={this.handleChange} />
                </label>
                <label>
                    Исполнитель:
                    <input type="text" name="executor" value={this.state.executor} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}