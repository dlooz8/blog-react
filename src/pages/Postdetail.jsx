import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../config/Supabaseclient';
import Comments from '../components/Comments';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Postdetail({ author }) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', postId);

      if (data && data.length > 0) {
        setPost(data[0]);
      } else {
        toast.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDeletePost = async () => {
    const { data: imageUrl, error: postError } = await supabase
      .from('posts')
      .select('image')
      .eq('id', postId)
      .single();

    if (post.author === author) {
      await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
    }

    let parts = imageUrl.image.split('/');
    let file_name = parts[parts.length - 1];
    
    const { error } = await supabase
      .storage
      .from('images')
      .remove(file_name);

    if (error) {
      toast.error(error);
    }    
    
    if (postError) {
      toast.error(postError);
    } else {
      toast.success('Пост был удален!');
      navigate('/');
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-8 mx-36">
        <h3 className="text-red-600 font-montserrat text-2xl font-semibold" id="theme">{post.theme}</h3>
        <img className="aspect-video overflow-hidden object-cover rounded-xl" src={post.image} alt="pic" />
        <p className="text-gray-600 font-montserrat text-md" id="text">{post.text}</p>
        <div className="flex justify-between">
          <p className="text-gray-700 font-montserrat text-lg" id="date">{post.date}</p>
          <p className="text-gray-700 font-montserrat text-lg" id="author">{post.author}</p>
        </div>
        {post.author === author && (
          <button 
          className="block w-full rounded-lg bg-red-500 hover:bg-red-600 duration-200 px-5 py-3 text-sm font-medium text-white"
          onClick={handleDeletePost}>Удалить пост</button>
          )}
        <Comments author={author} post_id={postId} />
      </div>
    </div>
  );
}

export { Postdetail };