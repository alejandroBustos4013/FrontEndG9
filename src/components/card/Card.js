import "./Card.css";
import card from '../../assets/logoMin.png';
import { Link } from "react-router-dom";


export const Card=({id,title, description, })=>{

    const viewMovie = ()=>{
        console.log("el nombre de la pelicula es",title)
    }

    const cardOld = () =>{
        <div className="card">
            <img src={card} alt="Avatar"/>
            <div className="container">
                <h4><b>{title}</b></h4>
                <h6>{description}</h6>
                <Link className='btn' to= {`/movie/${id}`}> Ver</Link>
            </div>
           
        </div>

    }

    return(
        <div className="card col-sm-6 col-md-4 col-lg-4 col-xl-3">
            <img src={card} className="card-img-top" alt="imagen no encontrada" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <Link className="btn btn-primary" to={`/movie/${id}`}>
                Ver
                </Link>
            </div>
        </div>
        
    )
}