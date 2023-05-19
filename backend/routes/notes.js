const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTES -1 get all the notes using : GET "api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

// ROUTES -2 Add a new note using : POST "api/notes/addnote".login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 character").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // if there are error, return BAD request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

// ROUTES -3 updating a existing note using : put "api/notes/updatenote".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the note to be update and update it 
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not fonud") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

// ROUTES -4 Deleting a existing note using : DELETE "api/notes/deletenote".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be delewted and deleted it 
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not fonud") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        // allow deletion only if user ownn this note

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

module.exports = router