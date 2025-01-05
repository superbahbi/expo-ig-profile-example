import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3 - 4; // Divide the screen width by 3 with spacing
export default function TabOneScreen() {
  const [activeTab, setActiveTab] = useState('grid'); // State for active tab

  const profileHeader = () => (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://picsum.photos/200/200' }}
          style={styles.avatar}
        />
        {["Posts", "Followers", "Following"].map((label, index) => (
          <View key={index} style={styles.statistic}>
            <Text style={styles.statValue}>100</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Name Section */}
      <View style={styles.name}>
        <Text style={styles.nameText}>John Doe</Text>
      </View>

      {/* Bio Section */}
      <View style={styles.bio}>
        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        {["Edit Profile", "Share Profile"].map((buttonText, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => { }}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Highlight Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlightsContainer}
        style={{ backgroundColor: 'white' }}
      >
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.highlight}>
              <Image
                source={{ uri: 'https://picsum.photos/100/100' }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Highlight {index + 1}</Text>
            </View>
          ))}
      </ScrollView>

      {/* Tab Section */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'grid' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('grid')}
        >
          <MaterialIcons
            name="grid-on"
            size={24}
            color={activeTab === 'grid' ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reels' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('reels')}
        >
          <MaterialIcons
            name="video-library"
            size={24}
            color={activeTab === 'reels' ? 'black' : 'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tags' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('tags')}
        >
          <MaterialIcons
            name="tag"
            size={24}
            color={activeTab === 'tags' ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const gridContent = () => {
    const images = Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 1}`,
    }));

    return (
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.gridImage} />
        )}
        contentContainerStyle={styles.gridContainer}
      />
    );
  };
  const reelsContent = () => {
    const images = Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 50}`,
    }));

    return (
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.reelsImage} />
        )}
        contentContainerStyle={styles.gridContainer}
      />
    );
  };
  const tagsContent = () => {
    const images = Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 100}`,
    }));

    return (
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.gridImage} />
        )}
        contentContainerStyle={styles.gridContainer}
      />
    );
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'grid':
        return gridContent();
      case 'reels':
        return reelsContent();
      case 'tags':
        return tagsContent();
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={['header', 'tabContent']}
      renderItem={({ item }) => {
        if (item === 'header') return profileHeader();
        if (item === 'tabContent') return renderTabContent();
        return null;
      }}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.scrollContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
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
  statistic: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
  },
  name: {
    padding: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    padding: 10,
  },
  bioText: {
    fontSize: 14,
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
  highlightsContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  highlight: {
    alignItems: 'center',
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  highlightText: {
    fontSize: 12,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    width: '10%',
  },
  activeTab: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  inactiveTab: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
  },
  section: {
    alignItems: 'center',
    margin: 10,
  },
  gridContainer: {
    paddingVertical: 10,
  },
  gridImage: {
    width: imageSize,
    height: imageSize,
    margin: 2,
  },
  reelsImage: {
    width: imageSize,
    height: imageSize * 2,
    margin: 2,
  },
  tagsImage: {
    width: imageSize,
    height: imageSize,
    margin: 2,
  },
});
