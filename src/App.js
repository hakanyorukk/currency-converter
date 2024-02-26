import { useState, useEffect } from "react";

export default function App() {
  //const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      console.log(data);
      setConverted(data.rates[toCurrency]);
      setIsLoading(false);
    }

    if (fromCurrency === toCurrency) return setConverted(amount);
    fetchData();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChangeCapture={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        OUTPUT: {converted} {toCurrency}
      </p>
    </div>
  );
}
