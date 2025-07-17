// StartMeeting.js

import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Button } from '@mui/material';
import dayjs from 'dayjs';

function StartMeeting() {
  const [meetingDate, setMeetingDate] = useState(dayjs());
  const [callToOrderTime, setCallToOrderTime] = useState(dayjs());
  const [presidingOfficer, setPresidingOfficer] = useState('');
  const [membersPresent, setMembersPresent] = useState('');
  const [agendaAdditions, setAgendaAdditions] = useState('None');

  const officers = [
    'President Heaton', 'Vice President Richards', 'Secretary Norris', 'Treasurer Ransdell',
    'A Shift Rep. Bender', 'B Shift Rep. Volmer', 'C Shift Rep. Dalton',
    'Trustee Shaw', 'Trustee Trick', 'Trustee Renacs'
  ];

  const [attendance, setAttendance] = useState(
    officers.reduce((acc, officer) => { acc[officer] = false; return acc; }, {})
  );

  const handleAttendanceToggle = (officer) => {
    setAttendance(prev => ({ ...prev, [officer]: !prev[officer] }));
  };

  const [reports, setReports] = useState({
    president: '', vicePresident: '', treasurer: '', secretary: '', execBoardChair: '',
    shiftReps: { Bender: '', Volmer: '', Dalton: '' },
    trustees: { Shaw: '', Trick: '', Renacs: '' },
    committees: {
      unionApparel: '', safetyCommittee: '', peerSupport: '', hrCommittee: '',
      bwc: '', pension: '', healthcareInsurance: '', prCommittee: '', galaCommittee: ''
    },
    communicationAndBills: ''
  });

  const handleReportChange = (field, value, subfield = null) => {
    if (subfield) {
      setReports(prev => ({ ...prev, [field]: { ...prev[field], [subfield]: value } }));
    } else {
      setReports(prev => ({ ...prev, [field]: value }));
    }
  };

  const renderReportField = (label, field, subfield = null) => (
    <div style={{ marginBottom: '10px' }}>
      <TextField
        label={label}
        fullWidth
        multiline
        value={subfield ? reports[field][subfield] : reports[field]}
        onChange={(e) => handleReportChange(field, e.target.value, subfield)}
      />
    </div>
  );

  const [sections, setSections] = useState({
    goodWelfare: { text: '', motions: [] },
    unfinishedBusiness: { text: '', motions: [] },
    newBusiness: { text: '', motions: [] }
  });

  const createMotion = () => ({
    madeBy: '', secondBy: '', discussion: '', inFavor: '', opposed: '', abstain: '', subMotion: null
  });

  const handleSectionChange = (section, value) => {
    setSections(prev => ({ ...prev, [section]: { ...prev[section], text: value } }));
  };

  const addMotion = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], motions: [...prev[section].motions, createMotion()] }
    }));
  };

  const updateMotion = (section, motionIndex, field, value) => {
    setSections(prev => {
      const updatedMotions = [...prev[section].motions];
      updatedMotions[motionIndex][field] = value;
      return { ...prev, [section]: { ...prev[section], motions: updatedMotions } };
    });
  };

  const renderMotionFields = (motion, section, motionIndex) => (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <TextField label="Motion made by" fullWidth value={motion.madeBy} onChange={(e) => updateMotion(section, motionIndex, 'madeBy', e.target.value)} />
      <TextField label="Second by" fullWidth value={motion.secondBy} onChange={(e) => updateMotion(section, motionIndex, 'secondBy', e.target.value)} />
      <TextField label="Discussion" fullWidth value={motion.discussion} onChange={(e) => updateMotion(section, motionIndex, 'discussion', e.target.value)} />
      <TextField label="In Favor" fullWidth value={motion.inFavor} onChange={(e) => updateMotion(section, motionIndex, 'inFavor', e.target.value)} />
      <TextField label="Opposed" fullWidth value={motion.opposed} onChange={(e) => updateMotion(section, motionIndex, 'opposed', e.target.value)} />
      <TextField label="Abstain" fullWidth value={motion.abstain} onChange={(e) => updateMotion(section, motionIndex, 'abstain', e.target.value)} />
    </div>
  );

  const renderSection = (label, sectionKey) => (
    <div style={{ marginTop: '20px' }}>
      <h3>{label}</h3>
      <TextField
        label={`${label} Notes`}
        multiline
        fullWidth
        value={sections[sectionKey].text}
        onChange={(e) => handleSectionChange(sectionKey, e.target.value)}
      />
      <Button onClick={() => addMotion(sectionKey)} style={{ marginTop: '10px' }}>Make a Motion</Button>

      {sections[sectionKey].motions.map((motion, index) => (
        renderMotionFields(motion, sectionKey, index)
      ))}
    </div>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h2>Start New Meeting</h2>

      <DatePicker label="Meeting Date" value={meetingDate} onChange={(newValue) => setMeetingDate(newValue)} />
      <TimePicker label="Call to Order Time" value={callToOrderTime} onChange={(newValue) => setCallToOrderTime(newValue)} />

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel>Presiding Officer</InputLabel>
        <Select value={presidingOfficer} onChange={(e) => setPresidingOfficer(e.target.value)}>
          {officers.map((officer) => (
            <MenuItem key={officer} value={officer}>{officer}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Members Present" multiline fullWidth value={membersPresent} onChange={(e) => setMembersPresent(e.target.value)} style={{ marginTop: '20px' }} />
      <TextField label="Additions to the Agenda" fullWidth value={agendaAdditions} onChange={(e) => setAgendaAdditions(e.target.value)} style={{ marginTop: '20px' }} />

      <h3>Roll Call of Officers</h3>
      {officers.map((officer) => (
        <FormControlLabel key={officer} control={<Switch checked={attendance[officer]} onChange={() => handleAttendanceToggle(officer)} color="primary" />} label={`${officer}: ${attendance[officer] ? 'Present' : 'Absent'}`} />
      ))}

      <h3>Reports of Officers and Committees</h3>
      {renderReportField("President's Report", 'president')}
      {renderReportField("Vice President’s Report", 'vicePresident')}
      {renderReportField("Treasurer’s Report", 'treasurer')}
      {renderReportField("Secretary’s Report", 'secretary')}
      {renderReportField("Executive Board Chair Report", 'execBoardChair')}

      <h4>Shift Reps</h4>
      {['Bender', 'Volmer', 'Dalton'].map(rep => (
        renderReportField(`${rep}:`, 'shiftReps', rep)
      ))}

      <h4>Trustees</h4>
      {['Shaw', 'Trick', 'Renacs'].map(trustee => (
        renderReportField(`${trustee}:`, 'trustees', trustee)
      ))}

      <h4>Committees</h4>
      {renderReportField(\"Union Apparel Committee - AJ, Brandenburg\", 'committees', 'unionApparel')}
      {renderReportField(\"Safety Committee (Grismer, Vacant, Hoagland)\", 'committees', 'safetyCommittee')}
      {renderReportField(\"Peer Support (C. Ferguson, Richardson, Gilson)\", 'c

