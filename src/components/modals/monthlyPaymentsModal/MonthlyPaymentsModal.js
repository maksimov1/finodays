import React, {Component} from 'react';
import './MonthlyPaymentsModal.css';

export class MonthlyPaymentsModal extends Component {
    constructor(props) {
        super(props);
        this.works = [
            { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6, price: 228 },
            { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4, price: 1488 }
          ];
        //data expected in props.works
        //format: [
        //     { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6, price: 228 },
        //     { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4, price: 1488 }
        //   ]
    }


    getEndMonth(work) {
        return parseInt(work.start_date.split('-')[1]) + work.duration;
    }

    getWorkByEndMonth(endMonth) {
        return this.works.filter(work => this.getEndMonth(work) === endMonth)
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
            <div className="monthly_payments_modal">
                <div className="monthly_payments_modal_wrapper">
                    <div className="table_header">Помесячные платы</div>
                    <div className="table_title_row">
                        <div>Январь</div>
                        <div>Февраль</div>
                        <div>Март</div>
                        <div>Апрель</div>
                        <div>Май</div>
                        <div>Июнь</div>
                        <div>Июль</div>
                        <div>Август</div>
                        <div>Сентябрь</div>
                        <div>Октябрь</div>
                        <div>Ноябрь</div>
                        <div>Декабрь</div>
                    </div>
                    <div className="table_content">
                        {this.createTableContent().map(sum => <div>{sum}</div>)}
                    </div>
                </div>
            </div>
        );
    }
}
