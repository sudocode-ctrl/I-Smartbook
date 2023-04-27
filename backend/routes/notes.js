const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');
// ROUTE1: Get all the notes using : GET "/api/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }

})
// ROUTE2: Add new note using : GET "/api/addnote"
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 5 }),

], async (req, res) => {

    try {


        const { title, description, tag } = req.body;
        // If there are errors then return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }
})

// ROUTE 3: Update an existing node using PUT "/api/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newnote object
    try {


        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");

        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }
})

// ROUTE 4: Update an existing node using DELETE "/api/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {

        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        // Allow deletion only if this note belongs to user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");

        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "This note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }
})


module.exports = router