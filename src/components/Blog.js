import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';  // return all the docs from the firestore database
import { db, auth } from '../firebase';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MyCard from './MyCard';
import Comment from './Comment';

export default function Blog() {
    const [postslist, setPostslist] = useState([])
    const collections = collection(db,"posts")
    const navigate = useNavigate()

    useEffect(() => {
        const getPosts = async () => {
            // data contains the information about the list
            const data = await getDocs(collections)
            console.log(data)
            setPostslist(data.docs.map((doc) => ({
                ...doc.data(), id:doc.id
            })))
        }

        getPosts()
    },[])
    return (
        <>
            <div className="BlogTitle">
                <h2>Don't hesitate to share your thoughts about data privacy on this blog page!</h2>
            </div>
            <br/>
            <div className='blogPage'>
                {postslist.map((post) => {
                    return (
                        <div className="ui container comments">
                            <MyCard>
                                <Comment author={post.author.id} title={post.title} content={post.content} />
                            </MyCard>
                        </div>
                    )
                })}
            </div>
            <div className="back_login">
                <Button variant="link" onClick={() => navigate("/login")}>Log OUT</Button>
            </div>
            <div className="w-200 text-center mt-1">
                <Button variant="link" onClick={() => navigate("/")}>Create Blog</Button>
            </div>
            <br />
            <br />
        </>
    )
}