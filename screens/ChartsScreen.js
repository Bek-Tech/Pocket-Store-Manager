import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, TouchableOpacity, KeyboardAvoidingView, Dimensions, ImageBackground, ScrollView } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddContainer from "../components/AddContainer"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import * as colors from "../components/Colors"
import { LinearGradient } from 'expo-linear-gradient';



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ChartsScreen = ({ navigation, products, customers, salesHistory, soldProducts }) => {



    const [datePeriod, setDatePeriod] = useState([])
    const [salesChartData, setSalesChartData] = useState([{ label: 'no data', amount: 0 }])
    const [customersChartData, setCustomersChartData] = useState([])
    const [productsChartData, setProductsChartData] = useState({ data: [], totalSoldAmount: 0 })


    const filteredByDataSales = salesHistory.filter(item => {
        return item
    })
    const monthsArr = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dek"]

    const monthsObj = { Jan: { total: 0, data: [] }, Feb: { total: 0, data: [] }, March: { total: 0, data: [] }, Apr: { total: 0, data: [] }, May: { total: 0, data: [] }, Jun: { total: 0, data: [] }, "Jul": { total: 0, data: [] }, Aug: { total: 0, data: [] }, "Sep": { total: 0, data: [] }, "Okt": { total: 0, data: [] }, "Nov": { total: 0, data: [] }, "Dek": { total: 0, data: [] } }


    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };





    useEffect(() => {
        const customersObj = {}

        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()
        const lastSixMonths = []


        for (let i = currentMonth; currentMonth - 6 >= 0 ? i > currentMonth - 6 : i >= 0; i--) {
            lastSixMonths.unshift(monthsArr[i])
        }

        setDatePeriod(lastSixMonths)


        filteredByDataSales.forEach(item => {
            monthsObj[monthsArr[item.month]].data.push(item)
            const totalAmount = item.productsArr.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)
            monthsObj[monthsArr[item.month]].total = monthsObj[monthsArr[item.month]].total + totalAmount
            customersObj[item.customerId] ? null : customersObj[item.customerId] = { data: [], totalPurchased: 0 }
            customersObj[item.customerId].data.push(item)
            customersObj[item.customerId].totalPurchased = customersObj[item.customerId].totalPurchased + totalAmount
        })

        const datasetArr = lastSixMonths.map((item, index) => {
            return {
                label: item,
                amount: monthsObj[item].total
            }
        })

        setSalesChartData(datasetArr)


        // ___________________________products pie chart ____

        let totalSoldAmount = 0

        const pieChartData = products.map(item => {
            soldProducts[item.id] ? totalSoldAmount = totalSoldAmount + soldProducts[item.id].totalSold : null
            return {
                name: item.name,
                totalSold: soldProducts[item.id] ? soldProducts[item.id].totalSold : 0,
                color: item.color
            }
        })
        const pieChartArr = []

        for (let i = 0; i < pieChartData.length; i++) {
            const empty = {
                name: "empty",
                color: "rgba(0,0,0,0)",
                totalSold: Math.trunc(totalSoldAmount * 0.01)
            }
            pieChartArr.push(pieChartData[i])
            // pieChartArr.push(empty)
        }
        setProductsChartData({
            data: pieChartArr,
            totalSoldAmount
        })
        // ___________________customers bar chart_____________________


        const customersChartArr = customers.map(item => {

            return {
                name: item.name,
                totalPurchased: customersObj[item.id] ? customersObj[item.id].totalPurchased : 0
            }
        })

        customersChartArr.sort((a, b) => {
            return b.totalPurchased - a.totalPurchased
        });
        setCustomersChartData(customersChartArr)

    }, [])






    const [chart, setChart] = useState(true)
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.bodyColor }}
        >
            <BodyContainer>

                <RowDiv>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color={colors.secondaryColor} />
                    </TouchableOpacity>
                    <TitleText>   Charts</TitleText>
                </RowDiv>

                <KeyboardAvoidingView
                    // behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        scrollEnabled={true}
                        style={{ flex: 1 }}>


                        <ItemsContainer>
                            <LinearGradient
                                colors={[colors.secondaryColor, colors.mainColor,]}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 35,
                                    margin: 10,
                                    marginTop: 15,
                                    overflow: "hidden"

                                }}
                            >
                                <TitleDiv>
                                    <SectionTitleText>Sales</SectionTitleText>
                                </TitleDiv>

                                <View>

                                    <LineChart
                                        data={{
                                            labels: salesChartData.map(item => item.label),
                                            datasets: [
                                                {
                                                    data: salesChartData.map(item => item.amount)
                                                }
                                            ]
                                        }}
                                        width={windowWidth}
                                        height={230}
                                        fromZero={true}
                                        segments={6}
                                        yAxisLabel=''
                                        yAxisSuffix=""
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            backgroundColor: "transparent",
                                            backgroundGradientFrom: "rgba(255,255,255,0)",
                                            backgroundGradientFromOpacity: 0,
                                            backgroundGradientTo: "rgba(255,255,255,0)",
                                            backgroundGradientToOpacity: 0,
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 0) => `rgba(255,255,255, ${opacity})`,

                                            propsForDots: {
                                                r: "3",
                                                strokeWidth: "2",
                                                stroke: "white"
                                            }

                                        }}
                                        bezier
                                        style={{
                                            // width: " 100%",
                                            // borderTopWidth: 2,
                                            // borderBottomWidth: 2,
                                            // borderColor: colors.bodyColor,
                                            marginVertical: 0,
                                            // borderRadius: 16
                                        }}
                                    />
                                </View>
                                <FlatList
                                    style={{
                                        flex: 1,
                                        marginTop: 20,
                                        paddingBottom: 15,
                                        paddingLeft: 20
                                    }}
                                    data={salesChartData}
                                    numColumns={2}
                                    keyExtractor={(item, index) => item.label}
                                    renderItem={({ item }) => {
                                        return <ListItemDiv>

                                            <ListText>{item.label} :</ListText>
                                            <AmountText> {item.amount}</AmountText>
                                        </ListItemDiv>

                                    }}
                                />
                            </LinearGradient>
                        </ItemsContainer>
                        <ItemsContainer>
                            <LinearGradient
                                colors={[colors.secondaryColor, colors.mainColor,]}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 35,
                                    margin: 10,
                                    marginTop: 15,
                                    overflow: "hidden"
                                }}
                            >
                                <TitleDiv>
                                    <SectionTitleText>Customers</SectionTitleText>
                                </TitleDiv>

                                <ScrollView
                                    horizontal={true}
                                >
                                    <View>
                                        <BarChart
                                            key="bar"
                                            showValuesOnTopOfBars={true}

                                            data={{
                                                labels: customersChartData.map((item) => {
                                                    return `${item.name}`
                                                }),
                                                datasets: [
                                                    {
                                                        data: customersChartData.map(item => item.totalPurchased)
                                                    }
                                                ]
                                            }}
                                            width={customersChartData.length > 4 ? (customersChartData.length - 4) * 50 + windowWidth : windowWidth}
                                            height={230}
                                            fromZero={true}
                                            verticalLabelRotation={90}
                                            yAxisLabel=""
                                            chartConfig={{
                                                backgroundColor: "transparent",
                                                backgroundGradientFrom: "rgba(255,255,255,0)",
                                                backgroundGradientFromOpacity: 0,
                                                backgroundGradientTo: "rgba(255,255,255,0)",
                                                backgroundGradientToOpacity: 0,
                                                color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                propsForDots: {
                                                    r: "3",
                                                    strokeWidth: "2",
                                                    stroke: "white"
                                                }
                                            }}
                                            style={{
                                                marginVertical: 0,
                                                borderRadius: 16
                                            }}
                                            verticalLabelRotation={0}
                                        />
                                    </View>
                                </ScrollView>
                                <FlatList
                                    style={{
                                        flex: 1,
                                        marginTop: 20,
                                        paddingBottom: 15,
                                        paddingLeft: 20,
                                        width: "100%"
                                    }}
                                    data={customersChartData}
                                    numColumns={2}
                                    keyExtractor={(item, index) => item.name}
                                    renderItem={({ item }) => {
                                        return <ListItemDiv>
                                            <View style={{ width: "50%" }}>
                                                <ListText style={{ fontSize: item.name.length > 9 ? 13 : 16 }}>{item.name} :</ListText>
                                            </View>
                                            <View style={{ width: "40%" }}>
                                                <AmountText style={{ fontSize: item.totalPurchased.length > 7 ? 13 : 16, marginLeft: 5 }}>{item.totalPurchased}</AmountText>
                                            </View>
                                        </ListItemDiv>

                                    }}
                                />
                            </LinearGradient>
                        </ItemsContainer>
                        <ItemsContainer>
                            <LinearGradient
                                colors={[colors.secondaryColor, colors.mainColor,]}
                                style={{
                                    flex: 1,
                                    borderRadius: 35,
                                    margin: 10,
                                    marginTop: 15,
                                    padding: 10
                                }}
                            >
                                <TitleDiv>
                                    <SectionTitleText>Products </SectionTitleText>
                                </TitleDiv>
                                <View
                                    style={{
                                        flex: 1,
                                        // opacity: 0.6
                                    }}
                                >
                                    <PieChart
                                        data={productsChartData.data.filter(item => {
                                            return item.totalSold !== 0
                                        })}
                                        width={windowWidth * 1.8}
                                        height={370}
                                        chartConfig={chartConfig}
                                        accessor="totalSold"
                                        backgroundColor="transparent"
                                        absolute

                                    />
                                </View>
                                <TitleDiv>
                                    <TitleBoldText>Total Sold : {productsChartData.totalSoldAmount}</TitleBoldText>
                                </TitleDiv>

                                <FlatList
                                    style={{
                                        flex: 1,
                                        paddingBottom: 15
                                    }}
                                    data={productsChartData.data.filter(item => {
                                        return item.name !== "empty"
                                    })}
                                    numColumns={2}
                                    keyExtractor={(item, index) => item.name}
                                    renderItem={({ item }) => {
                                        return <ListItemDiv>
                                            <View style={{
                                                borderRadius: 30,
                                                width: 10,
                                                height: 10,
                                                margin: 5,
                                                backgroundColor: item.color
                                            }}></View>
                                            <View style={{ width: "50%" }}>
                                                <ListText style={{ fontSize: item.name.length > 9 ? 13 : 16 }}>{item.name} :</ListText>
                                            </View>
                                            <View style={{ width: "40%" }}>
                                                <AmountText style={{ fontSize: item.totalSold.length > 7 ? 13 : 16, marginLeft: 5 }}>{item.totalSold}</AmountText>
                                            </View>
                                        </ListItemDiv>

                                    }}
                                />
                            </LinearGradient>

                        </ItemsContainer>
                    </ScrollView>
                </KeyboardAvoidingView>

            </BodyContainer>
        </SafeAreaView>

    );
}

const mapStateToProps = state => {
    return {
        products: state.products,
        customers: state.customers,
        salesHistory: state.salesHistory.sales,
        soldProducts: state.salesHistory.productsSale
    }
}

export default connect(mapStateToProps)(ChartsScreen)

const ListText = styled.Text`
    font-weight: bold
     font-size : 16px
    color : #000000
  `

const AmountText = styled.Text`
     font-size : 16px
    color : #000000
  `


const ListItemDiv = styled.View`
width: ${windowWidth / 2 - 20}px
 margin: 0px 5px
flex-direction: row
justifyContent: flex-start
alignItems: center
`


const TitleDiv = styled.View`
width: 100%
justify-content: center
align-items: center
`

const TitleBoldText = styled.Text`
color: black
font-size: 30px
fontWeight : bold
`

const TitleText = styled.Text`
color: ${colors.secondaryColor}
font-size: 30px
fontWeight : bold
`

const SectionTitleText = styled.Text`
color: black
font-size: 50px
fontWeight : bold
margin: 0px 0px 20px 0px
`

const ItemsContainer = styled.View`
     
 flex:1
 align-items: center
 justify-content: center
 resizeMode: cover
 overflow: hidden
  borderRadius: 35px            
  margin: 5px  
   marginTop: 10px
  padding: 5px   0px     
  shadow-color: #000
  shadow-offset: {width: 0, height: 2}
  shadow-opacity: 0.5
   shadow-radius: 6.3px
  elevation: 10   
`

const BodyContainer = styled.View`
flex: 1


`
const RowDiv = styled.View`
  width: 100%
 margin: 5px
  padding: 5px
   flex-direction: row
  justify-content: flex-start
  align-items: center
            `


