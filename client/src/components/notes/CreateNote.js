import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: ''
    });

    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date } = note;
                const newNote = { title, content, date };

                await axios.post('/api/notes', newNote, {
                    headers: { Authorization: token }
                });
                return history.push("/");
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="create-note">
            <h2>Create Note</h2>
            <form onSubmit={handleSubmit} autoComplete="off" >
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} onChange={handleChange} id="title" name="title" required />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={note.content} onChange={handleChange} id="content" name="content" required rows="10" />
                </div>
                <label htmlFor="date">Date: {note.date}</label>
                <div className="row">
                    <input type="date" onChange={handleChange} id="date" name="date" />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default CreateNote
