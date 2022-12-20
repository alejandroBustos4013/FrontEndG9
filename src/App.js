import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import './App.css';
import { Gender } from './components/gender/Gender';
import { Movie } from './components/movie/Movie';
import { Register } from './components/register/Register';
import { Entermovie } from './components/entermovie/Entermovie';
import { Content } from './components/content/Content';
import { Header } from './components/header/Header';
import { NotFound } from "./components/notFound/NotFound";
import { Sidebar } from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import { Login } from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/movie/gender/" element={<Gender />} />
          <Route path="/movie/gender/:name" element={<Gender />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/entermovie/" element={<Entermovie />} />
          <Route path="/movies" element={<Content />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          
        </Routes>
        <Footer />
      </Router>
 
    </div>
  );
}

export default App;
