import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const { width: screenWidth } = Dimensions.get('window');
const tabWidth = screenWidth / 3;
const underlineWidth = tabWidth / 2;
const imageSize = screenWidth / 3;

// Constants for Tabs
const TABS = [
  { key: 'first', title: 'Grid', icon: 'grid-on' },
  { key: 'second', title: 'Reels', icon: 'video-library' },
  { key: 'third', title: 'Tagged', icon: 'person-pin' },
];

// Reusable ImageGrid Component
const ImageGrid = ({ data, style }: { data: any, style: any }) => (
  <FlatList
    data={data}
    keyExtractor={(item: any) => item.id}
    numColumns={3}
    renderItem={({ item }) => <Image source={{ uri: item.uri }} style={style} />}
    bounces={false}
    scrollEnabled={true}
    nestedScrollEnabled
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.gridContainer}
  />
);

// Scene Definitions
const GridRoute = () => (
  <ImageGrid
    data={Array.from({ length: 21 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 1}`,
    }))}
    style={styles.gridImage}
  />
);

const ReelsRoute = () => (
  <ImageGrid
    data={Array.from({ length: 21 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 50}`,
    }))}
    style={styles.reelsImage}
  />
);

const TaggedRoute = () => (
  <ImageGrid
    data={Array.from({ length: 21 }, (_, index) => ({
      id: index.toString(),
      uri: `https://picsum.photos/200/200?random=${index + 100}`,
    }))}
    style={styles.tagsImage}
  />
);

const renderScene = SceneMap({
  first: GridRoute,
  second: ReelsRoute,
  third: TaggedRoute,
});

// Profile Header Component
const ProfileHeader = () => (
  <View>
    <View style={styles.header}>
      <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.avatar} />
      {['Posts', 'Followers', 'Following'].map((label, index) => (
        <View key={index} style={styles.statistic}>
          <Text style={styles.statValue}>100</Text>
          <Text style={styles.statLabel}>{label}</Text>
        </View>
      ))}
    </View>
    <View style={styles.name}>
      <Text style={styles.nameText}>John Doe</Text>
    </View>
    <View style={styles.bio}>
      <Text style={styles.bioText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, { flex: 1 }]}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { flex: 1 }]}>
        <Text style={styles.buttonText}>Share Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="person-add" size={20} color="white" />
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
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
  </View>
);

// Main Component
const TabOneScreen = () => {
  const colorScheme = useColorScheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const underlineLeft = useRef(new Animated.Value((tabWidth - underlineWidth) / 2)).current;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    Animated.timing(underlineLeft, {
      toValue: index * tabWidth + (tabWidth - underlineWidth) / 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [index]);

  // Modify handleTabPress to only update the index
  const handleTabPress = (tabIndex: number) => {
    setIndex(tabIndex);
  };

  const renderTabBar = (props: any) => (
    <View style={styles.tabContainer}>
      {props.navigationState.routes.map((route: any, i: number) => (
        <TouchableOpacity key={route.key} style={styles.tab} onPress={() => handleTabPress(i)}>
          <MaterialIcons
            name={route.icon}
            size={24}
            color={i === index ? colorScheme === 'dark' ? '#fff' : '#000' : '#666'}
          />
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[
          styles.underline,
          {
            width: underlineWidth,
            left: underlineLeft,
            backgroundColor: colorScheme === 'dark' ? '#fff' : '#000',
          },
        ]}
      />
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <ProfileHeader />
            <View>
              {renderTabBar({ navigationState: { index, routes: TABS } })}
            </View>
          </>
        )}
        ListHeaderComponentStyle={{ backgroundColor: 'transparent' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        data={[{ key: 'tabview' }]}
        renderItem={() => (
          <TabView
            navigationState={{ index, routes: TABS }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={() => null}
            style={[styles.tabView, { flex: 1 }]}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    height: screenWidth * 2,
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
  highlight: {
    paddingVertical: 20,
    paddingLeft: 10,
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
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
  gridContainer: {
    flex: 1,
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

export default TabOneScreen;