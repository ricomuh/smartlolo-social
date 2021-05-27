import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
//third parties
import Cookies from "universal-cookie";
//context
import { UserContext, ThemeContext } from "./Context";
//router
import Routes from "./Router";

const cookies = new Cookies();

const App = () => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    const [token, setToken] = useState(null);

    //mounted
    useEffect(() => {
        let themeLocal = localStorage.getItem("theme");
        setTheme(themeLocal ?? "light");

        let tokenLocal = cookies.get("token");
        setToken(tokenLocal ?? null);
    }, []);

    //theme changed
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = `antialiased ${theme}`;
    }, [theme]);

    //token changed
    useEffect(() => {
        if (token !== null) {
            //codes goes here
            cookies.set("token", token);
        } else {
            setUser(false);
            cookies.remove("token");
        }
    }, [token]);

    if (user == null) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-900 text-white">
                <h1 className="text-xl">SmartLolo Social Logo goes here...</h1>
                <p>Loading... please wait...</p>
            </div>
        );
    }

    return (
        <UserContext.Provider value={[user, setUser, token, setToken]}>
            <ThemeContext.Provider value={[theme, setTheme]}>
                <Routes />
            </ThemeContext.Provider>
        </UserContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
