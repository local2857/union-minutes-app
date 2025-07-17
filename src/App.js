import StartMeeting from './StartMeeting';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
  return (
    <div>
      <h1>Union Meeting Minutes App</h1>
      <Button variant="contained" color="primary" component={Link} to="/start-meeting">
        Start New Meeting
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/view-meetings" style={{ marginLeft: '10px' }}>
        View Previous Meetings
      </Button>
    </div>
  );
}


function ViewMeetings() {
  return <h2>View Previous Meetings Page</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-meeting" element={<StartMeeting />} />
        <Route path="/view-meetings" element={<ViewMeetings />} />
      </Routes>
    </Router>
  );
}

export default App;
