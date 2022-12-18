import "./Content.css";
import logo from '../../assets/logoMin.png';
import {Card} from "../card/Card"
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";


export const Content = () =>{

    const [datosmovie,setDatosmovie]= useState ([]);

    useEffect(()=>{
        getDatosmovieAsync();
    },[]);

    const getDatosmovieAsync= async ()=>{
        let response = await fetch(API_URL + "movie/")

        response = await response.json();
        setDatosmovie(response);
        };
    
    /*const movies=[
        {
            title:"titanic",
            description:"aaa",

        }
    ]*/
    return (
        <div className="row">
           {datosmovie.map((peliculas,idx)=>(
                <Card 
                key={idx}
                title={peliculas.title} 
                description={!peliculas.description?"No hay descripcion disponible":peliculas.description} 
                image={
                    !peliculas.imageLink 
                    ? logo
                    : peliculas.imageLink
                }
                id={peliculas.id}
                />
           ))}
        </div>
    )
} 