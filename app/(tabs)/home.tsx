import { View, Text, SafeAreaView, FlatList,StyleSheet, StatusBar, TouchableOpacity,} from 'react-native'
import React from 'react'
// import Shifts from '@/components/shifts'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Shifts from '@/components/Shifts';
import dayjs from 'dayjs';


type ItemProps = {
  
  date:string;
};
type ShiftProps = {
  Data: ItemProps[];
};









// const formatTime = (timestamp: number) => {
//   return new Date(timestamp).toLocaleTimeString('en-GB', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: false,
//   });
// };

// // Get "Today", "Tomorrow", "Yesterday" or actual date
// const getRelativeDate = (timestamp: number) => {
//   const date = new Date(timestamp);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);

//   if (date.toDateString() === today.toDateString()) return 'Today';
//   if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
//   if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

//   return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
// };

// // Get total time duration in hours and minutes
// const getTotalTime = (startTime: number, endTime: number) => {
//   const diff = endTime - startTime;
//   const hours = Math.floor(diff / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   return `${hours}h ${minutes}m`;
// };

// // Props types
// type ItemProps = {
//   id: string;
//   startTime: number;
//   endTime: number;
//   area: string;
//   status:boolean
// };
// type ShiftProps = {
//   Data: ItemProps[];
// };

// type ButtonProps = {
//     status:boolean
//     borderColor:string,
//     textColor:string,
//     Title:string
// }


// const CustomButton = ({status,borderColor,textColor,Title}:ButtonProps) => {
//   return (
//     <View>
//         <TouchableOpacity  disabled={status} className={`bg-white border-2 ${borderColor} items-center justify-center w-32 h-12 rounded-full`}>
//             <Text className={`${textColor}`}>{Title}</Text>
//         </TouchableOpacity>
//     </View>
//   )
// }

// // Shift Item component
// const Item = ({ id, startTime, endTime, area }: ItemProps) => (

//   <View>
//     <View className='bg-gray-200 border-b flex-row pl-6'>
//       <Text className='text-lg p-1'>{getRelativeDate(startTime)}</Text>
//       <Text className='text-lg p-1 text-gray-400'>{getTotalTime(startTime, endTime)}</Text>
//     </View>
//     <View className='flex-row p-4 justify-between pl-6'>
//       <View>
//         <Text className='text-2xl'>{formatTime(startTime)} - {formatTime(endTime)}</Text>
//         <Text className='text-gray-400'>{area}</Text>
//       </View>
//       <CustomButton status={false} borderColor='border-red-400' textColor='font-bold text-red-400' Title='Cancel'/>
//     </View>
//   </View>
// );

// // Shift List component
// const Shifts = ({ Data }: ShiftProps) => {
//   const sortedData = [...Data].sort((a, b) => a.startTime - b.startTime);
//   const [Status, setStatus] = React.useState(false);

//   if (getRelativeDate(Data[0].startTime)==='Today') {
//     setStatus(true);
//   }
//   return (
    
//   <SafeAreaView>
//     <FlatList
//       data={sortedData}
//       renderItem={({ item }) => <Item id={item.id} startTime={item.startTime} endTime={item.endTime} area={item.area} status={Status} />}
//       keyExtractor={item => item.id}
//     />
//   </SafeAreaView>
//   )
// };

const home = () => {
  

  return (
    <SafeAreaProvider>
        <SafeAreaView >
          <Shifts Data={initialShifts} />
        </SafeAreaView>
      </SafeAreaProvider>
  )
}

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

export default home