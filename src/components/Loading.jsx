import React from "react";

const Loading = (props) => {
  return (
    <div className='dots-container' ref={props.ref}>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
  );
};

export default Loading;
