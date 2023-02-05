import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { GrNext , GrPrevious} from 'react-icons/gr';

export function BookPreview({books}){
    const stars = [<AiFillStar/>,<AiFillStar/>,<AiFillStar/>,<AiFillStar/>,<AiFillStar/>]
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
            {currBookIdx !== 0 && <button onClick={setPrevBook}><GrPrevious/></button>}
        <ul className='book'>
             <li key={books[currBookIdx]._id}>
                    <h1>{books[currBookIdx].title}</h1>
                    <h2>{books[currBookIdx].author}</h2>
                    <button onClick={(ev) => onAddToWishlist(ev, books[currBookIdx])}>Add to Wishlist</button>
                    <p>{books[currBookIdx].description}</p>
                    <div>Rating: {stars.map((star,idx)=>  <AiFillStar className={idx+1 < books[currBookIdx].rating ? 'yellow': ''}/>)}</div>
                    <p>Price: ${books[currBookIdx].price}</p>
            </li>
        </ul>
            {currBookIdx !== books.length-1 && <button onClick={setNextBook}><GrNext/></button>}
        
    </section>
}