import { useState, useEffect } from "react"

export default function SeatReserver({ seat, compradores, setCompradores, SelecionaAssentoNumero, selectedNumber }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const data = { idAssento: SelecionaAssentoNumero[selectedNumber.indexOf(seat)], nome, cpf };

  function reservaObj() {
    if (!compradores.some(seat => seat.idAssento === data.idAssento)) {
      const order = [...compradores, data];
      setCompradores(order);
    } else {
      const seller = compradores.find(({idAssento}) => idAssento === data.idAssento);
      seller.nome = nome;
      seller.cpf = cpf;
    }
  }

  useEffect(() => {
    reservaObj();
  }, [cpf, nome])

  function verificarUnde () {
    if(!seat){
      return true;
    }
    return false;
  }

  return (
    <>
      <label htmlFor={`name${selectedNumber.length <= 1 ? "" : seat}`}>Nome do Comprador {selectedNumber.length <= 1 ? "" : seat}:</label>
      <input
        placeholder="Digite seu nome..."
        required
        id={`name${seat}`}
        name={`name${seat}`}
        onChange={e => setNome(e.target.value)}
        value={nome}
        data-test="client-name"
        disabled={verificarUnde()}
      />

      <label htmlFor={`cpf${selectedNumber.length <= 1 ? "" : seat}`}>CPF do Comprador {selectedNumber.length <= 1 ? "" : seat} (apenas numeros):</label>
      <input
        placeholder="Digite seu CPF ..."
        required
        disabled={verificarUnde()}
        minLength={11}
        maxLength={14}
        value={cpf}
        id={`cpf${seat}`}
        name={`cpf${seat}`}
        onChange={e => setCpf(e.target.value)}
        data-test="client-cpf"
      />
    </>
  )
}