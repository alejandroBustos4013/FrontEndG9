import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { API_URL,getToken } from "../../util/Util";
import React from 'react'
import Select from 'react-select'


export const Entermovie =() =>{

    const [formDataMovie, setFormDataMovie] = useState({
        title: "",
        description: "",
        genderId: "",
        director: "",
        link: "",
        releaseDate: "",
        //userId: "",
        imageLink: "",

    });

    useEffect(()=>{
        
        getDatosgenderAsync();
    },[]);

    const [datosgender,setDatosgender]= useState ([]);

    const getDatosgenderAsync= async ()=>{// para los generos de la entidad genero
        let response = await fetch(API_URL+"gender/")
        response = await response.json();
        setDatosgender(response);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataMovie((values) => ({ ...values, [name]: value }));
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await sendMovieApi();
      
    };

    const sendMovieApi = async () => {
        const requestData = {
          method: "POST",
          body: JSON.stringify(formDataMovie),
          headers: {
            "Content-type": "application/json",
            Authorization: getToken(),
          },
        };
        let response = await fetch(API_URL + "movie/", requestData);
        response = await response.json();
        return response;
        console.log(response);



      };


    return(
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Titulo de la pelicula:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Titutlo"
                    name="title"
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Descripción: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Descripción de la película"
                    name="description"
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Genero: </Form.Label>
                <Form.Select name="genderId" onChange={handleChange}>
                
                    <option>Selecciona genero</option>
                        {datosgender.map((item, idx) => (
                        <option  
                        key={idx}
                        value={item.id}>
                            {item.name}
                        </option>
                        
                    ))}
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Director de la pelicula</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresar director"
                    name="director"
                    onChange={handleChange}
                />
                
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirhtDate">
                <Form.Label>Link del trailer: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Link de youtbe"
                    name="link"
                    onChange={handleChange}
                />
                <Form.Text className="text-muted">
                    Asegurese de ingresar el link de youtube con la opcion de compartir code.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Fecha de estreno: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese la fecha"
                    name="releaseDate"
                    onChange={handleChange}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Imagen de película: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el link de la imagen"
                    name="imageLink"
                    onChange={handleChange}
                />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrar pelicula
                </Button>

                <Button variant="primary" type="submit">
                    <Link to="../movies"> Volver </Link>
                </Button>
            </Form>
        </div>
    )

}

