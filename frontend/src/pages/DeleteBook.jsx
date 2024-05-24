import React, { useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted Successfully', { variant: 'success' });
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error occured, Please Check console');
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">DeleteBook</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center boder-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook