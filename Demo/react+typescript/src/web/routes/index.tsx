import * as React from "react";
const { lazy, Suspense } = React;
import Loading from "../components/loading";
import { Switch, RouteProps, Route } from "react-router-dom";

const Main = lazy(() =>
    import(/* webpackChunkName:"loading" */ "../components/main")
);
const Banner = lazy(() =>
    import(/* webpackChunkName:"banner" */ "../components/banner")
);

const routes: RouteProps[] = [
    {
        path: "/",
        exact: true,
        component: Main
    },
    {
        path: "/banner",
        exact: true,
        component: Banner
    }
];
const Routes = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            {
                routes.map(r => {
                    const { path, exact, component } = r;
                    const LazyCom = component;
                    return (
                        <Route key={path + ""} exact={exact} path={path} render={() => <LazyCom />} />
                    )
                })
            }
        </Switch>
    </Suspense>
)
export default Routes;