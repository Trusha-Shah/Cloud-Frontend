import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Motivational");
  const [message, setMessage] = useState(null);

  const subscribe = async () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const response = await axios.post(API_URL, {
        email: email,
        category: category
    });

    const data = response.data;
    if (data.status === 200) {
      setMessage('Successfully subscribed!');
    } else {
      setMessage('Error in subscription. Please try again.');
    }
  };

  return (
    <div className="app">
      <h1>Daily Quote Sender</h1>
      <div className="form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Motivational">Motivational</option>
          <option value="Inspirational">Inspirational</option>
        </select>
        <button onClick={subscribe}>Subscribe</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
