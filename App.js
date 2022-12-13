import {Platform, SafeAreaView, Text, TextInput, View} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import deviceInfoModule from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

const ExpensiveTask = memo(({title}) => {
  console.log('Render: ExpensiveTask');
  let newTitle = useMemo(
    () => title + Math.random().toString().slice(0, 5),
    [title],
  );

  const [count, setCount] = useState(0);

  return (
    <Text
      onPress={() => {
        setCount(_count => (_count += 1));
      }}>
      {newTitle} count:{count}
    </Text>
  );
});

// memo - used for component to decrease unnecessary re-renders, only when props change

const App = () => {
  const [state, setState] = useState('');
  console.log('Render: App');

  const RenderExpensiveTask = useCallback(
    () => <ExpensiveTask title={state} />,
    [],
  );

  const manageColors = () => {
    const bundleId = deviceInfoModule.getBundleId();
    if (bundleId?.includes('red')) {
      return 'red';
    } else if (bundleId?.includes('blue')) {
      return 'blue';
    } else if (bundleId?.includes('green')) {
      return 'green';
    }
  };

  const manageTexts = () => {
    const bundleId = deviceInfoModule.getBundleId();
    if (bundleId?.includes('red')) {
      return Platform.select({
        ios: 'This is Red iOS App',
        android: 'This is Red Android App',
      });
    } else if (bundleId?.includes('blue')) {
      return Platform.select({
        ios: 'This is Blue iOS App',
        android: 'This is Blue Android App',
      });
    } else if (bundleId?.includes('green')) {
      return Platform.select({
        ios: 'This is Green iOS App',
        android: 'This is Green Android App',
      });
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: manageColors(), flex: 1}}>
      {/* <Text>App</Text>
      <TextInput
        style={{borderWidth: 1, borderColor: 'black', margin: 20, padding: 10}}
        value={state}
        onChangeText={setState}
      />
      <RenderExpensiveTask /> */}

      <Text
        style={{
          alignSelf: 'center',
          marginTop: 300,
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        {manageTexts()}
      </Text>
    </SafeAreaView>
  );
};

export default App;
