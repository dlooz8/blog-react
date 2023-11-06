import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Postadd from '../components/Postadd';
import { supabase } from '../config/Supabaseclient';

const Profile = ({author}) => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success('Вы вышли из аккаунта');
        navigate('/');
      };

    return (
        <div className='font-montserrat'>
            <div className="flex justify-between shadow-md bg-gray-100 p-4 mx-4 md:mx-20 lg:mx-52 xl:mx-[304px] rounded-lg">
              <h1 className='text-gray-600 text-xl'>{author} создайте собственный пост!</h1>
              <button onClick={handleSignOut} className='block w-24 rounded-lg bg-red-500 hover:bg-red-600 duration-200 px-5 py-1 text-sm font-medium text-white'>Выйти</button>
            </div>
            <Postadd author={author}/>
      </div>
    )
}

export {Profile}