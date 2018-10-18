import React from "react";
import { Prism } from "prism-react-renderer";

const languages = Object.keys(Prism.languages).filter(
  key => typeof Prism.languages[key] !== "function"
);

const LanguagePicker = ({ value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)}>
    {languages.map(language => (
      <option value={language} key={language}>
        {language}
      </option>
    ))}
  </select>
);

export default LanguagePicker;
