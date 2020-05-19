import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native' //  do not forget adding  /native  only for  react native


const Group = (prop) => {

    const { customerId, customerName, productsArr, year } = prop
    return <GroupItem onPress={() => prop.navigate('Details', { customerId })}>
        {/* <LinearGradient
                colors={['#9484DE', '#49036C']}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    flex: 1,

                }}  > */}
        <DataRowDiv style={{ width: "100%" }}>
            <RowDiv>
                {/* <UserImg source={{ uri: userImg }} /> */}
                <FullName>{customerName}</FullName>
            </RowDiv>
            <DateText>{year}</DateText>
        </DataRowDiv>


        <View style={{ flex: 1 }}>

            <FlatList
                data={productsArr}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => {
                    return <RowDiv>
                        <RowLeftView>
                            <BoldText>{item.name}</BoldText>
                        </RowLeftView>
                        <RowRightView>
                            <BoldText>{item.quantity}</BoldText>
                        </RowRightView>
                    </RowDiv>

                }}
            />
        </View>

        {/* </LinearGradient> */}
    </GroupItem>

}

//styles ____________________________________________________________
const RowLeftView = styled.View`

${'' /* border-left-width:2px */}
border-color: gray
width: 150px
padding: 0px 5px
flex-direction: row
justify-content: flex-start
align-items: center
`
const RowRightView = styled.View`
${'' /* border-right-width:2px */}
border-left-width:2px
border-color: gray
width: 150px
padding: 0px 5px
flex-direction: row
justify-content: flex-start
align-items: center
`

const DataRowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: space-between
align-items: center

`

const BoldText = styled.Text`
font-size : 16px
font-weight: bold,
margin-left : 3px
margin-right: 15px
`

const RowDiv = styled.View`
padding: 5px
flex-direction: row
justify-content: flex-start
align-items: center

`

const DateText = styled.Text`
 margin-right: 10px
 background: black
 color : #fff
 border-radius: 24px
 font-weight: 600
 font-size : 18px
 padding: 0px 8px
 height: 32px
 text-align: center
 line-height : 30px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const ProductText = styled.Text`
 background: #49036C
 color :  #fff
 border-radius: 25px
 font-weight: 600
 font-size : 18px
 text-align: center
 line-height : 30px
 shadow-color: #000
shadow-opacity: 0.5
shadow-radius: 6.3px
elevation: 10
`

const FullName = styled.Text`
font-weight: bold
font-size : 20px
`


const GroupItem = styled.TouchableOpacity`
margin: 5px 10px
 padding: 3px 10px
border-radius: 25px
margin-bottom: 4px
border-bottom-width: 2px
border-color: black
   ${'' /* flex-direction:row */}
   align-items: flex-start
  ${'' /* shadow-color: #000
shadow-opacity: 0.2
shadow-radius: 6.3px
elevation: 10 */}
  `

const UserImg = styled.Image`
margin-right: 20px
margin-left: 10px
  border-radius: 50px
  height: 40px
  width: 40px
 `

export default Group