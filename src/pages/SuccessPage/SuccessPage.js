import styled from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export default function SuccessPage({ filmeSessao, userData, ingressos, setFilmeSessao, setUserData, setIngressos }) {
    const navigate = useNavigate()
    function returnHome() {
        setFilmeSessao({ nomeFilme: "", data: "", hora: "" })
        setIngressos([])
        setUserData({ name: "", cpf: "" })
        navigate("/")
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                {filmeSessao && (
                    <>
                        <p>{filmeSessao.nomeFilme}</p>
                        <p>{filmeSessao.data} - {filmeSessao.hora}</p>
                    </>
                )}
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {Array.isArray(ingressos) && ingressos.length > 0 ? (
                    ingressos.map((ingresso, index) => <p key={index}>{`Assento ${ingresso}`}</p>)
                ) : (
                    <p>Nenhum ingresso selecionado</p>
                )}
            </TextContainer>

            <TextContainer data-test="client-info">
                <div>
                    <strong><p>Comprador</p></strong>
                    {userData && userData.name && (
                        <>
                            <p>{`Nome: ${userData.name}`}</p>
                            <p>{`CPF: ${userData.cpf}`}</p>
                        </>
                    )}
                </div>
            </TextContainer>

            <button data-test="go-home-btn" onClick={() => returnHome()}>Voltar para Home</button>


        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`