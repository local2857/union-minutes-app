import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Button, Checkbox, FormGroup } from '@mui/material';
import dayjs from 'dayjs';

function StartMeeting() {
  const [meetingDate, setMeetingDate] = useState(dayjs());
  const [callToOrderTime, setCallToOrderTime] = useState(dayjs());
  const [presidingOfficer, setPresidingOfficer] = useState('');
  const [membersPresent, setMembersPresent] = useState('');
  const [agendaAdditions, setAgendaAdditions] = useState('None');
  const [minutesApproved, setMinutesApproved] = useState(false);
  const [minutesCorrections, setMinutesCorrections] = useState(false);
  const [membershipApplications, setMembershipApplications] = useState('');
  const [voteNA, setVoteNA] = useState(false);
  const [motionDetails, setMotionDetails] = useState({
    motionText: '',
    madeBy: '',
    secondBy: '',
    discussion: '',
    inFavor: '',
    opposed: '',
    abstain: ''
  });

  const officers = [
    'President Heaton',
    'Vice President Richards',
    'Secretary Norris',
    'Treasurer Ransdell',
    'A Shift Rep. Bender',
    'B Shift Rep. Volmer',
    'C Shift Rep. Dalton',
    'Trustee Shaw',
    'Trustee Trick',
    'Trustee Renacs'
  ];

  const [attendance, setAttendance] = useState(
    officers.reduce((acc, officer) => {
      acc[officer] = false;
      return acc;
    }, {})
  );

  const handleAttendanceToggle = (officer) => {
    setAttendance(prev => ({ ...prev, [officer]: !prev[officer] }));
  };

  const handleSetNoApplications = () => {
    setMembershipApplications('None');
  };

  const handleMotionChange = (field, value) => {
    setMotionDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Meeting Date:', meetingDate.format('MM/DD/YYYY'));
    console.log('Call to Order Time:', callToOrderTime.format('HH:mm'));
    console.log('Presiding Officer:', presidingOfficer);
    console.log('Members Present:', membersPresent);
    console.log('Agenda Additions:', agendaAdditions);
    console.log('Minutes Approved:', minutesApproved);
    console.log('Approved with Corrections:', minutesCorrections);
    console.log('Membership Applications:', membershipApplications);
    console.log('Voting on Application: N/A -', voteNA);
    console.log('Motion Details:', motionDetails);
    console.log('Attendance:', attendance);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h2>Start New Meeting</h2>

      <DatePicker
        label="Meeting Date"
        value={meetingDate}
        onChange={(newValue) => setMeetingDate(newValue)}
      />

      <TimePicker
        label="Call to Order Time"
        value={callToOrderTime}
        onChange={(newValue) => setCallToOrderTime(newValue)}
      />

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel>Presiding Officer</InputLabel>
        <Select
          value={presidingOfficer}
          onChange={(e) => setPresidingOfficer(e.target.value)}
        >
          {officers.map((officer) => (
            <MenuItem key={officer} value={officer}>{officer}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Members Present"
        multiline
        fullWidth
        value={membersPresent}
        onChange={(e) => setMembersPresent(e.target.value)}
        style={{ marginTop: '20px' }}
      />

      <TextField
        label="Additions to the Agenda"
        fullWidth
        value={agendaAdditions}
        onChange={(e) => setAgendaAdditions(e.target.value)}
        style={{ marginTop: '20px' }}
      />

      <h3>Roll Call of Officers</h3>
      {officers.map((officer) => (
        <FormControlLabel
          key={officer}
          control={<Switch checked={attendance[officer]} onChange={() => handleAttendanceToggle(officer)} color="primary" />}
          label={`${officer}: ${attendance[officer] ? 'Present' : 'Absent'}`}
        />
      ))}

      <h3>Approval of Minutes</h3>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={minutesApproved} onChange={(e) => setMinutesApproved(e.target.checked)} />}
          label="Minutes are Approved"
        />
        <FormControlLabel
          control={<Checkbox checked={minutesCorrections} onChange={(e) => setMinutesCorrections(e.target.checked)} />}
          label="Approved with certain corrections"
        />
      </FormGroup>

      <h3>Application for Membership</h3>
      <TextField
        label="Applicant Names"
        multiline
        fullWidth
        value={membershipApplications}
        onChange={(e) => setMembershipApplications(e.target.value)}
      />
      <Button onClick={handleSetNoApplications} style={{ marginTop: '10px' }}>
        None
      </Button>

      <h3>Voting on Application for Membership</h3>
      <Button onClick={() => setVoteNA(true)}>N/A</Button>

      {!voteNA && (
        <div>
          <TextField label="A Motion to" fullWidth value={motionDetails.motionText} onChange={(e) => handleMotionChange('motionText', e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Made by" fullWidth value={motionDetails.madeBy} onChange={(e) => handleMotionChange('madeBy', e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Second by" fullWidth value={motionDetails.secondBy} onChange={(e) => handleMotionChange('secondBy', e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Discussion" fullWidth value={motionDetails.discussion} onChange={(e) => handleMotionChange('discussion', e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="In favor" fullWidth value={motionDetails.inFavor} onChange={(e) => handleMotionChange('inFavor', e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Opposed" fullWidth value={motionDetails.opposed} onChange={(e) => handleMotionChange('opposed', e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Abstain" fullWidth value={motionDetails.abstain} onChange={(e) => handleMotionChange('abstain', e.target.value)} style={{ marginTop: '10px' }} />
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Meeting Info
        </Button>
      </div>
    </LocalizationProvider>
  );
}

export default StartMeeting;
