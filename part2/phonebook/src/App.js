
import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

let personList = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
];

const App = () => {
  const [persons, setPersons] = useState(personList);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  
 
  const addPhoneBook = (e) => {
    e.preventDefault();
    let newperson = {
      name : newName,
      number : newPhone
    };
    let isExistingUser  = (person) => person.name === newperson.name;
    if(! persons.some(isExistingUser)){
      setPersons(persons.concat(newperson))
      personList.push(newperson);
      setNewName('');
      setNewPhone('');
    }else{
      alert(`${newName} is already added to phonebook`);
    }
  }

  const searchPhoneBook = (e) => {
    let search = e.target.value.trim();
    let filteredPerson = personList.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
    setPersons(filteredPerson);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={searchPhoneBook}/>

      <h2>add a new</h2>

      <PersonForm 
        addPhoneBook={addPhoneBook}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone} />
      
      <h2>Numbers</h2>
      {persons.map(person => <Person person={person} />)}
    </div>
  )
}

export default App