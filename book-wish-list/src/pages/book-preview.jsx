import { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';

export function BookPreview({books, onAddToWishlist}){

    const [currBookIdx, setCurrBookIdx] = useState(0)


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


    if (!books || !books.length) return <div>loading</div> 
    return <section className="book-preview">
        <ul>

             <li key={books[currBookIdx]._id}>
                    <h1>{books[currBookIdx].title}</h1>
                    <h2>{books[currBookIdx].author}</h2>
                    <button onClick={(ev) => onAddToWishlist(ev, books[currBookIdx])}>Add to Wishlist</button>
                    <p>{books[currBookIdx].description}</p>
                    <div>Rating: <AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></div>
                    <p>Price: ${books[currBookIdx].price}</p>
            </li>
            <button onClick={setNextBook}>next</button><button onClick={setPrevBook}>prev</button>
        </ul>
        
    </section>
}