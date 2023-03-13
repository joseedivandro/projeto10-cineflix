import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import InputMask from 'react-input-mask';
import removeAccents from 'remove-accents';




export default function SeatsPage({ filmId, setuserDados, ingressos, setIngressos }) {

    const [seatInfos, setaSeatInfos] = useState()
    const { idFilme } = useParams()
    const [nome, setNome] = useState("")
    const [CPF, setCPF] = useState("")
    const [seatId, setSeatId] = useState([]);
    const [seats, setSeats] = useState([{}])


    const items = [
        {color: "#1AAE9E", border: "#0E7D71", label: "Selecionado" },
        {color: "#C3CFD9", border: "#808F9D", label: "Disponível" },
        {color: "#FBE192", border: "#F7C52B", label: "Indisponível" }
        ];
    const navigate = useNavigate();

    let userReserve = {
        ids: [],
        name: "",
        cpf: ""
    }


    const ClientNameInput = ({ value, onChange }) => (
        <>
          <Title htmlFor="name">Nome do Comprador: </Title>
          <input
            id="name"
            data-test="client-name"
            type="text"
            placeholder="Digite seu nome..."
            value={value}
            onChange={onChange}
            required
          />
        </>
      );

      const ClientCpfInput = ({ value, onChange }) => (
        <>
          <Title htmlFor="cpf">CPF do Comprador:</Title>
          <InputMask
            mask="999.999.999-99"
            id="cpf"
            data-test="client-cpf"
            value={value}
            type="text"
            placeholder="Digite seu CPF..."
            onChange={onChange}
            required
          />
        </>
      );

      const BookSeatButton = ({ onClick }) => (
        <button data-test="book-seat-btn" onClick={onClick}>
          Reservar Assento(s)
        </button>
      );

    useEffect(() => {
        const require = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idFilme}/seats`)

        if (filmId !== undefined) {
            require.then(res => {
                setaSeatInfos(res.data)
                console.log(res.data)
                setSeats(
                    res.data.seats.map(({ id, name, isAvailable }) => {
                        return { id, name, isAvailable, selected: false }
                    })

                )

            })

            require.catch(err => {
                console.log(err.response.data.error)
            })
        }

    }, [])


    if (seatInfos === undefined) {
        return <div>Carregando....</div>
    }


    function addSeat(id, name, isAvailable) {
        setSeatId([...seatId, id]);


        if (!isAvailable) {
            alert("Esse assento não está disponível")
        } else {
            setIngressos([...ingressos, name]);
            const newSeats = seats.map((selection) => {
                if (selection.id === id) {
                    return { ...selection, selected: !selection.selected }
                }
                return selection
            })
            setSeats(newSeats);
        }

    }



    const setarReserva = (e) => {
        const url = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'
        e.preventDefault()
        userReserve.ids = [...seatId]
        userReserve.name = nome
        userReserve.cpf = CPF
        setuserDados({
            name: nome,
            cpf: CPF
        })

        const promise = axios.post(url, userReserve)
        promise.then(res =>
            setCPF(""),
            setNome(""),
            navigate("/sucesso")
        )
        promise.catch(err => alert(err.response.data.mensagem));


    };

    if (seatInfos !== undefined) {

        return (


            <PageContainer>
                Selecione o(s) assento(s)
                <SeatsContainer>
                    {seats.map(s => {
                        const color = s.selected ? "#1AAE9E" : !s.isAvailable ? "#FBE192" : "#C3CFD9";
                        const border = s.selected ? "#0E7D71" : !s.isAvailable ? "#F7652B" : "#7B8B99";

                        return (
                            <SeatItem
                                data-test="seat"
                                key={s.id}
                                color={color}
                                border={border}
                                onClick={() => addSeat(s.id, s.name, s.isAvailable)}
                            >
                                {s.name}
                            </SeatItem>
                        );
                    })}
                </SeatsContainer>

               

                <CaptionContainer>
                    {items.map(item => (
                        <CaptionItem key={item.label}>
                            <CaptionCircle color={item.color} border={item.border} />
                            {item.label}
                        </CaptionItem>
                    ))}
                </CaptionContainer>

                <FormContainer>
                    <form onSubmit={setarReserva}>
                        <Title htmlFor="name">Nome do Comprador: </Title>
                        <input
                            id="name"
                            data-test="client-name"
                            type="text"
                            key="nome"
                            placeholder="Digite seu nome..."
                            value={nome}
                            onChange={info => {
                                removeAccents(info.target.value.replace(/[0-9]/g, ''));
                                setNome(info.target.value)
                            }}
                            required
                        />

                        <Title htmlFor="cpf">CPF do Comprador:</Title>

                        <InputMask
                            mask="999.999.999-99"
                            id="cpf"
                            data-test="client-cpf"
                            value={CPF}
                            type="text"
                            key="cpf"
                            placeholder="Digite seu CPF..."
                            onChange={e => setCPF(e.target.value)}
                            required
                        />

                        <button data-test="book-seat-btn" onClick={() => setarReserva()} >Reservar Assento(s)</button>

                    </form>
                </FormContainer>

                <FooterContainer data-test="footer">
                    <div>
                        <img src={seatInfos.movie.posterURL} alt={seatInfos.movie.title} />
                    </div>
                    <div>
                        <p>{seatInfos.movie.title}</p>
                        <p>{seatInfos.day.weekday} - {seatInfos.name}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )

    }
}
const Title = styled.label`
     margin-bottom: 5px;
    font-size: 22px;
`

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
    InputMask{
        width: calc(100vw - 60px);
    }
    InputStringMask{
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
     border: 1px solid ${(props) => props.border}; 
    background-color: ${(props) => props.color};    // Essa cor deve mudar
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
    border: 1px solid ${(props) => props.border}; 
    background-color: ${(props) => props.color};   // Essa cor deve mudar
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