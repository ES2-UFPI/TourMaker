import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    Screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    Container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    NavigationButtons: {
        color: '#1abc9c'
    },
    TableButtons: {
        width: 66,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2,
        justifyContent: 'center'
    },
    TableButtonsText: {
        textAlign: 'center',
        color: '#fff'
    },
});

export default Styles;