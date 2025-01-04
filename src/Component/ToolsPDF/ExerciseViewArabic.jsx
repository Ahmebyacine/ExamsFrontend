import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';

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
  image: {
    marginHorizontal: 'auto',
    resizeMode: 'contain',
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

const ExerciseViewArabic = ({ item }) => {
  const positionClassesMap = {
    right: styles.flexRow,
    left: styles.flexRowReverse,
    top: styles.flexColReverse,
    bottom: styles.flexCol,
  };

  const imgBoolean = item.imagePosition === 'top' || item.imagePosition === 'bottom';

  return (
    <View style={positionClassesMap[item.imagePosition] || styles.flexRow}>
      <View style={[!imgBoolean && { flex: 1 }]}>
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
        <View style={[imgBoolean ? { width: '100%' } : { width: '50%' },{height: 'auto'},styles.flexRow]}>
          {item.image && (
            <Image
              src={item.image}
              style={[!item.secondImage ? [styles.image, !imgBoolean ? { width: '100%' } : { width: '70%' }] : styles.towImage,{ height: 'auto' }]}
              resizeMode="contain"
              debug            
              />
          )}
          {item.secondImage && (
            <Image
              src={item.secondImage}
              style={[!item.image ? [styles.image, !imgBoolean ? { width: '100%' } : { width: '70%' }]: styles.towImage,{ height: 'auto' }]}
              resizeMode="contain"
              debug/>
          )}
        </View>
      )}
    </View>
  );
};

export default ExerciseViewArabic;