"use client"
import React, { useEffect, useState } from 'react';
import { DataItem } from '../../../../types/Calendartypes';
import { ReactNode } from 'react';
interface PreviousMonthsProps {
  data?: DataItem[];
  previousdata?: DataItem[];
}

const PreviousMonths: React.FC<PreviousMonthsProps> = ({ data, previousdata }) => {
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (Array.isArray(previousdata)) {
      const foundItems = previousdata.filter(item => item.bs_date_en > 24 && item.bs_date_en < 35);
      setFilteredData(foundItems);
    }
  }, [previousdata]);

  if (!data) {
    return null;
  }
  return (
    <>
      {data[1] && [...Array(data[1]?.day_code_en).keys()].map((_, index) => {
        let value = data[1].day_code_en - index - 2;

        if (value >= 0) {
          const columns: ReactNode[] = [];
          while (value > 0) {
            const adjustedIndex = Math.max(filteredData.length - value, 0);
            const adjustedFilteredData = filteredData[adjustedIndex];
            columns.push(
              <div className="okelm-patro-col-day inactive" key={value}>
                {adjustedFilteredData?.events?.map((event, index) => (
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
                  {adjustedFilteredData && (
                    <div className="column">
                      <span>{adjustedFilteredData.bs_date_np}</span>
                      <span className="col-text-left">{adjustedFilteredData?.tithi?.tithi_title_np}</span>
                      <span className="ok-eng-date">{adjustedFilteredData.ad_date_en}</span>
                    </div>
                  )}
                </div>
              </div>
            );
            value--;
          }
          return columns;
        } else {
          const columns: ReactNode[] = [];
          for (let i = 5; i >= 0; i--) {
            const adjustedIndex = Math.max(filteredData.length - i - 1, 0);
            const adjustedFilteredData = filteredData[adjustedIndex];
            columns.push(
              <div className="okelm-patro-col-day inactive" key={i}>
                {adjustedFilteredData?.events?.map((event, index) => (
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
                {adjustedFilteredData && (
                  <div className="column">
                    <span>{adjustedFilteredData.bs_date_np}</span>
                    <span className="col-text-left">{adjustedFilteredData?.tithi?.tithi_title_np}</span>
                    <span className="ok-eng-date">{adjustedFilteredData.ad_date_en}</span>
                  </div>
                )}
              </div>

            );
          }

          return (
            <React.Fragment key={value}>
              {columns}
            </React.Fragment>
          );
        }
      })}
    </>
  );
}

export default PreviousMonths;