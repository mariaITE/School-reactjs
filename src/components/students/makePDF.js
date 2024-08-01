// import React, {useState,useEffect} from 'react';
// import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import Segoeui from './segoeui.ttf'
// import FileList from "../ads/FileList/FileList";
//
//
// Font.register({family: 'Segoe UI', fonts: [{src: Segoeui}]});
// let group = [
//     {
//         "name": "ماريا",
//         "gender":"girl",
//         "class":"one",
//         "age":20
//     },
//     {
//         "name": "raghad",
//         "gender":"girl",
//         "class":"two",
//         "age":20
//     }
// ]
// // const keys=Object.keys(group);
// // const values=Object.values(group);
// const styles =
//     StyleSheet.create(
//         {
//             table: {
//                 marginTop:20 ,
//                 marginBottom:10 ,
//                 marginLeft:70 ,
//                 marginRight:70 ,
//                 display: "table",
//                 width: "75%",
//                 borderStyle: "solid",
//                 borderWidth: 1,
//                 borderRightWidth: 0,
//                 borderBottomWidth: 0
//             },
//             tableRow: {
//
//                 margin: "auto",
//                 flexDirection: "row"
//             },
//             tableCol: {
//
//                 width: "25%",
//                 borderStyle: "solid",
//                 borderWidth: 1,
//                 borderLeftWidth: 0,
//                 borderTopWidth: 0
//             },
//             tableCol1: {
//                 backgroundColor:"gray",
//                 width: "25%",
//                 borderStyle: "solid",
//                 borderWidth: 1,
//                 borderLeftWidth: 0,
//                 borderTopWidth: 0
//             },
//             tableCell: {
//                 fontFamily:"Segoe UI",
//                 margin: "auto",
//                 marginTop: 5,
//                 fontSize: 10
//             },
//
//         });
//   const MakePdf = ({jsonData}) => (
//  // console.log({id})
//
//
//     <Document>
//         <Page style={styles.body}>
//             <View style={styles.table}>
//                 <View style={styles.tableRow}>
//                     <View style={styles.tableCol1}>
//                         <Text style={styles.tableCell}>Product</Text>
//                     </View>
//                     <View style={styles.tableCol1}>
//                         <Text style={styles.tableCell}>Type</Text>
//                     </View>
//                     <View style={styles.tableCol1}>
//                         <Text style={styles.tableCell}>Period</Text>
//                     </View>
//                     <View style={styles.tableCol1}>
//                         <Text style={styles.tableCell}>Price</Text>
//                     </View>
//                 </View>
//                 { jsonData.map((e,index) =>(
//                 <View style={styles.tableRow} key={index}>
//
//                     <View style={styles.tableCol}>
//                         <Text style={styles.tableCell}> {e.name}</Text>
//                     </View>
//                     <View style={styles.tableCol}>
//                         <Text style={styles.tableCell}>{e.nickname} </Text>
//                     </View>
//                     <View style={styles.tableCol}>
//                         <Text style={styles.tableCell}>{e.fatherName} </Text>
//                     </View>
//                     <View style={styles.tableCol}>
//                         <Text style={styles.tableCell}>{e.grandFather} </Text>
//                     </View>
//
//                     {/*<View style={styles.tableCol}>*/}
//                     {/*    <Text style={styles.tableCell}>3 User </Text>*/}
//                     {/*</View>*/}
//                     {/*<View style={styles.tableCol}>*/}
//                     {/*    <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>*/}
//                     {/*</View>*/}
//                     {/*<View style={styles.tableCol}>*/}
//                     {/*    <Text style={styles.tableCell}>5€</Text>*/}
//                     {/*</View>*/}
//                 </View>
//                 ))}
//              </View>
//          </Page>
//       </Document>
//   )
//
//
//
// export default  MakePdf;
