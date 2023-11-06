import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Aboutus } from '../pages/Aboutus';
import { Contacts } from '../pages/Contacts';
import { Postdetail } from '../pages/Postdetail';
import { Notfound } from '../pages/Notfound';
import { Footer } from './Footer';
import { supabase } from '../config/Supabaseclient';
import { Toaster } from 'react-hot-toast';
import { Signin } from '../pages/Signin';
import { Profile } from '../pages/Profile';
import { Registration } from '../pages/Registration';

const Router = () => {
    
    const [name, setName] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    supabase.auth.onAuthStateChange((event, session) => {
        if (session === null) {
          setIsAuth(false);
        } else if (session !== null) {
          setName(session.user.user_metadata.name);
          setIsAuth(true);
        }
    });

    return (
        <div>
            <nav className="mx-auto max-w-[1640px]">
                <div className="sm:flex sm:justify-between mx-16 my-8 lg:mx-36 lg:my-16 flex-wrap">
                    <div className="font-mono font-bold text-3xl mx-auto sm:mx-0 text-center sm:text-start">
                    <a href='/' className="text-4xl">Wired.</a>
                    </div>
                    <Toaster />
                    <div className="grid grid-cols-2 py-4  sm:p-0 text-center sm:flex sm:flex-row sm:justify-between font-montserrat text-gray-500 gap-12 md:gap-16">
                        <Link className="hover:text-red-600 duration-100" to="/">ГЛАВНАЯ</Link>
                        <Link className="hover:text-red-600 duration-100" to="/aboutus">О НАС</Link>
                        <Link className="hover:text-red-600 duration-100" to="/contacts">КОНТАКТЫ</Link>
                        {isAuth ? 
                            <Link className="hover:text-red-600 duration-100" to="/profile">{name.toUpperCase()}</Link> 
                            : 
                            <Link className="hover:text-red-600 duration-100" to="/signin">ВОЙТИ</Link>
                        }
                    </div>
                </div>
            </nav>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/profile" element={<Profile author={name} />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/post/:postId" element={<Postdetail author={name} />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export { Router };