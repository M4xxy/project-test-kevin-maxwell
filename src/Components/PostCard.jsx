import React from 'react';
import ImageWithFallback from '../Hooks/ImageWithFallback';

const PostCard = ({ post }) => {
  const date = new Date(post.published_at);
  const day = date.getDate();
  const month = date.toLocaleString('id-ID', { month: 'long' }).toUpperCase();
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const imageUrl = post.medium_image?.[0]?.url || post.small_image?.[0]?.url;
  const fallbackImageUrl = `https://via.placeholder.com/400x300?text=Not+Found`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-[4/3] w-full">
        <ImageWithFallback
          src={imageUrl}
          fallbackSrc={fallbackImageUrl}
          alt={post.title}
          className="w-full h-full object-cover bg-gray-200"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-gray-500 text-xs font-semibold">{formattedDate}</p>
        <h3 className="mt-1 font-semibold text-gray-800 line-clamp-3">
          {post.title}
        </h3>
      </div>
    </div>
  );
};

export default PostCard;