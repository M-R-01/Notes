import express from 'express';
import {Note} from '../notesModels/notesModel.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({});
        return res.json({
            count: notes.length,
            data: notes,
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.body.content) {
            return res.send({ message: 'Type a note' })
        }
        const newNote = {
            content: req.body.content
        }

        const note = await Note.create(newNote);

        return res.send(note);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.delete('/delete/:id', async (req,res) => {
    try {
        const {id} = req.params;

        const result = await Note.findByIdAndDelete(id);

        if (result) {
            return res.json('Note Deleted');
        }
    } catch(err) {
        console.log(err);
    }
})

export default router;