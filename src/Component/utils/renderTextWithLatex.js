import { Text } from '@react-pdf/renderer';
import { InlineMath } from 'react-katex';

export const renderTextWithLatex = (text) => {
  const parts = text.split(/(\$.*?\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    } else {
      return <Text key={i}>{part}</Text>;
    }
  });
};