import Faq from '@/components/pages/Faq'
import Landing from '@/components/Landing/Landing'
import Library from '@/components/pages/Library'
import Login from '@/components/pages/Login'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import ProtectedRoute from '@/components/ProtectedRoutes'
import Register from '@/components/pages/Register'
import SecurityStatement from '@/components/pages/SecurityStatement'
import TermsOfService from '@/components/pages/TermsOfService'
import LabDashboardRouter from '@/components/lab/LabDashboard'
import ProducerDashboardRouter from '@/components/producer/ProducerDashboard'
import RegulatorDashboardRouter from '@/components/regulatorDashboard/RegulatorDashboard'
import '@/index.css'
import { supabase } from '@/utils/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Custom404 from './components/pages/ErrorPage'
import LeftSideBar from './components/common/LeftSideBar'
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
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/tos" component={TermsOfService} />
          <Route path="/security" component={SecurityStatement} />
          <Route path="/error" component={Custom404} />

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

          <Route path="*" component={Custom404} />
        </Switch>
      </Router>
    </SessionContextProvider>
  )
}

export default App