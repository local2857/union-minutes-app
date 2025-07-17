import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Button, Checkbox, FormGroup } from '@mui/material';
import dayjs from 'dayjs';

function StartMeeting() {
  // Existing states...

  const initialReports = {
    president: '',
    vicePresident: '',
    treasurer: '',
    secretary: '',
    execBoardChair: '',
    shiftReps: {
      Bendert: '',
      Volmer: '',
      Dalton: ''
    },
    trustees: {
      Shaw: '',
      Trick: '',
      Renacs: ''
    },
    committees: {
      unionApparel: '',
      safetyCommittee: '',
      peerSupport: '',
      hrCommittee: '',
      bwc: '',
      pension: '',
      healthcareInsurance: '',
      prCommittee: '',
      galaCommittee: ''
    },
    communicationAndBills: ''
  };

  const [reports, setReports] = useState(initialReports);

  const handleReportChange = (field, value, subfield = null) => {
    if (subfield) {
      setReports(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: value
        }
      }));
    } else {
      setReports(prev => ({ ...prev, [field]: value }));
    }
  };

  const setNoReport = (field, subfield = null) => {
    handleReportChange(field, 'No Report', subfield);
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
      <Button onClick={() => setNoReport(field, subfield)} style={{ marginTop: '5px' }}>No Report</Button>
    </div>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h3>Reports of Officers and Committees</h3>
      {renderReportField("President's Report", 'president')}
      {renderReportField("Vice President’s Report", 'vicePresident')}
      {renderReportField("Treasurer’s Report", 'treasurer')}
      {renderReportField("Secretary’s Report", 'secretary')}
      {renderReportField("Executive Board Chair Report", 'execBoardChair')}

      <h4>Shift Reps</h4>
      {['Bendert', 'Volmer', 'Dalton'].map(rep => (
        renderReportField(`${rep}:`, 'shiftReps', rep)
      ))}

      <h4>Trustees</h4>
      {['Shaw', 'Trick', 'Renacs'].map(trustee => (
        renderReportField(`${trustee}:`, 'trustees', trustee)
      ))}

      <h4>Committees</h4>
      {renderReportField("Union Apparel Committee - AJ, Brandenburg", 'committees', 'unionApparel')}
      {renderReportField("Safety Committee (Grismer, Vacant, Hoagland)", 'committees', 'safetyCommittee')}
      {renderReportField("Peer Support (C. Ferguson, Richardson, Gilson)", 'committees', 'peerSupport')}
      {renderReportField("HR Committee (BWC, Pension, Healthcare/Insurance)", 'committees', 'hrCommittee')}
      {renderReportField("BWC (Committee Chair Richards)", 'committees', 'bwc')}
      {renderReportField("Pension (Grismer)", 'committees', 'pension')}
      {renderReportField("Healthcare/Insurance (Heaton)", 'committees', 'healthcareInsurance')}
      {renderReportField("PR Committee", 'committees', 'prCommittee')}
      {renderReportField("Gala Committee", 'committees', 'galaCommittee')}

      <h4>Communication and Bills</h4>
      {renderReportField("Communication and Bills", 'communicationAndBills')}
    </LocalizationProvider>
  );
}

export default StartMeeting;
