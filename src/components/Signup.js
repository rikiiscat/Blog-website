import React, { useEffect, useRef, useState } from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState()
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [randompwd, setRandompwd] = useState("")
    const navigate = useNavigate()

    // This class will check the username, password, and email of a string
    const SUCCEED = 9
    const FAILED = 10
    const TOOSHORT = 11
    const TOOLONG = 12

    const MINPASS = 8
    const MAXPASS = 30

    const NUMBER = 0;
    const LOWERCASE = 1;
    const UPPERCASE = 2;
    const SPECIALCASE = 3;

    // This function will check if password contains a number, 
    // a special character, and upper plus lower case letter
    // and size is between 8 to 30
    function validatePassword(password) {

        if (password.length < MINPASS) {
            return TOOSHORT
        } else if (password.length > MAXPASS) {
            return TOOLONG
        }

        var pw = /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/
        console.log(password)
        if (pw.test(password)) {
            console.log(password)
            return SUCCEED
        } else {
            console.log(password)
            return FAILED
        }
    }

    // This function randomly generates a secure password that
    // contains at least a number, a special character, and upper 
    // plus lower case letter and size is between 8 to 30
    function strongPassword(){
        // determine the number of numerical letters, special characters, 
        // and upper plus lower case letters in the password
        var num_num = Math.floor(Math.random() * 6) + (MINPASS / 4);
        var upper_num = Math.floor(Math.random() * 7) + (MINPASS / 4);
        var lower_num = Math.floor(Math.random() * 7) + (MINPASS / 4);
        var special_num = Math.floor(Math.random() * 6) + (MINPASS / 4);
        var password_length = num_num + upper_num + lower_num + special_num;
        var randompassword = '';
        var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lower = "abcdefghijklmnopqrstuvwxyz";
        var num = "1234567890";
        var special = "!@#$%^&*";
        var type;
        var c;
    
        // determine the type of character at each digit in the password
        while (num_num > 0 || upper_num > 0 || lower_num > 0 || special_num > 0) {
        type = Math.floor(Math.random() * 4);
            if (type == NUMBER && num_num > 0) {
                num_num--;
                c = Math.floor(Math.random() * num.length);
                randompassword += num.substring(c,c+1);
            }
            else if (type == LOWERCASE && lower_num > 0) {
                lower_num--;
                c = Math.floor(Math.random() * lower.length);
                randompassword += lower.substring(c,c+1);
            }
            else if (type == UPPERCASE && upper_num > 0) {
                upper_num--;
                c = Math.floor(Math.random() * upper.length);
                randompassword += upper.substring(c,c+1);
            }
            else if (type == SPECIALCASE && special_num > 0) {
                special_num--;
                c = Math.floor(Math.random() * special.length);
                randompassword += special.substring(c,c+1);
            }
        }
        return randompassword;
        //setSuggestpwd(randompassword)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        // check if the confirmation pwd is equal to the original typed pwd
        if (passwordRef.current.value != passwordConfirmRef.current.value) {
            return setError("Password do not match")
        }
        // check if the password is validate using validatepassword
        const pwd_ret_val = validatePassword(passwordRef.current.value)
        if (pwd_ret_val != SUCCEED) {
            if (pwd_ret_val == TOOSHORT) {
                return setError("Password too short: less than 8 chars")
            } else if (pwd_ret_val == TOOLONG) {
                return setError("Password too long: more than 30 chars")
            } else if (pwd_ret_val == FAILED) {
                return setError("Password failed: need to be more complex")
            }
        }
        try {
            setError("")
            setMessage("")
            // we don't want out user to click multiple times on the submit button
            // setloading can avoid the case of creating multiple accounts
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            setMessage('Account successfully created! Click to go back to login page')
        } catch (err) {
            setError('Fail to create an account: account might already exist')
        }
        setLoading(false)
    }

    useEffect(() => {
        const temp = strongPassword()
        setRandompwd(temp)
    },[])

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group id="password">
                            <Form.Label>Password: (you can use the suggested password below)</Form.Label>
                            <br />
                            <Form.Label>{randompwd}</Form.Label>
                            <Form.Control className="visible" type="password" defaultValue={randompwd} ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <br />
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in</Link>
            </div>

        </>
    )
}