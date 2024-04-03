"use client"
import React from 'react';

const Eventsblog = ({ data }) => {
  return (
    <div className="grid-parent">
      <div className="block-heading">
        <h3>ट्रेन्डिङ ब्लग</h3>
      </div>
      <div className="grid-item grid-item-3 grid-gap-25">
        {data.news.map((newsItem, index) => (
          <div className="post-item" key={index}>
            <a href={newsItem.link} target='_blank'>
              <div className="post-image">
                <img src={newsItem.post_full_image} alt="" />
              </div>
              <span className="post-cat">{newsItem?.primary_category?.name}</span>
              <h3>{newsItem.title}</h3>
              <div className="post-author">
                {/* <img src={} alt="" /> */}

              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventsblog;
