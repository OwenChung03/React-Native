import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View,Image,TouchableHighlight,ScrollView,Dimensions, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { format, max } from 'date-fns';
import ImageModal from 'react-native-image-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { tr } from 'date-fns/locale';


const win = Dimensions.get('window');

const Stock =({route,navigation})=> {
    const [loading,setLoading] = React.useState();
    const [ticker,setTicker] = React.useState(route)
    const [selectedValue, setSelectedValue] = React.useState("DEMA");
    const [startdate, setstartDate] = React.useState(new Date('2020-01-01'));
    const [startmode, setstartMode] = React.useState('date');
    const [startshow, setstartShow] = React.useState(false);
    const [stocksData,setStocksData] = React.useState([]);
    const onstartChange = (event, selectedDate) => {
      const currentDate = selectedDate || startdate;
      setstartShow(Platform.OS === 'ios');
      setstartDate(currentDate);
      setLoading(true);
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
      <ScrollView>
        <View 
        style={{width:win.width,height:win.height*0.1,flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          <TouchableHighlight onPress={showDatepicker} style={styles.date} activeOpacity={0.4} underlayColor={'steelblue'}>
            <>
            <Text style={{alignSelf:"center", color:"#5a5a5a",fontSize:18}}>Start Date</Text>
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
            <Text style={{fontSize:15,alignSelf:"center",color:"#5a5a5a"}}>{format(startdate,'yyyy-MM-dd')}</Text>
            </View>
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={showendDatepicker} style={styles.date} activeOpacity={0.4} underlayColor={'steelblue'}>
            <>
            <Text style={{alignSelf:"center",color:"#5a5a5a",fontSize:18}}>End Date</Text>
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
            <Text style={{fontSize:16,alignSelf:"center",color:"#5a5a5a"}}>{format(enddate,'yyyy-MM-dd')}</Text>
            </View>
            </>
          </TouchableHighlight>
        </View>
        <Text style={{height:win.height*0.03,paddingLeft:10,backgroundColor:"#72bcd4"}}>Close Price for {ticker}</Text>
        <View style={{height:win.height*0.22,width:win.width,backgroundColor:"white",justifyContent:"center"}}>
            <ActivityIndicator color="blue" size="large" animating={true} style={{backgroundColor:"white"}}></ActivityIndicator>
          <ImageModal
          source={{
            uri: `https://streamstrartapi.herokuapp.com/close_price/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`,
            method: 'GET'
          }}
          onLoadEnd={()=> {
            setLoading(false);
          }}
          style={{height:win.height*0.2,width:win.width}}
          imageBackgroundColor="white"
          resizeMode="contain"
          />
        </View>
        <Text style={{paddingLeft:10,height:win.height*0.03,backgroundColor:"#72bcd4"}}>Volume for {ticker}</Text>
        <View style={{height:win.height*0.22,width:win.width}}>
          <ImageModal
            source={{
              uri: `https://streamstrartapi.herokuapp.com/volume/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`,
              method: 'GET'
            }}
            style={{height:win.height*0.2,width:win.width}}
            imageBackgroundColor="white"
            resizeMode="contain"
            />
        </View>
        <TouchableHighlight style={{alignSelf:"center",margin:20,marginTop:40,borderColor:"blue",borderRadius:20,borderWidth:2,padding:10}} 
            onPress={() => {
              navigation.navigate('Strategy',{
                ticker: {ticker}
            })
          }}
          activeOpacity={0.4} underlayColor={'steelblue'}
        >
          <Text style={{fontSize:20}}>Test out your strategy</Text>
        </TouchableHighlight>

      </ScrollView>
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
  graph2: {
    height:win.height*0.35,
    width:win.width,
    paddingTop:18,
    paddingBottom:18
  },
  date: {
    borderRadius: 10,
    borderColor: "blue",
    alignContent: "center",
    backgroundColor:"#ADD8E6",
    justifyContent: "center",
    width: win.width*0.4,
    height: win.height*0.07,
    margin: 10,
    marginRight: 20,
  }
})

export default Stock;