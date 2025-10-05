import { children } from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors';

const SafeScreen = ({children}) => {
    const insets = useSafeAreaInsets()

    return (
        <View style={{flex: 1,
        paddingTop: insets.top,
        // adding the insets to autoadjust the tab depend on the device.
        paddingBottom: insets.bottom, 
        backgroundColor: COLORS.background,}}>
            {children}
        </View>
    );
};
export default SafeScreen;