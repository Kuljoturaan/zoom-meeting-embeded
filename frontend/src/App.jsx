import React from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import axios from "axios";
import "./App.css";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const startMeeting = async () => {
    const meetingNumber = import.meta.env.VITE_ZOOM_MEETING_NUMBER;
    const passWord = import.meta.env.VITE_ZOOM_MEETING_PASSWORD;
    const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY;
    const zakToken = import.meta.env.VITE_ZOOM_ZAK_TOKEN;
    const emailId = import.meta.env.VITE_ZOOM_ADMIN_EMAILID;

    

    const { data } = await axios.post("http://localhost:5000/auth", {
      meetingNumber,
      role: 1,
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
          userName: "Kuljot",
          userEmail: emailId,
          zak: zakToken,
          success: (res) => console.log("Joined as Host!"),
          error: (err) => console.log(err),
        });
      },
    });
  };

  return (
    <div className="App">
      <div id="zmmtg-root"></div>
      <button onClick={startMeeting}>Join as Admin (Host)</button>
    </div>
  );
}

export default App;
