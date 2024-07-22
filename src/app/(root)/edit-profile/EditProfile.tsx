"use client"
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import Link from 'next/link';
import { FaPencil } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const EditProfile = () => {
    const { userInfo, userUpdated, setUserUpdated } = useRoot();
    const router = useRouter()
    const { data: session, status } = useSession();
    const token = session?.token ? session?.token : session?.user?.data?.token;
    const initialValue = {
        bio: "",
        display_name: "",
        // phone: "",
        province: ""
    };
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [formValue, setFormValue] = useState(initialValue);
    const [avatar, setAvatar] = useState("");
    const [image, setImage] = useState(userInfo && userInfo.photo || "");
    const [isUploaded, setIsUploaded] = useState(false);
    useEffect(() => {
        setFormValue({
            bio: userInfo?.bio || "",
            display_name: userInfo && userInfo.display_name || "",
            // phone: userInfo && userInfo.phone || "",
            province: userInfo && userInfo.province || ""
        })
        setPhoneNumber(userInfo && userInfo.phone || "")
        setAvatar(userInfo && userInfo.photo || "")
    }, [userInfo])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)
            let reader = new FileReader();

            const twoMBInBytes = 2 * 1024 * 1024;

            console.log("file['size']", file['size'])
            if (file['size'] < twoMBInBytes) {
                reader.onload = function (e) {
                    if (e.target) {
                        setAvatar(e.target.result as string);
                        setIsUploaded(true);
                    }
                };

                reader.readAsDataURL(e.target.files[0]);
                setFormError("")
            } else {
                setFormError("Please upload image size less than 2MB");
            }
        }
    };

    const selectedImage = {
        lastModified: image.lastModified,
        name: image.name,
        size: image.size,
        type: image.type,
        webkitRelativePath: image.webkitRelativePath,
    }


    const [formError, setFormError] = useState<any>("");
    const [formSuccess, setFormSuccess] = useState<any>("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formValue.display_name || !formValue.province) {
            setFormError("All fields are necessary.");
            return;
        }

        try {
            setIsSubmit(true);
            const dataForm = {
                ...formValue,
                avatar: avatar,
                phone: phoneNumber,
                _method: "PUT"
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataForm)
            });

            const data = await res.json();

            if (res.ok) {
                if (data?.error) {
                    setFormError(data?.error?.message)
                    setIsSubmit(false);
                } else {
                    setFormValue(initialValue);
                    setIsSubmit(false);
                    setFormError("");
                    setUserUpdated(true)
                    // setFormSuccess("Profile updated successfully.")
                    setTimeout(() => {
                        setUserUpdated(false);
                    }, 5000);
                    router.push("/profile")
                }

                // Handle success response here
            } else {
                setIsSubmit(false);
                setFormError(data?.message)
            }
        } catch (error) {
            setIsSubmit(false);
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <div className="okv4-container ">
                <div className="ok-breadcrumb">
                    <ul>
                        <li>
                            <Link href="https://www.onlinekhabar.com/" target='_blank'>अनलाइनखबर </Link>
                        </li>
                        <li>
                            <Link href="/">क्यालेन्डर</Link>
                        </li>
                        <li>
                            <Link href="/profile">प्रोफाइल</Link>
                        </li>
                        <li className='active'>
                            प्रोफाइल अपडेट
                        </li>
                    </ul>
                </div>

                <div className="ok-bg">

                    <div className="ok-desc-content mt-1 p-0">
                        <h4 className='ok-main-title'>
                            प्रोफाइल अपडेट
                        </h4>
                        <div className="ok-edit-profile">
                            {userInfo && (
                                <>

                                    <div className='user-profile-info ok-schedule__form mt-0'>

                                        <form onSubmit={(e) => handleSubmit(e)}>


                                            <div className="">

                                                <div className='ok-edit-profile-grid'>
                                                    <div>
                                                        <div className="wrapper">
                                                            <div className="ok-user__profile">
                                                                {
                                                                    avatar ? (
                                                                        <>
                                                                            <img src={avatar} alt="User Image" />
                                                                        </>
                                                                    ) : (
                                                                        // <span>
                                                                        //     {
                                                                        //         userInfo && userInfo.display_name && userInfo.display_name.charAt(0)
                                                                        //     }
                                                                        // </span>
                                                                        <Image
                                                                            width={150}
                                                                            height={150}
                                                                            src="/img/ok-user.png"
                                                                            alt='user'
                                                                        />
                                                                    )
                                                                }
                                                                <label className='ok-user-edit-icon' htmlFor='avatar-profile' onClick={() => setIsUploaded(true)}>
                                                                    <FaPencil />
                                                                </label>
                                                                <input type="file" id='avatar-profile' onChange={handleImage} hidden />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='grid-item grid-item-2 row-gap-0 grid-gap-20'>
                                                        <div className="wrapper span-2">
                                                            <label htmlFor="display_name">Display Name<sup>*</sup></label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    id="display_name"
                                                                    name='display_name'
                                                                    value={formValue.display_name}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="wrapper">
                                                            <label htmlFor="phone">Phone</label>
                                                            <div>
                                                                {/* <input
                                                                    type="number"
                                                                    id="phone"
                                                                    name='phone'
                                                                    value={formValue.phone}
                                                                    onChange={handleChange}
                                                                /> */}

                                                                <PhoneInput
                                                                    country={'np'}
                                                                    value={phoneNumber}
                                                                    onChange={phone => setPhoneNumber(phone)} />
                                                            </div>
                                                        </div>


                                                        <div className="wrapper">
                                                            <label htmlFor="province">Province<sup>*</sup></label>
                                                            <div>
                                                                <select name="province" id="province" value={formValue.province}
                                                                    onChange={handleChange}>
                                                                    <option value="" disabled>Select Province</option>
                                                                    <option value="Province No. 1">Province No. 1</option>
                                                                    <option value="Province No. 2">Province No. 2</option>
                                                                    <option value="Bagmati Province">Bagmati Province</option>
                                                                    <option value="Gandaki Province">Gandaki Province</option>
                                                                    <option value="Lumbini Province">Lumbini Province</option>
                                                                    <option value="Karnali Province">Karnali Province</option>
                                                                    <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="wrapper span-2">
                                                    <label htmlFor="bio">Bio</label>
                                                    <div>
                                                        <textarea id="bio"
                                                            cols={30}
                                                            rows={10}
                                                            name='bio'
                                                            value={formValue.bio}
                                                            onChange={handleChange}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='wrapper'>
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

                                            </div>

                                            <div className='wrapper gap-1 flx flex-wrap'>
                                                <button style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginBottom: "0px"
                                                }} disabled={isSubmit ? true : false} className="btn primary primary-gradient " type="submit"
                                                >
                                                    {isSubmit ?
                                                        (
                                                            <>
                                                                कृपया पर्खनुहोस्
                                                                <span className="loader ok-btn-loader"></span>
                                                            </>
                                                        )
                                                        : "प्रोफाइल अपडेट गर्नुहोस्"}

                                                </button>
                                                <Link href="/profile" className="btn danger ">रद्द गर्नुहोस्</Link>
                                            </div>
                                        </form>
                                    </div>


                                </>
                            )}
                        </div>


                    </div>
                </div>

            </div>
        </>
    );
};

export default EditProfile;