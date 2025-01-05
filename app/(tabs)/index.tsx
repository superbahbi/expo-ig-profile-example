import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabOneScreen() {
  const [activeTab, setActiveTab] = useState('grid'); // State for active tab

  const renderTabContent = () => {
    switch (activeTab) {
      case 'grid':
        return <GridSection />;
      case 'reels':
        return <ReelsSection />;
      case 'tags':
        return <TagsSection />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightsContainer}
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
        </View>
        {/* Tab Section */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('grid')}
          >
            <MaterialIcons
              name="grid-on"
              size={24}
              color={activeTab === 'grid' ? 'black' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('reels')}
          >
            <MaterialIcons
              name="video-library"
              size={24}
              color={activeTab === 'reels' ? 'black' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('tags')}
          >
            <MaterialIcons
              name="tag"
              size={24}
              color={activeTab === 'tags' ? 'black' : 'gray'}
            />
          </TouchableOpacity>
        </View>


        {/* Render Tab Content */}
        {renderTabContent()}


      </ScrollView>
    </View>
  );
}

const GridSection = () => (
  <View style={styles.section}>
    <Text>Grid Section</Text>
  </View>
);

const ReelsSection = () => (
  <View style={styles.section}>
    <Text>Reels Section</Text>
  </View>
);

const TagsSection = () => (
  <View style={styles.section}>
    <Text>Tags Section</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    alignItems: 'center',
  },
});
