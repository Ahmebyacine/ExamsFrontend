import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import HeaderPDF from './HeaderPDF';
import ExerciseView from './ExerciseViewPDF';

const styles = StyleSheet.create({
  page: {
    padding: 15,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid black',
  },
  section: {
    padding: 5,
    flexGrow: 1,
  },
  title: {
    margin:15,
    fontSize: 14,
    direction: 'rtl',
    fontFamily: 'Amiri',
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
});

const ExamDocument = ({ exam ,year, level, material, trimester  }) => {
  
return(
  <Document>
    <Page  style={styles.page} size="A4" >
      <HeaderPDF year={year} level={level} material={material} trimester={trimester} />
      {exam?.map((exercise, i) => (
        <>
        <View key={exercise._id} style={styles.section}>
          <Text style={styles.title}>{`التمرين${i + 1}:`}</Text>
          <View>
            {exercise?.exercise?.map((item, itemIndex) => (
              <ExerciseView 
              key={item._id} 
              item={item} 
              itemIndex={itemIndex}/>
            ))}
          </View>
        </View>
      </>
      ))}
       <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed/>
    </Page>
  </Document>
)};

export default ExamDocument;