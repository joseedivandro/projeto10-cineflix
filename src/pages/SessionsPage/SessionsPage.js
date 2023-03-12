import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage({setIdFilme }) {
  const [sessao, setSessao] = useState([]);
  const { idFilme } = useParams();

  const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
  const promise = axios.get(url);
  let filmeSelecionado = false;


  useEffect(() => {


    promise.then((res) => {
      setSessao(res.data);
      setIdFilme(idFilme);
    });

    promise.catch((err) => {
      console.log(err);
    });
  }, []);



  if (sessao.days !== undefined) {
    filmeSelecionado = true;
  } else {
    filmeSelecionado = false;
  }



  return (

    <>
      {filmeSelecionado ? (
        <PageContainer>
          <p>Selecione o horário</p>
          <SessionContainer data-test="movie-day">
            {sessao.days && sessao.days.map((time, index) => (
              <div key={index}>
                {time.weekday} - {time.date}
                {time.showtimes.map((showtimes) => (
                  <ButtonsContainer key={showtimes.id}>
                    <Link to={`/assentos/${showtimes.id}`}>
                      <button data-test="showtime">{showtimes.name}</button>
                    </Link>
                  </ButtonsContainer>
                ))}
              </div>
            ))}
          </SessionContainer>

          <FooterContainer data-test="footer">
            <div>
              <img src={sessao.posterURL} alt="poster" />
            </div>
            <div>
              <p>{sessao.title}</p>
            </div>
          </FooterContainer>
        </PageContainer>
      ) : (
        <div><p> A CARREGAR</p></div>
      )}
    </>
  )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    align-items:center;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`