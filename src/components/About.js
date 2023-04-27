import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {

    return (
        <div>
            <div className='text-center'>
                <h2>About us</h2>
            </div>
            <div className='text-justify'>
                About
                i-Smartbook is a note making app which allows us to make and store our notes online. This app is built using React frontend and backend APIs are built using Node and Express and for storing and retrieving data MongoDB is used. App allows us to signup and login to our account and access only our notes. Login authentication are some features of app.
            </div>
        </div>

    )
}

export default About