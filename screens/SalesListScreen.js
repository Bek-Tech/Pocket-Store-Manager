import React, { useState, useEffect } from 'react'
import { Text, Dimensions } from 'react-native';
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import RootContainer from "../components/RootContainer"
import SaleBox from "../components/SaleBox"
import AddButton from '../components/AddButton'
import { connect, useDispatch } from "react-redux"
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SalesListScreen = ({ salesHistory, navigation, soldProducts }) => {

    return (
        <RootContainer
            backToTopButton={salesHistory.length >= 3 ? true : false}
            addButton={() => navigation.navigate("Add")}
            title='Sales'
            navigation={navigation}
            totalsData={{ name: "Total operations", amount: salesHistory.length }}
        >

            {salesHistory.length > 0 ?
                salesHistory.map(item => {
                    return <SaleBox
                        key={item.id}
                        navigation={navigation} {...item}
                    />
                }) :
                <EmptyListDiv key="empty">
                    <EmptyText>List Empty</EmptyText>
                </EmptyListDiv>
            }

        </RootContainer>



    );

}
const mapSalesHistoryToProps = state => {
    return {

        salesHistory: state.salesHistory.sales,
        soldProducts: state.salesHistory.productsSale
    }
}

export default connect(mapSalesHistoryToProps)(SalesListScreen)

// styles___________________________________________



const EmptyListDiv = styled.View`
flex:1
height: ${windowHeight / 2.5}px
align-items:center
justify-content: center
`

const EmptyText = styled.Text`
font-size: 18px
`

const ListContainer = styled.View`
     flex: 1
     backgroundColor: white
     borderRadius: 35px            
     margin: 0px               
     padding: 15px   0px        
`

const BodyContainer = styled.View`
flex: 1
backgroundColor: black
`

// const HeaderView = styled.View`
// height: ${windowHeight / 3}
//    flex: 1
//                     justifyContent: center
// `


const GroupTitle = styled.Text`
            font-weight: bold
            font-size : 22px
            color : #000000
             padding: 0 20px
  `