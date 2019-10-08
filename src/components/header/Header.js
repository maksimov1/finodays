import React, {Component} from 'react';
import qiwi from "./qiwi.svg"
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header_container">
                    <img src={qiwi} alt="Логотип Киви"/>
                    <div className="test">ПРИКАЛЮХА</div>
                    <div className="nav_buttons">
                        <div className="btn_inactive">Гензаказчик</div>
                        <div className="btn_active">Генподрядчик</div>
                        <div className="btn_inactive">Субподрядчик</div>
                    </div>
                </div>
            </header>
        );
    }
}