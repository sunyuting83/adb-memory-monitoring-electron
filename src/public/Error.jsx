import React, { Component } from 'react';
import loading from './icons/loading.svg';
import errimg from './icons/error.svg';
import reload from './icons/reload.svg';
import Header from './Header';

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
            status: this.props.status,
            stop: this.props.stop
        };
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props.memorys);
        if (props.status !== state.status) {
            return {
                status: props.status,
                message: props.message,
                stop: props.stop
            }
        }
        return null;
    }

    render() {
        const { status, message, stop } = this.state;
        return (
            <div>
                {status === 500 ?
                    <div>
                        <Header />
                        {stop?this.props.stop():null}
                        <img src={errimg} style={{ width: 100, height: 100 }} alt="error" />
                        <div>
                            {message}
                            <img className="cuur reload_Icon" onClick={() => this.props.reload()} src={reload} alt="reload" />
                        </div>
                    </div>
                    :
                    <img src={loading} alt="loading" />
                }
            </div>
        )
    }
}

export default Error;
