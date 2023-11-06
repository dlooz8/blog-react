import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/Supabaseclient';
import toast from 'react-hot-toast';

const Registration = () => {
  const [name, setName] = useState('');
  const [regemail, setRegEmail] = useState('');
  const [regpassword, setRegPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from('usernames')
      .insert([
        { 
          email: regemail, 
          name: name 
        },
      ]);
    
      if (error !== null) {
        toast.error('Это имя или e-mail уже заняты! Выберите другие.');
      } else {
        const { error } = await supabase.auth.signUp({
          email: regemail,
          password: regpassword,
          options: {
            data: {
              name: name
            }
          }
        });
    
        if (error) {
          toast.error(error);
        } else {
          toast.success('Ваш аккаунт создан!');
          navigate('/');
        }
      }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 font-montserrat">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-red-500 sm:text-3xl ">
              Добро пожаловать!
          </h1>
          <form
          onSubmit={handleRegistration} 
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium opacity-60">Введите никнейм, e-mail и пароль для регистрации</p>
            <div>
                <div className="relative">
                    <input
                        type="text"
                        id='name'
                        value={name}
                        required="required"
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-red-300"
                        placeholder="Введите ваш никнейм"
                    />
                </div>
            </div>
            <div>
                <div className="relative">
                    <input
                        type="email"
                        id='regemail'
                        value={regemail}
                        required="required"
                        placeholder="Введите ваш e-mail"
                        onChange={(event) => setRegEmail(event.target.value)}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-red-300"
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                        </svg>
                    </span>
                </div>
            </div>
            <div>
                <div className="relative">
                    <input
                        type="password"
                        id='regpassword'
                        value={regpassword}
                        minLength={8}
                        required="required"
                        onChange={(event) => setRegPassword(event.target.value)}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-red-300"
                        placeholder="Введите ваш пароль"
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        </svg>
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className="block w-full rounded-lg bg-red-500 hover:bg-red-600 duration-200 px-5 py-3 text-sm font-medium text-white">
                Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col justify-center">
          <p className="text-center text-sm text-gray-500">У вас уже есть аккаунт?</p>
          <button onClick={() => navigate('/signin')} className="text-red-500 opacity-70 hover:opacity-100">Авторизоваться</button> 
      </div>
    </div>
  );
};

export {Registration};