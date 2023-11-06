import React, { useState, useEffect } from 'react';
import { supabase } from '../config/Supabaseclient';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(true);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
      window.scrollTo({
        top: 530,
        behavior: 'smooth'
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = () => {
    setSelectedFilters(prevSelectedFilters => !prevSelectedFilters);
  }

  const filteredPosts = posts.filter((post) =>
    post.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const perPage = 10;
      const offset = (currentPage - 1) * perPage;

      try {
        const { count } = await supabase
          .from("posts")
          .select("count", { count: "exact" });

        const { data } = await supabase
          .from("posts")
          .select()
          .order("id", { ascending: !selectedFilters })
          .range(offset, offset + perPage - 1);

        setPosts(data);
        setTotalPages(Math.ceil(count / perPage));
      } catch (error) {
        toast.error(error);
      }
    };

    fetchPosts();
  }, [currentPage, selectedFilters]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const Post = ({ date, theme, text, image, author }) => (
    <div className='rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg sm:p-6 font-montserrat'>
      <div className="flex flex-col gap-2 link link-underline link-underline-black">
        <div className="w-full aspect-video overflow-hidden">
          <img className="w-full h-full object-cover rounded-sm" src={image} alt="pic" />
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 text-xs font-semibold" id="date">{author}</p>
          <p className="text-gray-500 text-xs font-semibold" id="date">{date}</p>
        </div>
        <h3 className="text-red-600 text-2xl font-semibold line-clamp-1" id="theme">{theme}</h3>
        <p className="text-gray-600 text-xs font-semibold h-12 line-clamp-3" id="text">{text}</p>
        <h4 className='text-red-600'>
          <p className="">ЧИТАТЬ ДАЛЕЕ</p>
        </h4>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between mx-4 sm:mx-16 lg:mx-36 font-montserrat">
        <div className="relative">
          <label htmlFor="Search" className="sr-only"> Search </label>
          <input
            type="text"
            id="Search"
            value={searchTerm}
            onChange={handleSearch} 
            placeholder="Поиск по заголовку"
            className="w-64 sm:w-72 rounded-md border-gray-300 outline-red-300 mx-auto px-4 max-w-xl py-2.5 pe-10 shadow-md sm:text-md hover:shadow-lg duration-200"
          />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="disabled" className="text-gray-300">
              <span className="sr-only">Поиск</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="">
          <button onClick={handleFilterChange} className="text-gray-500 active:bg-red-300 p-2 rounded-md shadow-md hover:shadow-lg duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-arrows-sort" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M3 9l4 -4l4 4m-4 -4v14" /> <path d="M21 15l-4 4l-4 -4m4 4v-14" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mx-4 sm:mx-16 my-8 lg:mx-36 lg:my-12 lg:grid-cols-2 lg:gap-8">
        {filteredPosts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <Post
            theme={post.theme}
            text={post.text}
            date={post.date}
            image={post.image}
            id={post.id}
            author={post.author}
          />
        </Link>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-96 mx-36 font-montserrat text-2xl ">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white dark:focus:ring-pink-800" onClick={handlePreviousPage} disabled={currentPage === 1}>
          <span className="relative px-10 py-3 transition-all ease-in duration-75 text-red-500 hover:text-white dark:bg-white rounded-md group-hover:bg-opacity-0">
              Назад
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white dark:focus:ring-pink-800" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <span className="relative px-10 py-3 transition-all ease-in duration-75 text-red-500 hover:text-white dark:bg-white rounded-md group-hover:bg-opacity-0">
              Вперёд
          </span>
        </button>
      </div>
    </div>
  );
};
    
export default Posts;