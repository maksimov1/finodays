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
                    <div className="modal_title">Помесячные платы</div>
                    <div className="table_title_row">
                        <div className="month_with_num">
                            <div>Январь</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Февраль</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Март</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Апрель</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Май</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Июнь</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Июль</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Август</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Сентябрь</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Октябрь</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Ноябрь</div>
                            <div className="table_num">0</div>
                        </div>
                        <div className="month_with_num">
                            <div>Декабрь</div>
                            <div className="table_num">0</div>
                        </div>
                    </div>
                    <div className="modal_btn">
                        <button onClick={this.props.closeMonthlyPaymentsModal}
                                className="cancel_btn"
                        >ОК
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
