import Faq from '@/components/Faq'
import Landing from '@/components/Landing/Landing'
import LeftSideBar from './components/LeftSideBar'
import Library from '@/components/Library'
import Login from '@/components/Login'
import ProtectedRoute from '@/components/ProtectedRoutes'
import Register from '@/components/Register'
import LabDashboardRouter from '@/components/lab/LabDashboard'
import ProducerDashboardRouter from '@/components/producer/ProducerDashboard'
import RegulatorDashboardRouter from '@/components/regulatorDashboard/RegulatorDashboard'
import Privacy from '@/components/PP'
import TOS from '@/components/TOS'
import '@/index.css'
import { supabase } from '@/utils/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LabDashboardContent from './components/lab/LabDashboardContent'
// testing commit
function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/leftsidebar" component={LeftSideBar} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/tos" component={TOS} />

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
            component={RegulatorDashboardRouter}
            path="/dashboard/regulator"
            roles={['regulator']}
          />

          <Route path="/faq" component={Faq} />
          <Route path="/library" component={Library} />

          {/* <Route path="/new-order">
            <PlaceNewOrder />
          </Route> */}

          <Route path="/playground">
            <div
              style={{
                background: '#F8F6F2',
                width: '100%',
                height: '700px',
                display: 'flex',
              }}
            >
              <LabDashboardContent />
            </div>
          </Route>
        </Switch>
      </Router>
    </SessionContextProvider>
  )
}

export default App
