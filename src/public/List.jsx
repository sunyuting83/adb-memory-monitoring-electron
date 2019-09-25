import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ScrollStyle from './scrollstyle';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchkey: this.props.searchkey,
            data: this.props.data,
            link: this.props.link,
            searchdata: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props.searchkey);
        if (props.searchkey !== state.searchkey) {
            return {
                searchkey: props.searchkey,
                searchdata: state.data.filter((x) => x.toLowerCase().indexOf(props.searchkey) !== -1)
            }
        } else if (props.searchkey === '') {
            return {
                searchkey: ''
            }
        }
        return null;
    }

    render() {
        const { data, link, searchkey, searchdata } = this.state;
        // console.log(searchkey);
        return (
            <div>
                {searchkey !== '' && searchkey.length > 0 ?
                    <div>
                        {searchdata.length > 0?
                            <ScrollArea
                                speed={0.8}
                                className="area list"
                                smoothScrolling={true}
                                horizontal={false}
                                verticalContainerStyle={ScrollStyle.ContainerStyle}
                                verticalScrollbarStyle={ScrollStyle.ScrollbarStyle}
                            >
                                {searchdata && searchdata.length > 0 &&
                                    searchdata.map((item, i) => (
                                        <div key={i}>
                                            <NavLink to={`${link}${item}`}>{item}</NavLink>
                                        </div>
                                    ))
                                }
                            </ScrollArea>
                            :
                            <div>没有数据</div>
                        }
                    </div>
                    :
                    <ScrollArea
                        speed={0.8}
                        className="area list"
                        smoothScrolling={true}
                        horizontal={false}
                        verticalContainerStyle={ScrollStyle.ContainerStyle}
                        verticalScrollbarStyle={ScrollStyle.ScrollbarStyle}
                    >
                        {data && data.length > 0 &&
                            data.map((item, i) => (
                                <div key={i}>
                                    <NavLink to={`${link}${item}`}>{item}</NavLink>
                                </div>
                            ))
                        }
                    </ScrollArea>
                }
            </div>
        )
    }
}

export default List;
