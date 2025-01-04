import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  content: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Amiri',
    color: 'black',
    whiteSpace: 'pre-wrap',
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
  },
  image: {
    width: '70%',
    marginHorizontal: 'auto',
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

const ExerciseViewLatino = ({ item }) => {
  const positionClassesMap = {
    right: styles.flexRow,
    left: styles.flexRowReverse,
    top: styles.flexColReverse,
    bottom: styles.flexCol,
  };
  return (
    <View style={positionClassesMap[item.imagePosition] || styles.flexRow}>
      <View>
      {item.content
      .trim()
      .split(/\r?\n/)
      ?.map((line, i) =>
              line
                .replace(/\t/g, ' ')
                .trim()
            )
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
            .map((line, i) =>
              line
                .replace(/\t/g, ' ')
                .trim()
            )
            .filter((line) => line !== '') 
            .map((line, i) => (
              <Text key={`${q._id}-${i}`} style={styles.line}>
                {line}
              </Text>
            ))
        )}
        </View>
      </View>
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
  );
};

export default ExerciseViewLatino;