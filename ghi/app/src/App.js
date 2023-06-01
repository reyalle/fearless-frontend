import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import MainPage from './MainPage';
import AttendeesList from './AttendeesList';
import AttendConferenceForm from './AttendConferenceForm';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm'
import PresentationForm from './PresentationForm'
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="attendees">
            <Route path="" element={<AttendeesList attendees={props.attendees} />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
