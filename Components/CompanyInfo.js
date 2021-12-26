import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View,Image,TouchableHighlight,ScrollView,Dimensions,ActivityIndicator} from 'react-native';
import { format } from 'date-fns';
import { Card,Paragraph,Title} from 'react-native-paper';
import Stock from './Stock';
import { ar } from 'date-fns/locale';
import { cos } from 'react-native-reanimated';

const win = Dimensions.get('window');
const CompanyInfo = ({route,navigation}) =>{
    const [ticker,setTicker] = React.useState(route.params.ticker)
    const [token,setToken] = React.useState("pk_8e2a036135224e6986bdcc0151e51f2d")
    const [baseUrl,setbaseUrl] = React.useState("https://cloud.iexapis.com/stable")
    const [overviewData,setOverviewData] = React.useState({})
    const [statsData,setstatsData] = React.useState({})
    const [fundamentals,setFundamentals] = React.useState([])
    const [dividens,setDividens] = React.useState([])
    const [news,setNews] = React.useState([])
    const [ownership,setOwnership] = React.useState([])
    const [insider,setInsider] = React.useState([])
    const [selection,setSelection] = React.useState('Overview')
    const [loading,setLoading] = React.useState(true) 
    const [img,setImg] = React.useState('')
    const [score,setScore] = React.useState([]);
    const array = ['Overview','Fundamentals','News','Ownership','Strategy']
    const data = ['Mean','Standard Deviation','Min','Max']
    
    React.useEffect( ()=>{
        axios.get(`${baseUrl}/stock/${ticker}/company?token=${token}`)
        .then((response=>{
            setOverviewData(response.data)
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/stock/${ticker}/advanced-stats?token=${token}`)
        .then((response=>{
            setstatsData(response.data)
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/stock/${ticker}/logo?token=${token}`)
        .then((response=>{
            setImg(response.data)
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/time-series/fundamentals/${ticker}/quarterly?last=4&token=${token}`)
        .then((response=>{
            setFundamentals([...response.data])
           
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/stock/${ticker}/dividends/5y?token=${token}`)
        .then((response=>{
            setDividens([...response.data])
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/stock/${ticker}/news/last/10?token=${token}`)
        .then((response=>{
            setNews([...response.data])
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`https://streamstrartapi.herokuapp.com/sentiment/${ticker}`)
        .then((response=>{
            setScore([...response.data])
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/stock/${ticker}/institutional-ownership?token=${token}`)
        .then((response=>{
            setLoading(false)
            setOwnership([...response.data])
        }))
        .catch((e=>{
            setLoading(true);
        }))
        axios.get(`${baseUrl}/stock/${ticker}/insider-transactions?token=${token}`)
        .then((response=>{
            setLoading(false)
            setInsider([...response.data])
        }))
        .catch((e=>{
            setLoading(true);
        }))
    },[])
                                   
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
        return time;
    }
    
    const date = (date) => {
        var a = new Date(date * 1000)
        return a.toLocaleDateString("en-US")
    }

    
    return (
        <View style={{width:win.width,height:win.height}}>
            {loading ? 
                <View style={{paddingBottom:100,flex:1,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator style='50' color="blue"></ActivityIndicator>
                </View>

            :   
            <View style={{alignItems:"flex-start"}}>
                <Text style={{fontSize: 20,padding:10}}>{ticker}</Text>
                <View style={{width:win.width,borderTopColor:"black",borderWidth:1}}/>
                <Picker
                    selectedValue={selection}
                    style={{ height: 50, width: win.width*0.6 }}
                    onValueChange={(itemValue, itemIndex) => setSelection(itemValue)}    
                >
                    {array.map((symbol,index)=>{
                        return(
                            <Picker.Item label={symbol} value={symbol} key={index} />
                        )
                    })}
                </Picker>

                <ScrollView style={{padding:win.width*0.03,paddingBottom:200}}>
                    {
                        selection == "Overview" ? 
                        <>    
                        <View style={{position:"absolute",left:win.width*0.5}}>
                            <Image
                                source={{uri: img.url}}
                                style={{height:80,width:80}}
                            >
                            </Image>
                        </View>      
                        <View>
                            
                            <Text>Company Name</Text>
                            <Text>{overviewData.companyName}</Text>
                            <Text></Text>
                            <Text></Text>
                            <Text>Company Description</Text>
                            <Text>{overviewData.description}</Text>
                            <Text></Text>
                            <Text>CEO</Text>
                            <Text>{overviewData.CEO}</Text>
                        </View>  
                    </>
 
                        : selection == "News" ? 
                        <View style={{marginBottom:win.height*0.3}}>
                            <Text>
                            Sentiment Analysis Results for Following News 
                            </Text>
                            <Text>
                            (-1 indicates extreme negative emotion, +1 indicates extreme positive emotion)
                            </Text>
                            <Text>
                            </Text>
                            {
                                score.map((sc,index)=>{
                                    return(
                                        <View key={index} style={{width:"100%",height:80,flexDirection:"row"}}>
                                            <View style={{height:30,width:"25%"}}>
                                                <View >
                                                    <Text style={{borderWidth:1,padding:1}}>  Mean</Text>
                                                </View>
                                                <View>
                                                    <Text style={{borderWidth:1,padding:1}}>  {sc.Mean}</Text>
                                                </View>
                                            </View>
                                            <View style={{height:30,width:"35%"}}>
                                                <View >
                                                    <Text style={{borderWidth:1,padding:1}}> Standard Deviation</Text>
                                                </View>
                                                <View>
                                                    <Text style={{borderWidth:1,padding:1}}>  {sc.sd}</Text>
                                                </View>
                                            </View>
                                            <View style={{height:30,width:"20%"}}>
                                                <View >
                                                    <Text style={{borderWidth:1,padding:1}}>  Min</Text>
                                                </View>
                                                <View>
                                                    <Text style={{borderWidth:1,padding:1}}>  {sc.Min}</Text>
                                                </View>
                                            </View>
                                            <View style={{height:30,width:"20%"}}>
                                                <View >
                                                    <Text style={{borderWidth:1,padding:1}}>  Max</Text>
                                                </View>
                                                <View>
                                                    <Text style={{borderWidth:1,padding:1}}>  {sc.Max}</Text>
                                                </View>
                                            </View>
                                            
                                        </View>
                                    )
                                })
                            }

                            {
                                news.map((article,index)=>{
                                    return(
                                        <View style={{marginBottom:30}} key={index}>
                                            <Card>
                                                <Card.Content>
                                                <Title>{article.headline}</Title>
                                                <Paragraph>{timeConverter(article.datetime/1000)}</Paragraph>
                                                <Paragraph style={{marginBottom:10}}>{article.summary}</Paragraph>
                                                </Card.Content>
                                                <Card.Cover
                                                        source={{
                                                            uri:article.image
                                                        }}
                                                        />
                                            </Card>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        : selection == "Fundamentals"?
                        <View style={{width:win.width*0.9,marginBottom:150}}>
                            <Card style={{marginBottom:30}}>
                                <Card.Content>
                                    <Title>Ratio</Title>
                                    <Text>P/E</Text>
                                    <Text>{statsData.peRatio}</Text>
                                    <Text>Forward P/E</Text>
                                    <Text>{statsData.forwardPERatio}</Text>
                                    <Text>PEG Ratio</Text>
                                    <Text>{statsData.pegRatio}</Text>
                                    <Text>Price to Sales</Text>
                                    <Text>{statsData.priceToSales}</Text>
                                    <Text>Price to Book</Text>
                                    <Text>{statsData.priceToBook}</Text>
                                    <Text>Revenue</Text>
                                    <Text>{statsData.revenue}</Text>
                                    <Text>Cash</Text>
                                    <Text>{statsData.totalCash}</Text>
                                    <Text>Debt</Text>
                                    <Text>{statsData.currentDebt}</Text>
                                    <Text>Cash</Text>
                                    <Text>{statsData.totalCash}</Text>
                                    <Text>200 Day Moving Average</Text>
                                    <Text>{statsData.day200MovingAvg}</Text>
                                    <Text>50 Day Moving Average</Text>
                                    <Text>{statsData.day50MovingAvg}</Text>
                                </Card.Content>
                            </Card>

                            <Card style={{marginBottom:30}}>
                                <Card.Content>
                                <Title>Quarters</Title>
                                {
                                fundamentals.map((fundamental,index)=>{
                                    return(
                                        <View key={index}>
                                            <Text>Q{fundamental.fiscalQuarter} {fundamental.fiscalYear}</Text>
                                            <Text>Filling Date</Text>
                                            <Text>{fundamental.filingDate}</Text>
                                            <Text>Revenue</Text>
                                            <Text>{fundamental.revenue}</Text>
                                            <Text>Net Income</Text>
                                            <Text>{fundamental.incomeNet}</Text>
                                        </View>
                                    )
                                })
                            }
                                </Card.Content>
                            </Card>

                            <Card style={{marginBottom:100}}>
                                <Card.Content>
                                <Title>Dividens</Title>
                                {
                                dividens.map((dividen,index)=>{
                                    return(
                                        <View key={index}>
                                            <Text>{dividen.paymentDate}</Text>
                                            <Text>{dividen.amount}</Text>
                                        </View>
                                    )
                                })
                                }
                                </Card.Content>
                            </Card>

                        </View>
                        : selection == 'Ownership'?
                        <View style={{width:win.width,marginBottom:250}}> 
                                <Card  style={{marginBottom:20}}>
                                    <Card.Content>
                                        <Title>Instituitional Ownership</Title>
                                        {
                                            ownership.map((owner,index)=>{
                                                return(
                                                    <View key={index}>
                                                        <Text>{owner.entityProperName}</Text>
                                                        <Text>Date: {date(owner.date/1000)}</Text>
                                                        <Text>{owner.reportedHolding}</Text>
                                                        <Text></Text>
                                                    </View>
                                                )

                                            })
                                        }
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Card.Content>
                                        <Title>Insider Transaction</Title>
                                        {
                                            insider.map((inside,index)=>{
                                                return(
                                                    <View key={index}>
                                                        <Text>{inside.fullName}</Text>
                                                        <Text>Date: {inside.filingDate}</Text>
                                                        <Text>Transaction Share: {
                                                        !inside.transactionShares=="" ? "none" : 
                                                        inside.transactionShares}
                                                        </Text>
                                                        <Text>Transaction Price: {inside.transactionPrice}</Text>
                                                        <Text></Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </Card.Content>
                                </Card>

                                

                        </View>
                        : 
                        <Stock route={ticker} navigation={navigation}></Stock>
                    }
                </ScrollView> 
            </View>

            }
        </View>
    )
}


const style = StyleSheet.create({
    title:{
        fontSize:20
    },
    container: {
        flex: 1,
        justifyContent: "center"
      },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
export default CompanyInfo;