import { useEffect } from "react";
import "./Header.css";
import logo from '../../assets/logoMin.png';
import {TopMenu} from '../menu/TopMenu';
import { isAuth } from "../../util/Util";

export const Header = () =>{

    useEffect(( )=>{},[]);
    return (

        <div>
            <div className='flex text-center'>
            <img className='logo' src={logo} alt="logo" />
            <h1>Bienvenido</h1>

            </div>
            {isAuth() ? <TopMenu /> : ""}
        </div>
    
    )
} 