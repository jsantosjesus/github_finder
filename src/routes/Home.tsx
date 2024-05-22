import Search from "../components/Search";
import User from "../components/User";

import classes from './Home.module.css';

import { UserProps } from "../types/user";

import { useState } from "react";



export const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);


    const loadUser = async(userName: string) => {

        const res = await fetch(`https://api.github.com/users/${userName}`);

        const data = await res.json();

        const {avatar_url, login, location, followers, following} = data;
        
        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following,
        };

        setUser(userData);

    }

    return (
        <div className={classes.home}>
            <h1>Página Home</h1>
            <Search loadUser={loadUser}/>
            {user && <User {...user} />}
        </div>
    )
}