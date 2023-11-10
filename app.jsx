import React, { useEffect, useState } from "react";
import Lottery from "./contracts/Lottery.json";

function App() {
  const [lottery, setLottery] = useState(null);

  useEffect(() => {
    const lotteryContract = new Lottery.default(lottery.address);
    lotteryContract.lotteryNumber().then((lotteryNumber) => setLottery({ ...lottery, lotteryNumber }));
  }, []);

  return (
    <div>
      <h2>Lottery</h2>
      <p>Lottery Number: {lottery?.lotteryNumber}</p>
      <p>Players: {lottery?.players.length}</p>
      <p>Total Ticket Sales: {lottery?.totalTicketSales}</p>
    </div>
  );
}

export default App;
