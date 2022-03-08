import React from 'react';
import { render } from 'react-dom';

// React Router related
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// Redux related
import { Provider } from 'react-redux';
import store from './store';

// Component Containers
import App from './component/App/App';
import NotFound from './component/App/NotFound';
import Home from './component/Home/Home';


// Styles
import './styles/styles.scss';

render((
  <Provider
    store={store}
  >
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/counters" component={} />
          <Route path="/helloworld" component={} />
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
