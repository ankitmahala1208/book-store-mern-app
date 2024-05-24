import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('')
    const [publishYear, setpublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setpublishYear(response.data.publishYear)
                setTitle(response.data.title)
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    }, []);

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book edited Successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please check console');
                enqueueSnackbar('Error', { variant: 'error' })
                console.log(error);
            });
    };
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className="text-3xl my-4"> Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-3 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-3 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="text"
                        value={publishYear}
                        onChange={(e) => setpublishYear(e.target.value)}
                        className='border-3 border-gray-500 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}> Save Book</button>
            </div>
        </div>
    )
}

export default EditBook;