import React, { Component } from 'react';


class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchkey: ''
        };
        this.clearInput = this.clearInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    clearInput() {
        // 清除搜索词
        this.search.value = '';
        let data = {
            searchkey: ''
        };
        this.setState(data);
        this.props.handleSearchKey('');
    }

    handleInputChange() {
        // 监听输入字符
        this.setState({
            searchkey: this.search.value
        });
        this.props.handleSearchKey(this.search.value);
        // console.log(this.search.value)
    }


    render() {
        const { searchkey } = this.state;
        return (
            <div className="container">
                <input
                    className="searchbar"
                    placeholder="24小时热搜"
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <span className="searchicon"></span>
                {searchkey && searchkey.length > 0 ?
                    <span className="cleanicon" onClick={this.clearInput}></span>
                    :
                    null
                }
            </div>
        )
    }
}

export default Package;
