import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Postadd from '../components/Postadd';
import { supabase } from '../config/Supabaseclient';

const Profile = ({author}) => {
    const [name, setName] = React.useState('');
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setName('');
        toast.success('Вы вышли из аккаунта');
        navigate('/');
      };

    return (
        <div>
            <Postadd author={author}/>
            <button onClick={handleSignOut} className='text-gray-600 text-4xl font-semibold'>Выйти</button>
      </div>
    )
}

export {Profile}