import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"

import { BrowserRouter ,Route, Routes, Link} from "react-router-dom"

export default function App() {
    const [filmId , setFilmId] = useState ("")
    const [filmes, setFilmes] = useState ([]);
    const [sessionLink, setSessionLink]= useState("")
    const [sessionId, setSessionId] = useState("")
    const [filmeSessao , setFilmeSessao]= useState({nomeFilme:"", data:"", hora:""})
    const [userData, setUserData] = useState({ name:"", cpf:""})
    const [ingressos , setIngressos] = useState([])
   

    return (
        <BrowserRouter>
          <Link to="/">
          <NavContainer>CINEFLEX</NavContainer>
          </Link>
        
          
            <Routes>
           
            <Route path ="/" element= { <HomePage />}/>
            <Route path="/sessoes/:idFilme" element={<SessionsPage 
                  setSessionId= {setSessionId}
                  filmeSessao={filmeSessao}
                  setFilmeSessao={setFilmeSessao}
                 

            />} />


            <Route path="/assentos/:idFilme" element= {
                <SeatsPage
                   
                    filmId ={filmId} 
                    userData={userData}
                    setUserData={setUserData}
                    ingressos={ingressos}
                    setIngressos ={setIngressos}
                   
    
                /> 
             }/>
           
            <Route path="/sucesso" element={<SuccessPage 
                 filmeSessao={filmeSessao}
                 userData={userData}
                 ingressos={ingressos}
                 setFilmeSessao={setFilmeSessao}
                 setUserData ={setUserData}
                 setIngressos = {setIngressos}
            />} />

            </Routes>
            
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
