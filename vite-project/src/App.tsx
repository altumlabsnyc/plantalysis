
import ProducerDashboardRouter from "./components/producer/ProducerDashboard";
import RegulatorDashboard from "./components/regulator/RegulatorDashboard";
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { supabase } from "./components/Authentication"
import Faq from "./components/Faq"
import Landing from "./components/Landing"
import Library from "./components/Library"
import Login from "./components/Login"
import Register from "./components/Register"
import Stripe from "./components/Stripe"

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
<SessionContextProvider supabaseClient={supabase}>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        
        <Route path="/dashboard/lab">
          <LabDashboardRouter session={session} />
        </Route>

        <Route path="/dashboard/producer">
          <ProducerDashboardRouter session={session} />
        </Route>

        <Route path="/dashboard/regulator">
          <RegulatorDashboard session={session} />
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
        <Route path="/new-order">
          <PlaceOrder session={session} />
        </Route>
      </Switch>
    </Router>
    </SessionContextProvider>
  );
}

export default App
