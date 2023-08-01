import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Motivational");
  const [message, setMessage] = useState(null);

  const subscribe = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: email,
        category: category
      }
    });

    const data = await response.json();

    if (data.executionArn) {
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
