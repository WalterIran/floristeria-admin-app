import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthProvider';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar 
        animated={true}
        barStyle={'dark-content'}
      />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}