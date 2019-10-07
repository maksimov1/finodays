import React, {Component} from 'react';
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header_container">
                    <img src="https://static.qiwi.com/img/qiwi_com/header/qiwi-wallet-logo.svg" alt="Логотип Киви"/>
                    <div className="test">ПРИКАЛЮХА</div>
                    <div className="nav_buttons">
                        <div>ТУТ</div>
                        <div>МБ БУДУТ</div>
                        <div>КАКИЕ-ТО</div>
                        <div>КНОПКИ</div>
                    </div>
                </div>
            </header>
        );
    }
}