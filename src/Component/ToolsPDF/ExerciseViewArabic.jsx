import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { renderTextWithLatex } from '../utils/renderTextWithLatex';
const styles = StyleSheet.create({
  content: {
    fontSize: 12,
    fontFamily: 'Amiri',
    whiteSpace: 'pre-wrap',
    direction: 'rtl',
    textAlign: 'right',
  },
  list: {
    marginLeft: 20,
    fontSize: 12,
    fontFamily: 'Amiri',
    whiteSpace: 'pre-wrap',
  },
  listItem: {
    marginBottom: 5,
    whiteSpace: 'pre-wrap',
  },
  line: {
    fontFamily: 'Amiri',
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.6,
    direction: 'rtl',
    textAlign: 'right',
  },
  towImage: {
    width: '50%',
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  flexRowReverse: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
  flexCol: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  flexColReverse: {
    flexDirection: 'column-reverse',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:5,
  },
  singleImage: {
    width: '70%',
    marginHorizontal: 'auto',
  },
  doubleImage: {
    width: '50%',
    marginVertical: 'auto',
  },
  image: {},
});

const ExerciseViewArabic = ({ item }) => {
  const positionClassesMap = {
    right: styles.flexRow,
    left: styles.flexRowReverse,
    top: styles.flexColReverse,
    bottom: styles.flexCol,
  };

  const imgBoolean = item.imagePosition === 'top' || item.imagePosition === 'bottom';
  const content=`just an test for the text side $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$`;
 console.log(renderTextWithLatex(content))
  return (
    <View style={positionClassesMap[item.imagePosition] || styles.flexRow}>
      <View style={!imgBoolean && { flex: 1 }}>
        {item.content
          .trim()
          .split(/\r?\n/)
          ?.map((line, i) => line.replace(/\t/g, ' ').trim())
          ?.filter((line) => line !== '')
          ?.map((line, i) => (
            <Text key={i} style={styles.content}>
              {line}
            </Text>
          ))}
        <View style={styles.list}>
          {item.questions.map((q) =>
            q.question
              .trim()
              .split(/\r?\n/)
              .map((line, i) => line.replace(/\t/g, ' ').trim())
              .filter((line) => line !== '')
              .map((line, i) => (
                <Text key={`${q._id}-${i}`} style={styles.line}>
                  {line}
                </Text>
              ))
          )}
        </View>
      </View>
     {(item.image || item.secondImage) && (
      <View style={[styles.imageContainer,imgBoolean ? { width: '100%' } : { width: '50%' }]} break>
          {item.image && (
            <View
              style={
                item.image && item.secondImage
                  ? styles.doubleImage
                  : imgBoolean ? styles.singleImage :{ width: '100%' }
              }
            >
              <Image
                src={item.image}
                alt={`Exercise illustration 1`}
                style={styles.image}
              />
            </View>
          )}
          {item.secondImage && (
            <View
              style={
                item.image && item.secondImage
                  ? styles.doubleImage
                  : imgBoolean ? styles.singleImage :{ width: '100%' }
              }
            >
              <Image
                src={item.secondImage}
                alt={`Exercise illustration  2`}
                style={styles.image}
              />
            </View>
          )}
        </View>
       )}
    </View>
  );
};

export default ExerciseViewArabic;