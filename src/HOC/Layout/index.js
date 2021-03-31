import React from 'react'

// components
import Header from './Header'
import Footer from './Footer'

export default function Index(props) {
    return (
        <div>
            <Header />
                <div className="container mt-3">
                    {props.children}
                </div>

            <Footer/>
        </div>
    )
}
