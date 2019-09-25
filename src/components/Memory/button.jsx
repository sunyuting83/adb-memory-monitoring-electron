import React, { Component } from 'react';
import start from '../../public/icons/start.svg';
import suspend from '../../public/icons/suspend.svg';
import restart from '../../public/icons/restart.svg';

let getkb = (value) => {
    if (value === 0) return '0 K';
    var k = 1024, // or 1024
        sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(value) / Math.log(k));
    let vl = (value / Math.pow(k, i)).toPrecision(4) + sizes[i];
    // console.log(vl);
    return vl;
}


export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            status: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props.data);
        if (props.status !== state.status) {
            return {
                status: props.status
            }
        };
        if (props.data.memory.Uptime !== state.data.memory.Uptime) {
            return {
                data: props.data
            }
        }
        return null;
    }

    render() {
        const {status, data} = this.state;
        return (
            <div>
                <div>
                    {status?
                        <img src={suspend} className="chartIcon" alt="suspend" onClick={this.props.stopTable} />
                        :
                        <img src={start} className="chartIcon" alt="start" onClick={this.props.stopTable} />
                    }
                    <img src={restart} className="chartIcon" alt="restart" onClick={this.props.restart} />
                </div>
                <div className="row">
                    <div className="col f12"><span style={{ background: '#c23531'}}></span>{getkb(data.memory.Native)}</div>
                    <div className="col f12"><span style={{ background: '#2f4554' }}></span>{getkb(data.memory.Java)}</div>
                    <div className="col f12"><span style={{ background: '#61a0a8' }}></span>{getkb(data.memory.Stack)}</div>
                    <div className="col f12"><span style={{ background: '#d48265' }}></span>{getkb(data.memory.Code)}</div>
                    <div className="col f12"><span style={{ background: '#91c7ae' }}></span>{getkb(data.memory.Graphics)}</div>
                    <div className="col f12"><span style={{ background: '#749f82' }}></span>{getkb(data.memory.Other)}</div>
                    <div className="col f12"><span style={{ background: '#ca8622' }}></span>{getkb(data.memory.System)}</div>
                    <div className="col f12"><span style={{ background: '#bda29a' }}></span>{getkb(data.memory.Total)}</div>
                </div>
            </div>
        )
    }
}
