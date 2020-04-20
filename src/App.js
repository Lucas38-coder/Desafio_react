import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositorys, setRepository] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepository(response.data);
    });

  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('/repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: 'https://github.com/Lucas38coder/Desafio_node.js.git',
      techs: '[React, js, node]',
    });
    
    const repository = response.data;

    setRepository([...repositorys, repository]);
  }

  async function handleRemoveRepository(id) {
     await api.delete(`/repositories/${id}`);

     setRepository(repositorys.filter(
       repository => repository.id !== id
     ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={()=>handleRemoveRepository(repository.id)}>Remover</button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
