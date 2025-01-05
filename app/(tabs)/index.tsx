import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={{
              uri: 'https://picsum.photos/200/200',
            }}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>100</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>Posts</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>100</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>Followers</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>100</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>Following</Text>
        </View>
      </View>
      <View style={styles.name}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>John Doe</Text>
      </View>
      <View style={styles.bio}>
        <Text style={{ fontSize: 14 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
