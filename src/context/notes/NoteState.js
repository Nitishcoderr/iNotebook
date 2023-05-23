import NoteContext from './noteContext'
import React, { useState } from 'react'


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  let [notes, setNotes] = useState(notesInitial)

  // Get all notes *************************************************************
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWU2ZTcwNDhlMTZhZjFmMmQ1ZmY2In0sImlhdCI6MTY4NDM5OTk4MX0.bm3ALCQK2JBmwsrwN3XBJ_zGDAee5_IpSAZPM3SKP0U",

      }
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  // Add a note ***********************************************************************
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWU2ZTcwNDhlMTZhZjFmMmQ1ZmY2In0sImlhdCI6MTY4NDM5OTk4MX0.bm3ALCQK2JBmwsrwN3XBJ_zGDAee5_IpSAZPM3SKP0U",

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json);


    console.log("Adding a note");
    const note = {
      "_id": "646620da7d8fa9144e9b8fe826",
      "user": "6465e6e7048e16af1f2d5ff6",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-18T12:58:02.489Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // Delete a note *************************************************************
  const deleteNote = async (id) => {
    //  API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWU2ZTcwNDhlMTZhZjFmMmQ1ZmY2In0sImlhdCI6MTY4NDM5OTk4MX0.bm3ALCQK2JBmwsrwN3XBJ_zGDAee5_IpSAZPM3SKP0U",

      },
    });
    const json = await response.json()
    console.log(json);

    console.log(`Deleting mote ${id}`);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NWU2ZTcwNDhlMTZhZjFmMmQ1ZmY2In0sImlhdCI6MTY4NDM5OTk4MX0.bm3ALCQK2JBmwsrwN3XBJ_zGDAee5_IpSAZPM3SKP0U",

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit a CLIENT
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}


export default NoteState