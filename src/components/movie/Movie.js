import Toast from 'react-bootstrap/Toast';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Movie.css";
import { API_URL, getToken, showMessage } from "../../util/Util";
import Swal from "sweetalert2";

export const Movie =()=>{

    const params = useParams();
    const [movieId, setMovieId] = useState('');
    const [movie, setMovie] = useState({});
    const [score, setScore] = useState([]);
    const [scoreSelected, setScoreSelected] = useState("");
    const [scoreId, setScoreId] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
      setMovieId(params.id);
      getMovie();
      setScoreData();
      checkScore();
      checkIsInList();
    },[scoreSelected]);

    const getMovie= async ()=>{
        let response = await fetch(API_URL + "movie/" +params.id);
        response = await response.json();
        setMovie(response);
    };

    const checkScore = async () => {
      const requestData = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: getToken(),
        },
      };
      let response = await fetch(
        API_URL + "score/check/" + params.id,
        requestData
      );
      response = await response.json();
      //const response = { id: "6399cfadc9e9a77c999e8306", score: 6 };
      if (response.id != null && response.score != null) {
        setScoreSelected(response.score);
        setScoreId(response.id);
      }
    };

    

    const sendScoreApi=async(score)=>{
      let method = "post";
      if (scoreSelected != "") {
      method = "put";
      }


      const ScoreDto ={
        score:score,
        //userId :"638d4ff6c553cc1f85155ef2",
        movieId : movieId
      }

      const requestData = {
        method,
        body: JSON.stringify(ScoreDto),
        headers:{
          "Content-type":"application/json",
          Authorization: getToken(),
        }
      }
        
      let response = await fetch(API_URL + "score/" + scoreId,requestData);
      response = await response.json();
      const title = "";
      let icon = "warning";
      let confirmButtonText = "Reintentar";

      if (response.status == true) {
        
          icon = "success";
          confirmButtonText = "Ok";
        
      } const message = response.message;
      showMessage(title, message, icon, confirmButtonText);

    };
    


    const setScoreData=()=>{
        const scores=[]
        for (let index = 1; index <= 5; index++) {
            scores.push(index);        
        }
        setScore(scores)
    }
    
    const sendScore=async(event)=>{
        const {value}=event.target;

        await sendScoreApi(value)
        
        setScoreSelected(value);
    }

    const checkIsInList = () => {
      //consumir el api
      //validar si está activa
      setIsActive(true);
    };

    const handleAddList = async () => {
      //comunicación con backend, enviandoles el id de esta pelicula y enviandole el token
      //backend debería tomar ese id pelicula, buscar esa pelicula en la bd, después el usuarios
      //debería guardar en una entidad playlist->id cliente, id pelicula, la fecha,state =>1 activo, 2=>oculto
      //mensaje indicanole al usuario que ya se agregó
    };

    return(
      <div className="movie-container">
        <iframe
          id="myVideo"
          width="560"
          height="515"
          src={!movie.link?'https://www.youtube-nocookie.com/embed/-1pHqK5YD7s':movie.link}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >   </iframe>
      <div className="main-container">
        <div className="content">
          <h1>{movie.title}</h1>
          <p>
            Descripción de la película: {movie.description}
          </p>
          <div className="director-list">
            <p>Director:&nbsp;  
            {movie.director && movie.director.length > 0
              ? movie.director
              : "No hay director definido"}
              </p>
          </div>
          <div className="gender-list">
            
            {movie.genders && movie.genders.length > 0
              ? movie.genders.map((gender, idx) => (
                  <p key={idx}>
                    Genero: {gender.name} 
                  </p>
                ))
              : "No hay generos definidas"}
              
          </div>
          <div className="rate">
            <p>Calificar pelicula</p>
            <select value={scoreSelected} onChange={sendScore}>
              <option>Sin calificar</option>
              {score.map((element, idx) => (
                <option key={idx}>{element}</option>
              ))}
            </select>
            
            <button
              onClick={handleAddList}
              className={isActive ? "active" : ""}
            >
              Agregar a mi lista
            </button>
          </div>
          
        </div>
      </div>
    </div>
    );
}