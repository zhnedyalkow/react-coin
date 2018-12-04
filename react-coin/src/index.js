import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />

                <Switch>
                    <Route path="/" component={List} exact />
                    <Route path="/currency/:id" component={Detail} exact />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
