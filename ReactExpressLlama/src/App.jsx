import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [response, setReponse] = useState();
  const [inputData, setInputData] = useState('');

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: inputData })
      }).then((response) => response.json());
      
      setReponse(response.message);
    } catch (error) {
      console.error("Error sending data:", error);
      setReponse("Error sending data");
    }
  }

  return (
    <>
      <div>
        <p>Respuesta: {response}</p>
        <form action="" onSubmit={sendData}>
          <input type="text" value={inputData} id='inputValue' onChange={(e) => setInputData(e.target.value)}/>
          <button>Send</button>
        </form>
      </div>
    </>
  )
}
export default App