import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"


export default function App() {

    const [filmeId, setFilmeId] = useState("")
    const [pegaIdDaSessao , setPegaIdDaSessao]= useState({nomeFilme:"", data:"", hora:""})
    const [pegaIdDoFilme, setPegaIdDoFilme] = useState("")
    const [filmId , setFilmId] = useState ("")
    const [sessao, setSessao] = useState("")

    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes> 
                <Route path="/" element={< HomePage />}/>
                <Route path="/sessoes/:idFilme" element={<SessionsPage
                  setPegaIdDaSessao={setPegaIdDaSessao}
                  setPegaIdDoFilme={setPegaIdDoFilme}
                
                />}/>
                <Route path="/assentos/:idSessao" element={<SeatsPage
                filmId ={filmId} 
                filmeId={filmeId}
                setFilmeId={setFilmeId}
                sessao={sessao}
                setSessao={setSessao}
                
                />}
                
                
                />
                <Route path="/sucesso" element={<SuccessPage
                
                
                />}/>
                </Routes>
            </BrowserRouter>
        </>
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
