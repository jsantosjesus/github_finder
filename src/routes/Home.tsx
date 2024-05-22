import Search from "../components/Search";
import User from "../components/User";

import classes from './Home.module.css';

import { UserProps } from "../types/user";

import { useState } from "react";
import Error from "../components/Error";



export const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastSearch, setLastSearch] = useState<string>("");

    const loadUser = async (userName: string) => {

        if (userName.length < 1) {
            setError("Digite pelo menos um caractere");
            setUser(null);
        } else if(userName == lastSearch){
            return;
        }  else {
            setLastSearch(userName);
            const res = await fetch(`https://api.github.com/users/${userName}`);

            const data = await res.json();

            if (res.status === 404) {
                setError("Erro ao buscar usuário");
                setUser(null);
            } 
            else {
                const { avatar_url, login, location, followers, following } = data;

                const userData: UserProps = {
                    avatar_url,
                    login,
                    location,
                    followers,
                    following,
                };

                setUser(userData);
                setError(null);
            }
        }
    }

    return (
        <div className={classes.home}>
            <h1>Página Home</h1>
            <Search loadUser={loadUser} />
            {user && <User {...user} />}
            {error && <Error message={error}/>}
        </div>
    )
}