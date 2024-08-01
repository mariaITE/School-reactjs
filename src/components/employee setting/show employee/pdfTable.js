import React, {useEffect, useState} from 'react';
import {Document, Page, Text, View, StyleSheet, Font, PDFViewer} from '@react-pdf/renderer';
// import arabicFont from './DUBAI-REGULAR.TTF'
import Segoeui from './segoeui.ttf'
// import "arabic-fonts/src/css/arabic-fonts.css";
// const jsonData =
//     {'Name': 'John Doe',
//     'Age': 25,
//     'Email': 'johndoe@example.com'}
// ;


Font.register({family: 'Segoe UI', fonts: [{src: Segoeui}]});
const styles = StyleSheet.create({
    table: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 70,
        marginRight: 70,
        display: "table",
        width: "75%",
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableCol: {
        flexBasis: '100%',

    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    tableCell1: {
        fontWeight: 'bold',
        fontFamily: 'Segoe UI',
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    },
    tableCol1: {
        backgroundColor: "gray",
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
});


const JsonToPdfConverter = ({info, job}) => {


    console.log("gg", {info})
    console.log("job", {job})
    return (
        <PDFViewer width="100%" height="600px">
            <Document>
                <Page style={styles.body}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol1}><Text
                                style={styles.tableCell1}>التفاصيل</Text></View>
                            <View style={styles.tableCol1}><Text
                                style={styles.tableCell1}>المعلومات</Text> </View>
                        </View>
                        {info.map((item, index) => (
                            <View key={index} style={styles.tableCol}>
                                {Object.entries(item).map(([key, value]) => (
                                    <View key={key} style={styles.tableRow}>
                                        <View key={index} style={styles.tableCol}><Text
                                            style={styles.tableCell1}>{key}</Text></View>
                                        <View key={index} style={styles.tableCol}><Text
                                            style={styles.tableCell1}>{value}</Text> </View>
                                    </View>
                                ))}
                            </View>
                        ))}

                        {job.map((item, index) => (
                            <View key={index} style={styles.tableCol}>
                                {Object.entries(item).map(([key, value]) => (
                                    <View key={key} style={styles.tableRow}>
                                        <View key={index} style={styles.tableCol}> <Text
                                            style={styles.tableCell1}>{key}</Text></View>
                                        <View key={index} style={styles.tableCol}><Text
                                            style={styles.tableCell1}>{value}</Text></View>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>


                </Page>
            </Document>
        </PDFViewer>
    )
}

export default JsonToPdfConverter