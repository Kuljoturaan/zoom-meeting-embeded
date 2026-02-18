import React, { useState } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import axios from "axios";
import "./App.css";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const [manualZak, setManualZak] = useState("");
  const startMeeting = async () => {
    const meetingNumber = "86874801127";
    const passWord = "Vu7rjx";
    const sdkKey = import.meta.env.VITE_ZOOM_SDK_KEY;
    // const zakToken = import.meta.env.VITE_ZOOM_ZAK_TOKEN;
    const emailId = import.meta.env.VITE_ZOOM_ADMIN_EMAILID;

    const zakToken = manualZak || import.meta.env.VITE_ZOOM_ZAK_TOKEN;

    const { data } = await axios.post(
      "https://zoom-meeting-embeded-1.onrender.com/auth",
      {
        meetingNumber,
        role: 1,
      },
    );

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
          success: (res) => console.log("Joined as Host!", res),
          error: (err) => console.log(err),
        });
      },
    });
  };

  return (
    <div className="App">
      <div id="zmmtg-root"></div>
      <div className="host-container">
        <h2>Zoom Host Test</h2>
        <p>Enter ZAK Token to start the session</p>
        <input
          type="text"
          placeholder="Paste fresh ZAK Token here"
          value={manualZak}
          className="input-field"
          onChange={(e) => setManualZak(e.target.value)}
        />
        <br />
        <button className="meeting-start-btn" onClick={startMeeting}>
          Join as Admin (Host)
        </button>
      </div>
    </div>
  );
}

export default App;
