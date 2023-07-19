import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";
import Regulator from "./components/Regulator";
import Landing from "./components/Landing";
import Faq from "./components/Faq";
import Library from "./components/Library";
import Stripe from "./components/Stripe";
import PlaceOrder from "./components/producer/PlaceNewOrder";
// import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./components/Authentication";
import { Session } from "@supabase/supabase-js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        <Route path="/upload" component={Upload} />
        <Route path="/regulator" component={Regulator} />
        <Route path="/faq" component={Faq} />
        <Route path="/library" component={Library} />
        <Route path="/stripe" component={Stripe} />
        <Route path="/new-order">
          <PlaceOrder session={session} />
        </Route>
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
