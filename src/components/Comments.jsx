import React, { useState, useEffect } from 'react';
import { supabase } from '../config/Supabaseclient';
import toast from 'react-hot-toast';

const Comments = ({ author, post_id }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const getComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select()
        .order("date", { ascending: false })
        .filter('post_id', 'eq', post_id);
      setComments(data);
    };
    getComments();
  }, [post_id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await supabase
      .from('comments')
      .insert({ 
        post_id: post_id,
        author: author,
        text: comment,
      });
    setComment('');
    const { data } = await supabase
      .from('comments')
      .select()
      .order("date", { ascending: false })
      .filter('post_id', 'eq', post_id);

    if (!comment) {
      toast.error('Комментарий не может быть пуст!');
    } else {
      setComments(data);
      toast.success('Комментарий добавлен!');
    }

  };

  const handleDeleteComment = async (commentId) => {
    await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    const { data } = await supabase
      .from('comments')
      .select()
      .order("date", { ascending: false })
      .filter('post_id', 'eq', post_id);
    setComments(data);
    toast.success('Комментарий удален!');
  };

  return (
  <div className="p-6 font-montserrat">
      <h2 className="text-lg font-bold mb-4 text-gray-600">Комментарии</h2>
      <div className="flex flex-col space-y-4 list-none">
          {comments.map((comment, index) => (
              <li key={index} className=" p-4 rounded-lg shadow-md">
                <p className='text-gray-400 text-lg font-bold'>{comment.author}</p>
                <p className='text-gray-700'>{comment.text}</p>
                <p className='text-gray-500 text-sm mb-2'>{new Date(comment.date).toLocaleString()}</p>
                {comment.author === author && (
                  <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
                )}
              </li>
            ))}
          { author ? (
            <form className="bg-white p-4 rounded-lg shadow-md text-gray-600" onSubmit={handleSubmitComment}>
            <h3 className="text-lg font-bold mb-2 ">Оставьте свой комментарий</h3>
            <div className="mb-4">
                <label className="block text-gray-400 font-bold mb-2" htmlFor="comment">
                    Комментарий
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400"
                    id="comment" rows="3" placeholder="Напишите, вам понравился пост?" value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <button
              className="block lg:w-[10vw] rounded-lg bg-red-500 hover:bg-red-600 duration-200 px-5 py-3 text-sm font-medium text-white"
              type="submit">
                Отправить
            </button>
        </form>
          ) : (
            <p className="text-gray-400">Войдите в аккаунт, чтобы оставлять комментарии</p>
          )
        }
      </div>
  </div>
  )
};

export default Comments;