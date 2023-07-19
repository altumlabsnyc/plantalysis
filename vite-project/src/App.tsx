import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";
import Regulator from "./components/Regulator";
import Landing from "./components/Landing";
import Faq from "./components/Faq";
import Library from "./components/Library";
import Stripe from "./components/producer/Stripe";
import PlaceOrder from "./components/producer/PlaceNewOrder";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/upload" component={Upload} />
        <Route path="/regulator" component={Regulator} />
        <Route path="/faq" component={Faq} />
        <Route path="/library" component={Library} />
        <Route path="/stripe" component={Stripe} />
        <Route path="/new-order" component={PlaceOrder} />
      </Switch>
    </Router>
  );
}

export default App;
