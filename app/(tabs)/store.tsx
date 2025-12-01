import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { GlassView } from '../../components/GlassView';
import { COLORS } from '../../constants/theme';

const PRODUCTS = [
    { id: '1', name: 'Engro Urea', price: 4500, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Wheat Seeds', price: 3200, image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Pesticide X', price: 1500, image: 'https://via.placeholder.com/150' },
];

export default function Store() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Agri Store</Text>
            <FlatList
                data={PRODUCTS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <GlassView style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>Rs. {item.price}</Text>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btnText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </GlassView>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 50,
    },
    header: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 28,
        color: COLORS.white,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    list: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    name: {
        color: COLORS.white,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        color: COLORS.primary,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: COLORS.secondary,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    btnText: {
        color: COLORS.white,
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
    },
});
