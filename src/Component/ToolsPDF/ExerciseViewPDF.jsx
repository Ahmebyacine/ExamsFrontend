import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { isRTL } from '../utils/detectArabic';

const styles = StyleSheet.create({
  content: {
    fontSize: 12,
    marginBottom: 10,
    direction: 'rtl',
    fontFamily: 'Amiri',
    color: 'black',
    whiteSpace: 'pre-wrap',
  },
  list: {
    marginLeft: 20,
    fontSize: 12,
    direction: 'rtl',
    fontFamily: 'Amiri',
    whiteSpace: 'pre-wrap',
  },
  listItem: {
    marginBottom: 5,
    direction: 'rtl',
    whiteSpace: 'pre-wrap',
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    wrap: false,
  },
  image: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'fill',
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
    marginBottom: 10,
  },
});

const ExerciseView = ({ item }) => {
  const textDirection = isRTL(item.content) ? 'rtl' : 'ltr';
  const positionClassesMap = {
    right: styles.flexRow,
    left: styles.flexRowReverse,
    top: styles.flexColReverse,
    bottom: styles.flexCol,
  };
  const safeText = (text) => {
    if (!text) return '';
  return '\u200F' + text;
  };
  return (
    <View style={[positionClassesMap[item.imagePosition] || styles.flexRow, { direction: textDirection }]}>
      <View>
        <Text style={styles.content}>{safeText(item.content)}</Text>
        <View style={styles.list}>
          {item.questions.map((q) => (
            <Text key={q._id} style={styles.listItem}>
              {safeText(q.question)}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.imageContainer}>
        {item.image && (
          <View>
            <Image
              src={item.image}
              style={!item.secondImage ? styles.image : styles.towImage}
            />
          </View>
        )}
        {item.secondImage && (
          <View>
            <Image
              src={item.secondImage}
              style={!item.image ? styles.image : styles.towImage}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ExerciseView;