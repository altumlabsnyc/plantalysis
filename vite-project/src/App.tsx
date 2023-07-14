import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";
import Regulator from "./components/Regulator";
import Landing from "./components/Landing";
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
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}
export default App;
