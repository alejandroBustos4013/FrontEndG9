import { useEffect, useState } from 'react';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";
import {Card} from "../card/Card"
import { API_URL } from '../../util/Util';
import './Gender.css';
import logo from '../../assets/logoMin.png';


export const Gender=()=>{
    const params = useParams();
    const [gendermovie,setGendermovie]= useState ([]); // datos de la entidad movie
    const [datosgender,setDatosgender]= useState ([]); //datos de la entidad gender

    useEffect(()=>{
        //getGendermovieAsync();
        getDatosgenderAsync();
    },[]);

    const getGendermovieAsync= async ()=>{ // para mostrar las peliculas de la rntidad movie
        console.log(params);
        if(params.name){
        let response = await fetch(API_URL + "movie/gender")

        response = await response.json();
        setGendermovie(response);
        }
        
    };

    const getDatosgenderAsync= async ()=>{// para los generos de la entidad genero
        let response = await fetch(API_URL+"gender/")
        response = await response.json();
        setDatosgender(response);
    };
    const handleClick= async (name)=>{
        let response = await fetch(API_URL+"movie/gender/"+name)
        response = await response.json();
        setGendermovie(response);
        
    }


    return (
        <div>
        
            <div>
            <h1>Buscar pelicula por genero: </h1>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Generos:
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {datosgender.map((item, idx) => (
                        <Dropdown.Item key={idx} onClick={()=>handleClick(item.name)} >
                            {item.name}
                        </Dropdown.Item>
                    ))} 
                    </Dropdown.Menu>
                </Dropdown>

            </div>

                    
            <div className="row">

                {gendermovie.map((peliculas,idx)=>(
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

        </div>


        
    )
}