import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment'
import axios from 'axios';

function Home() {

    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => {
        const res = await axios.get('api/notes', {
            headers: { Authorization: token }
        });
        setNotes(res.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getNotes(token);
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`api/notes/${id}`, {
                headers: { Authorization: token }
            });
            getNotes(token);
        } catch (error) {
            window.location.href = "/";
        }
    }

    if (notes.length === 0) return null;

    return (
        <div className="note-wrapper">
            {
                notes.map(note => {
                    return <div className="card" key={note._id}>
                        <h4 title={note.title}>{note.title}</h4>
                        <div className="text-wrapper">
                            <p>{note.content}</p>
                        </div>
                        <p className="date">{Moment(note.date).format('DD-MM-YYYY')}</p>
                        <div className="card-footer">
                            {note.name}
                            <Link to={`edit/${note._id}`}>Edit</Link>
                        </div>
                        <button className="close" onClick={() => handleDelete(note._id)} >X</button>
                    </div>
                })
            }

        </div>
    )
}

export default Home
