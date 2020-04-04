import React, {useState} from 'react';  
import {Link, useHistory} from 'react-router-dom'; 
import {FiChevronsRight} from 'react-icons/fi'; 

import api from '../../services/api'; 
import './styles.css'; 

import logoImg from '../../assets/logo.PNG';
import heroesImg from '../../assets/Heroes.PNG';

function Logon(){
  const [id, setId] = useState('');
  const history = useHistory(); 

  async function handleLogin(e){
    e.preventDefault(); 

    try {
      const response = await api.post('sessions', {id}); 

      localStorage.setItem('ong_id',id); 
      localStorage.setItem('ong_name', response.data.name); 

       history.push('/profile');       
    } catch (error) {
      alert('Falha no Login, tente novamente!'); 
    }

  }

    return(
      <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                   <Link to="/register" className="Logon-back-link">
                     <FiChevronsRight/> 
                    Não tenho cadastro
                   </Link>
                </form>
            </section> 
    
        <img src={heroesImg} alt="Heroes"/>
       

      </div>
        
    ); 
}

export default Logon; 