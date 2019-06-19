import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { browserHistory } from 'react-router';



class Autosuggest extends React.Component {
    handleSearch = () => {
        // console.log('going to plp page', this.props.history.replace)
        this.props.history.replace('/listing')

    }
    render() {
        return <h2 onClick={this.handleSearch}>Go to plp page...</h2>
    }
}

class PDP extends React.Component {

    constructor(props) {
        super(props);
        console.log('PDP constructor called', props.history);
        // window.abc = props.history
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.hash == nextProps.location.hash) {
            /* Not a case of hash, so update is requried */
            console.log('PDP CHECKING: Updation required')
        } else {
            console.log('PDP CHECKING: Updation NOT required')
        }
        // console.log(`PDP willReceiveProps called [Previous: ${this.props.location.hash}] Updated: ${nextProps.location.hash}`);
    }

    render() {
        const { match } = this.props;
        console.log('PDP render called', this.props.history);
        return (<div>
            <AutosuggestRouteElm match={match} />
            <div onClick={() => this.props.history.replace('/listing')} >replace from here</div>
            <div onClick={
                () => {
                    let hashIndex = window.location.pathname.indexOf('#');
                    let url = hashIndex == -1 ? window.location.pathname : window.location.pathname.substring(0,window.location.pathname.indexOf('#'));
                    if(url[url.length-1] !== '/') {
                        url = `${url}/`
                    }
                    this.props.history.push({  pathname: url,hash: '#name' });
                }
            } >GO to query params from function..</div>
            <h2>PDP  class</h2>
        </div>)
    }
}




class Listing extends React.Component {
    constructor(props) {
        super(props);
        console.log('Listing constructor called');
    }

    render() {
        const { match } = this.props;
        return (<div>
            <AutosuggestRouteElm match={match} />
            <h2>Listing</h2>
        </div>)
    }
}




class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log('Home constructor called');
    }
    render() {
        const { match } = this.props;
        console.log('Home render called');
        return (<div>
            <AutosuggestRouteElm isHomePage={true} match={match} />
            <h2>Home  class</h2>
        </div>)
    }
}


class AutosuggestRouteElm extends Component {

    constructor(props) {
        super(props);
        console.log('Autosuggest constructor called');
        this.popStateHandler = this.popStateHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('popstate', this.popStateHandler);
    }

    componentWillUnmount() {
        setTimeout(() => {
            window.removeEventListener('popstate', this.popStateHandler);
        }, 0)
    }

    popStateHandler(e) {
        console.log('this.props.location, window.location', this.props.location, window.location)
        if (window.location.pathname === '/autosuggest') {
            // window.history.back();
            console.log('Going forward to /autosuggest');
        }
    }

    render() {
        const { match, isHomePage } = this.props;
        const url = isHomePage ? '/autosuggest' : match.url + '/autosuggest'
        const isAutoSuggestPage = window.location.pathname.indexOf('/autosuggest') !== -1
        return (
            <div>
                <Route
                    path={url}
                    component={Autosuggest}
                />
                {!isAutoSuggestPage && <Link push={"false"} to={url}>Go to search..</Link>}
            </div>
        )
    }

}


class RouteExample extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        window.addEventListener('popstate', (event) => {
            console.log('popped state', event)
        });
    }

    render() {
        return (
            <Router>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            padding: "10px",
                            width: "40%",
                            background: "#f0f0f0"
                        }}
                    >
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/pdp">PDP</Link>
                            </li>
                            <li>
                                <Link to="/listing">Listing</Link>
                            </li>
                            <li>
                                <Link to="/addressList">Address List</Link>
                            </li>
                            <li>
                                <Link to="/404">Non existing page</Link>
                            </li>
                            <li>
                                <Link to={{ pathname: window.location.href.substring(0,window.location.href.indexOf('#')), hash: '#name' }}>Query params..</Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ flex: 1, padding: "10px" }}>
                        <Route
                            path={'*'}
                            // exact={true}
                            render={() => {
                                console.log('react router updatingggg')
                                return null
                            }}
                        />
                        <Switch>
                            <Route
                                path={'/pdp'}
                                // exact={true}
                                component={PDP}
                            />
                            <Route
                                path={'/listing'}
                                // exact={true}
                                component={Listing}
                            />

                            <Route
                                path={`/addressList/`}
                                exact={true}
                                component={AddressList}
                            />

                            <Route
                                path={`/checkout/`}
                                exact={true}
                                component={Checkout}
                            />

                            <Route
                                path={`/addNewAddress/`}
                                exact={true}
                                component={AddAddress}
                            />



                            <Route
                                path={`/autosuggest/`}
                                exact={true}
                                component={AHome}
                            />
                            <Route
                                path={`/`}
                                exact={true}
                                component={AHome}
                            />

                            <Route
                                path={`*`}
                                render={() => (<div>Nothing matched...</div>)}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

// const BHome = (props)=>(<Home {...props}></Home>)
class AHome extends Component {
    render() {
        return (<Home {...this.props}></Home>)
    }
}

class Checkout extends Component {
    render() {
        return (
            <div>Checkout </div>
        )
    }
}

class AddressList extends Component {
    render() {
        return (
            <div>
                <div>Address List</div>
                <div onClick={() => { this.props.history.push('/checkout') }}><div >Go to Checkout.. >> </div></div>
                <div onClick={() => { this.props.history.push('/addNewAddress') }}><div >Go to Add new address.. >> </div></div>
            </div>
        )
    }
}

class AddAddress extends Component {
    render() {
        return (
            <div>
                <div>Add address</div>
                <div onClick={() => { this.props.history.push('/checkout') }}><div >Go to Checkout.. >> </div></div>

            </div>
        )
    }
}



// class CHome extends Component {
//     render() {
//         return (<Home {...this.props}></Home>)
//     }
// }

export default RouteExample;
