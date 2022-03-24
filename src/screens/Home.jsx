import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import useAuth from '../hooks/useAuth';

import {
  PieChart,
  LineChart,
  BarChart
} from "react-native-chart-kit";
const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffff00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const data2 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(0, 140, 255, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};

const data3 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

//Components
import Wrapper from '../components/Wrapper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { auth } = useAuth();
  return (
    <Wrapper>
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>Bienvenido(a) {auth?.user?.userName}</Text>
          <Text style={styles.subtitle}>Estadísticas</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={data}
              width={(screenWidth - 36)}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
            />
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={data2}
              width={(screenWidth - 36)}
              height={220}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View>
          <View style={styles.chartContainer}>
            <BarChart
              data={data3}
              width={(screenWidth - 36)}
              height={220}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </Wrapper>
  )
}

export default Home;

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    padding: 8,
    marginVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});