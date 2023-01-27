import axios from 'axios';
import React, { useRef, useState } from 'react';
import './App.css'

const App = () => {
  const idRef = useRef();
  const nameRef = useRef();
  const [temp, setTemp] = useState();

  const insert = () => {
    console.log(idRef.current.value, nameRef.current.value);
    const id = idRef.current.value;
    const name = nameRef.current.value;
    idRef.current.value = '';
    nameRef.current.value = '';

    axios.post('/product1/member/create', {id : id, name : name})
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const select = () => {
    console.log('자몽');
    axios.get('/product2/member/all', {})
        .then((res) => {
            console.log(res.data);
            let result = [];
            for (let i = 0; i < res.data.length; i++) {
                const data = res.data[i];
                result.push(
                    <tr key={i+1}>
                        <td>{data.id}</td>		
                        <td>{data.name}</td>		
                    </tr>
                );
            }
            setTemp(result);
        })
        .catch((error) => {
            console.log(error);
        });
  }

  return (
    <div>
      <h1>App</h1>
      <input ref={idRef} type='text' placeholder='id'/>
      <input ref={nameRef} type='text' placeholder='name'/>
      <button onClick={insert}>insert</button><br/><br/>

      <button onClick={select}>select</button><br/><br/>
      <table border='1'>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
          </tr>
        </thead>
        <tbody>
          {temp}
        </tbody>
      </table>

    </div>
  );
};

export default App;