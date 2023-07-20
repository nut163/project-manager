import React, { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

const DescriptionEditor = ({ initialDescription, handleDescriptionChange }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleEditorChange = (editor, data, value) => {
    setDescription(value);
    handleDescriptionChange(value);
  };

  return (
    <div className="description-editor">
      <MarkdownEditor
        value={description}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default DescriptionEditor;