"use client"
import React, { useState, useEffect } from 'react';
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { toast } from 'react-toastify';
import Link from 'next/link';

const Register: React.FC = () => {
    const initialvalue = {
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        display_name: "",
        number: ""
    };
    const [formData, setFormData] = useState(initialvalue);
    const [formError, setFormError] = useState<any>("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.display_name || !formData.number) {
            setFormError("All fields are necessary.");
            return;
        }
        setIsSubmit(true);

        try {
            const res = await fetch("http://47.128.210.223/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Registration successful:", data);
                const form = e.currentTarget.closest('form');
                setFormError("")
                if (form) {
                    (form as HTMLFormElement).reset();
                }
                // Handle success response here
            } else {
                setIsSubmit(false);
                console.error("Registration failed:", res.statusText);
                // Handle error response here
            }
        } catch (error) {
            setIsSubmit(false);
            console.error("Error during registration:", error);
            // Handle fetch error here
        }
    };



    return (
        <>
            <div className="okv4-section">
                <div className="ok-container">
                    <div className="login-page-wrapper">
                        <form className="ok-user-login" >
                            <div className="ok-conv-login-box">
                                <h3>Register</h3>
                                <div className="frm-fld">
                                    <input type="text" placeholder="Name" name="name" className="username" onChange={handleChange} />
                                </div>
                                <div className="frm-fld">
                                    <input type="text" placeholder="Username" name="username" className="username" onChange={handleChange} />

                                </div>
                                <div className="frm-fld">
                                    <input type="email" placeholder="Email" name="email" className="username" onChange={handleChange} />

                                </div>
                                <div className="frm-fld">
                                    <input type="password" placeholder="Password" name='password' className="password" onChange={handleChange} />

                                </div>
                                <div className="frm-fld">
                                    <input type="password" placeholder="Confirm Password" name='confirmPassword' className="password" onChange={handleChange} />

                                </div>
                                <div className="frm-fld">
                                    <input type="text" placeholder="Display Name" name='display_name' className="username" onChange={handleChange} />

                                </div>
                                <div className="frm-fld">
                                    <input type="text" placeholder="Phone/Mobile" name='number' className="username" onChange={handleChange} />

                                </div>

                                <div className="ok-btn-wrapper">
                                    <button className="btn primary primary-gradient rounded w-full" type='button' onClick={(e) => handleSubmit(e)}>Sign up</button>
                                    <span>Already have an account?</span> <Link href="/login" className="ok-signup-trigger">Signin Now</Link>
                                </div>
                                {
                                    formError && (

                                        <div className="form-message form-response-message ok-error">
                                            {formError}
                                        </div>
                                    )
                                }
                                <div className="ok-login-with-social">
                                    <h5>Or use Social Media? </h5>
                                    <a href="#" className="with-google ok-social-login-trigger">
                                        <FaGoogle />
                                        <span>Google</span>
                                    </a>
                                    <a href="#" className="with-tw ok-social-login-trigger">
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
                </div >
            </div >
        </>
    );
};

export default Register;