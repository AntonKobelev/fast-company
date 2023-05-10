import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import Menu from "./components/ui/menu";
import Users from "./components/layouts/users";

// главный компонент приложения App
function App() {
    return (
        <>
            <Menu />
            <Switch>
                <Route path="/login/:type?" component={Login}></Route>
                <Route path="/users/:userId?/:edit?" component={Users}></Route>
                <Route exact path="/" component={Main}></Route>
            </Switch>
        </>
    );
}

export default App;
