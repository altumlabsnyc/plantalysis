import { UserRole } from "@/types/supabaseAlias"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { ComponentType, FunctionComponent } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

interface ProtectedRouteProps extends RouteProps {
  component: ComponentType<any>
  roles?: UserRole[]
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  component: Component,
  roles = [],
  ...rest
}) => {
  const { session, isLoading } = useSessionContext()
  const user = session?.user

  // this is less than .1s, so it's not really necessary to show a loading screen
  if (isLoading) {
    return null
  }

  // If user object is null, undefined, or role does not match allowed roles, redirect to login
  if (
    !user ||
    (roles.length > 0 && !roles.includes(user?.app_metadata?.plantalysis_role))
  ) {
    return <Redirect to="/login" />
  }

  // Else, render the component
  return <Route {...rest} component={Component} />
}

export default ProtectedRoute
