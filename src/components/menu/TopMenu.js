import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"; 

import "./TopMenu.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, isAuth } from "../../util/Util";

export const TopMenu = () =>{

    const [datosgender,setDatosgender]= useState ([]);
    let navigate = useNavigate();

    const items=[
        "Inicio",
        "Generos",
        "Mis Listas",
        "Mi cuenta",
    ]



    useEffect(()=>{
        getDatosgenderAsync();
    },[]);

    const getDatosgenderAsync= async ()=>{
        let response = await fetch(API_URL+"gender/")
        response = await response.json();
        setDatosgender(response);
        };

    const oldMenu =()=>(
        <div className="scrollmenu">
            {items.map((numeral,idx)=>(
                <a key={idx} href="#">{numeral}</a>

            ))}
        </div>
    )

    const menuSencillo=() =>(
        <div className="navbar">
            <Link to="/">Inicio</Link>
            <div className="subnav">
                <button className="subnavbtn">
                    <Link to="/movie/gender/"> Generos </Link>
                </button>
                {/*<div className="subnav-content">
                    {datosgender.map((item, idx) => (
                        <Link key={idx} to={`/gender/${item.name}`}>
                        {item.name}
                        </Link>
                    ))}
                    </div>*/}
            </div>
        <div className="subnav">
            <button className="subnavbtn">
                <Link to="/entermovie/"> Mis Peliculas </Link>
            </button>
            
        </div>
            <Link to="">{renderLogout()}</Link>
        </div>
    )

    const logOut = () => {
        localStorage.clear();
        navigate("/");
      };

    const renderLogout = () => {
        if (localStorage.getItem("authData")) {
          return <a onClick={logOut}>Cerrar sesión</a>;
        }
    };

    const bootstrapMenu = () =>{
        <Navbar bg="light" expand="lg">
             <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">
                            <Link to="/">Inicio</Link>
                        </Nav.Link>
                        {/*<NavDropdown title="Generos" id="basic-nav-dropdown">
                        {datosgender.map((item, idx) => (
                        <Link key={idx} to={`/gender/${item.name}`}>
                        {item.name}
                        </Link>
                        ))}
                        </NavDropdown>*/}
                        <Nav.Link>
                            <Link to={`/gender/`}>Generos</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={`/category/`}>Más vistas</Link>
                        </Nav.Link>
                        <Nav.Link href="#link">
                            <Link to={`/view`}>Mis listas</Link>
                        </Nav.Link>
                        <Nav.Link href="#link">
                            <Link to={`/scores`}>Mis calificados</Link>
                        </Nav.Link>
                        <Nav.Link href="#link">
                            <Link to={`/account`}>Mi cuenta</Link>
                        </Nav.Link>
            <Nav.Link href="#link">{renderLogout()}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    }

    

    return menuSencillo();
} 