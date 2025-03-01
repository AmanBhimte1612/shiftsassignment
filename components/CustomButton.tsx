import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
type ButtonProps = {
    status:string,
    borderColor:string,
    textColor:string,
    Title:string
}


const CustomButton = ({status,borderColor,textColor,Title}:ButtonProps) => {
  return (
    <View>
        <TouchableOpacity  className={`bg-white border-2 ${borderColor} items-center justify-center w-32 h-12 rounded-full`}>
            <Text className={`${textColor}`}>{Title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomButton