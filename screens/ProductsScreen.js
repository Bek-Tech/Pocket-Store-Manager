import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import RootContainer from "../components/RootContainer"
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import AddButton from "../components/AddButton"
import { deleteProductAction } from "../actions/productsActions"
import { SimpleLineIcons } from '@expo/vector-icons'
import ProductBox from '../components/ProductBox'

const ProductsScreen = ({ products, salesHistory, navigation }) => {
    // console.log(salesHistory)
    const idObj = {}

    useEffect(() => {

        for (let i = 0; i < products.length; i++) {
            const id = products[i].id
            idObj[id] = []
        }
        for (let j = 0; j < salesHistory.length; j++) {
            for (let k = 0; k < salesHistory[j].productsArr.length; k++) {
                const id = salesHistory[j].productsArr[k].id
                idObj[id] ? idObj[id].push(salesHistory[j].productsArr[k]) : null
            }
        }
    }, [])




    return (
        <>
            <RootContainer
                title='Products'
            >


                {products.map(item => {
                    return <ProductBox sold={idObj} navigation={navigation} {...item} />
                })
                }

            </RootContainer>
            <AddButton onPress={() => navigation.navigate("AddProduct", { id: null })} />
        </>
    )
}

const mapProductsToProp = state => {
    return {
        products: state.products,
        salesHistory: state.salesHistory
    }

}

export default connect(mapProductsToProp)(ProductsScreen)


const ProductsContainer = styled.TouchableOpacity`
flex:1 
border-radius: 15px
background:white
margin: 5px 15px
padding : 5px 15px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const NameText = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px
color: black
`

const RowDiv = styled.View`
width: 100%
 ${'' /* borderColor: black
   borderWidth: 2px */}
${'' /* padding: 5px */}
flex-direction: row
justify-content: space-between
align-items: center

`