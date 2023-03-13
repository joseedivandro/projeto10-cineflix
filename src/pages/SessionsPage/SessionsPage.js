import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage({ setIdFilme }) {
  const [sessao, setSessao] = useState([]);
  const [movie, setMovie] = useState(false);
  const [days, setDays] = useState(false);

  const { idFilme } = useParams();

  const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
  const promise = axios.get(url);
  let filmeSelecionado = false;


  useEffect(() => {


    promise.then(({ data }) => {

      setIdFilme(idFilme);
      setMovie(data);
      setDays(data.days);
    });

    promise.catch((err) => {
      console.log(err);
    });
  }, []);



  if (movie.days !== undefined) {
    filmeSelecionado = true;
  } else {
    filmeSelecionado = false;
  }



  return (

    <>
      {filmeSelecionado ? (
        <PageContainer>
          <p>Selecione o horário</p>
        <>

          <div>

            {days.map(({ id, weekday, date, showtimes }) => {
              return (
                <SessionContainer key={id} data-test="movie-day">
                  {`${weekday} - ${date}`}
                  <ButtonsContainer>
                    {showtimes.map(({ id, name }) => {
                      return (
                        <Link to={`/assentos/${id}`} key={id}>
                          <button data-test="showtime">{name}</button>
                        </Link>
                      )
                    })}
                  </ButtonsContainer>
                </SessionContainer>

              )
            })}
          </div>
          </>

          <FooterContainer data-test="footer">
            <div>
              <img src={movie.posterURL} alt="poster" />
            </div>
            <div>
              <p>{movie.title}</p>
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