import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View,Image,Dimensions,ScrollView,TouchableHighlight} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
import { Card,Paragraph,Title} from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import { auto } from 'async';

const win = Dimensions.get('window');
const Stack = createStackNavigator();

const Twitter = () =>{

    const [twitterData,setTwitterData]= React.useState();
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(()=>{
        axios.get("https://mysterious-springs-60709.herokuapp.com/twitter")
        .then((response=>{
        setTwitterData([...response.data])
        setIsLoading(false)
        }))
        .catch((e=>{
        setTwitterData(e)
        }))
    },[])
    return(
        <View>
            {isLoading? <Text>loading</Text>: 
                <ScrollView>
                    {twitterData.map((tweet,index) => {

                        return(
                            <Card key={index} style={styles.card}>
                            <Card.Content>
                                <View style={{height:50,width:50}}>
                                <Image source={{uri:tweet['profile_pic']}}
                                                        style={{ height: 50,borderRadius: 40,borderWidth:1,overflow:"hidden"}}
                                                        resizeMode="contain"/>
                                </View>
                                <Title>{tweet['username']}</Title>
                                <ImageModal  
                                        imageBackgroundColor="#000000"
                                        source={{uri:tweet['image']}}
                                        style={{height:win.height*0.2,width:win.width*0.8}}
                                        resizeMode="contain"/>
                                <Paragraph>{tweet['text']}</Paragraph>
                            </Card.Content>
                            </Card>
                        )
                    })}
                </ScrollView>
            }
        </View>
    )
}

const Stockwits = () => {
    const [searchQuery,setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [stockwitsData,setStockwitsData]= React.useState();
    const [isLoading,setIsLoading] = React.useState(true);
    const [symbol,setSymbol] = React.useState('AAPL');
    const obj = {'AAPL': 'Apple Inc.', 'MSFT': 'Microsoft Corporation', 'AMZN': 'Amazon.com, Inc.',
    'GOOG': 'Alphabet Inc.', 'FB': 'Facebook, Inc.', 'TSLA': 'Tesla, Inc.',
    'BABA': 'Alibaba Group Holding Limited', 'TSM': 'Taiwan Semiconductor Manufacturing Company Limited',
    'JPM': 'JPMorgan Chase & Co.', 'NVDA': 'NVIDIA Corporation', 'DIS': 'The Walt Disney Company',
    'KO': 'The Coca-Cola Company', 'VZ': 'Verizon Communications Inc.', 'INTC': 'Intel Corporation',
    'NFLX': 'Netflix, Inc.', 'PFE': 'Pfizer Inc.', 'BA': 'The Boeing Company', 'SE': 'Sea Limited',
    'SQ': 'Square, Inc.', 'AMD': 'Advanced Micro Devices, Inc.', 'ZM': 'Zoom Video Communications, Inc.',
    'ABNB': 'Airbnb, Inc.', 'GM': 'General Motors Company', 'NIO': 'NIO Inc.', 'F': 'Ford Motor Company',
    'PLTR': 'Palantir Technologies Inc.', 'GME': 'GameStop Corp.', 'AMC': 'AMC Entertainment Holdings, Inc.',
    'BYND': 'Beyond Meat, Inc.', 'BB': 'BlackBerry Limited'}
    const array = Object.keys(obj)
    React.useEffect(()=>{
        axios.get(`https://mysterious-springs-60709.herokuapp.com/stockwits/${symbol}`)
        .then((response=>{
        setStockwitsData(response.data)
        setIsLoading(false)
        }))
        .catch((e=>{
        setIsLoading(true)
        }))
    },[symbol])
    return(
        <>
            {isLoading? <Text>loading</Text>: 
            <View>
            <View style={{marginLeft: 70}}>
                <Text >Search Symbol</Text>
            </View>
            <View style={{width:win.width*0.6,alignSelf:"center"}}>
            <Searchbar
                            placeholder= 'Search'
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                        />
            </View>
            <View style={{borderWidth:2,borderColor:"#99cfe0",borderRadius:40,margin:10,width:win.width*0.6,alignSelf:"center",paddingLeft:10}}>

                <Picker
                        selectedValue={symbol}
                        style={{ height: 50, width: win.width*0.6 }}
                        onValueChange={(itemValue, itemIndex) => setSymbol(itemValue)}
                        >
                        {array.map((symbol,index)=>{
                            return(
                                <Picker.Item label={symbol} value={symbol} key={index} />
                            )
                        })}

                </Picker>
            </View>

                <ScrollView>
                    {stockwitsData.map((post,index) => {
                        return(
                            <Card key={index} style={styles.card}>
                                <Card.Content>
                                    <View style={{height:50,width:50}}>
                                    <Image source={{uri:post['profile_pic']}}
                                                            style={{ height: 50,borderRadius: 40,borderWidth:1,overflow:"hidden"}}
                                                            resizeMode="contain"/>
                                    </View>
                                    <Title>{post['username']}</Title>
                                    <Paragraph>{post['text']}</Paragraph>
                                    <Paragraph>{post['created_at']}</Paragraph>
                                </Card.Content>
                            </Card>
                        )

                    })}
                </ScrollView>
            </View>
            }
        </>
    )
}

const page = () => {
    const [selectedValue, setSelectedValue] = React.useState("Twitter");
    return (

        <View style={styles.page}>
          <View style={styles.container}>      
            <View>
                <Text>
                    Select Dashboard
                </Text>
                <View style={{borderWidth:2,borderColor:"#99cfe0",borderRadius:40,margin:10,paddingLeft:10}}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: win.width*0.8 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                        <Picker.Item label="Twitter" value="Twitter" />
                        <Picker.Item label="Stockwits" value="Stockwits" />
                    </Picker>
                </View>
            </View>
            {selectedValue=="Twitter"? <Twitter/>: <Stockwits/>}
          </View>
        </View>
    );
}

const ForumDiscussion = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='Forum Discussion' component={page} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    page:{
        width: win.width,
        height: win.height,
        paddingTop: 20
    },
    container: {
        width: win.width,
        height: win.height*0.85,
        alignItems: "center"
    },
    picker:{
        borderWidth: 2,
        width:win.width*0.8,
    },
    card: {
        backgroundColor: "#ECECEC",
        margin: 15,
        marginLeft: 30,
        marginRight:30
    }
});


 
export default ForumDiscussion;