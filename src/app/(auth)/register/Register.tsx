"use client"
import React, { useEffect, useState } from 'react';
import { FaGoogle, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { error } from 'console';
import { useRoot } from '../../../context';

const Register: React.FC = () => {
    const { siteSetting } = useRoot()
    const router = useRouter()
    const initialValue = {
        username: "",
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        display_name: "",
        phone: ""
    };
    const [formData, setFormData] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        display_name: "",
        phone: ""
    });
    const [errors, setErrors] = useState("")
    const [formSuccess, setFormSuccess] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    useEffect(() => {
        setFormSuccess("")
    }, [])
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let valid = true;
        setIsSubmit(true);
        const newErrors = { ...formErrors };
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
                valid = false;
            }
        });

        if (!valid) {
            setFormErrors(newErrors);
            setIsSubmit(false);
            return;
        }

        try {
            setIsSubmit(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log('data', data);
            console.log('res', res);
            if (data.error) {
                setIsSubmit(false);
                if (data.error.confirm_password) {
                    setFormErrors({
                        ...formErrors,
                        confirm_password: data.error.confirm_password[0]
                    });
                } else if (data.error.email) {
                    setFormErrors({
                        ...formErrors,
                        email: data.error.email[0]
                    });
                } else if (data.error.username) {
                    setFormErrors({
                        ...formErrors,
                        username: data.error.username[0]
                    });
                } else if (data.error) {
                    setErrors(data.error.message)
                    // setFormErrors({
                    //     ...formErrors,
                    //     username: data.error.message
                    // });
                }

            } else if (data.data) {
                setIsSubmit(false);
                setFormErrors(initialValue);
                setFormData(initialValue);
                setErrors("")
                setFormSuccess("Registration Successful");
                setTimeout(() => {
                    router.push('/login')
                }, 1000);
            } else {
                setIsSubmit(false);
                console.error("Registration failed:", res.statusText);
            }
        } catch (error) {
            setIsSubmit(false);
            console.error("Error during registration:", error);
        }
    };

    const handleSocialSignIn = async (provider: string) => {
        try {
            await signIn(provider, { callbackUrl: '/' });
        } catch (error) {
            console.error("Error during social login:", error);
        }
    };

    return (
        <>
            <div className="okv4-section ok-auth">
                <div className="ok-container">
                    <div className="ok-login-page-wrapper grid">
                        <form className="ok-user-login">
                            <div className="ok-conv-login-box">
                                <div>

                                    <h3>दर्ता गर्नुहोस्</h3>
                                    <div className="frm-fld">
                                        <input type="text" placeholder="नाम" name="name" className={`username ${formErrors.name && 'invalid'}`} onChange={handleChange} value={formData.name} required />
                                        {formErrors.name && <span className="ok-form-error ">{formErrors.name}</span>}
                                    </div>
                                    <div className="frm-fld">
                                        <input type="text" placeholder="प्रयोगकर्ता नाम" name="username" className={`username ${formErrors.username && 'invalid'}`} onChange={handleChange} value={formData.username} required />
                                        {formErrors.username && <span className="ok-form-error ">{formErrors.username}</span>}
                                    </div>
                                    <div className="frm-fld">
                                        <input type="email" placeholder="इमेल" name="email" className={`username ${formErrors.email && 'invalid'}`} onChange={handleChange} value={formData.email} required />
                                        {formErrors.email && <span className="ok-form-error ">{formErrors.email}</span>}
                                    </div>
                                    <div className="frm-fld">
                                        <input type="password" placeholder="पासवर्ड" name="password" className={`password ${formErrors.password && 'invalid'}`} onChange={handleChange} value={formData.password} required />
                                        {formErrors.password && <span className="ok-form-error ">{formErrors.password}</span>}
                                    </div>
                                    <div className="frm-fld">
                                        <input type="password" placeholder="पासवर्ड सुनिश्चित गर्नुहोस" name="confirm_password" className={`password ${formErrors.confirm_password && 'invalid'}`} onChange={handleChange} value={formData.confirm_password} required />
                                        {formErrors.confirm_password && <span className="ok-form-error ">{formErrors.confirm_password}</span>}
                                    </div>
                                    <div className="frm-fld">
                                        <input type="text" placeholder="प्रदर्शन नाम" name="display_name" className={`username ${formErrors.display_name && 'invalid'}`} onChange={handleChange} value={formData.display_name} required />
                                        {formErrors.display_name && <span className="ok-form-error ">{formErrors.display_name}</span>}
                                    </div>
                                    <div className="frm-fld">
                                        <input type="text" placeholder="फोन/मोबाइल" name="phone" className={`username ${formErrors.phone && 'invalid'}`} onChange={handleChange} value={formData.phone} required />
                                        {formErrors.phone && <span className="ok-form-error ">{formErrors.phone}</span>}
                                    </div>



                                    <div className="ok-btn-wrapper">
                                        <button className="btn primary primary-gradient rounded w-full" type="submit" onClick={handleSubmit}>
                                            {isSubmit ?
                                                (
                                                    <>
                                                        कृपया पर्खनुहोस्
                                                        <span className="loader ok-btn-loader"></span>
                                                    </>
                                                )
                                                : "साइन अप"}
                                        </button>
                                        <span>पहिले नै खाता छ?</span> <Link href="/login" className="ok-signup-trigger">अहिले साइन इन गर्नुहोस्</Link>
                                    </div>

                                    {errors && (
                                        <div className="form-message ok-form-response-message ok-error">
                                            {errors}
                                        </div>
                                    )}

                                    {
                                        formSuccess && (
                                            <div className="form-message ok-form-response-message ok-success">
                                                {formSuccess}
                                            </div>
                                        )
                                    }

                                    <div className="ok-login-with-social">
                                        <h5>वा सोशल मिडिया प्रयोग गर्नुहुन्छ? </h5>
                                        <a onClick={() => handleSocialSignIn('google')} className="with-google ok-social-login-trigger">
                                            <FaGoogle />
                                            <span>गूगल</span>
                                        </a>
                                        <a onClick={() => handleSocialSignIn('twitter')} className="with-tw ok-social-login-trigger">
                                            <FaTwitter />
                                            <span>ट्विटर</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="ok-login-desc">
                                    {/* <h4>कृपया ध्यान दिनुहोस्:</h4> */}
                                    <div
                                        dangerouslySetInnerHTML={{ __html: siteSetting.login_off_canvas_steps_np }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
