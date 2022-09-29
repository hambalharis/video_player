import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory-native';
import {getDashboardData} from '../services/WebServices';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setLoading(true);
    DashboardData();
  }, []);

  const DashboardData = () => {
    let form = new FormData();
    form.append('user_id', '489');

    getDashboardData(form)
      .then(res => res.json())
      .then(result => {
        console.log(
          '\n\n\n\n GRAPH DATA ==>>' +
            JSON.stringify(result.data.overallTrendsChart),
        );
        setChartData(result.data.overallTrendsChart);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Dashboard</Text>
      </View>
      <View
        style={{padding: 20, alignItems: 'center', justifyContent: 'center'}}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: {stroke: '#c43a31'},
              parent: {border: '1px solid #ccc'},
            }}
            // x="VideoName"
            y="score"
            data={chartData}
          />
        </VictoryChart>
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    padding: 18,
    elevation: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});

export default Dashboard;
