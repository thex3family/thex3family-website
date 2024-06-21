import React from 'react';
import programs from './externalPrograms.json';
import content from './externalContent.json';

const DropdownSelect: React.FC = () => {
  return (
    <div>
      <h2>Select a Program</h2>
      <select>
        {programs.map((program, index) => (
          <option key={index} value={program.title}>{program.title}</option>
        ))}
      </select>

      <h2>Select Content</h2>
      <select>
        {content.map((contentItem, index) => (
          <option key={index} value={contentItem.title}>{contentItem.title}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelect;
