import { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';

export function BookPreview({books}){

    const [currBookIdx, setCurrBookIdx] = useState(0)

    console.log(currBookIdx)

    function setNextBook(){
        const isLastBook = currBookIdx === books.length-1
        const newIndex = isLastBook ?   currBookIdx :  currBookIdx + 1
        setCurrBookIdx(newIndex)
    }
    function setPrevBook(){
        const isFirstBook = currBookIdx === 0
        const newIndex = isFirstBook ?   currBookIdx :  currBookIdx - 1
        setCurrBookIdx(newIndex)
    }

    if (!books || books.length<1) return <div>loading</div> 
    return <section className="book-preview">
        <ul>
            <button onClick={setNextBook}>next</button>
             <li key={books[currBookIdx]._id}>
                    <h1>{books[currBookIdx].title}</h1>
                    <h2>{books[currBookIdx].author}</h2>
                    <p>{books[currBookIdx].description}</p>
                    <div>Rating: <AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>
                    <p>Price: ${books[currBookIdx].price}</p>
            </li>
            <button onClick={setPrevBook}>prev</button>
        </ul>
        
    </section>
}