// "use client"
// import React, { useState, useEffect, useContext } from 'react';
// import { FaGoogle, FaTwitter } from "react-icons/fa";
// import { toast } from 'react-toastify';
// import Link from 'next/link';
// import AuthContext from '../../../context/AuthContext';
// import { useRouter } from 'next/navigation';

// const Login: React.FC = () => {
//     const router = useRouter();
//     const { login } = useContext(AuthContext);
//     const initialvalue = {
//         username: "",
//         password: "",
//     };
//     const [formData, setFormData] = useState(initialvalue);
//     const [formError, setFormError] = useState<any>("");
//     const [formSuccess, setFormSuccess] = useState<any>("");
//     const [isSubmit, setIsSubmit] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!formData.username || !formData.password) {
//             setFormError("All fields are necessary.");
//             return;
//         }

//         try {
//             setIsSubmit(true);

//             const res = await fetch("http://47.128.210.223/api/v1/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await res.json();
//             if (res.ok) {
//                 if (data?.error) {
//                     setFormError(data?.error?.message)
//                     setIsSubmit(false);
//                 } else {
//                     localStorage.setItem("ok-calendar-token", JSON.stringify(data?.data));
//                     sessionStorage.setItem("ok-calendar-token", JSON.stringify(data?.data));
//                     login(data?.data);
//                     setIsSubmit(false);
//                     setFormError("")
//                     setFormSuccess("Login Sucessful")
//                     setTimeout(() => {
//                         router.push("/")
//                     }, 1000);
//                 }

//                 // Handle success response here
//             } else {
//                 setIsSubmit(false);
//                 setFormError(data?.message)
//             }
//         } catch (error) {
//             setIsSubmit(false);
//             console.error("Error during login:", error);
//         }
//     };

//     return (
//         <>
//             <div className="okv4-section">

//                 <div className="ok-container">
//                     <div className="login-page-wrapper">
//                         <form className="ok-user-login" onSubmit={(e) => handleSubmit(e)}>
//                             <div className="ok-conv-login-box">
//                                 <h3>Login</h3>
//                                 <div className="frm-fld">
//                                     <input type="text" placeholder="Username" name="username" onChange={handleChange} className="username" />
//                                 </div>
//                                 <div className="frm-fld">
//                                     <input type="password" placeholder="Password" name='password' onChange={handleChange} className="password" />
//                                 </div>
//                                 <div className="frm-fld flex-box field-remember">
//                                     <div className="rememberme">
//                                         <input type="checkbox" className="remember-me" />
//                                         <span>Remember me</span>
//                                     </div>
//                                     <a href="https://www.onlinekhabar.com/forgot-pass-page" className="ok-forget-password-trigger">Forgot password?</a>
//                                 </div>
//                                 <div className="ok-btn-wrapper">
//                                     <button
//                                         type="submit"
//                                         className="btn primary primary-gradient rounded w-full"
//                                         disabled={isSubmit ? true : false}

//                                     >
//                                         {isSubmit ?
//                                             (
//                                                 <>
//                                                     Please wait
//                                                     <span className="loader btn-loader"></span>
//                                                 </>
//                                             )
//                                             : "Login"}
//                                     </button>
//                                     <span>Not have account yet?</span> <Link href="/register" className="ok-signup-trigger" >Signup Now</Link>
//                                 </div>
//                                 {
//                                     formError && (

//                                         <div className="form-message form-response-message ok-error">
//                                             {formError}
//                                         </div>
//                                     )
//                                 }
//                                 {
//                                     formSuccess && (

//                                         <div className="form-message form-response-message ok-success">
//                                             {formSuccess}
//                                         </div>
//                                     )
//                                 }
//                                 <div className="ok-login-with-social">
//                                     <h5>Or use Social Media? </h5>
//                                     <a href="#" className="with-google ok-social-login-trigger">
//                                         <FaGoogle />
//                                         <span>Google</span>
//                                     </a>
//                                     <a href="#" className="with-tw ok-social-login-trigger">
//                                         <FaTwitter />
//                                         <span>Twitter</span>
//                                     </a>
//                                 </div>
//                                 <div className="ok-login-desc">
//                                     <h4>कृपया ध्यान दिनुहोस्:</h4>
//                                     <ul>
//                                         <li>अब तपाइले कमेन्ट गर्नका लागि अनिवार्य रजिस्ट्रेसन गर्नुपर्ने छ ।</li>
//                                         <li>आफ्नो इमेल वा गुगल, फेसबुक र ट्वीटरमार्फत् पनि सजिलै लगइन गर्न सकिने छ ।</li>
//                                         <li>यदि वास्तविक नामबाट कमेन्ट गर्न चाहनुहुन्न भने डिस्प्ले नेममा सुविधाअनुसारको निकनेम र प्रोफाइल फोटो परिवर्तन गर्नुहोस् अनि ढुक्कले कमेन्ट गर्नहोस्, तपाइको वास्तविक पहिचान गोप्य राखिने छ । </li>
//                                         <li>रजिस्ट्रेसनसँगै बन्ने प्रोफाइमा तपाइले गरेका कमेन्ट, रिप्लाई, लाइक/डिसलाइकको एकमुष्ठ बिबरण हेर्नुहोस् ।</li>
//                                     </ul>
//                                 </div>

//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;

"use client"
import React, { useState, useContext } from 'react';
import { FaGoogle, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const router = useRouter();
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [rees, setress] = useState<any>();

    const { data: session, status } = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleCredentialsSignIn = async () => {
        if (!formData.username || !formData.password) {
            setFormError("All fields are necessary.");
            return;
        }
        try {
            setIsSubmit(true);


            const res = await signIn('credentials', { ...formData, redirect: false });

            console.log("res", res)
            setress(res)

            if (res?.error) {
                setFormError("Invalid Username or Password");
                setIsSubmit(false);

            } else {
                setIsSubmit(false);
                setFormSuccess("Login Successful");
                router.push('/'); // Redirect to the homepage
            }
        } catch (error) {
            setIsSubmit(false);
            console.error("Error during login:", error);
            setFormError("An error occurred during login. Please try again.");

        }
    };


    const handleSocialSignIn = async (provider: string) => {
        try {
            await signIn(provider);
        } catch (error) {
            console.error("Error during social login:", error);
        }
    };

    return (
        <>
            <div className="okv4-section">
                <div className="ok-container">
                    <div className="login-page-wrapper">
                        <form className="ok-user-login" onSubmit={(e) => e.preventDefault()}>
                            <div className="ok-conv-login-box">
                                <h3>Login</h3>
                                <div className="frm-fld">
                                    <input type="text" placeholder="Username" name="username" onChange={handleChange} className="username" />
                                </div>
                                <div className="frm-fld">
                                    <input type="password" placeholder="Password" name='password' onChange={handleChange} className="password" />
                                </div>
                                <div className="frm-fld flex-box field-remember">
                                    <div className="rememberme">
                                        <input type="checkbox" className="remember-me" />
                                        <span>Remember me</span>
                                    </div>
                                    <a href="https://www.onlinekhabar.com/forgot-pass-page" className="ok-forget-password-trigger">Forgot password?</a>
                                </div>
                                <div className="ok-btn-wrapper">
                                    <button
                                        type="button"
                                        className="btn primary primary-gradient rounded w-full"
                                        disabled={isSubmit}
                                        onClick={handleCredentialsSignIn}
                                    >
                                        {isSubmit ?
                                            (
                                                <>
                                                    Please wait
                                                    <span className="loader btn-loader"></span>
                                                </>
                                            )
                                            : "Login"}
                                    </button>
                                    <span>Not have account yet?</span> <Link href="/register" className="ok-signup-trigger">Signup Now</Link>
                                </div>
                                {
                                    formError && (
                                        <div className="form-message form-response-message ok-error">
                                            {formError}
                                        </div>
                                    )
                                }

                                {
                                    formSuccess && (
                                        <div className="form-message form-response-message ok-success">
                                            {formSuccess}
                                        </div>
                                    )
                                }
                                <div className="ok-login-with-social">
                                    <h5>Or use Social Media? </h5>
                                    <a onClick={() => handleSocialSignIn('google')} className="with-google ok-social-login-trigger">
                                        <FaGoogle />
                                        <span>Google</span>
                                    </a>
                                    <a onClick={() => handleSocialSignIn('twitter')} className="with-tw ok-social-login-trigger">
                                        <FaTwitter />
                                        <span>Twitter</span>
                                    </a>
                                </div>
                                <div className="ok-login-desc">
                                    <h4>कृपया ध्यान दिनुहोस्:</h4>
                                    <ul>
                                        <li>अब तपाइले कमेन्ट गर्नका लागि अनिवार्य रजिस्ट्रेसन गर्नुपर्ने छ ।</li>
                                        <li>आफ्नो इमेल वा गुगल, फेसबुक र ट्वीटरमार्फत् पनि सजिलै लगइन गर्न सकिने छ ।</li>
                                        <li>यदि वास्तविक नामबाट कमेन्ट गर्न चाहनुहुन्न भने डिस्प्ले नेममा सुविधाअनुसारको निकनेम र प्रोफाइल फोटो परिवर्तन गर्नुहोस् अनि ढुक्कले कमेन्ट गर्नहोस्, तपाइको वास्तविक पहिचान गोप्य राखिने छ । </li>
                                        <li>रजिस्ट्रेसनसँगै बन्ने प्रोफाइमा तपाइले गरेका कमेन्ट, रिप्लाई, लाइक/डिसलाइकको एकमुष्ठ बिबरण हेर्नुहोस् ।</li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
