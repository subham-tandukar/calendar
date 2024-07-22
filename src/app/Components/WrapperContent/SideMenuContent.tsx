import React from "react";
import Updates from "../News and Updates/Updates/page";
import UpcomingEvents from "../Events/UpcomingEvents/Page";
import Holiday from "../Events/Holiday/page";
import Festival from "../Events/Festival/Page";
const SideMenuContent = ({currentdate}) => {
  return (
    <>
    <div className="ok-for-desktop">

     <Festival/>
    </div>
    <UpcomingEvents currentdate={currentdate} />
     <Holiday currentdate={currentdate} />
      <div className="tab-content-wrap">
        <div
          id="trending"
          className="tab-container pt-10"
          style={{ display: "block" }}
        >
          <Updates />
        </div>
        {/* <div id="latestUpdates" className="tab-container">
          <div className="latest-posts-wrap">
            <div className="okv4-post-ltr">
              <span className="ok-posted-hour">३१ मिनेट</span>
              <div className="okv4-post-content">
                <h2>
                  <a href="#">
                    ज्वरो र सुक्खा खोकीले सतायो ? यसरी जोगिन सकिन्छ
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SideMenuContent;
