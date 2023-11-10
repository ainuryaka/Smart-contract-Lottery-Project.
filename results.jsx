import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      await window.ethereum.enable();

      const web3 = new Web3(window.ethereum);

      const contractAddress = 'your_smart_contract_address';
      const abi = [...]; 

      const lotteryContract = new web3.eth.Contract(abi, contractAddress);

      const results = await lotteryContract.methods.getResults().call();

      setResults(results);
    };

    getResults();
  }, []);

  return (
    <div>
      <h2>Lottery Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;