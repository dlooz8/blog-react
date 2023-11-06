import { supabase } from '../config/Supabaseclient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Postadd({author}) {
  const navigate = useNavigate();
  const [ imageUrl , setImageUrl ] = useState('');
  const [ theme , setTheme ] = useState('');
  const [ text , setText ] = useState('');

  async function uploadImage(e) {
    const file = e.target.files[0];
    const fileKey = Date.now() + file.name;
    const { error } = await supabase
      .storage
      .from('images')
      .upload(fileKey, file);
    
    const { data } = supabase
      .storage
      .from('images')
      .getPublicUrl(fileKey);

    setImageUrl(data.publicUrl);
    if (error) {
      toast.error(error);
    }
  }

  async function addNewPost(theme, text, author, imageUrl) {
    const { error } = await supabase
      .from('posts')
      .insert({ 
        theme: theme,
        text: text,
        author: author,
        image: imageUrl,
        date: new Date().toISOString().split('T')[0],
      });

    if (error) {
      navigate('/signin');
      toast.error('Заполните все поля!');
    } else {
      toast.success('Новый пост добавлен!');
      navigate('/');
    }    
  }

  return (
    <section className="font-montserrat">
      <div className="mx-auto max-w-screen-2xl px-4 pb-16 pt-4">
        <div className="grid grid-cols-1 xl:mx-72 lg:mx-48 md:mx-16">
          <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
            <form action="" className="space-y-4">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-red-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-red-100 px-2 py-0.5 rounded-md font-medium text-red-600 hover:text-gray-600 hover:underline duration-75 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span className="">Upload an image</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => uploadImage(e)}/>
                    </label>
                    <p className="pl-1 text-red-500">or drag and drop</p>
                  </div>
                  <p className="text-xs text-red-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <div>
                <img className="rounded-lg" src={imageUrl} aria-hidden="true" role="none"/>
              </div>
              <div className='flex flex-col gap-8'>
                <textarea
                  name="theme"
                  id="theme"
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder='Напишите тему поста...'
                  className="w-full rounded-lg border-red-200 p-3 text-md outline-red-300"
                  rows="3">
                </textarea>
                <textarea
                  name="text"
                  id="text"
                  onChange={(e) => setText(e.target.value)}
                  placeholder='Введите текст...'
                  className="w-full rounded-lg border-red-200 p-3 text-md outline-red-300"
                  rows="8"
                ></textarea>
              </div>
            </form>
            <button
              onClick={() => addNewPost(theme, text, author, imageUrl)}
              className="inline-block mx-auto mt-8 w-full rounded-lg bg-red-500 hover:bg-red-600 duration-200 px-6 py-3 font-medium text-white sm:w-auto">
              Создать пост
            </button>
            <Toaster />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Postadd