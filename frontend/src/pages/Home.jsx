import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className='p-4'>
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>Table</button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>Card</button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)}
        </div>
    )
}

export default Home

//explanation
// The Home component is a functional component that:

// Fetches a list of books from a server when the component mounts.
// Manages loading state to show when the data is being fetched.
// Stores the fetched books in the component's state.

// State Management
// Two pieces of state are managed using React's useState hook:


// const [books, setBooks] = useState([]);
// const [loading, setLoading] = useState(false);
// books: An array to hold the fetched books data.
// loading: A boolean to indicate whether the data is currently being fetched.

// Effect Hook
// The useEffect hook is used to perform side effects in functional components. Here, it is used to fetch data from the server when the component mounts:
// useEffect(() => {
//     setLoading(true);
//     axios
//         .get('http://localhost:5555/books')
//         .then((res) => {
//             setBooks(res.data.data);
//             setLoading(false);
//         })
//         .catch((error) => {
//             console.log(error);
//             setLoading(false);
//         });
// }, []);
// useEffect(() => { ... }, []);: This effect runs only once when the component mounts because the dependency array is empty.
// setLoading(true);: Sets the loading state to true to indicate data fetching has started.
// axios.get('http://localhost:5555/books'): Sends a GET request to fetch books from the specified URL.
// .then((res) => { ... }): If the request is successful, it updates the books state with the fetched data and sets loading to false.
// .catch((error) => { ... }): If the request fails, it logs the error and sets loading to false.