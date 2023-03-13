import { Link } from "react-router-dom"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
export default function SuccessPage({infoPagar,userDados, ingressos, setinfoPagar, setuserDados, setIngressos}) {
    const navigate = useNavigate()
    function returnHome (){
        setinfoPagar({nomeFilme:"", data:"", hora:""})
        setIngressos([])
        setuserDados({ name:"", cpf:""})
        navigate ("/")
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{infoPagar.nomeFilme}</p>
                <p>{infoPagar.data} - {infoPagar.hora}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
               
                {
                    ingressos.map(ingresso =><p>{ `Assento ${ingresso}`}</p>)
                }
           
            </TextContainer>

            <TextContainer data-test="client-info" >
                <div >
                    <strong><p>Comprador</p></strong>
                    <p>{`Nome: ${userDados.name}`}</p>
                    <p>{`CPF: ${userDados.cpf}`}</p>
                </div>
            
            </TextContainer>
            
                <button  data-test="go-home-btn" onClick={()=>returnHome()}>Voltar para Home</button>
         
            
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
    align-items: center;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`