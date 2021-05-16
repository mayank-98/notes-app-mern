import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';

function EditNote({ match }) {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });

    const history = useHistory();

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore');
            if (match.params.id) {
                const res = await axios.get(`/api/notes/${match.params.id}`, {
                    headers: { Authorization: token }
                })
                console.log(res)
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: res.data.date,
                    id: res.data._id
                })
            }
        }
        getNote();
    }, [match.params.id])

    const handleChange = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    }

    const handleEdit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content, date, id } = note;
                const newNote = { title, content, date };

                await axios.put(`/api/notes/${id}`, newNote, {
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
            <h2>Edit Note</h2>
            <form onSubmit={handleEdit} autoComplete="off" >
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} onChange={handleChange} id="title" name="title" required />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={note.content} onChange={handleChange} id="content" name="content" required rows="10" />
                </div>
                <label htmlFor="date">Date: {Moment(note.date).format('DD-MM-YYYY')} </label>
                <div className="row">
                    <input type="date" value={note.date} onChange={handleChange} id="date" name="date" />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditNote
