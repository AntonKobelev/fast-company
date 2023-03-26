import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import Menu from "./components/menu";
import Users from "./components/users";

// главный компонент приложения App
function App() {
    return (
        <>
            <Menu />
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/users/:userId?" component={Users}></Route>
                <Route exact path="/" component={Main}></Route>
            </Switch>
        </>
    );
}

export default App;
