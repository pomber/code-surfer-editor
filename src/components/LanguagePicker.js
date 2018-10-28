import React, { memo } from "react";
import { Prism } from "prism-react-renderer";

const languages = Object.keys(Prism.languages)
  .filter(key => typeof Prism.languages[key] !== "function")
  .sort();

const languageElements = languages.map(language => (
  <option value={language} key={language}>
    {language}
  </option>
));

const LanguagePicker = ({ value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)}>
    {languageElements}
  </select>
);

export default memo(LanguagePicker);
