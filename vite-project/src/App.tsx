import Faq from '@/components/Faq'
import Landing from '@/components/Landing'
import Library from '@/components/Library'
import Login from '@/components/Login'
import ProtectedRoute from '@/components/ProtectedRoutes'
import Register from '@/components/Register'
import LabDashboardRouter from '@/components/lab/LabDashboard'
import ProducerDashboardRouter from '@/components/producer/ProducerDashboard'
import RegulatorDashboard from '@/components/regulatorDashboard/RegulatorDashboard'
import '@/index.css'
import { supabase } from '@/utils/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <ProtectedRoute
            component={LabDashboardRouter}
            path="/dashboard/lab"
            roles={['lab']}
          />

          <ProtectedRoute
            component={ProducerDashboardRouter}
            path="/dashboard/producer"
            roles={['producer']}
          />

          <ProtectedRoute
            component={RegulatorDashboard}
            path="/dashboard/regulator"
            roles={['regulator']}
          />

          <Route path="/faq" component={Faq} />
          <Route path="/library" component={Library} />

          {/* <Route path="/new-order">
            <PlaceNewOrder />
          </Route> */}
        </Switch>
      </Router>
    </SessionContextProvider>
  )
}

export default App
