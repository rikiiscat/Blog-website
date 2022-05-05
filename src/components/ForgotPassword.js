import React, { useRef, useState } from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPwd } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        // check if the confirmation pwd is equal to the original typed pwd
        try {
            setError("")
            setMessage("")
            // we don't want out user to click multiple times on the submit button
            // setloading can avoid the case of creating multiple accounts
            setLoading(true)
            await resetPwd(emailRef.current.value)
            setMessage('check your email to reset your password')
        } catch (err) {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="reset_pwd">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <br />
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="Go_back_login">
                        <Link to="/login">Go back to Login page</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="Link_to_signup">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>

        </>
    )
}