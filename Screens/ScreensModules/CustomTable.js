import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';


const CustomTable = ({ tableHead, tableData }) => {
    return (
        <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData.map((rowData, index) => (
                <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
            ))}
        </Table>
    )
}

const styles = StyleSheet.create({
    head: { width: 400, backgroundColor: '#1abc9d' },
    row: { backgroundColor: '#f1f8ff', borderBottomColor: '#c1c8Cf', borderBottomWidth: 1 },
    text: { margin: 6 },
});
export default CustomTable;