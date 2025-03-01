import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';



const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};


const getRelativeDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
};

const getTotalTime = (startTime: number, endTime: number) => {
  const diff = endTime - startTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

type ItemProps = {
  data:any
};
type ShiftProps = {
  Data: ItemProps[];
};

type ButtonProps = {
    status:boolean
    borderColor:string,
    textColor:string,
    Title:string
}


const CustomButton = ({status,borderColor,textColor,Title}:ButtonProps) => {
  return (
    <View className='item-center justify-center'>
        <TouchableOpacity  disabled={status} className={`bg-white border-2 ${borderColor} items-center justify-center w-32 h-[40px] rounded-full`}>
            <Text className={`${textColor}`}>{Title}</Text>
        </TouchableOpacity>
    </View>
  )
}




const Item = ({data}: ItemProps) => (
  
  <View >
    <View className='bg-gray-200 border-b  flex-row pl-10'>
    <Text className='text-lg font-bold p-2'>{getRelativeDate(data.shifts[0].startTime)}</Text>
    <Text className='text-lg font-bold p-2 text-gray-400'>   {data.shifts.length} shift, {getTotalTime(data.shifts[0].startTime,data.shifts[data.shifts.length-1].endTime)}</Text>
    </View>
    <FlatList
      data={data.shifts}
      keyExtractor={(shift) => shift.id}
      renderItem={({ item: shift }) => (
        <View className='border-b bg-gray-100 pl-[32px] flex-row h-32 justify-between item-center'  >
          <View className=''>
          <Text className='text-2xl '>{formatTime(shift.startTime)} - {formatTime(shift.endTime)} </Text>
          <Text className='text-gray-500'>{shift.area}</Text>
          </View>

          <CustomButton status={getRelativeDate(data.shifts[0].startTime)==='Today' ? true : false} 
          borderColor={getRelativeDate(data.shifts[0].startTime)==='Today' ? 'border-gray-200' : 'border-red-400'}
          textColor={getRelativeDate(data.shifts[0].startTime)==='Today' ? 'text-gray-500' : 'text-red-400'}
          Title='Cancel'/>
        </View>
      )}
    />
  </View>
);



const groupShiftsByDate = (shifts: any) => {
  return shifts.reduce((acc, shift) => {
    const date = dayjs(shift.startTime).format("YYYY-MM-DD"); // Extract date as string

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(shift);
    return acc;
  }, {});
};


const Shifts = ({ Data }: ShiftProps) => {
  const sortedData = [...Data].sort((a, b) => a.startTime - b.startTime);
  

  // if (getRelativeDate(Data[0].startTime)==='Today') {
  //   setStatus(true);
  // }

  const groupedShifts = groupShiftsByDate(sortedData);
  const formattedData = Object.entries(groupedShifts).map(([date, shifts]) => ({
    date,
    shifts,
  }));
    
    return (
      <FlatList
        data={formattedData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Item  data={item} />}
      />
    );
  };
  
  

export default Shifts;
