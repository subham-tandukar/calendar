"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRoot } from '../../../context';
import Share from '../../Components/Share/Share';
import { FaRegCopy } from 'react-icons/fa';
import { FaCheck } from "react-icons/fa6";

const Widget = () => {
  const { siteSetting } = useRoot();

  const [preview, setPreview] = useState("preview");
  const [activeTab, setActiveTab] = useState("ok-day")

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'http://localhost:3000/dist/okcalendar.bundle.js';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [preview, activeTab]);

  const [copy, setCopy] = useState(false);

  const handleCopy = (widget) => {
    const code = `<div data-widget="${widget}"></div>\n<script async src="${process.env.NEXT_PUBLIC_LIVE_URL}/dist/okcalendar.bundle.js"></script>`;
    navigator.clipboard.writeText(code)
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  }

  const markUp = (widget) => {
    return (
      <code>
        &lt;<span className='ok-tag'>div</span> <span className='ok-attr'>data-widget</span>=<span className='ok-tag-data'>"{widget}"</span>&gt;&lt;/<span className='ok-tag'>div</span>&gt;<br /> <br />
        &lt;<span className='ok-tag'>script</span> <span className='ok-attr'>async</span> <span className='ok-attr'>src</span>=<span className='ok-tag-data'>"{`${process.env.NEXT_PUBLIC_LIVE_URL}/dist/okcalendar.bundle.js`}"</span>&gt;&lt;/<span className='ok-tag'>script</span>&gt;
      </code>
    )
  }




  return (
    <>

      <div className="okv4-container">
        <div className="ok-breadcrumb">
          <ul>
            <li>
              <Link href="https://www.onlinekhabar.com/" target='_blank'>अनलाइनखबर </Link>
            </li>
            <li>
              <Link href="/">क्यालेन्डर</Link>
            </li>
            <li className='active'>
              {siteSetting.widget_title_np || "वेब विजेटहरू"}
            </li>
          </ul>
        </div>

        <div className="ok-bg">
          <div className="ok-desc-content">
            <div className="ok-tab-flex">
              <h4 className='ok-main-title'>
                {siteSetting.widget_title_np || "वेब विजेटहरू"}
              </h4>
              <Share
                endpoint="widgets"
                title={siteSetting?.widget_meta_title || siteSetting?.widget_title_np}
                preFilledText={siteSetting?.widget_additional_meta_information || siteSetting?.widget_title_np}
                imageUrl={`${siteSetting?.widget_og_image || siteSetting?.site_og_image}`}
              />
            </div>
            <div className="ok-content mt-2">
              {
                siteSetting.widget_description_np ? (

                  <p
                    dangerouslySetInnerHTML={{ __html: siteSetting.widget_description_np }}
                  />
                ) : (
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, aspernatur consequuntur? Ea nobis ipsa tenetur non impedit rerum, necessitatibus delectus, placeat numquam, eveniet dignissimos debitis quasi fugiat atque temporibus dolores!
                  </p>
                )
              }
            </div>
          </div>

          <div className="ok-widget-container">

            <div className="wrapper">
              <div className="ok-btn__wrapper">
                <div
                  className={`ok-category__btn ${activeTab === "ok-day" ? "active" : ""}`}
                  onClick={() => { setActiveTab("ok-day"); setPreview("preview") }}
                >
                  <input type="radio" id="ok-day-tab" name="widget" />
                  <label className="ok-category__label " htmlFor="ok-day-tab">Day</label>
                </div>

                <div
                  className={`ok-category__btn ${activeTab === "ok-day-sm" ? "active" : ""}`}
                  onClick={() => { setActiveTab("ok-day-sm"); setPreview("preview") }}
                >
                  <input type="radio" id="ok-day-tab-sm" name="widget" />
                  <label className="ok-category__label " htmlFor="ok-day-tab-sm">Day Small</label>
                </div>

                <div
                  className={`ok-category__btn ${activeTab === "ok-month-sm" ? "active" : ""}`}
                  onClick={() => { setActiveTab("ok-month-sm"); setPreview("preview") }}
                >
                  <input type="radio" id="ok-month-tab-sm" name="widget" />
                  <label className="ok-category__label " htmlFor="ok-month-tab-sm">Month Small</label>
                </div>
              </div>
            </div>

            <div className="ok-widget-box mt-2">
              <div className="ok-widget-box-header">
                <div className='flex '>
                  <h2 className={`ok-eng-font ${preview === "preview" ? "active" : ""}`} onClick={() => setPreview("preview")}>
                    Preview
                  </h2>
                  <h2 className={`ok-eng-font ${preview === "markup" ? "active" : ""}`} onClick={() => setPreview("markup")}>
                    Mark up
                  </h2>
                </div>

                {
                  preview === "markup" && (
                    <div className="ok-copy-code" >
                      {
                        copy ? (
                          <div className="ok-copied">
                            <FaCheck />
                            Copied!
                          </div>
                        ) : (
                          <div className='cursor' onClick={() => handleCopy(activeTab)}>
                            <FaRegCopy />
                            Copy code
                          </div>
                        )
                      }

                    </div>
                  )
                }
              </div>

              {
                preview === "preview" ? (
                  <div className="ok-widget-box-preview">
                    <div data-widget={activeTab}></div>
                  </div>
                ) : (
                  <div className="ok-widget-box-markup">
                    {markUp(activeTab)}
                  </div>
                )
              }
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Widget;