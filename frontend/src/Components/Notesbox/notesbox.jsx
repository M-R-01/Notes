import React, { useEffect, useState } from 'react';
import './notesbox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Notesbox = () => {
    const [show, setShow] = useState(false);
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5555/notes')
            .then((res) => {
                setNotes(res.data.data);
                console.log('req succesful', res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleGetNote = () => {
        axios
            .get('http://localhost:5555/notes')
            .then((res) => {
                setNotes(res.data.data);
                console.log('req succesful', res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSaveNote = () => {
        const data = {
            content
        };
        axios
            .post('http://localhost:5555/notes', data)
            .then(() => {
                handleGetNote()
            })
            .catch((err) => {
                console.log("An error happened");
            })
    }

    const handleDeleteNote = (id) => {
        axios.delete(`http://localhost:5555/notes/delete/${id}`)
             .then(() => {
                handleGetNote()
             })
             .catch((err) => {
                console.log("An error happened");
             })
    }

    return (
        <div className="notesbox">
            <div className='header'>
                <h1>Notes</h1>
                <div className='newnote'>
                    <button className='new-button' onClick={() => setShow(!show)}>+</button>
                </div>
            </div>

            {
                show &&
                <form className='newbox'>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Enter your note and press Enter to save'></textarea>
                    <button className='save' onClick={handleSaveNote}>
                        <FontAwesomeIcon icon={faCheck}  color='#aa008a'/>
                    </button>
                </form>
            }

            {notes.map((note, index) => (
                <div key={note._id} className="note">
                    <span className='content'>
                        <div className='time'>{note.createdAt}</div>
                        {note.content}
                    </span>

                    <div><button className='delete' onClick={() => handleDeleteNote(note._id)}>
                        <FontAwesomeIcon icon={faTrash} color='#aa008a' />
                    </button></div>
                </div>
            ))}
        </div>
    )
}

export default Notesbox;