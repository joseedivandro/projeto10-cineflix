import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"

import { BrowserRouter ,Route, Routes, Link} from "react-router-dom"

export default function App() {
    const [filmId , setFilmId] = useState ("")
    const [sessionId, setSessionId] = useState("")
    const [infoPagar, setinfoPagar]= useState({nomeFilme:"", data:"", hora:""})
    const [userDados, setuserDados] = useState({ name:"", cpf:""})
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
                  infoPagar={infoPagar}
                  setinfoPagar={setinfoPagar}
                 

            />} />


            <Route path="/assentos/:idFilme" element= {
                <SeatsPage
                   
                    filmId ={filmId} 
                    userDados={userDados}
                    setuserDados={setuserDados}
                    ingressos={ingressos}
                    setIngressos ={setIngressos}
                   
    
                /> 
             }/>
           
            <Route path="/sucesso" element={<SuccessPage 
                 infoPagar={infoPagar}
                 userDados={userDados}
                 ingressos={ingressos}
                 setinfoPagar={setinfoPagar}
                 setuserDados ={setuserDados}
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
