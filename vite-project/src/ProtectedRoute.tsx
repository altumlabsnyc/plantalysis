import React, { FC, ComponentType } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { Session } from "@supabase/supabase-js";

interface ProtectedRouteProps extends RouteProps {
  session: Session | null;
  redirectPath: string;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  session,
  redirectPath,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        session ? <Component {...props} /> : <Redirect to={redirectPath} />
      }
    />
  );
};

export default ProtectedRoute;
