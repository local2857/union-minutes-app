import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Button, Checkbox, FormGroup } from '@mui/material';
import dayjs from 'dayjs';

function StartMeeting() {
  // Existing states...

  const [sections, setSections] = useState({
    goodWelfare: { text: '', motions: [] },
    unfinishedBusiness: { text: '', motions: [] },
    newBusiness: { text: '', motions: [] }
  });

  const createMotion = () => ({
    madeBy: '',
    secondBy: '',
    discussion: '',
    inFavor: '',
    opposed: '',
    abstain: '',
    subMotion: null
  });

  const handleSectionChange = (section, value) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], text: value }
    }));
  };

  const addMotion = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        motions: [...prev[section].motions, createMotion()]
      }
    }));
  };

  const updateMotion = (section, motionIndex, field, value) => {
    setSections(prev => {
      const updatedMotions = [...prev[section].motions];
      updatedMotions[motionIndex][field] = value;
      return { ...prev, [section]: { ...prev[section], motions: updatedMotions } };
    });
  };

  const addSubMotion = (section, motionIndex) => {
    setSections(prev => {
      const updatedMotions = [...prev[section].motions];
      updatedMotions[motionIndex].subMotion = createMotion();
      return { ...prev, [section]: { ...prev[section], motions: updatedMotions } };
    });
  };

  const addSubSubMotion = (section, motionIndex) => {
    setSections(prev => {
      const updatedMotions = [...prev[section].motions];
      if (updatedMotions[motionIndex].subMotion) {
        updatedMotions[motionIndex].subMotion.subMotion = createMotion();
      }
      return { ...prev, [section]: { ...prev[section], motions: updatedMotions } };
    });
  };

  const renderMotionFields = (motion, section, motionIndex, isSub = false, isSubSub = false) => (
    <div style={{ marginLeft: isSub ? '20px' : isSubSub ? '40px' : '0', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <TextField label="Motion made by" fullWidth value={motion.madeBy} onChange={(e) => updateMotion(section, motionIndex, 'madeBy', e.target.value)} />
      <TextField label="Second by" fullWidth value={motion.secondBy} onChange={(e) => updateMotion(section, motionIndex, 'secondBy', e.target.value)} />
      <TextField label="Discussion" fullWidth value={motion.discussion} onChange={(e) => updateMotion(section, motionIndex, 'discussion', e.target.value)} />
      <TextField label="In Favor" fullWidth value={motion.inFavor} onChange={(e) => updateMotion(section, motionIndex, 'inFavor', e.target.value)} />
      <TextField label="Opposed" fullWidth value={motion.opposed} onChange={(e) => updateMotion(section, motionIndex, 'opposed', e.target.value)} />
      <TextField label="Abstain" fullWidth value={motion.abstain} onChange={(e) => updateMotion(section, motionIndex, 'abstain', e.target.value)} />

      {!motion.subMotion && !isSubSub && (
        <Button onClick={() => addSubMotion(section, motionIndex)}>Make a motion to a motion</Button>
      )}

      {motion.subMotion && renderMotionFields(motion.subMotion, section, motionIndex, true)}

      {motion.subMotion && !motion.subMotion.subMotion && (
        <Button onClick={() => addSubSubMotion(section, motionIndex)}>Make a motion to a motion to a motion</Button>
      )}
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
      {/* Existing components */}

      {renderSection('GOOD WELFARE', 'goodWelfare')}
      {renderSection('UNFINISHED BUSINESS', 'unfinishedBusiness')}
      {renderSection('NEW BUSINESS', 'newBusiness')}

      {/* Existing components */}
    </LocalizationProvider>
  );
}

export default StartMeeting;
