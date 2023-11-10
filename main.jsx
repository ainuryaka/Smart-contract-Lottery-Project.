npx create-react-app lottery-frontend
cd lottery-frontend
npm install axios
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const contractAddress = 'your_smart_contract_address';
const abi = [...];  

const lotteryContract = new web3.eth.Contract(abi, contractAddress);

import React, { useState } from 'react';
import Web3 from 'web3';

const TicketForm = () => {
  const [amount, setAmount] = useState(0);

  const buyTicket = async () => {
    await window.ethereum.enable();

    const web3 = new Web3(window.ethereum);

    const contractAddress = 'your_smart_contract_address';
    const abi = [...]; 

    const lotteryContract = new web3.eth.Contract(abi, contractAddress);

    await lotteryContract.methods.buyTicket().send({
      from: web3.eth.defaultAccount,
      value: web3.utils.toWei(amount.toString(), 'ether'), 
    });

  };

  return (
    <div>
      <h2>Buy Lottery Ticket</h2>
      <label>
        Amount (ETH):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button onClick={buyTicket}>Buy Ticket</button>
    </div>
  );
};

export default TicketForm;