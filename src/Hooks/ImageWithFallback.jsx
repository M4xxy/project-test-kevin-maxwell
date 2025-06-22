import React, { useState, useEffect } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, ...otherProps }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc || fallbackSrc}
      onError={handleError}
      {...otherProps}
    />
  );
};

export default ImageWithFallback;