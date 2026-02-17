import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import AdminPanel from "./App";
import StudentMeeting from "./StudentMeeting";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/student" element={<StudentMeeting />} />
    </Routes>
  </BrowserRouter>
)
