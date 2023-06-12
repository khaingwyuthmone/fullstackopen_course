
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import axios from 'axios'
import services from './service/personService';

let personList = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
];

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [alertMsg, setAlert]  = useState('');
  const [error, setError]     = useState('');
  
  useEffect(() => {
    services.getAll().then(data => setPersons(data))
  },[]);
 
  const addPhoneBook = (e) => {
    e.preventDefault();
    let newperson = {
      name : newName,
      number : newPhone
    };
    let isExistingUser  = (person) => person.name === newperson.name;
    if(! persons.some(isExistingUser)){
      services.create(newperson).then(data => {
          setPersons(persons.concat(data));
          personList.push(newperson);
          setNewName('');
          setNewPhone('');
      })
      setAlert(`Added ${newperson.name}`);
      setTimeout(() => {
        setAlert('')
      }, 5000);
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        let existingUser = persons.find(person => person.name === newperson.name);
        let id           = existingUser['id'];
        services.update(id, newperson).then(data => {
          setPersons(persons.map(person => {
            return person.id !== id ? person : data
          }));
          setNewName('');
          setNewPhone('');
          setAlert(`Updated ${newperson.name}`);
          setTimeout(() => {
            setAlert('')
          }, 3000);
        }).catch(error => {
          setError(`Information of ${newperson.name} has already been removed from server`);
        });
        
      }
    }
  }

  const searchPhoneBook = (e) => {
    let search = e.target.value.trim();
    let filteredPerson = personList.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
    setPersons(filteredPerson);
  }

  const deletePhonebook = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      services.deletePhonebook(id).then(responseStatus => {
        if(responseStatus === "OK"){
            setPersons(persons.filter(person => person.id !== id))
        }
      })
    }
  }

  


  return (
    <div>
      <h2>Phonebook</h2>

      {alertMsg && (
        <div className='success-msg'>
          <h5 className='alert-msg'>{alertMsg}</h5>
        </div>
      )}

      {error && (
        <div className='error-msg'>
          <h5 className='alert-msg'>{error}</h5>
        </div>
      )}

      <Filter search={searchPhoneBook}/>

      <h2>add a new</h2>

      <PersonForm 
        addPhoneBook={addPhoneBook}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone} />
      
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person} deletePhonebook={ ()=> {deletePhonebook(person.id, person.name)}}/>)}
    </div>
  )
}

export default App