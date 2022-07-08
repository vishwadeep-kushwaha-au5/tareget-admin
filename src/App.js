import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Logging } from './components/Logging';
import Home from './components/Home'
import ViewOrder from './components/delivery/ViewOrder';

import PrivateRoute from './components/Routes/PrivateRoute'
import PublicRoute from './components/Routes/PublicRoute'

function App() {

  return (
    <div className="App">
      <Router>
        <PublicRoute exact path="/login" component={Logging} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/viewOrder/:id" component={ViewOrder} />
      </Router>
    </div >
  );
}

export default App;
