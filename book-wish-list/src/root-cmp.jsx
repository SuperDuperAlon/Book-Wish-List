import React from 'react'
import { Routes, Route } from 'react-router'

import { BookIndex } from './pages/book-index'

// import routes from './routes'


export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                <Route path="/" element={<BookIndex />} />
                </Routes>
            </main>
        </div>
    )
}


