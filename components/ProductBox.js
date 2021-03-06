import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import { deleteProductAction, editProduct } from "../actions/productsActions"
//editProduct(id, date, name, stock, history)
import { SimpleLineIcons } from '@expo/vector-icons'
import ModalOptions from './ModalOptions'
import * as colors from "./Colors"
import { LinearGradient } from 'expo-linear-gradient'







const ProductBox = (props) => {
    const { id, name, totalReceived, navigation, sold, color, detailsScreen } = props
    const totalSold = sold ? sold.totalSold : 0

    const ProductsContainer = styled.TouchableOpacity`
        border-radius: 15px
        background: ${detailsScreen ? colors.secondaryColor : colors.secondaryBodyColor}
        margin: 5px 5px
        padding: 5px 10px
        overflow: hidden
         shadow-color: black
        shadow-opacity: 1
        shadow-radius: 6.3px
        elevation: 18
        `

    const NameText = styled.Text`
        font-weight : bold
        font-size : 24px
        line-height : 30px
        margin-bottom: 5px
        color: ${detailsScreen ? colors.secondaryBodyColor : colors.mainTextColor}
        `
    const DateText = styled.Text`
        font-size : 16px
        line-height : 30px
        marginRight: 15px
        color: ${detailsScreen ? colors.secondaryBodyColor : colors.mainTextColor}
`





    const date = new Date(props.date).toLocaleDateString()
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    return <ProductsContainer onPress={() => navigation.navigate("ProductDetails", { id })}>

        <ModalOptions
            visible={modalVisible}
            visibilityToggler={() => setModalVisible(!modalVisible)}
            // onPressIncome={(amount) => console.log(amount)}
            onPressEdit={() => {
                navigation.navigate("AddProduct", { id: id })
                setModalVisible(false)
            }}
            onPressDelete={() => {
                dispatch(deleteProductAction(id))
                navigation.goBack()
            }}
            onPressCall={false}
            onPressMessage={false}
        />
        <RowDiv style={{ alignItems: "flex-start" }}>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
                <NameText>{name ? name : "deleted"}</NameText>
            </View>

            <View style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
            }}>
                <DateText>reg : {date ? date : "no info"}</DateText>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <SimpleLineIcons name="options-vertical" size={20} color="black" />
                </TouchableOpacity>
            </View>


        </RowDiv>
        <BlockRowDiv>
            <View>
                <SmallText>received</SmallText>
                <ReceivedNumText>{totalReceived ? totalReceived : 0}</ReceivedNumText>
            </View>
            <View>
                <SmallText>sold</SmallText>
                <SoldNumText>{totalSold}</SoldNumText>
            </View>
            <View>
                <SmallText>stock</SmallText>
                <StockNumText>{totalReceived ? totalReceived - totalSold : 0}</StockNumText>
            </View>

            {/* <NameText>inStock  : {stock - totalSold}</NameText> */}
        </BlockRowDiv>


        {/* </LinearGradient> */}
    </ProductsContainer >

}


export default ProductBox






const RowDiv = styled.View`
        width: 100%
 ${'' /* borderColor: black
   borderWidth: 2px  */}
        padding: 3px 5px
        flex-direction: row
        justify-content: space-between
        align-items: center

        `
const BlockRowDiv = styled.View`
        width: 100%
        padding: 0px 5px
        flex-direction: row
        justify-content: space-between
        align-items: center

        `

const ReceivedNumText = styled.Text`
        font-size : 18px
        font-weight: bold
${'' /* line-height : 30px */}

        color: #52A9EB
        `
const SoldNumText = styled.Text`
        font-size : 18px
        font-weight: bold
${'' /* line-height : 30px */}

        color: green
        `
const StockNumText = styled.Text`
        font-size : 18px
        font-weight: bold
${'' /* line-height : 30px */}

        color: white
        `

const SmallText = styled.Text`
        font-size : 16px
        line-height : 30px
        
        color: ${colors.secondaryTextColor}
        `
