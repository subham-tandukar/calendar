// "use client"
// import Link from 'next/link';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoIosClose, } from "react-icons/io";
// import { MdLogout } from "react-icons/md";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { useRouter } from 'next/navigation';
// import { signOut, useSession } from 'next-auth/react';
// import AuthContext from '../../../context/AuthContext';

// const NavBar = ({ currentdate }) => {
//   const { userData, logout } = useContext(AuthContext)
//   const router = useRouter();
//   const [toggle, setToggle] = useState(false);

//   const toggleMenu = () => {
//     setToggle(!toggle);
//   };

//   const [OpenDropdown, setOpenDropdown] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Function to close dropdown when clicking outside
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownClick = () => {
//     setOpenDropdown(!OpenDropdown)
//   }


//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     logout();
//     router.push("/")
//   }

//   return (
//     <>
//       <header id="masthead" className="site-header header-health">
//         <div className="okv4-container flx">
//           <div className="header-main-left-items">
//             <Link href="https://www.onlinekhabar.com/" target='_blank' className="site-logo">
//               <img
//                 src="img/logo-main.svg"
//                 alt="Online Khabar, Nepal's no. 1 news portal"
//               />
//               <div
//                 className="ok-current-time ok18-date-holder "
//                 data-today=""
//               >
//                 {currentdate.bs_date_np} {currentdate.bs_month_np}{currentdate.bs_year_np} , {currentdate.day_np}
//               </div>
//             </Link>
//             <div className="prime-nav">
//               <a href="https://www.onlinekhabar.com/content/news/rastiya" target='_blank'>समाचार</a>
//               <a href="https://www.onlinekhabar.com/health" target='_blank'>स्वास्थ्य</a>
//               <a href="https://www.onlinekhabar.com/sports" target='_blank'>खेलकुद</a>
//               <a href="https://www.onlinekhabar.com/markets" target='_blank'>शेयर मार्केट</a>
//             </div>
//           </div>
//           <div className="header-main-right-items">
//             <div className="utils right-utils">
//               {
//                 userData ? (
//                   <div className='user__profile' onClick={handleDropdownClick} ref={dropdownRef}>
//                     <img src="img/user.png" alt="User Image" />

//                     {OpenDropdown && (
//                       <div className="user__dropdown">
//                         <div className='user__dropdown__item'>
//                           <Link href="/my-calendar">
//                             <FaRegCalendarAlt /> मेरो क्यालेन्डर
//                           </Link>
//                         </div>

//                         <div className='user__dropdown__item' onClick={handleLogout}>
//                           <MdLogout />  लग-आउट
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (

//                   <Link href="/login" className="btn primary primary-gradient rounded">
//                     लगइन
//                   </Link>
//                 )
//               }


//             </div>
//           </div>
//         </div>
//       </header>
//       <nav className={`site-nav ${toggle ? 'open' : ''}`}>
//         <div className="okv4-container">
//           <div className="flex-between">
//             <ul className="desktop-menu">
//               <li className="page-label">
//                 <Link href="/">
//                   क्यालेन्डर.
//                 </Link>
//               </li>
//               <li>
//                 <a href="#">बिदाहरु</a>
//               </li>
//               {
//                 userData && (
//                   <>
//                     <li>
//                       <a href="#">इभेन्ट</a>
//                     </li>
//                     <li>
//                       <a href="#">रिमाइन्डर</a>
//                     </li>
//                   </>
//                 )
//               }

//               <li>
//                 <Link href="/sahit">साईत</Link>
//               </li>
//               <li>
//                 <Link href="/rashifal">राशिफल</Link>
//               </li>
//             </ul>
//             <div className="ham__menu mobile-menu">
//               <div onClick={toggleMenu} className="hamburger-menu-button">
//                 {toggle ? <img src="./img/close.png" alt="close" /> : <GiHamburgerMenu className="hamburger-menu-icon" />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {toggle && (
//         <div className="custom__offcanvas active">
//           <div className="overlay" onClick={toggleMenu}></div>
//           <div className="offcanvas__content menu__content">
//             <div className="menu__offcanvas__close close__offcanvas">
//               <div onClick={toggleMenu} className="hamburger-menu-button">
//                 {toggle ? <img src="./img/close.png" alt="close" /> : <GiHamburgerMenu className="hamburger-menu-icon" />}
//               </div>
//             </div>

//             <div className="offcanvas__logo">

//               <a href="#" className="site-logo">
//                 <img
//                   src="img/logo-main.svg"
//                   alt="Online Khabar, Nepal's no. 1 news portal"
//                 />
//                 <div className="ok-current-time ok18-date-holder" data-today="">
//                   ३० भदौ २०८०, शनिबार
//                 </div>

//               </a>
//             </div>
//             <ul>
//               <li><a href="#">समाचार</a></li>
//               <li><a href="#">स्वास्थ्य</a></li>
//               <li><a href="#">खेलकुद</a></li>
//               <li><a href="#">शेयर मार्केट</a></li>
//               <li><a href="#">बिदाहरु</a></li>
//               <li><a href="#">इभेन्ट</a></li>
//               <li><a href="#">रिमाइन्डर</a></li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavBar;


"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Logout from './LogoutPop';
import { useRoot } from '../../../context';


const NavBar = ({ currentdate }) => {
  const { data: session, status } = useSession();
  // const { userInfo } = useRoot()
  // console.log("userInfo", userInfo)
  const [logoutPop, setLogoutPop] = useState(false);

  const handleLogoutPop = () => {
    setLogoutPop(!logoutPop);
  };
  const handleCloseLogout = () => {
    setLogoutPop(false);
  };

  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setOpenDropdown(!openDropdown)
  }

  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/'); // Redirect to the homepage
  }

  return (
    <>
      <header id="masthead" className="site-header header-health">
        <div className="okv4-container flx">
          <div className="header-main-left-items">
            <Link href="https://www.onlinekhabar.com/" target='_blank' className="site-logo">
              <img
                src="img/logo-main.svg"
                alt="Online Khabar, Nepal's no. 1 news portal"
              />
              <div
                className="ok-current-time ok18-date-holder "
                data-today=""
              >
                {currentdate.bs_date_np} {currentdate.bs_month_np}{currentdate.bs_year_np} , {currentdate.day_np}
              </div>
            </Link>
            <div className="prime-nav">
              <a href="https://www.onlinekhabar.com/content/news/rastiya" target='_blank'>समाचार</a>
              <a href="https://www.onlinekhabar.com/health" target='_blank'>स्वास्थ्य</a>
              <a href="https://www.onlinekhabar.com/sports" target='_blank'>खेलकुद</a>
              <a href="https://www.onlinekhabar.com/markets" target='_blank'>शेयर मार्केट</a>
            </div>
          </div>
          <div className="header-main-right-items">
            <div className="utils right-utils">
              {status === 'authenticated' && (
                <div className='user__profile' onClick={handleDropdownClick} ref={dropdownRef}>
                  <img src="img/user.png" alt="User Image" />
                  {openDropdown && (
                    <div className="user__dropdown">
                      <div className='user__dropdown__item'>
                        <Link href="/my-calendar">
                          <FaRegCalendarAlt /> मेरो क्यालेन्डर
                        </Link>
                      </div>
                      <div className='user__dropdown__item' onClick={handleLogoutPop}>
                        <MdLogout />  लग-आउट
                      </div>
                    </div>
                  )}
                </div>
              )}

              {status === 'unauthenticated' && (
                <Link href="/login" className="btn primary primary-gradient rounded">
                  लगइन
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <nav className={`site-nav ${toggle ? 'open' : ''}`}>
        <div className="okv4-container">
          <div className="flex-between">
            <ul className="desktop-menu">
              <li className="page-label">
                <Link href="/">
                  क्यालेन्डर.
                </Link>
              </li>
              <li>
                <Link href="/holiday">बिदाहरु</Link>
              </li>
              <li>
                <Link href="/event">
                  इभेन्ट
                </Link>
              </li>
              {
                status === 'authenticated' && (
                  <li>
                    <a href="#">रिमाइन्डर</a>
                  </li>
                )
              }
              <li>
                <Link href="/sahit">साईत</Link>
              </li>
              <li>
                <Link href="/rashifal">राशिफल</Link>
              </li>
            </ul>
            <div className="ham__menu mobile-menu">
              <div onClick={toggleMenu} className="hamburger-menu-button">
                {toggle ? <img src="./img/close.png" alt="close" /> : <GiHamburgerMenu className="hamburger-menu-icon" />}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {toggle && (
        <div className="custom__offcanvas active">
          <div className="overlay" onClick={toggleMenu}></div>
          <div className="offcanvas__content menu__content">
            <div className="menu__offcanvas__close close__offcanvas">
              <div onClick={toggleMenu} className="hamburger-menu-button">
                {toggle ? <img src="./img/close.png" alt="close" /> : <GiHamburgerMenu className="hamburger-menu-icon" />}
              </div>
            </div>

            <div className="offcanvas__logo">
              <a href="#" className="site-logo">
                <img
                  src="img/logo-main.svg"
                  alt="Online Khabar, Nepal's no. 1 news portal"
                />
                <div className="ok-current-time ok18-date-holder" data-today="">
                  ३० भदौ २०८०, शनिबार
                </div>
              </a>
            </div>
            <ul>
              <li><a href="#">समाचार</a></li>
              <li><a href="#">स्वास्थ्य</a></li>
              <li><a href="#">खेलकुद</a></li>
              <li><a href="#">शेयर मार्केट</a></li>
              <li><a href="#">बिदाहरु</a></li>
              <li><a href="#">इभेन्ट</a></li>
              <li><a href="#">रिमाइन्डर</a></li>
            </ul>
          </div>
        </div>
      )}

      {
        logoutPop && <Logout onClose={handleCloseLogout} onLogout={handleLogout} />
      }
    </>
  );
};

export default NavBar;