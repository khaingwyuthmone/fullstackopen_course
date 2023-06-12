import { useEffect, useState } from "react";
import axios from 'axios';
import Note from './components/Note';
import services from "./services/notes";


const App = () => {
  const [notes , setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("Use Effect");
    services.getAll().then(response => {
        console.log('promise fulfilled');
        setNotes(response.data)
      })
  },[]);

  console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5,
    }

    services.create(noteObject).then(response => {
            setNotes(notes.concat(response.data))
            setNewNote('')
          })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = (id) => {
    console.log('importance of ', id, 'needs to be toggled');
    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important : !note.important}
    
 
    services.update(id, changedNote).then(response => {
      console.log(response)
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    }).catch(error => {
      alert(`the note ${note.content} was already deleted from server`)
      setNotes(notes.filter(n => n.id !== id));
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
            
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App