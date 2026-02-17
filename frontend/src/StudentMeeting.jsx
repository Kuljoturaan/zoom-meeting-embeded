import React from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import axios from "axios";
import "./App.css";

const StudentMeeting = () => {
  const startMeeting = async () => {
    const meetingNumber = import.meta.env.VITE_ZOOM_MEETING_NUMBER;
    const passWord = import.meta.env.VITE_ZOOM_MEETING_PASSWORD;
    const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY;
    const emailId = import.meta.env.VITE_ZOOM_ADMIN_EMAILID;

    const { data } = await axios.post("http://localhost:5000/auth", {
      meetingNumber,
      role: 0,
    });

    ZoomMtg.init({
      leaveUrl: window.location.origin,

      success: () => {
        document.getElementById("zmmtg-root").style.display = "block";
        ZoomMtg.join({
          signature: data.signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: "User",
          userEmail: emailId,
          success: (res) => console.log("Joined as User!", res),
          error: (err) => console.log(err),
        });
      },
    });
  };

  return (
    <div className="App">
      <div id="zmmtg-root"></div>
      <button onClick={startMeeting}>Join Class</button>
    </div>
  );
};
export default StudentMeeting;
