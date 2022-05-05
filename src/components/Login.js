import React, { useRef, useState } from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        // check if the confirmation pwd is equal to the original typed pwd
        try {
            setError("")
            // we don't want out user to click multiple times on the submit button
            // setloading can avoid the case of creating multiple accounts
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch (err) {
            setError('Fail to Log in')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="Login">Log in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <br />
                        <Button disabled={loading} className="w-100" type="submit">Log in</Button>
                    </Form>
                    <div className="forgot_pwd">
                        <Link to="/forgot_password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="Signup">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>

        </>
    )
}