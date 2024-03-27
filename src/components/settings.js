import React, { useState } from 'react';

const Settings = ({ updateTimerSettings }) => {
  const [formValues, setFormValues] = useState({
    pomodoro: '',
    shortBreak: '',
    longBreak: '',
    longBreakInterval: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTimerSettings(formValues);
  };

  return (
    <div className="settings">
      <h2>Timer Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pomodoro (minutes):
          <input type="number" name="pomodoro" value={formValues.pomodoro} onChange={handleChange} />
        </label>
        <label>
          Short Break (minutes):
          <input type="number" name="shortBreak" value={formValues.shortBreak} onChange={handleChange} />
        </label>
        <label>
          Long Break (minutes):
          <input type="number" name="longBreak" value={formValues.longBreak} onChange={handleChange} />
        </label>
        <label>
          Long Break Interval:
          <input type="number" name="longBreakInterval" value={formValues.longBreakInterval} onChange={handleChange} />
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
