import React from 'react';
import { faker } from '@faker-js/faker';

export default function Comment(props) {
    console.log(props)
    return (
        <div className='comment'>
            <a href="/" className='avatar'>
                <img alt="avatar" src={faker.image.avatar()}/>
            </a>
            <div className='content'>
                <a href="/" className='author'>
                    {props.author}
                </a>
                <div className='metadata'>
                    <span className='data'>
                        {props.title}
                    </span>
                </div>
                <div className='text'>
                    {props.content}
                </div>
            </div>
        </div>
    )
}