import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import Video from 'react-native-video';
import {getVideoData} from '../services/WebServices';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

const VideoList = () => {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  useEffect(() => {
    setLoading(true);
    VideoData();
  }, []);

  const VideoData = () => {
    let form = new FormData();
    form.append('user_id', '489');

    getVideoData(form)
      .then(res => res.json())
      .then(result => {
        console.log(
          '\n\n\n\n VIDEO DATA ==>>' + JSON.stringify(result.data.slice(0, 6)),
        );
        setVideoData(result.data.slice(0, 1));
        setLoading(false);
      });
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      {loading === false && (
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: '#fff',
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <Video
            paused={paused}
            source={{uri: item.VideoLink}} // Can be a URL or a local file.
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            ref={videoPlayer}
            resizeMode={screenType}
            // onFullscreenPlayerDidDismiss={isFullScreen}
            style={styles.video}
          />
          <MediaControls
            duration={duration}
            isLoading={isLoading}
            mainColor="#333"
            onFullScreen={onFullScreen}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}
            toolbar={renderToolbar()}
          />
          {/* <Button
            //   onPress={onPressLearnMore}
            title="Download"
            color="#841584"
          /> */}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Video List</Text>
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-evenly',
          //   backgroundColor: 'red',
        //   alignItems: 'center',
        }}>
        <FlatList
          data={videoData}
          renderItem={renderItem}
          keyExtractor={item => item.VideoID}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    padding: 18,
    elevation: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
  video: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    justifyContent: 'center',
    height: 400,
    width: '90%',
    alignItems: 'center',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default VideoList;
