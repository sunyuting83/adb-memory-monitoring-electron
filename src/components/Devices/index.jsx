import React, { Component } from 'react';
import httpget from '../../public/httpService';
import SearchBar from '../../public/SearchBar';
import List from '../../public/List';
import Error from '../../public/Error';
import Reload from '../../public/ReloadIcon';

let $http = new httpget();

class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            title: '设备列表：',
            searchkey: ''
        };
        this.handleSearchKey = this.handleSearchKey.bind(this);
    }

    componentDidMount() {
        this.getdata()
    }

    getdata() {
        this.setState({
            data: {
                status: null
            }
        });
        const url = 'http://localhost:15325/';
        $http.get(url).then((data) => {
            this.setState({
                data: data,
                searchkey: ''
            });
        });
    }

    handleSearchKey(key) {
        this.setState({
            searchkey: key
        });
    }

    render() {
        const { data, title, searchkey} = this.state;
        // console.log(data);
        return (
            <div className="content">
                {data.status === 200 ? 
                    <div className="card text-left">
                        <div className="row title">
                            <div className="col-75">{title}</div>
                            <Reload reload={() => this.getdata()} />
                        </div>
                        <SearchBar
                            searchkey={searchkey}
                            handleSearchKey={this.handleSearchKey} />
                        <List data={data.devices} searchkey={searchkey} link={`/devices/`} />
                    </div>
                    :
                    <Error status={data.status} message={data.message} reload={()=>this.getdata()} />
                }
            </div>
        )
    }
}

export default Devices;
