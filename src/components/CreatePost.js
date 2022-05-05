import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const [content, setContent] = useState("")
    const collections = collection(db, "posts")  //name of the collection
    const {currentUser} = useAuth()
    const navigate = useNavigate()
    async function createPost(e) {
        e.preventDefault()
        try {
            setError("")
            await addDoc(collections, {title, content, author: { id: currentUser.uid }})
            navigate("/blog")
        } catch (err) {
            setError('Failed to create a post')
        }
    }

    return (
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Create your post</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className='input'>
                    <label>Title:</label>
                    <input placeholder='Title...' onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>
                <div className='input'>
                    <label>Content:</label>
                    <textarea placeholder='Post...' onChange={(e) => {
                        setContent(e.target.value)
                    }} />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}