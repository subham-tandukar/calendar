
"use client"
import React, { useState } from 'react';
import { arabicToDevanagari, timeAgo } from '../../../../hooks';
import { useRoot } from '../../../../context';

const Updates = ({ recentnews, trendingnews }) => {
  const{siteSetting}=useRoot()
  const [activeTab, setActiveTab] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="okv4-tab-generic trending-on-calendar-left">
        <div className="tab-nav">
          <span
            className={`nav-w-icon ${activeTab ? 'active-tab' : ''}`}
            data-id="trending"
            onClick={() => handleTabChange(true)}
          >
            <span className="ok-icon ok-icon-trending"></span>
          {siteSetting?.sidebar_trending_cta_np}
          </span>
          <span
            className={`nav-w-icon ${!activeTab ? 'active-tab' : ''}`}
            data-id="latestUpdates"
            onClick={() => handleTabChange(false)}
          >
            <span className="ok-icon ok-icon-time"></span>
            {siteSetting?.sidebar_taaja_update_cta_np}
          </span>
        </div>
        <div className="tab-content-wrap">
          <div
            id="trending"
            className="tab-container"
            style={{ display: activeTab ? 'block' : 'none' }}
          >
            {trendingnews.news.map((item, index) => (
              <div key={index} className="okv4-post-ltr is-trending">
                <span className="numr"> {arabicToDevanagari(index + 1)}.</span>
                <div className="okv4-post-content">
                  <span className="ok-post-tag">{item.primary_category.cat_name}</span>
                  <h2>
                    {/* <a href={item.link} target='_blank'>{item.title}</a> */}

                    <a href={item.link} target='_blank'
                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                />
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div
            id="latestUpdates"
            className="tab-container"
            style={{ display: !activeTab ? 'block' : 'none' }}
          >
            <div className="latest-posts-wrap">
              {recentnews.news.map((item, index) => (
                <div key={index} className="okv4-post-ltr">

                  <span className="ok-posted-hour">{timeAgo(item.modified_date)}</span>
                  <div className="okv4-post-content">
                    <h2>
                      {/* <a href={item.news_url} target='_blank'>{item.news_title}</a> */}

                      <a href={item.news_url} target='_blank'
                                    dangerouslySetInnerHTML={{ __html: item.news_title }}
                                />
                    </h2>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updates;
