import React, {Component} from 'react';
import './MonthlyPaymentsModal.css';

export class MonthlyPaymentsModal extends Component {
    constructor(props) {
        super(props);
        //data expected in props.works
        //format: [
        //     { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6, price: 228 },
        //     { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4, price: 1488 }
        //   ]
    }


    getEndMonth(work) {
        return (parseInt(work.start_date.split('-')[1]) + work.duration) % 12 + 1;
    }

    getWorkByEndMonth(endMonth) {
        return this.props.works.filter(work => this.getEndMonth(work) === endMonth)
            .reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }

    createTableContent() {
        let res = new Array(12);
        for (let i = 0; i < res.length; i++) {
            res[i] = this.getWorkByEndMonth(i);
        }
        return res;
    }

    render() {
        return (
            <table>
                <caption>Помесячные платы</caption>
                <tr>
                    <th>Январь</th>
                    <th>Февраль</th>
                    <th>Март</th>
                    <th>Апрель</th>
                    <th>Май</th>
                    <th>Июнь</th>
                    <th>Июль</th>
                    <th>Август</th>
                    <th>Сентябрь</th>
                    <th>Октябрь</th>
                    <th>Ноябрь</th>
                    <th>Декабрь</th>
                </tr>
                <tr>
                    {this.createTableContent().map(sum => <td>{sum}</td>)}
                </tr>
            </table>
        );
    }
}
