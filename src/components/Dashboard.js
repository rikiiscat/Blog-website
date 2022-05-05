import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';

export default function Dashboard() {
    const navigate = useNavigate()

    return (
        <>
            <CreatePost />
            <div className="w-200 text-center mt-2">
                <Button variant="link" onClick={() => navigate("/login")}>Log OUT</Button>
            </div>
            <div className="w-200 text-center mt-2">
                <Button variant="link" onClick={() => navigate("/blog")}>See All the Blogs</Button>
            </div>
        </>
    )
}