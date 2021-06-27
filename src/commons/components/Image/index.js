import * as React from 'react';
import './style.scss';

export const Image = (props) => {
  const placeholder = React.useRef(null);
  const img = React.useRef(null);

  const handleOnload = (e) => {
    placeholder.current.style.display = 'none';
    img.current.classList.remove('hidden');
  };
  return (
    <>
      <div ref={placeholder} className="image-placeholder"></div>
      <img
        ref={img}
        {...props}
        loading="lazy"
        onLoad={handleOnload}
        className="hidden"
      />
    </>
  );
};
