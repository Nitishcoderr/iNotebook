import NoteContext from './noteContext'
import React, { useState } from 'react'


const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "646620589bfecaaa58947e0a",
          "user": "6465e6e7048e16af1f2d5ff6",
          "title": "My title",
          "description": "Please wake up",
          "tag": "personal",
          "date": "2023-05-18T12:55:52.821Z",
          "__v": 0
        },
        {
          "_id": "646620da7d8fa9144e9b8fe8",
          "user": "6465e6e7048e16af1f2d5ff6",
          "title": "My title2",
          "description": "Please sleep up",
          "tag": "personal2",
          "date": "2023-05-18T12:58:02.489Z",
          "__v": 0
        },
        {
          "_id": "646620da7d8fa9144e9b8fe8",
          "user": "6465e6e7048e16af1f2d5ff6",
          "title": "My title2",
          "description": "Please sleep up",
          "tag": "personal2",
          "date": "2023-05-18T12:58:02.489Z",
          "__v": 0
        },
        {
          "_id": "646620da7d8fa9144e9b8fe8",
          "user": "6465e6e7048e16af1f2d5ff6",
          "title": "My title2",
          "description": "Please sleep up",
          "tag": "personal2",
          "date": "2023-05-18T12:58:02.489Z",
          "__v": 0
        },
        {
          "_id": "646620da7d8fa9144e9b8fe8",
          "user": "6465e6e7048e16af1f2d5ff6",
          "title": "My title2",
          "description": "Please sleep up",
          "tag": "personal2",
          "date": "2023-05-18T12:58:02.489Z",
          "__v": 0
        },
      ]

      let [notes, setnNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes,setnNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState