import {Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import amiri from '../../Data/Tajwal.ttf';

Font.register({
  family: 'Amiri',
  src: amiri,
});


const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 10,
    direction: 'rtl',
    fontFamily: 'Amiri',
    fontSize: 12,
    marginVertical:5,
    marginHorizontal:5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop:4,
  },
  centerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop:4,
  },
  header: {
    fontSize: 12,
    marginBottom: 8,
    marginTop:15,
    textAlign: 'center',
    direction: 'rtl',
    fontFamily: 'Amiri',
  },
  text: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Amiri',
    direction: 'rtl',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
});


const HeaderPDF = ({ year, level, material, trimester }) => {
  return (
     <>
        <View style={styles.header}>
          <Text>الجمهورية الجزائرية الديمقراطية الشعبية</Text>
          <Text>وزارة التربية الوطنية</Text>
        </View>
        <View style={styles.section}>
        <View style={styles.horizontalLine} />
          <View style={styles.row}>
            <Text>{`السنة الدراسية: ${year}`}</Text>
            <Text>{`المستوى: ${level}`}</Text>
          </View>
          <View style={styles.row}>
            <Text>المدة: 02 سا و 30 د</Text>
            <Text>{`اختبار في مادة: ${material}`}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <Text style={styles.centerText}>{`امتحان ${trimester}`}</Text>
        </View>
      </>
  );
};

export default HeaderPDF;