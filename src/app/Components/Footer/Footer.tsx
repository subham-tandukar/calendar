"use client"
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { useRoot } from '../../../context';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Footer = () => {
  const { siteSetting } = useRoot();
  const { data: session, status } = useSession();
  return (
    <>

      <div className="ok-seo-text">
        <div className="okv4-container">
          <h4>{siteSetting?.footer_heading_np}</h4>

          <p

            dangerouslySetInnerHTML={{ __html: siteSetting.footer_text_np }}
          />

          <Link
            href="/about"
            className="btn primary primary-gradient"
          >
            {siteSetting?.footer_text_read_more_link_en || "थप पढ्नुहोस्"}
          </Link>
        </div>
      </div>

      <footer className="okv4-footer">
        <div className="okv4-container">
          <div className="flx flx-wrp">
            <div className="ok-info-col">
              <div className="ok-foot-logo">
                <Link href="https://www.onlinekhabar.com/" target='_blank'>
                  {
                    siteSetting.logo_footer && (

                      <img
                      width={240} height={30}
                        src={siteSetting.logo_footer}
                        alt="Ok Logo"
                      />
                    )
                  }
                </Link>
              </div>
              <div className="ok-director-info">
                <div className="item">
                  <label>अध्यक्ष तथा प्रबन्ध निर्देशक:</label>
                  <span>धर्मराज भुसाल</span>
                </div>
                <div className="item">
                  <label>प्रधान सम्पादक:</label>
                  <span>शिव गाउँले</span>
                </div>
                <div className="item">
                  <label>सूचना विभाग दर्ता नं.</label>
                  <span>२१४ / ०७३–७४</span>
                </div>
              </div>

              <div className="ok-contact-info">
                <span>+977-1-4790176, +977-1-4796489</span>
                <span>news@onlinekhabar.com</span>
              </div>
              <div className="social-info">
                <div className="ok-social-brands">
                  <Link href="https://www.facebook.com/onlinekhabarnews/" target='_blank'>
                    <FaFacebookF />
                  </Link>
                  <Link href="https://twitter.com/online_khabar" target='_blank'>
                    <FaTwitter />
                  </Link>
                  <Link href="https://www.youtube.com/channel/UCo4cuctdb-1YdZNgWEVZGwA" target='_blank'>
                    <FaYoutube />
                  </Link>
                </div>
              </div>
              <div className="ok-copyright">
                © २००६-२०२३ Onlinekhabar.com सर्वाधिकार सुरक्षित
              </div>
            </div>
            <div className="ok-foot-list">
              <h4>विजनेस</h4>
              <ul>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/market">बजार</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/tourism">पर्यटन</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/rojgar/">रोजगार</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/bank-main/">बैँक / वित्त</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/auto/">अटो</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/technology/">सूचना-प्रविधि</a></li>
              </ul>
            </div>

            <div className="ok-foot-list">
              <h4>मनोरञ्जन</h4>
              <ul>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/modelgallery">ब्लोअप</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/gassip">गसिप</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/bolly-hollywood">बलिउड / हलिउड</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/videos-main">भिडियो</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/ent-news/">ताजा समाचार</a></li>
              </ul>
            </div>
            <div className="ok-foot-list">
              <h4>विशेष श्रृंखला</h4>
              <ul>
                <li><a target='_blank' href="https://www.onlinekhabar.com/segment/cooperative-crisis">सहकारी संकट विशेष </a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/segment/laghubitta">लगुबित्त संकट विशेष </a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/dissolution-hor">संसद विघटन विशेष </a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/trend/%e0%a4%ab%e0%a5%8d%e0%a4%b0%e0%a4%a8%e0%a5%8d%e0%a4%9f%e0%a4%b2%e0%a4%be%e0%a4%87%e0%a4%a8-%e0%a4%b9%e0%a4%bf%e0%a4%b0%e0%a5%8b%e0%a4%9c">फ्रन्टलाइन हिरोज्</a></li>
                <li><a target='_blank' href="https://election-2074.onlinekhabar.com/">निर्वाचन २०७४</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/sports/merokatha">मेरो कथा</a></li>
                <li><a target='_blank' href="https://election-local.onlinekhabar.com/">स्थानीय चुनाव २०७९</a></li>
                <li><a target='_blank' href="https://election.onlinekhabar.com/">निर्वाचन २०७९</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/content/umlcd">एमाले महाधिवेशन </a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/worldcup2022">विश्वकप २०२२ </a></li>
              </ul>
            </div>

            <div className="ok-foot-list">
              <h4>क्यालेन्डर</h4>
              <ul>
                <li><Link href="/holiday">बिदाहरु</Link></li>
                <li><Link href="/sahit">साईत</Link></li>
                <li><Link href="/panchanga">पञ्चाङ्ग</Link></li>
                <li><Link href="/rashifal">राशिफल</Link></li>
                <li><Link href="/bullion">सुन-चाँदी</Link></li>
                <li><Link href="/forex">विदेशी विनिमय</Link></li>
                <li><Link href="/date-converter">मिति परिवर्तन</Link></li>
                <li><Link href="/event">इभेन्ट</Link></li>
                {
                  session && !session?.error && (
                    <li><Link href="/reminder">मेरो रिमाइन्डर</Link></li>
                  )
                }
              </ul>
            </div>

            <div className="ok-foot-list">
              <h4>अनलाइनखबर</h4>
              <ul>
                <li><a target='_blank' href="https://www.onlinekhabar.com/about-us/">हाम्रो टीम</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/">प्रयोगका सर्त</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/advertise-with-us">विज्ञापन</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/privacy-policy/">प्राइभेसी पोलिसी</a></li>
                <li><a target='_blank' href="https://www.onlinekhabar.com/contact-us/">सम्पर्क</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
