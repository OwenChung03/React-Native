import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View,Image,TouchableHighlight,ScrollView,Dimensions} from 'react-native';
import { format } from 'date-fns';
import Stock from './Stock';

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
    const [selection,setSelection] = React.useState('Strategy')
    const [loading,setLoading] = React.useState(true) 
    const array = ['Overview','Fundamentals','News','Ownership','Strategy']
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

    return (
        <View style={{width:win.width}}>
            {loading ? 
                <Text>Loading</Text>
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
                        <View>
                            <Text>Company Name</Text>
                            <Text>{overviewData.companyName}</Text>
                            <Text></Text>
                            <Text>Company Description</Text>
                            <Text>{overviewData.description}</Text>
                            <Text></Text>
                            <Text>CEO</Text>
                            <Text>{overviewData.CEO}</Text>
                        </View>  
                        : selection == "News" ? 
                        <View style={{marginBottom:80}}>
                            {
                                news.map((article,index)=>{
                                    
                                    var date = new Date(article.datetime);
                                    return(
                                        <View key={index}>
                                            <Text>{article.headline}</Text>
                                            <Text>Date: {article.date}</Text>
                                            <Text>{article.summary}</Text>
                                            <Text>{article.image}</Text>

                                        </View>
                                    )
                                })
                            }
                        </View>
                        : selection == "Fundamentals"?
                        <View style={{width:win.width,marginBottom:120}}>
                            <Text>Ratio</Text>
                            <View>
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
                            </View>
                            <Text>Quarters</Text>
                            {
                                fundamentals.map((fundamental,index)=>{
                                    return(
                                        <View key={index}>
                                            <Text>Q{fundamental.fiscalQuarter} {fundamental.fiscalYear}</Text>
                                            <Text>Filling Date</Text>
                                            <Text>{fundamental.fillingDate}</Text>
                                            <Text>Revenue</Text>
                                            <Text>{fundamental.revenue}</Text>
                                            <Text>Net Income</Text>
                                            <Text>{fundamental.incomeNet}</Text>
                                        </View>
                                    )
                                })
                            }
                            <Text>Dividens</Text>
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
                        </View>
                        : selection == 'Ownership'?
                        <View style={{width:win.width,marginBottom:100}}> 
                                <Text>Instituitional Ownership</Text>
                                {
                                    ownership.map((owner,index)=>{
                                        return(
                                            <View key={index}>
                                                <Text>Date: {owner.date}</Text>
                                                <Text>{owner.entityProperName}</Text>
                                                <Text>{owner.reportedHolding}</Text>
                                            </View>
                                        )

                                    })
                                }
                                <Text>Insider Transaction</Text>
                                {
                                    insider.map((inside,index)=>{
                                        return(
                                            <View key={index}>
                                                <Text>Date: {inside.filingDate}</Text>
                                                <Text>{inside.fullName}</Text>
                                                <Text>{inside.transactionShares}</Text>
                                                <Text>{inside.transactionPrice}</Text>
                                            </View>
                                        )
                                    })
                                }
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

export default CompanyInfo;