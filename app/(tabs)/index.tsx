import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Animated, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const tabWidth = screenWidth / 3; // Full width of each tab
const underlineWidth = tabWidth / 2; // Half the width for the underline
const imageSize = screenWidth / 3 - 4; // Grid image size

export default function TabOneScreen() {
  const [activeTab, setActiveTab] = useState('grid'); // State for active tab
  const underlineLeft = useRef(new Animated.Value((tabWidth - underlineWidth) / 2)).current; // Initial position
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    const tabIndex = ['grid', 'reels', 'tags'].indexOf(tab);
    Animated.timing(underlineLeft, {
      toValue: tabIndex * tabWidth + (tabWidth - underlineWidth) / 2, // Centered under the tab
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
      <View View style={styles.tabContainer} >
        {
          ['grid', 'reels', 'tags'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => handleTabPress(tab)}
            >
              <MaterialIcons
                name={tab === 'grid' ? 'grid-on' : tab === 'reels' ? 'video-library' : 'tag'}
                size={24}
                color={activeTab === tab ? 'black' : 'gray'}
              />
            </TouchableOpacity>
          ))
        }
        {/* Underline Animation */}
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlineLeft,
              width: underlineWidth,
            },
          ]}
        />
      </View >
    </>
  );

  const renderTabContent = () => {
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
      style={{ backgroundColor: 'white' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
    alignItems: 'center',
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: 'black',
  },
  gridContainer: {
    paddingVertical: 10,
  },
  gridImage: {
    width: imageSize,
    height: imageSize,
    margin: 2,
  },
});
