import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Animated, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const tabWidth = screenWidth / 3;
const underlineWidth = tabWidth / 2;
const imageSize = screenWidth / 3;

export default function TabOneScreen() {
  const [activeTab, setActiveTab] = useState('grid');
  const underlineLeft = useRef(new Animated.Value((tabWidth - underlineWidth) / 2)).current;
  const [refreshing, setRefreshing] = useState(false);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    const tabIndex = ['grid', 'reels', 'tags'].indexOf(tab);
    Animated.timing(underlineLeft, {
      toValue: tabIndex * tabWidth + (tabWidth - underlineWidth) / 2,
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
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => { }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => { }}
        >
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <MaterialIcons name="person-add" size={20} color="white" />
        </TouchableOpacity>
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
              <View style={styles.highlightImageBorder}>
                <Image
                  source={{ uri: 'https://picsum.photos/100/100' }}
                  style={styles.highlightImage}
                />
              </View>
              <Text style={styles.highlightText}>Highlight {index + 1}</Text>
            </View>
          ))}
      </ScrollView>
    </>
  );

  // Add this new component
  const tabSection = () => (
    <View style={styles.tabContainer}>
      {['grid', 'reels', 'tags'].map((tab, index) => (
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
      ))}
      <Animated.View
        style={[
          styles.underline,
          {
            left: underlineLeft,
            width: underlineWidth,
          },
        ]}
      />
    </View>
  );

  const gridContent = () => {
    const images = Array.from({ length: 21 }, (_, index) => ({
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
    const images = Array.from({ length: 21 }, (_, index) => ({
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
    const images = Array.from({ length: 21 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 100}`,
    }));

    return (
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.tagsImage} />
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
      data={['tabSection', 'tabContent']} // Only the tab content needs to scroll
      renderItem={({ item }) => {
        if (item === 'tabSection') return tabSection();
        if (item === 'tabContent') return renderTabContent();
        return null;
      }}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <>
          {profileHeader()}
        </>
      }
      stickyHeaderIndices={[1]}
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
    gap: 6,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
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
  highlightImageBorder: {
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 999,
    padding: 3,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 999,

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
    gap: 1,
  },
  gridImage: {
    width: imageSize,
    height: imageSize,
    marginInlineEnd: 1,
    marginBottom: 1,
  },
  reelsImage: {
    width: imageSize,
    height: imageSize * 2,
    marginInlineEnd: 1,
    marginBottom: 1,
  },
  tagsImage: {
    width: imageSize,
    height: imageSize,
    marginInlineEnd: 1,
    marginBottom: 1,
  },
});