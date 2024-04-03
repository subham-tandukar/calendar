import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { useRoot } from '../../../../context';
import NepaliDateConverter from 'nepali-date-converter';
import { signOut, useSession } from 'next-auth/react';
// import AuthContext from '../../../../context/AuthContext';
interface OffCanvasProps {
  onClose: () => void;
  isDayCanvas,
  Selecteddate
}

interface Category {
  id: number;
  title_en: string;
  color: string;
}


const ScheduleOffcanvas: React.FC<OffCanvasProps> = ({ onClose, isDayCanvas, Selecteddate }) => {
  const { dropdownitem,eventCreated, setEventCreated } = useRoot()
  const { data: session, status } = useSession();
  const token = session?.data?.token;

  // const { userData } = useContext(AuthContext)
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryid, setCategoryId] = useState<string>("");

  const getCategoryList = async () => {
    const categoryApi = `http://47.128.210.223/api/v1/calendar/event-categories`;

    try {
      const response = await fetch(categoryApi, {
        cache: "no-store"
      });

      if (!response.ok) {
        console.error("Failed to fetch data");
      }

      const data = await response.json();
      setCategoryList(data.data);

      if (data?.data.length > 0) {
        setCategoryId(data?.data[0].id.toString());
      }

    } catch (error) {
      console.error("Failed to fetch data");
      setCategoryList([]);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [dayAfterTomorrow, setDayAfterTomorrow] = useState('');

  useEffect(() => {
    const currentDate = new NepaliDateConverter();
    setToday(currentDate.format('YYYY-M-D'));

    const tomorrowDate = new NepaliDateConverter();
    tomorrowDate.setDate(currentDate.getDate() + 1);
    setTomorrow(tomorrowDate.format('YYYY-M-D'));

    const dayAfterTomorrowDate = new NepaliDateConverter();
    dayAfterTomorrowDate.setDate(currentDate.getDate() + 2);
    setDayAfterTomorrow(dayAfterTomorrowDate.format('YYYY-M-D'));
  }, []);

  const initialValue = {
    scheduledate: "today",
    selectedDate: "",
    fromTime: "",
    toTime: "",
    eventTitle: "",
    location: "",
    note: "",
  };

  const [clearDate, setClearDate] = useState<number | undefined>();
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "scheduledate") {
      formValue.selectedDate = ""

      setClearDate(Math.random());
    }
    setFormValue({ ...formValue, [name]: value });

  };

  const handleDate = ({ bsDate }: { bsDate: string }) => {
    formValue.scheduledate = ""
    setFormValue({ ...formValue, selectedDate: bsDate });
  };
  const [formError, setFormError] = useState<any>("");
  const [formSuccess, setFormSuccess] = useState<any>("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValue.fromTime || !formValue.toTime || !formValue.eventTitle || !formValue.location || !formValue.note) {
      setFormError("All fields are necessary.");
      return;
    }

    try {
      setIsSubmit(true);
      const dataForm = {
        event_category_id: categoryid,
        date_bs: isDayCanvas
          ? Selecteddate?.bs_full_date_en
          : formValue.scheduledate === "today"
            ? today
            : formValue.scheduledate === "tomorrow"
              ? tomorrow
              : formValue.scheduledate === "dayAfterTomorrow"
                ? dayAfterTomorrow
                : formValue.selectedDate,

        event_start_time: formValue.fromTime,
        event_end_time: formValue.toTime,
        event_title: formValue.eventTitle,
        location: formValue.location,
        note: formValue.note,
      }

      const res = await fetch("http://47.128.210.223/api/v1/calendar/add-events", {
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
          setClearDate(Math.random());
          setEventCreated(true);
          setIsSubmit(false);
          setFormError("")
          setFormSuccess("Event created successfully.")
          setTimeout(() => {
            setEventCreated(false);
          }, 1000);
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
      <div className="schedule__offcanvas custom__offcanvas active">
        <div className="overlay" onClick={onClose}></div>
        <div onClick={onClose} className="schedule__offcanvas__close close__offcanvas">
          <img src="./img/close.png" alt="close" />
        </div>
        <div className="offcanvas__content schedule__content">
          <h2>Add Schedule</h2>
          {
            status === 'authenticated' ? (

              <div className="schedule__form">
                <form onSubmit={(e) => handleSubmit(e)}>
                  {
                    categoryList.length > 0 && (
                      <div className="wrapper">
                        <label>Select Category</label>
                        <div className="btn__wrapper">
                          {
                            categoryList.map((item) => (
                              <div className="category__btn" key={item.title_en}>
                                <input type="radio" onChange={() => setCategoryId(item.id.toString())} checked={categoryid === item.id.toString()} id={item.title_en} name="category" />
                                <div className="dot" style={{ background: item.color }}></div>
                                <label className="category__label" htmlFor={item.title_en}>{item.title_en}</label>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    !isDayCanvas && (
                      <div className="wrapper">
                        <label>Select Date</label>
                        <div className="btn__wrapper">
                          <div className="date__btn">
                            <input
                              type="radio"
                              id="today"
                              name="scheduledate"
                              value="today"
                              onChange={handleChange}
                              checked={formValue.scheduledate === "today"}
                            />
                            <label className="date__label" htmlFor="today">आज</label>
                          </div>
                          <div className="date__btn">
                            <input
                              type="radio"
                              id="tomorrow"
                              name="scheduledate"
                              value="tomorrow"
                              onChange={handleChange}
                              checked={formValue.scheduledate === "tomorrow"}
                            />
                            <label className="date__label" htmlFor="tomorrow">भोली</label>
                          </div>
                          <div className="date__btn">
                            <input type="radio"
                              id="dayaftertomorrow"
                              name="scheduledate"
                              value="dayAfterTomorrow"
                              onChange={handleChange}
                              checked={formValue.scheduledate === "dayAfterTomorrow"}
                            />
                            <label className="date__label" htmlFor="dayaftertomorrow">पर्सी</label>
                          </div>
                          <div className="date__btn">
                            <Calendar
                              className="form-control form-control-sm"
                              dateFormat="YYYY-M-D"
                              theme="default"
                              // language={`${dropdownitem === "वि.सं." ? "ne" : "en"}`}
                              language="en"
                              hideDefaultValue={true}
                              placeholder="Other Date"
                              values={formValue.selectedDate}
                              onChange={handleDate}
                              key={clearDate}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <div className="wrapper">
                    <label>Select Time</label>
                    <div className="time__wrapper">
                      <div>
                        <input
                          type="time"
                          name='fromTime'
                          value={formValue.fromTime}
                          onChange={handleChange}
                        />
                      </div>
                      <div>to</div>
                      <div>
                        <input
                          type="time"
                          name='toTime'
                          value={formValue.toTime}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
                    <label htmlFor="event-title">Event Title</label>
                    <div>
                      <input
                        type="text"
                        id="event-title"
                        name='eventTitle'
                        value={formValue.eventTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="wrapper">
                    <label htmlFor="event-location">Location</label>
                    <div>
                      <input
                        type="text"
                        id="event-location"
                        name='location'
                        value={formValue.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="wrapper">
                    <label htmlFor="event-note">Note</label>
                    <div>
                      <textarea
                        id="event-note"
                        cols={30}
                        rows={10}
                        name='note'
                        value={formValue.note}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className='wrapper'>
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

                  </div>
                  <div className="wrapper ">
                    <button disabled={isSubmit ? true : false} className="btn primary primary-gradient rounded" type="submit"
                    >
                      {isSubmit ?
                        (
                          <>
                            कृपया पर्खनुहोस्
                            <span className="loader btn-loader"></span>
                          </>
                        )
                        : "इभेन्ट्स राख्नुहोस्"}

                    </button>
                  </div>
                </form>
              </div>

            ) : (
              <div className='please-login'>
                Please Login to continue
                <Link href="/login" className="btn primary primary-gradient rounded">
                  लगइन
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default ScheduleOffcanvas;