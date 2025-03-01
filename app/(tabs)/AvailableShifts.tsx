import React from "react";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import dayjs from "dayjs";
// Assuming you have this component

const Tab = createMaterialTopTabNavigator();


const initialShifts = [
  {
    "id": "afbc07c6-f566-48d9-878a-6d26f84d4771",
    "booked": false,
    "area": "Turku",
    "startTime": 1741333086743,
    "endTime": 1741343886743
  },
  {
    "id": "c9b68b0a-54dd-4794-b268-55a081e90454",
    "booked": true,
    "area": "Turku",
    "startTime": 1740845754644,
    "endTime": 1740863754644
  },
  {
    "id": "c9b68b0a-54dd-4794-b268-55a081e93131",
    "booked": true,
    "area": "Turku",
    "startTime": 1740845754644,
    "endTime": 1740863754644
  },
  {
    "id": "c9b68b0a-54dd-4794-b268-55a081e9012",
    "booked": true,
    "area": "Turku",
    "startTime": 1740845754644,
    "endTime": 1740863754644
  },
  {
    "id": "13352ead-3df3-4881-9000-03b5337d9dc8",
    "booked": true,
    "area": "Helsinki",
    "startTime": 1741029226644,
    "endTime": 1741047226644
  },
  {
    "id": "5727978f-f2d7-4a67-8d21-a113081a49be",
    "booked": false,
    "area": "Tampere",
    "startTime": 1741184550792,
    "endTime": 1741202550792
  },
  {
    "id": "00e6afd4-7628-4e5e-9015-cb9ebf7f7dc7",
    "booked": false,
    "area": "Helsinki",
    "startTime": 1741174924836,
    "endTime": 1741185724836
  }

];

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


// Group shifts by area
const groupByArea = (shiftsData:any) => {
  const grouped = {};

  Object.values(shiftsData).flat().forEach((shift) => {
    if (!grouped[shift.area]) {
      grouped[shift.area] = [];
    }
    grouped[shift.area].push(shift);
  });

  return grouped; // Returns an object { "Turku": [...], "Helsinki": [...] }
};
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
        <View className='border-b bg-gray-100 pl-[32px] flex-row justify-between item-center'  >
          <View className=''>
          <Text className='text-2xl '>{formatTime(shift.startTime)} - {formatTime(shift.endTime)} </Text>
          <Text className='text-gray-500'>{shift.area}</Text>
          </View>
          {/* Check Overlapping Shifts */}
          <Text>
            {Object.values(data).flat().some(s => 
              s.id !== shift.id && s.startTime < shift.endTime && s.endTime > shift.startTime
            ) 
              ? 'Overlapping' 
              : (shift.booked ? 'Booked' : 'Available')}
          </Text> 

          <CustomButton status={getRelativeDate(data.shifts[0].startTime)==='Today' ? true : false} 
          borderColor={getRelativeDate(data.shifts[0].startTime)==='Today' ? 'border-gray-200' : 'border-red-400'}
          textColor={getRelativeDate(data.shifts[0].startTime)==='Today' ? 'text-gray-500' : 'text-red-400'}
          Title='Book'/>
        </View>
      )}
    />
  </View>
);



const groupedData = groupByArea(initialShifts);

const Shifts = ({ Data }: ShiftProps) => {
  const sortedData = [...Data].sort((a, b) => a.startTime - b.startTime);
  

  const groupedShifts = groupShiftsByDate(sortedData);
  const formattedData = Object.entries(groupedShifts).map(([date, shifts]) => ({
    date,
    shifts,
  }));
    
    return (
      <FlatList
        data={formattedData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Item  data={item}  />}
      />
    );
  };
  

// Shift List Component for Each Tab (Area)
const ShiftList = ({ route }:any) => {
  const { area } = route.params;
  const shifts = groupedData[area];

  return (
    <Shifts Data={shifts} />
  );
};

// Top Tab Navigator with Areas as Tabs
const AreaTabs = () => {
  return (
    <Tab.Navigator>
      {Object.keys(groupedData).map((area) => (
        <Tab.Screen key={area} name={area} component={ShiftList} initialParams={{ area }} />
      ))}
    </Tab.Navigator>
  );
};

// App Component with Navigation
export default function AvailableShifts() {
  return (
    <AreaTabs />
  );
}



