import React, { useState } from "react";
import LoginForm from "../ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../ui/registerForm";

const Login = () => {
    // создаем стэйт для получения опциональнльного параметра в строке url например registred
    const { type } = useParams();
    // создаем стейт для хранения типа формы: либо login либо registred
    const [typeForm, setTypeForm] = useState(
        type === "registered" ? type : "login"
    );
    // создадим функцию переключения нужной формы
    const toogleTypeForm = (params) => {
        setTypeForm((prevState) =>
            prevState === "login" ? "registered" : "login"
        );
    };

    return (
        <div className="container mt-5 shadow p-4 col-md-3 offset-md-4">
            <div className="row">
                {typeForm === "login" ? (
                    <>
                        <h3 className="mb-4">Login</h3>
                        <LoginForm />
                        <p>
                            Don&apos;t have an accoount?&nbsp;
                            <a role="button" onClick={toogleTypeForm}>
                                Sign Up
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-4">Registered</h3>
                        <RegisterForm />
                        <p>
                            Have an Account?&nbsp;
                            <a role="button" onClick={toogleTypeForm}>
                                Sign In
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
