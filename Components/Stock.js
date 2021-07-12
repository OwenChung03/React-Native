import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View,Image,TouchableHighlight,ScrollView,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-paper';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';


const win = Dimensions.get('window');

const Stock =(route,navigation)=> {
    const {ticker} = route.route.params
    const [selectedValue, setSelectedValue] = React.useState("DEMA");
    const [startdate, setstartDate] = React.useState(new Date('2020-01-01'));
    const [startmode, setstartMode] = React.useState('date');
    const [startshow, setstartShow] = React.useState(false);
    const onstartChange = (event, selectedDate) => {

      const currentDate = selectedDate || startdate;
      setstartShow(Platform.OS === 'ios');
      setstartDate(currentDate);
    };
    const showstartMode = (currentMode) => {
      if (currentMode!= "") {
        setstartShow(true);
        setstartMode(currentMode);
      }
    };
    const showDatepicker = () => {
      showstartMode('date');
    };
    const [enddate, setendDate] = React.useState(new Date('2021-01-01'));
    const [endmode, setendMode] = React.useState('date');
    const [endshow, setendShow] = React.useState(false);
    const onendChange = (event, selectedDate) => {
      const currentDate = selectedDate || enddate;
      setendShow(Platform.OS === 'ios');
      setendDate(currentDate);
    };
    const showendMode = (currentMode) => {
      setendShow(true);
      setendMode(currentMode);
    };
    const showendDatepicker = () => {
      showendMode('date');
    };

  
    return (
      <View style={{ flex: 1}}>
        <Text style={{fontSize: 20,padding:10}}>{ticker}</Text>
          <View style={{width:win.width,height:win.height*0.1,flexDirection:"row",flexWrap:"wrap",alignItems:"center",marginTop:10}}>
            <TouchableHighlight onPress={showDatepicker} style={styles.date}>
              <>
              <Text style={{alignSelf:"center"}}>Start Date</Text>
              {startshow && (
                <DateTimePicker
                  testID="StartDatePicker"
                  value={startdate}
                  mode={startmode}
                  display="default"
                  onChange={onstartChange}
                />
              )}
              <View>
              <Text style={{fontSize:10,alignSelf:"center"}}>{format(startdate,'yyyy-MM-dd')}</Text>
              </View>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={showendDatepicker} style={styles.date}>
              <>
              <Text style={{alignSelf:"center"}}>End Date</Text>
              {endshow && (
                <DateTimePicker
                  testID="EndDatePicker"
                  value={enddate}
                  mode={endmode}
                  display="default"
                  onChange={onendChange}
                />
                )}
              <View>
              <Text style={{fontSize:10,alignSelf:"center"}}>{format(enddate,'yyyy-MM-dd')}</Text>
              </View>
              </>
            </TouchableHighlight>
          </View>
        <ScrollView >
          <View style={{height:win.height*0.22,width:win.width,backgroundColor:"#72bcd4"}}>
            <Text style={{paddingLeft:10}}>Close Price for {ticker}</Text>
            <WebView source={{ uri: `https://mysterious-springs-60709.herokuapp.com/close_price/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`}}
                  style={{height:win.height*0.2,width:win.width,marginTop:5}}>
           </WebView>
          </View>
          <View style={{height:win.height*0.22,width:win.width,backgroundColor:"#72bcd4"}}>
            <Text style={{paddingLeft:10}}>Volume for {ticker}</Text>
            <WebView source={{ uri: `https://mysterious-springs-60709.herokuapp.com/volume/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`}}
                  style={{height:win.width*0.2,width:win.width,marginTop:5}}>
          </WebView>
          </View>
          <View style={styles.graph1}>
            <Text style={{paddingLeft:10,backgroundColor:"#72bcd4"}}>Choose Strategy</Text>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 30, width: win.width*0.8 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
              <Picker.Item label="DEMA" value="DEMA"/>
              <Picker.Item label="OBV" value="OBV"/>
              <Picker.Item label="SMA" value="SMA"/>
            </Picker>
            <WebView source={{ uri: `https://mysterious-springs-60709.herokuapp.com/${selectedValue}/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`}}
                  style={{height:win.height*0.3,width:win.width,marginTop:6}}
                  originWhitelist={['*']}>
          </WebView>
          </View>
          <View style={styles.graph}>
            <Text style={{paddingLeft:10,backgroundColor:"#72bcd4"}}>Plots</Text>
            <WebView source={{ uri: `https://mysterious-springs-60709.herokuapp.com/strategy/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`}}
                  style={{height:win.height*0.2,width:win.width,marginTop:6}}
                  originWhitelist={['*']}>
          </WebView>
          </View>
        </ScrollView>
      </View>
      
    );
}
 
const styles = StyleSheet.create({
  graph: {
    height:win.height*0.22,
    width:win.width,
  },
  graph1: {
    height:win.height*0.3,
    width:win.width,
    paddingTop:18,
    paddingBottom:18
  },
  date: {
    borderWidth:2,
    borderRadius: 40,
    borderColor: "#90ee90",
    alignContent: "center",
    justifyContent: "center",
    width: win.width*0.3,
    height: win.height*0.05,
    margin: 10,
    marginRight: 20,
  }
})

export default Stock;