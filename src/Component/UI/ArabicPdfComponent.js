import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font, pdf } from '@react-pdf/renderer';
import amiri from '../../Data/Amiri-Regular.ttf'

// Register a custom font that supports Arabic characters
Font.register({
  family: 'Amiri',
  src: amiri,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  viewer: {
    width: '100%',
    height: '600px',
  },
  text: {
    fontFamily: 'Amiri',
    fontSize: 12,
    textAlign: 'right',
    direction: 'rtl',
  }
});
const retrievedQuestion ="1/ إليك الخريطتين الآتيتين (1) و(2) إلى أي نوع من الخرائط ينتمي كل من الشكل )1([2] ؟ وماهو المعيار الذي اعتمدته في تحديد نوع هذه الخرائط ؟ ";
      

// Create Document Component
const ArabicPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>مرحبا بالعالم!</Text>
        <Text style={styles.text}>هذا مثال على وثيقة PDF باللغة العربية.</Text>
        <Text style={styles.text}>{retrievedQuestion}</Text>
      </View>
    </Page>
  </Document>
);

// Create ArabicPDFGenerator Component
const ArabicPDFGenerator = () => {
  const handleDownload = async () => {
    const blob = await pdf(<ArabicPDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'arabic-document.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Arabic PDF Generator</h1>
      <PDFViewer style={styles.viewer}>
        <ArabicPDF />
      </PDFViewer>
      <button onClick={handleDownload}>
        Download PDF
      </button>
    </div>
  );
};

export default ArabicPDFGenerator;