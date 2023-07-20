import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/regulatorDashboard/Upload";
import Regulator from "./components/regulatorDashboard/Regulator";
import Landing from "./components/Landing";
import Faq from "./components/Faq";
import Library from "./components/Library";
import Stripe from "./components/Stripe";
import PlaceOrder from "./components/producer/PlaceNewOrder";
// import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./components/Authentication";
import { Session } from "@supabase/supabase-js";
import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegulatorDashboard from "./components/regulatorDashboard/RegulatorDashboard";
import ProducerDashboard from "./components/producerDashboard/ProducerDashboard";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard/producer/upload" component={Upload} />
        <ProtectedRoute
          path="/regulator"
          component={Regulator}
          session={session}
          redirectPath="/login"
        />
        <Route path="/faq" component={Faq} />
        <Route path="/library" component={Library} />
        <Route path="/stripe" component={Stripe} />
        <Route path="/new-order">
          <PlaceOrder session={session} />
        </Route>
        <Route path="/dashboard/regulator/" component = {RegulatorDashboard}/>
        <Route path="/dashboard/producer/" component = {ProducerDashboard}/>
      </Switch>
    </Router>
  );
}

export default App;

//   return (
//     <div className="container" style={{ padding: "50px 0 100px 0" }}>
//       {!session ? (
//         <Auth />
//       ) : (
//         <Account key={session.user.id} session={session} />
//       )}
//     </div>
//   );
// }

// export default App;
