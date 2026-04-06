import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [serverSum, setServerSum] = useState(0);

  useEffect(() => {
    // Strict Equality Guard: Only fire if data is strictly empty
    if (data.length === 0) {
      console.log("Aristotle's Scales: State is strictly empty. Fetching from void...");
      
      const sampleArray = [10, 20, 30, 40];
      
      axios.post('https://logos-protocol-server.onrender.com/api/paradox-sum', { numbers: sampleArray })
        .then(response => {
          setServerSum(response.data.sum);
          // CORRECTED: Using the setter function instead of direct assignment
          setData([]); 
        })
        .catch(err => console.error("The Paradox collapsed:", err));
    }
  // Remove [data] from here to stop the infinite loop of doom!
  }, []); 

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#121212', color: '#00ff00', minHeight: '100vh' }}>
      <h1>The Logos Protocol — Master Terminal</h1>
      <hr style={{ borderColor: '#00ff00' }} />
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #00ff00' }}>
        <h3>[System Status]</h3>
        <p>Array Length Guard: <strong>{data.length}</strong> (Must be strictly 0)</p>
        <p>Computed Server Sum: <strong>{serverSum}</strong></p>
      </div>
    </div>
  );
}

export default App;