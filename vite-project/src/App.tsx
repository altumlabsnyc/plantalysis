import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { supabase } from "@/utils/supabase";
import Faq from "./components/Faq";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Login from "./components/Login";
import Register from "./components/Register";
import Stripe from "./components/Stripe";
import LabCurrentOrders from "./components/labDashboard/LabCurrentOrders";
import LabDashboard from "./components/labDashboard/LabDashboard";
import LabOrder from "./components/labDashboard/LabOrder";
import {
  default as PlaceOrder,
  default as ProdPlaceOrder,
} from "./components/producer/PlaceNewOrder";
import ProducerDashboard from "./components/producer/ProducerDashboard";
import ProducerOrders from "./components/producer/ProducerOrders";
import Regulator from "./components/regulatorDashboard/Regulator";
import RegulatorDashboard from "./components/regulatorDashboard/RegulatorDashboard";
import Upload from "./components/regulatorDashboard/Upload";

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
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard/labs/upload" component={Upload} />
          <Route path="/dashboard/labs/orders">
            <LabCurrentOrders session={session} />
          </Route>
          <Route path="/dashboard/producer/orders">
            <ProducerOrders session={session} />
          </Route>
          <Route path="/dashboard/producer/new-order">
            <ProdPlaceOrder session={session} />
          </Route>
          <Route path="/dashboard/labs/claim">
            <LabOrder session={session} />
          </Route>
          <ProtectedRoute
            path="/regulator"
            component={Regulator}
            session={session}
            redirectPath="/login"
          />
          <Route path="/faq" component={Faq} />
          <Route path="/library" component={Library} />
          <Route path="/stripe" component={Stripe} />
          <Route path="/dashboard/producer/" component={ProducerDashboard} />
          <Route path="/new-order">
            <PlaceOrder session={session} />
          </Route>
          <Route path="/dashboard/regulator">
            <RegulatorDashboard session={session} />
          </Route>
          <Route path="/dashboard/labs/" component={LabDashboard} />
        </Switch>
      </Router>
    </SessionContextProvider>
  );
}

export default App;
