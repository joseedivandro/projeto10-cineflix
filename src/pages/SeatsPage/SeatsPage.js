import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SeatReserver from "../FormSubmit/FormSubmit";


export default function SeatsPage({ sessaoSeat, setSessaoSeat, setOrder }) {

    const { idSessao } = useParams()
    let filmeSelecionado = false;
    const [session, setSession] = useState(false);
    const [SelecionaAssentoNumero, setSelecionaAssentoNumero] = useState([]);
    const [selectedNumber, selectedSeatsNumber] = useState([]);
    const [compradores, setCompradores] = useState([]);
    const navigate = useNavigate();



    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

    useEffect(() => {
        axios
            .get(url)
            .then(({ data }) => {
                setSessaoSeat(data)
            })
            .catch(() => alert("erro ao fazer requisição, sinto muito, tente novamente mais tarde"));


    }, [])


    if (sessaoSeat !== undefined) {
        filmeSelecionado = true;
    } else {
        filmeSelecionado = false;
    }



    function statusDaCor(status) {

        if (status === "selected") {
            return { color: "#1AAE9E", border: "#0E7D71" };
        } else if (status === "available") {
            return { color: "#C3CFD9", border: "#7B8B99" };
        }
        return { color: " #FBE192", border: "#F7C52B" };
    }


    function selecionarAssento(seatId, status, seatNumber) {
        if (!status) {
            alert("Assento indisponível")
            return;
        };

        if (!SelecionaAssentoNumero.includes(seatId) && !selectedNumber.includes(seatNumber)) {
            const seatsID = [...SelecionaAssentoNumero, seatId];
            const seatsNumber = [...selectedNumber, seatNumber];
            setSelecionaAssentoNumero(seatsID);
            selectedSeatsNumber(seatsNumber);
        } else {
            if (compradores.some(c => c.idAssento === seatId) && window.confirm("DESEJA REALMENTE REMOVER O ASSENTO E APAGAR OS DADOS?")) {
                const deleted = compradores.filter(c => c.idAssento !== seatId);
                setCompradores(deleted);
            }
            const removeSeat = SelecionaAssentoNumero.filter(seats => seats !== seatId);
            const RemoveSeatsNumber = selectedNumber.filter(seats => seats !== seatNumber);
            setSelecionaAssentoNumero(removeSeat);
            selectedSeatsNumber(RemoveSeatsNumber);
            return;
        }

    }


    function finishOrder() {
        const reserve = {
            reserved: { ids: SelecionaAssentoNumero, compradores },
            title: session.movie.title,
            sessionTime: session.name,
            sessionData: session.day.date,
            seatsNumber: selectedNumber
        }
        setOrder(reserve);
        navigate(`/sucesso`);
    }


    function submitSeats(e) {
        e.preventDefault();
        if (SelecionaAssentoNumero.length === 0 || selectedNumber.length === 0) {
            alert("Selecione pelo menos um assento");
            return;
        }
        finishOrder()
    }

    return (

        <>
            {filmeSelecionado ? (
                <PageContainer>
                    <p>Selecione o(s) assento(s)</p>

                    <SeatsContainer>
                        {sessaoSeat && sessaoSeat.seats && sessaoSeat.seats.length > 0 && sessaoSeat.seats.map(({ id, name, isAvailable }) => {
                            return (
                                <SeatItem key={id}
                                    isAvailable={isAvailable}
                                    isSelected={SelecionaAssentoNumero.includes(id)}
                                    onClick={() => selecionarAssento(id, isAvailable, name)}
                                    data-test="seat"
                                >{name}</SeatItem>
                            )
                        })}
                    </SeatsContainer>

                    <CaptionContainer>


                        <CaptionItem>
                            <CaptionCircle captionColor={statusDaCor("selected")} />
                            Selecionado
                        </CaptionItem>
                        <CaptionItem>
                            <CaptionCircle captionColor={statusDaCor("available")} />
                            Disponível
                        </CaptionItem>
                        <CaptionItem>
                            <CaptionCircle captionColor={statusDaCor("unavailable")} />
                            Indisponível
                        </CaptionItem>

                    </CaptionContainer>

                    <FormContainer onSubmit={submitSeats}>
                        {selectedNumber.length < 1 ?
                            <SeatReserver
                                seat={selectedNumber[0]}
                                compradores={compradores}
                                setCompradores={setCompradores}
                                SelecionaAssentoNumero={SelecionaAssentoNumero}
                                selectedNumber={selectedNumber}
                            />
                            :
                            selectedNumber.map((seat) => {
                                return (
                                    <SeatReserver key={seat}
                                        seat={seat}
                                        compradores={compradores}
                                        setCompradores={setCompradores}
                                        SelecionaAssentoNumero={SelecionaAssentoNumero}
                                        selectedNumber={selectedNumber}
                                    />
                                )
                            })

                        }
                        <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                    </FormContainer>

                    <FooterContainer data-test="footer">
                        <div>
                            <img src={sessaoSeat.movie?.posterURL} alt="poster" />
                        </div>
                        <div>
                            <p>{sessaoSeat.movie?.title}</p>
                            <p>{sessaoSeat.day?.weekday} - {sessaoSeat?.name} </p>
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
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
border: 1px solid ${({ captionColor }) => captionColor.border};
background-color: ${({ captionColor }) => captionColor.color};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
border: 1px solid ${({ isAvailable, isSelected }) => isSelected ? "#0E7D71" : isAvailable ? "#808F9D" : "#F7C52B"};
background-color: ${({ isAvailable, isSelected }) => isSelected ? "#1AAE9E" : isAvailable ? "#C3CFD9" : "#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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