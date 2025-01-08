import React from 'react';
import { Text } from '@react-pdf/renderer';
import latexToUnicode from 'latex-to-unicode';

// Function to process text and render LaTeX dynamically
export const renderTextWithLatex = (text) => {
  // Regex to detect LaTeX code (e.g., \(...\) or \[...\])
  const latexRegex = /(\\(?:\(.*?\)|\[.*?\]))/g;

  // Split the text into parts
  const parts = text.split(latexRegex);

  return parts.map((part, index) => {
    // Check if the part is LaTeX
    if (latexRegex.test(part)) {
      const latexCode = part.slice(2, -2);

      const unicodeText = latexToUnicode(latexCode);

      return (
        <Text key={index} style={[{fontFamily: 'Helvetica',direction: 'ltr'}]}>
          {unicodeText}
        </Text>
      );
    } else {
      return part;
    }
  });
};
export const renderTextWithLatexJSX = (text) => {
  // Regex to detect LaTeX code (e.g., \(...\) or \[...\])
  const latexRegex = /(\\(?:\(.*?\)|\[.*?\]))/g;

  // Split the text into parts
  const parts = text.split(latexRegex);

  return parts.map((part, index) => {
    // Check if the part is LaTeX
    if (latexRegex.test(part)) {
      // Extract the LaTeX code (remove the \( and \) or \[ and \])
      const latexCode = part.slice(2, -2);

      // Convert LaTeX to Unicode
      const unicodeText = latexToUnicode(latexCode);

      // Render the Unicode text in a <span> with custom styling
      return (
        <span key={index} style={{ fontFamily: "Helvetica", direction: "ltr" }}>
          {unicodeText}
        </span>
      );
    } else {
      // Render regular text
      return part;
    }
  });
};