import React, {useCallback, useMemo, useRef} from 'react';
import {View, Button, Text, Dimensions, StyleSheet} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

const App = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  //i.imgur.com/fHyEMsl.jpg
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

  // renders
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View style={{flex: 1}}>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <Button onPress={close} title="Close Modal" color="black" />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <NativeViewGestureHandler disallowInterruption={true}>
              <View style={styles.container}>
                <View style={{flex: 1}}>
                  <SwiperFlatList
                    showPagination
                    data={colors}
                    renderItem={({item}) => (
                      <View style={[styles.child, {backgroundColor: item}]}>
                        <Text style={styles.text}>{item}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            </NativeViewGestureHandler>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default App;
