import { useState, useEffect } from 'react';

export function Counter({ title, initValue }) {
  const [count, setCount] = useState(initValue);

  useEffect(() => {
    fetch('http://localhost:9999/counter')
      .then(res => res.json())
      .then(result => setCount(result.value));
  }, []);

  const up = () => {
    fetch('http://localhost:9999/counter', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: count + 1 })
    }).then(res => res.json())
      .then(result => {
        setCount(result.value);
      });
  };

  const down = () => {
    fetch('http://localhost:9999/counter', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: count - 1 })
    }).then(res => res.json())
      .then(result => {
        setCount(result.value);
      });
  };

  let pig = '';
  for (let i = 0; i < count; i++) {
    pig += '🐷';
  }
  if (count < 1) {
    pig = '❌';
  }
  if (count > 10){
    pig = '🐷돼지가 너무 많아요!!🐷';
  }
  return <>
    <h1> {title} </h1>
    <h2>
      <button onClick={up}> ➕ </button> <button onClick={down}> ➖ </button>
    </h2>
    <h3>
      👉 {count}
    </h3>
    👉 {pig}
  </>;
}
