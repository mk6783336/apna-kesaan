import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { GlassView } from '../../components/GlassView';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, '#0f172a']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Smart Dashboard</Text>

        {/* Bento Grid */}
        <View style={styles.grid}>
          {/* Block 1: Live Weather (Large) */}
          <GlassView style={[styles.card, styles.weatherCard]}>
            <View style={styles.weatherHeader}>
              <Ionicons name="cloud-outline" size={32} color={COLORS.white} />
              <Text style={styles.temp}>28°C</Text>
            </View>
            <Text style={styles.weatherText}>Rain likely today.</Text>
            <Text style={styles.advice}>"Aaj paani na lagayein"</Text>
          </GlassView>

          {/* Block 2: Market Rates (Small) */}
          <GlassView style={[styles.card, styles.marketCard]}>
            <Text style={styles.cardTitle}>Market Rates</Text>
            <View style={styles.rateRow}>
              <Text style={styles.crop}>Wheat</Text>
              <Text style={styles.price}>Rs. 4200</Text>
            </View>
            <View style={styles.rateRow}>
              <Text style={styles.crop}>Rice</Text>
              <Text style={styles.price}>Rs. 3500</Text>
            </View>
          </GlassView>

          {/* Block 3: Crop Health (Wide) */}
          <GlassView style={[styles.card, styles.healthCard]}>
            <View style={styles.healthContent}>
              <View>
                <Text style={styles.cardTitle}>My Crop Health</Text>
                <Text style={styles.healthStatus}>85% Healthy</Text>
                <Text style={styles.lastScan}>Last scan: 2 hours ago</Text>
              </View>
              {/* Circular Progress Placeholder */}
              <View style={styles.circle}>
                <Text style={styles.circleText}>85%</Text>
              </View>
            </View>
          </GlassView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // For tab bar
  },
  header: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
    color: COLORS.white,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  weatherCard: {
    width: '60%', // Large
    height: 180,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 185, 129, 0.2)', // Emerald tint
  },
  marketCard: {
    width: '35%', // Small
    height: 180,
    justifyContent: 'center',
  },
  healthCard: {
    width: '100%', // Wide
    height: 120,
    justifyContent: 'center',
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temp: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 36,
    color: COLORS.white,
  },
  weatherText: {
    fontFamily: 'Hind_400Regular',
    color: COLORS.gray,
    fontSize: 14,
  },
  advice: {
    fontFamily: 'Hind_400Regular',
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontFamily: 'Montserrat_700Bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  crop: {
    color: COLORS.gray,
    fontFamily: 'Hind_400Regular',
  },
  price: {
    color: COLORS.primary,
    fontFamily: 'Montserrat_700Bold',
  },
  healthContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthStatus: {
    color: COLORS.primary,
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
  },
  lastScan: {
    color: COLORS.gray,
    fontSize: 12,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
  },
});
