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
        console.log('PDP constructor called');
    }


    render() {
        const { match } = this.props;
        return (<div>
            <AutosuggestRouteElm match={match} />
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
                                <Link to="/404">Non existing page</Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ flex: 1, padding: "10px" }}>
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
                                path={`/autosuggest/`}
                                exact={true}
                                render={() => (<Home {...this.props}></Home>)}
                            />
                            <Route
                                path={`/`}
                                exact={true}
                                render={() => (<Home {...this.props}></Home>)}
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

class AHome extends Component {
    render() {
        return (<Home key='1' {...this.props}></Home>)
    }
}

export default RouteExample;
