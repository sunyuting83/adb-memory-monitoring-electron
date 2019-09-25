import React, { Component } from 'react';
import httpget from '../../public/httpService';
import Header from '../../public/Header';
import Chart from './charts';
import Error from '../../public/Error';
import Button from './button';

let $http = new httpget();

let timerID = undefined;
class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            devices: this.props.match.params.devices,
            packages: this.props.match.params.package,
            packageinfo: '',
            memorys:[],
            time:null,
            status: false
        };
        this.stopTable = this.stopTable.bind(this);
        this.startApp = this.startApp.bind(this);
    }

    componentDidMount() {
        this.startApp();
    }

    startApp() {
        clearInterval(timerID);
        this.setState({
            data:{},
            memorys:[],
            time:null,
            status:false
        });
        const { packages, devices } = this.state;
        // console.log(packages, devices);
        const url = `http://localhost:15325/package?driver=${devices}&packages=${packages}`;
        $http.get(url).then((data) => {
            if (data.status === 200) {
                this.setState({
                    packageinfo: data.packageinfo
                });
                this.maketable();
            } else {
                this.setState({
                    data: data
                })
            }
        });
    }

    maketable() {
        timerID = setInterval(() => this.getdata(), 1000);
    }

    getdata() {
        const { packages, devices, memorys } = this.state;
        const url = `http://localhost:15325/memory?driver=${devices}&packages=${packages}`;
        $http.get(url).then((res) => {
            if (res.status === 200) {
                this.setState({
                    data: res,
                    memorys: [...memorys, res.memory],
                    status: true
                });
            } else {
                this.setState({
                    data: res,
                    status: false
                })
            }
        });
    }

    stopTable(){
        const {status, data} = this.state;
        if(data.status === 200) {
            this.setState({ status: !!!status });
            if (!!!status) {
                this.maketable();
            } else {
                clearInterval(timerID);
            }
        }else {
            clearInterval(timerID);
        }
    }

    componentWillUnmount() {
        clearInterval(timerID);
    }

    render() {
        const { data, memorys, status} = this.state;
        return (
            <div className="content" style={{ top: '1.31rem' }}>
                {data.status === 200 ? 
                    <div>
                        <Header />
                        <Button status={status} stopTable={this.stopTable} restart={this.startApp} data={data} />
                        <Chart memorys={memorys} />
                    </div>
                    :
                    <Error status={data.status} message={data.message} stop={this.stopTable} reload={this.startApp} />
                }
            </div>
        )
    }
}

export default Package;
