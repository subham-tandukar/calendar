import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>

      <div className="seo-text">
        <div className="okv4-container">
          <h4>OK CALENDAR</h4>
          <p>
            In Nepal, Bikram Sambat / Vikram Samvat (B.S) is considered as a
            recognized, official Nepali Calendar, Nepali Patro with National
            sovereignty. Every year “Nepal Panchanga Nirnayak Samiti” officially
            leads to publishing all the dates & panchanga related information for
            the new Nepali Calendar / Nepali Patro. On this basis, the National
            Calendar or calendar of Nepal9is prepared. Each year, the new Sambat
            starts after Chaitra Sankranti (mid-April). Bikram Sambat / Vikram
            Samvat is the most scientific of all the world’s calendar, based on
            the speed and nature of the sun.
          </p>
          <p>
            Using NepaliPatro anyone easily can create trustworthy Kundali /
            Janampatri (using accurate Vedic Astrology principles) just adding
            Birth Place, Birth Time & Date of Birth, & this is free.Learn More
          </p>
        </div>
      </div>

      <footer className="okv4-footer">
        <div className="okv4-container">
          <div className="flx flx-wrp">
            <div className="ok-info-col">
              <div className="foot-logo">
                <a href="https://www.onlinekhabar.com/" target='_blank'>
                  <img src="img/ok-logo-text-white.svg" alt="" />
                </a>
              </div>
              <div className="director-info">
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

              <div className="contact-info">
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
              <div className="copyright">
                © २००६-२०२३ Onlinekhabar.com सर्वाधिकार सुरक्षित
              </div>
            </div>
            <div className="ok-foot-list">
              <h4>विजनेस</h4>
              <ul>
                <li><a href="/content/market">बजार</a></li>
                <li><a href="/content/tourism">पर्यटन</a></li>
                <li><a href="/content/rojgar/">रोजगार</a></li>
                <li><a href="/content/bank-main/">बैँक / वित्त</a></li>
                <li><a href="/content/auto/">अटो</a></li>
                <li><a href="/content/technology/">सूचना-प्रविधि</a></li>
              </ul>
            </div>
            <div className="ok-foot-list">
              <h4>मनोरञ्जन</h4>
              <ul>
                <li><a href="/content/modelgallery">ब्लोअप</a></li>
                <li><a href="/content/gassip">गसिप</a></li>
                <li><a href="/content/bolly-hollywood">बलिउड / हलिउड</a></li>
                <li><a href="/content/videos-main">भिडियो</a></li>
                <li><a href="/content/ent-news/">ताजा समाचार</a></li>
              </ul>
            </div>
            <div className="ok-foot-list">
              <h4>विशेष श्रृंखला</h4>
              <ul>
                <li><a href="/segment/cooperative-crisis">सहकारी संकट विशेष </a></li>
                <li><a href="/segment/laghubitta">लगुबित्त संकट विशेष </a></li>
                <li><a href="/content/dissolution-hor">संसद विघटन विशेष </a></li>
                <li><a href="/trend/%e0%a4%ab%e0%a5%8d%e0%a4%b0%e0%a4%a8%e0%a5%8d%e0%a4%9f%e0%a4%b2%e0%a4%be%e0%a4%87%e0%a4%a8-%e0%a4%b9%e0%a4%bf%e0%a4%b0%e0%a5%8b%e0%a4%9c">फ्रन्टलाइन हिरोज्</a></li>
                <li><a href="https://election-2074.onlinekhabar.com/">निर्वाचन २०७४</a></li>
                <li><a href="/content/sports/merokatha">मेरो कथा</a></li>
                <li><a href="https://election-local.onlinekhabar.com/">स्थानीय चुनाव २०७९</a></li>
                <li><a href="https://election.onlinekhabar.com/">निर्वाचन २०७९</a></li>
                <li><a href="content/umlcd">एमाले महाधिवेशन </a></li>
                <li><a href="/worldcup2022">विश्वकप २०२२ </a></li>
              </ul>
            </div>
            <div className="ok-foot-list">
              <h4>अनलाइनखबर</h4>
              <ul>
                <li><a href="/about-us/">हाम्रो टीम</a></li>
                <li><a href="/">प्रयोगका सर्त</a></li>
                <li><a href="/advertise-with-us">विज्ञापन</a></li>
                <li><a href="/privacy-policy/">प्राइभेसी पोलिसी</a></li>
                <li><a href="/contact-us/">सम्पर्क</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
