import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableHighlight,ScrollView,Dimensions} from 'react-native';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import { createStackNavigator } from '@react-navigation/stack';
import Stock from './Stock';
import { Searchbar } from 'react-native-paper';
import { Divider} from 'react-native-paper';
import CompanyInfo from './CompanyInfo';
import Strategy from './Strategy';

const win = Dimensions.get('window');
const Stack = createStackNavigator();

const Home = ({navigation}) => {
  const [searchQuery,setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [isLoading,setIsLoading] = React.useState(true);
  const [stocksData,setStocksData] = React.useState([]);

  React.useEffect(()=>{
    axios.get("https://api.airtable.com/v0/appqkdFspwDPd3VSn/Stocks?api_key=keyH65gTF2q7OWIRP")
    .then((response=>{
      setStocksData(response.data);
      setIsLoading(false);
    }))
    .catch((e=>{
      setStocksData(e);
    }))
  },[])

  return (
    <View>
    <Searchbar
          placeholder= 'Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
      />
    <ScrollView style={{marginBottom:50}}>
        {isLoading? <Text>Loading </Text>:
          stocksData.records.map((stockData,index)=>{
            if (stockData['fields']['Ticker'].includes(searchQuery.toUpperCase())) {
              return(
                <TouchableHighlight key={index} style={styles.card} 
                  activeOpacity={0.4} underlayColor={'steelblue'}
                  onPress={() => {
                    navigation.navigate('Stock',{
                      ticker: stockData['fields']['Ticker'],
                      pass: 'asdf'
                  })
                }}
                >
                  <View style={styles.box}>
                    <View>
                      <Text>{stockData['fields']['Ticker']}</Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 10}}>{stockData['fields']['Company']}</Text>
                    </View>
                    {/* <Image style={{width:100,height:50}} source={{uri: stockData['fields']['link']}}></Image> */}
                  </View>
                </TouchableHighlight>
              )
            }
          })
        }
    </ScrollView>
  </View>
  )
}

const Stocks = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stock" component={CompanyInfo}/>
        
        <Stack.Screen name="Strategy" component={Strategy}/>
      </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
  card: {
    width: win.width*0.9,
    backgroundColor: "#add8e6",
    margin: 10,
    flexDirection: "row",
    marginLeft:20,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white"
  },
  box: {
    height: win.height*0.07,
    flex: 1,
    justifyContent: "center",
    padding: 10
  }
});
 
export default Stocks;