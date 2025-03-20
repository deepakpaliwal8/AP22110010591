import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [windowState, setWindowState] = useState([]); 
    const [average, setAverage] = useState(0);          
    const windowSize = 10;                           


    const apiMap = {
        'p': 'http://20.244.56.144/test/primes',
        'f': 'http://20.244.56.144/test/fibo',
        'e': 'http://20.244.56.144/test/even',
        'r': 'http://20.244.56.144/test/rand'
    };

    const fetchNumber = async (type) => {
        try {
            const response = await axios.get(apiMap[type], {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDgxNzMwLCJpYXQiOjE3NDI0ODE0MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImU3MjcxZjc1LTkwY2QtNDc5Zi1hMGI0LTY2ZjY4YzljOGE1MyIsInN1YiI6ImRlZXBha19wYWxpd2FsQHNybWFwLmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6IkFmZm9yZCBNZWRpY2FsIiwiY2xpZW50SUQiOiJlNzI3MWY3NS05MGNkLTQ3OWYtYTBiNC02NmY2OGM5YzhhNTMiLCJjbGllbnRTZWNyZXQiOiJTU2lVeW5jWWZXdVRSUER2Iiwib3duZXJOYW1lIjoiRGVlcGFrIFBhbGl3YWwiLCJvd25lckVtYWlsIjoiZGVlcGFrX3BhbGl3YWxAc3JtYXAuZWR1LmluIiwicm9sbE5vIjoiQVAyMjExMDAxMDU5MSJ9.XqGof0OLRhWPW3GHAoHMRM38FUrcobNs-DXTSp-hoEs' 
                },
                timeout: 500
            });
            const numberData = response.data.numbers;
            updateWindow(numberData);
        } catch (error) {
            console.error("Error fetching numbers:", error);
        }
    };

   
    const updateWindow = (numbers) => {
        let newWindowState = [...windowState, ...numbers];
        if (newWindowState.length > windowSize) {
            newWindowState = newWindowState.slice(newWindowState.length - windowSize);
        }
        setWindowState(newWindowState);
        calculateAverage(newWindowState);
    };

    const calculateAverage = (numbers) => {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const avg = (sum / numbers.length).toFixed(2);
        setAverage(avg);
    };

    return (
        <div>
            <div>
                <button onClick={() => fetchNumber('p')}>Fetch Prime Numbers</button>
                <button onClick={() => fetchNumber('f')}>Fetch Fibonacci Numbers</button>
                <button onClick={() => fetchNumber('e')}>Fetch Even Numbers</button>
                <button onClick={() => fetchNumber('r')}>Fetch Random Numbers</button>
            </div>
            <h2>Window State: {JSON.stringify(windowState)}</h2>
            <h2>Average: {average}</h2>
        </div>
    );
};

export default App;