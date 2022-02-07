import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('');
      });
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter(n => n.id !== id))
      });
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
        {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App