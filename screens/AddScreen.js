import React, { useState } from 'react'
import { View, Text, Button, Modal, TouchableOpacity, Dimensions, Keyboard } from 'react-native'
import { connect, useDispatch } from "react-redux"
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertSale } from "../DataBase/salesDB"
//insertSale(day, month, year, customerId, customerName, productsArr )
import AddContainer from "../components/AddContainer"
import ModalPicker from "../components/ModalPicker"
import { Entypo, AntDesign } from '@expo/vector-icons';
import { addNewSale } from "../actions/salesActions"
//addNewSale(day, month, year, customerId, customerName, productsArr )
const AddScreen = ({ navigation, products, customers }) => {
    const dispatch = useDispatch()
    const [showCustomerPicker, setShowCustomerPicker] = useState(false);
    const [showProductPicker, setShowProductPicker] = useState(false);
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const dateString = date.toDateString()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const [productsArr, setProductsArr] = useState([])
    const [pickedCustomer, setPickedCustomer] = useState({ id: null, name: "choose customer" })
    const [pickedProduct, setPickedProduct] = useState({ id: null, name: "choose product" })
    const [productAmount, setProductAmount] = useState('')



    const saveNewSale = async () => {

        await dispatch(addNewSale(day, month, year, pickedCustomer.id, pickedCustomer.name, productsArr))

    }

    const addProduct = () => {
        const obj = { id: pickedProduct.id, name: pickedProduct.name, quantity: productAmount, }
        setProductsArr([...productsArr, obj])
    }




    const saleObj = {
        day,
        month,
        year,
        customerId: pickedCustomer.id,
        customerName: pickedCustomer.name,
        productsArr
    }


    // const headerProps = { name, phone }

    // const day = date.getDay()
    // const month = date.getMonth() + 1
    // const year = date.getFullYear()



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const HeaderComponent = () => {
        return <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>{name}</Text>
            <Text>{stock}</Text>

        </View>

    }



    return (
        <AddContainer
            title="Add Product"
        >
            {/* //________________________________________________________ */}

            <ModalPicker
                data={customers}
                pickedValue={(value) => setPickedCustomer(value)}
                showTrigger={() => setShowCustomerPicker(!showCustomerPicker)}
                show={showCustomerPicker}
            />
            <ModalPicker
                data={products}
                pickedValue={(value) => setPickedProduct(value)}
                showTrigger={() => setShowProductPicker(!showProductPicker)}
                show={showProductPicker}
            />

            <RowDiv>
                <DateText>{dateString}</DateText>
                <ButtonStyled onPress={showDatepicker}   >
                    <ButtonText>Change Date</ButtonText>
                </ButtonStyled>
            </RowDiv>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <RowDiv>
                <Picker
                    onPress={() => setShowCustomerPicker(!showCustomerPicker)}
                >
                    <Text>{pickedCustomer.name}</Text>
                    <Entypo name="arrow-with-circle-down" size={24} color="black" />
                </Picker>
                <ButtonStyled onPress={showDatepicker}   >
                    <ButtonText>New Customer</ButtonText>
                </ButtonStyled>
            </RowDiv>
            {error ? <ErrorText>Choose Customer </ErrorText> : null}
            <RowDiv>
                <Picker
                    onPress={() => setShowProductPicker(!showProductPicker)}
                >
                    <Text>{pickedProduct.name}</Text>
                    <Entypo name="arrow-with-circle-down" size={24} color="black" />
                </Picker>
                <AmountInput
                    keyboardType="number-pad"
                    placeholder=" amount"
                    value={productAmount}
                    onChangeText={(value) => setProductAmount(value)} />
            </RowDiv>
            <AddButtonDiv>
                <AddButton
                    onPress={() => {
                        pickedProduct.id === null || productAmount === 0 || pickedCustomer.id === null ?
                            setError(true) + console.log("error") :
                            addProduct()
                        Keyboard.dismiss()
                        setPickedProduct({ id: null, name: "choose product" })
                        setProductAmount(0)
                    }}>
                    <AntDesign name="plus" size={24} color="#fff" />
                </AddButton>
            </AddButtonDiv>
            <ProductsDiv>
                <Text>Products</Text>
                {productsArr.length === 0 ?
                    <EmptyDiv>
                        <Text>empty</Text>
                    </EmptyDiv> :
                    productsArr.map(item => {
                        return <Text>{item.name}</Text>
                    })
                }

            </ProductsDiv>





            <ButtonsRowDiv>
                <ButtonStyled
                    onPress={() => {
                        pickedCustomer.id === null || productsArr.length === 0 ? setError(true)
                            : saveNewSale()
                        navigation.navigate("SalesList")
                    }}  >
                    <ButtonText>Save</ButtonText>
                </ButtonStyled>
                <ButtonStyled onPress={() => navigation.navigate('SalesList')}   >
                    <ButtonText>Cancel</ButtonText>
                </ButtonStyled>
            </ButtonsRowDiv>
        </AddContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        customers: state.customers
    }
}

export default connect(mapStateToProps)(AddScreen)


//styles_________________________________________________________

const EmptyDiv = styled.View`
flex:1
justify-content: center
align-items: center
${'' /* height: ${Dimensions.get('window').height / 3.5}px */}

`


const AddButtonDiv = styled.View`
height: 60px
width: 100%
justify-content: center
align-items: center
`

const AddButton = styled.TouchableOpacity`
        height: 50px
        width: 50px
        align-items:center
        justify-content: center
        border-radius: 50px
     
        background:black
        shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10
            `


const ProductsDiv = styled.View`
margin-top: 5px
width: 100%
height: ${Dimensions.get('window').height / 2.8}px
border-top-width: 2px
border-bottom-width: 2px
border-color: black
`



const Picker = styled.TouchableOpacity`
flex-direction: row 

align-items: center
justify-content: space-between
width: 230px
height: 33px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 5px
 
`


const ErrorText = styled.Text`
color: red
margin : 0px 10px
`




const DateText = styled.Text`
font-weight : 800
font-size : 28px
line-height : 30px
margin-bottom: 5px

`

const AmountInput = styled.TextInput`
width: 120px
height: 33px
border-width: 2px
border-color: black 
border-radius: 2px
padding: 0px 10px

`

const RowDiv = styled.View`
padding: 3px 0px 
flex-direction: row
justify-content: space-between
align-items: center
margin-top: 5px
`
const ButtonsRowDiv = styled.View`
padding: 3px 0px 
flex-direction: row
justify-content: space-around
align-items: center
margin-top: 5px
`

const ButtonText = styled.Text`
font-size : 16px
color : white
`

const ButtonStyled = styled.TouchableOpacity`
justify-content: center
align-items: center
border-radius: 25px
width: 120px
height : 35px
background: black
   shadow-color: #000
${'' /* shadow-offset: {width: 0, height: 2} */}
            shadow-opacity: 0.5
            shadow-radius: 6.3px
            elevation: 10

`

const ContainerView = styled.View`
flex:1
background : #261460
border-color : black
border-width : 2px

`