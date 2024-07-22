"use client"
import React, { useState, useContext, useEffect } from 'react';
import { FaGoogle, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { useRoot } from '../../../context';

interface Props {
    content: string;
    grid: string
}

const Login: React.FC<Props> = ({ content, grid }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const router = useRouter();
    const { siteSetting } = useRoot()
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [rees, setress] = useState<any>();

    const { data: session, status } = useSession();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (session && !session?.error) {
            router.push("/")
            setFormError("")
        } else {
            setFormError(session && session?.error)
        }
    }, [session])

    const handleCredentialsSignIn = async (e) => {
        e.preventDefault()
        if (!formData.username || !formData.password) {
            setFormError("All fields are necessary.");
            return;
        }
        try {
            setIsSubmit(true);


            // const res = await signIn('credentials', { ...formData, redirect: false });
            const res = await signIn('credentials', { ...formData, redirect: false, callbackUrl: '/' });

            setress(res)

            if (res?.error) {
                setFormError("Invalid Username or Password");
                setIsSubmit(false);

            } else {
                setIsSubmit(false);
                setFormError("")
                setFormSuccess("Login Successful");
                // router.push('/'); // Redirect to the homepage
                window.location.href = "/"
            }
        } catch (error) {
            setIsSubmit(false);
            console.error("Error during login:", error);
            setFormError("An error occurred during login. Please try again.");

        }
    };


    const handleSocialSignIn = async (provider: string) => {
        try {
            //   const res =  await signIn(provider);
            await signIn(provider);
        } catch (error) {
            console.error("Error during social login:", error);
        }
    };

    return (
        <>
            <div className="okv4-section ok-auth">
                <div className="ok-container">
                    <div className={`ok-login-page-wrapper ${grid === "grid-one" ? "no-grid" : "grid"}`}>
                        <form className="ok-user-login" >
                            <div className="ok-conv-login-box">
                                <div>
                                    <h3>{siteSetting?.login_off_canvas_text_np}</h3>
                                    {
                                        content && (
                                            <p className='ok-note'>
                                                {content}
                                            </p>
                                        )
                                    }
                                    <div className="frm-fld">
                                        <input type="text" placeholder="प्रयोगकर्ता नाम" name="username" onChange={handleChange} className="username" />
                                    </div>
                                    <div className="frm-fld">
                                        <input type="password" placeholder="पासवर्ड" name='password' onChange={handleChange} className="password" />

                                    </div>
                                    <div className="frm-fld flex-box field-remember">
                                        <div className="rememberme">
                                            <input type="checkbox" className="remember-me" />
                                            <span>मलाई सम्झनुहोस्</span>

                                        </div>
                                        <a href="#" className="ok-forget-password-trigger">पासवर्ड भुल्नु भयो?</a>
                                    </div>
                                    <div className="ok-btn-wrapper">
                                        <button
                                            type="submit"
                                            className="btn primary primary-gradient rounded w-full"
                                            disabled={isSubmit}
                                            onClick={handleCredentialsSignIn}
                                        >
                                            {isSubmit ?
                                                (
                                                    <>
                                                        कृपया पर्खनुहोस्
                                                        <span className="loader ok-btn-loader"></span>
                                                    </>
                                                )
                                                : "लगइन"}
                                        </button>
                                        <span>खाता छैन?</span> <Link href="/register" className="ok-signup-trigger">अहिले साइन अप गर्नुहोस्</Link>
                                    </div>
                                    {
                                        formError && (
                                            <div className="form-message ok-form-response-message ok-error">
                                                {formError}
                                            </div>
                                        )
                                    }

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
                                    {/* <h4>किन दर्ता हुने ?</h4> */}

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

export default Login;
