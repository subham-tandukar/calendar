import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NotFound from '../../../not-found';
import { useRoot } from '../../../../context';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';

const Choosedate = ({ onClose, currentdate, currentYear, currentMonth }) => {
  const router = useRouter();
  const { dropdownitem,siteSetting } = useRoot();
  const [selectedCalendarType, setSelectedCalendarType] = useState(dropdownitem === "वि.सं." ? "bs" : "ad");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose()
    router.push(
      `${selectedCalendarType}?year=${selectedYear}&month=${selectedMonth}`
    );
  };

  return (
    <>
      <div className="ok-custom__popup active yr-month__popup popup__small">
        <div className="overlay" onClick={onClose}></div>
        <div className="ok-custom__popup__model">
          <div className="ok-custom__popup__head">
            <div>
              <h2>वर्ष र महिना रोज्नुहोस्</h2>
            </div>
            <div onClick={onClose} className="yr-month__popup__close close__popup">
              <FaTimes />
            </div>
          </div>
          <div className="ok-custom__popup__content">
            <form onSubmit={handleSubmit}>
              <div className="grid-item grid-item-2 grid-gap-20">
                <div className="span-2">
                  <label htmlFor="calendarType" className="mb-10 d-block">
                    क्यालेन्डर प्रकार छनौट गर्नुहोस्
                  </label>
                  <select
                    id="calendarType"
                    value={selectedCalendarType}
                    onChange={(e) => {
                      setSelectedCalendarType(e.target.value);
                      setSelectedYear(e.target.value === "bs" ? currentdate?.bs_year_en : currentdate?.ad_year_en)
                      setSelectedMonth("1")
                    }}
                  >
                    <option value="bs">विक्रम संवत् (वि.सं.)</option>
                    <option value="ad">ईश्वी संवत् (ई.सं.)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="number" className="mb-10 d-block">
                    वर्ष रोज्नुहोस्
                  </label>
                  <input
                    type="number"
                    id="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-10 d-block">महिना रोज्नुहोस्</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {selectedCalendarType === 'bs' ? (
                      <>
                        <option value="1">बैशाख</option>
                        <option value="2">जेठ</option>
                        <option value="3">असार</option>
                        <option value="4">साउन</option>
                        <option value="5">भदौ</option>
                        <option value="6">असोज</option>
                        <option value="7">कार्तिक</option>
                        <option value="8">मंसिर</option>
                        <option value="9">पौष</option>
                        <option value="10">माघ</option>
                        <option value="11">फागुन</option>
                        <option value="12">चैत</option>
                      </>
                    ) : (
                      <>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <input
                    type="submit"
                    className="btn primary primary-gradient"
                    value={siteSetting?.date_filter_cta_np}
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

export default Choosedate;