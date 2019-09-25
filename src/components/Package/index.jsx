import React, { Component } from 'react';
import HttpService from '../../public/httpService';
import Header from '../../public/Header';
import SearchBar from '../../public/SearchBar';
import List from '../../public/List';
import Error from '../../public/Error';
import Reload from '../../public/ReloadIcon';

let $http = new HttpService();
class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            searchkey: '',
            devices: this.props.match.params.devices
        };
        this.handleSearchKey = this.handleSearchKey.bind(this);
    }

    componentDidMount() {
        this.getdata();
    }

    handleSearchKey(key) {
        this.setState({
            searchkey: key
        });
    }

    getdata() {
        this.setState({
            data: {
                status : null
            }
        });
        const { devices } = this.state;
        const url = `http://localhost:15325/driver?driver=${devices}`;
        $http.get(url).then((data) => {
            this.setState({
                data: data,
                searchkey: ''
            });
        });
    }

    render() {
        const { data, devices, searchkey} = this.state;
        // console.log(data);
        let header = `设备${devices}的第三方应用列表：`;
        return (
            <div className="content">
                {data.status === 200 ? 
                    <div className="card text-left">
                        <Header />
                        <div className="row title">
                            <div className="col-75">{header}</div>
                            <Reload reload={() => this.getdata()} />
                        </div>
                        <SearchBar
                            searchkey={searchkey}
                            handleSearchKey={this.handleSearchKey} />
                        <List data={data.package} searchkey={searchkey} link={`/memory/${devices}/`} />
                    </div>
                    :
                    <Error status={data.status} message={data.message} reload={() => this.getdata()} />
                }
            </div>
        )
    }
}



export default Package;
