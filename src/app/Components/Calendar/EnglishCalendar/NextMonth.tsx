"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { DataItem } from '../../../../types/Calendartypes';

interface NextMonthProps {
  data: DataItem[];
  Nextmonthdata: DataItem[] | any;
}

const NextMonth: React.FC<NextMonthProps> = ({ data, Nextmonthdata }) => {
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const fixedValue = 18;
  const itemlength = Nextmonthdata.some(item => item.day_code_en) ? Nextmonthdata[0].ad_year_en.length : 0;

  let columnCount = fixedValue - itemlength;

  useEffect(() => {
    if (Array.isArray(Nextmonthdata)) {
      const foundItems = Nextmonthdata.filter(
        item => item.ad_date_en > 0 && item.ad_date_en <= 7
      );

      setFilteredData(foundItems);
    }
  }, [Nextmonthdata, data]);


  const renderColumn = (dayData: DataItem, columnIndex: number) => {

    return (
      <div className="okelm-patro-col-day inactive" key={columnIndex}>
        {dayData.events.map((event, index) => (
          <React.Fragment key={index}>
            {index === 1 && (
              <>
                <span className="box-top">
                  {event.event_title_np}
                </span>


              </>
            )}
          </React.Fragment>
        ))}
        <div className="column">
          <span>{dayData.ad_date_en}</span>

          <div className="col-text-left">
            <span>{dayData.tithi.tithi_title_np}</span>
          </div>
          <div className="eng-date">
            <span>{dayData.bs_date_np}</span>
          </div>
        </div>
      </div>
    );
  };

  const rows: ReactNode[] = [];
  let sundayEncountered = false;
  const maxColumns = 8;
  for (let i = 1; i < columnCount - 1 && i <= maxColumns; i++) {
    const dayData = filteredData.find(item => parseInt(item.ad_date_en) === i);
    if (dayData) {
      if (dayData.day_en === "Sunday") {
        sundayEncountered = true;
        break;
      }

      rows.push(
        <React.Fragment key={i}>
          {renderColumn(dayData, i)}
        </React.Fragment >
      );
    } else {
      rows.push(
        <div className="column" key={i}>

        </div>
      );
    }
  }

  return <>{rows}</>;
};

export default NextMonth;