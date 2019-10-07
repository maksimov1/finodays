import React, {Component} from 'react';
import './ProjectListModal.css';

export class ProjectListModal extends Component {
    constructor(props) {
        super(props);
        // list of projects expected as props.projects
        // format: [{name: 'name',price: 123, progress: 0.5}, ...]
    }

    render() {
        return (
            <table>
                <caption>Список проектов</caption>
                <tr>
                    <th>Название</th>
                    <th>Стоимость</th>
                    <th>% выполнения</th>
                </tr>
                {this.props.projects.map(project => <tr>
                    <td>{project.name}</td>
                    <td>{project.price}</td>
                    <td>{project.progress}</td>
                </tr>)}
            </table>
        );
    }
}