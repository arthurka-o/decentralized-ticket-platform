import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../homePage";
import NewEvent from "../newEvent";
import EventPage from "../eventPage";

export default function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />}></Route>
      <Route path="/new" element={<NewEvent />}></Route>
      <Route path="/eventpage" element={<EventPage />}></Route>
      <Route path="/events/:event" element={<EventPage />}></Route>
    </Routes>
  );
}
