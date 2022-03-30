import { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import {
  PieChart,
  LineChart,
  BarChart
} from "react-native-chart-kit";

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
  const [ topTags, setTopTags] = useState([]);
  const [customerGrowth, setCustomerGrowth] = useState(null);
  const [sells, setSells] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  function changeHex() {
    const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']; 
    let hex = '#';
  
    for(let i = 0; i < 6; i++){
      const index = Math.floor(Math.random() * hexValues.length)
      hex += hexValues[index];
    }
  
    return hex;
  }

  const getTopTags = async () => {
    try {
      const res = await axios.get('/tags/top-sold');
      const tagArr = res.data.tags.map(tag => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return {
          name: tag.tag_name,
          sells: tag.sells,
          color: changeHex(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      });

      setTopTags(tagArr);

    } catch (error) {
      console.log(error);
    }
  }

  const getCustomerGrowth = async () => {
    try {
      const res = await axios.get('/users/customers-growth');
      const arr = res.data.months;
      const labels = arr.map(item => {
        return item.month;
      });
      const data = arr.map(item => {
        return item.total;
      });

      setCustomerGrowth({
        labels: labels,
        datasets: [
          {
            data: data,
            color: (opacity = 1) => `rgba(0, 140, 255, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Nuevos usuarios"] // optional
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getSells = async () => {
    try {
      const res = await axiosPrivate.get('/orders/sells');
      const arr = res.data.sells;
      const labels = arr.map(item => {
        return item.month;
      });
      const data = arr.map(item => {
        return item.sells;
      });

      setSells({
        labels,
        datasets: [
          {
            data
          }
        ]
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    (async () => {
      await getTopTags();
      await getCustomerGrowth();
      await getSells();
    })();
  
    return () => {
      setTopTags([]);
    }
  }, [])
  

  return (
    <Wrapper>
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>Bienvenido(a) {auth?.user?.userName}</Text>
          <Text style={styles.subtitle}>Estadísticas</Text>
          <View style={styles.chartContainer}>
            <Text style={styles.subtitle}>Categorías más vendidas</Text>
            <PieChart
              data={topTags}
              width={(screenWidth - 36)}
              height={220}
              chartConfig={chartConfig}
              accessor={"sells"}
              backgroundColor={"transparent"}
            />
          </View>
          <View style={styles.chartContainer}>
            {
              customerGrowth && 
              <LineChart
                data={customerGrowth}
                width={(screenWidth - 36)}
                height={220}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
                />
              }
          </View>
          <View style={styles.chartContainer}>
              <Text style={styles.subtitle}>Ventas últimos meses</Text>
            {
              sells &&
              <BarChart
                data={sells}
                width={(screenWidth - 50)}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
              />
            }
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