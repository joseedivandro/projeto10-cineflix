import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link } from "react-router-dom"

export default function HomePage({ filmeId, setFilmeId }) {

    const [listaDeFIlmes, setListaDeFilmes] = useState([])
    const filmeEscolhido = !(listaDeFIlmes[0] === undefined)

    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies`
    const promise = axios.get(url)

    useEffect(() => {




        promise.then((res) => {
            setListaDeFilmes(res.data)
            console.log(res.data)

        })

        promise.catch((err) => {

            console.log(err.data)


        })
    }, [])

    return (
        <>
            {filmeEscolhido ? (
                <PageContainer>
                    Selecione o filme

                    <ListContainer>
                        {listaDeFIlmes.map((img, index) => (
                            <div key={index}>
                                <MovieContainer  data-test="movie">
                                    <Link to={`/sessoes/${img.id}`}>
                                        <img src={img.posterURL} alt={img.title} />
                                    </Link>
                                </MovieContainer>
                            </div>
                        ))}
                    </ListContainer>

                </PageContainer>

            ) : (
                <div> <p>A CARREGAR </p></div>
            )}
        </>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`