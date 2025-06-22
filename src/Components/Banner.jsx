import { useState, useEffect } from 'react';
import BannerImage from '../img/banner.webp';

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
      {/* Image with Parallax */}
      <div
        className="absolute top-0 left-0 w-full h-[120%]" 
        style={{
          backgroundImage: `url(${BannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offsetY * 0.4}px)`, 
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1
          className="text-5xl md:text-7xl font-bold"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }} 
        >
          Ideas
        </h1>
        <p className="mt-4 text-xl md:text-2xl">Where all our great things begin</p>
      </div>
    </div>
  );
}

export default Banner;