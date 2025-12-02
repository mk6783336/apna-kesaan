import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

const PRODUCTS = [
    { id: '1', name: 'Engro Urea (50kg)', urdu: 'انگرو یوریا', price: 4500, icon: 'leaf', color: ['#10B981', '#059669'], desc: 'Premium nitrogen fertilizer' },
    { id: '2', name: 'Sarsabz DAP (50kg)', urdu: 'سرسبز ڈی اے پی', price: 12000, icon: 'water', color: ['#3B82F6', '#2563EB'], desc: 'Di-Ammonium Phosphate' },
    { id: '3', name: 'Wheat Seeds (50kg)', urdu: 'گندم کا بیج', price: 3200, icon: 'nutrition', color: ['#F59E0B', '#D97706'], desc: 'Certified wheat variety' },
    { id: '4', name: 'Neem Oil Spray', urdu: 'نیم آئل سپرے', price: 1800, icon: 'flask', color: ['#10B981', '#059669'], desc: 'Organic pesticide' },
    { id: '5', name: 'Antracol Fungicide', urdu: 'اینٹراکول', price: 2800, icon: 'shield-checkmark', color: ['#8B5CF6', '#7C3AED'], desc: 'Crop protection' },
    { id: '6', name: 'Insecticide Spray', urdu: 'کیڑے مار دوا', price: 2200, icon: 'bug', color: ['#EF4444', '#DC2626'], desc: 'Pest control solution' },
    { id: '7', name: 'NPK Fertilizer (50kg)', urdu: 'این پی کے کھاد', price: 5500, icon: 'flower', color: ['#EC4899', '#DB2777'], desc: 'Complete plant nutrition' },
    { id: '8', name: 'Corn Seeds (25kg)', urdu: 'مکئی کا بیج', price: 4200, icon: 'leaf-outline', color: ['#F59E0B', '#D97706'], desc: 'High yield variety' },
    { id: '9', name: 'Potash Fertilizer', urdu: 'پوٹاش', price: 7800, icon: 'analytics', color: ['#3B82F6', '#2563EB'], desc: 'Potassium supplement' },
    { id: '10', name: 'Organic Compost', urdu: 'نامیاتی کھاد', price: 1500, icon: 'earth', color: ['#10B981', '#059669'], desc: 'Natural soil enhancer' },
];

export default function StoreScreen() {
    const [checkoutProduct, setCheckoutProduct] = useState(null);
    const [quantity, setQuantity] = useState('1');

    const handleCheckout = () => {
        if (checkoutProduct) {
            const message = `السلام علیکم!\n\nمیں آرڈر کرنا چاہتا ہوں:\n\nProduct: ${checkoutProduct.name}\n${checkoutProduct.urdu}\n\nQuantity: ${quantity}\nTotal: Rs ${checkoutProduct.price * parseInt(quantity || 1)}\n\nبراہ کرم دستیابی کی تصدیق کریں۔\nPlease confirm availability.`;
            Linking.openURL(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`);
            setCheckoutProduct(null);
            setQuantity('1');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF8E7' }}>

            {/* Hero Image Header */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1500' }}
                style={{ height: 220 }}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(245,158,11,0.4)', 'rgba(217,119,6,0.75)', 'rgba(180,83,9,0.95)']}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <SafeAreaView>
                        <View style={{ padding: 24, flexDirection: 'row', alignItems: 'center' }}>
                            <LinearGradient
                                colors={['#FFFFFF', '#FEF3C7']}
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 16,
                                    shadowColor: '#FFFFFF',
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 12,
                                    elevation: 12,
                                }}
                            >
                                <Ionicons name="storefront" size={32} color="#F59E0B" />
                            </LinearGradient>
                            <View>
                                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Kisaan Market</Text>
                                <Text style={{ color: '#FED7AA', fontSize: 18 }}>کسان مارکیٹ</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>

            <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24, marginTop: -20 }} showsVerticalScrollIndicator={false}>

                {/* Category Header */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: '#1F2937', fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
                        Pakistani Agriculture Products
                    </Text>
                    <Text style={{ color: '#6B7280', fontSize: 16 }}>
                        Premium quality farming supplies • پریمیم زرعی مصنوعات
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 120 }}>
                    {PRODUCTS.map((product) => (
                        <View
                            key={product.id}
                            style={{ width: '48%', marginBottom: 16 }}
                        >
                            <LinearGradient
                                colors={['#FFFFFF', '#FAFAFA']}
                                style={{
                                    borderRadius: 28,
                                    padding: 20,
                                    shadowColor: product.color[0],
                                    shadowOffset: { width: 0, height: 8 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 16,
                                    elevation: 8,
                                    borderWidth: 2,
                                    borderColor: `${product.color[0]}15`,
                                }}
                            >
                                <LinearGradient
                                    colors={product.color}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 16,
                                        shadowColor: product.color[0],
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.6,
                                        shadowRadius: 15,
                                        elevation: 15,
                                    }}
                                >
                                    <Ionicons name={product.icon} size={32} color="white" />
                                </LinearGradient>

                                <Text style={{ color: '#1F2937', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }} numberOfLines={2}>
                                    {product.name}
                                </Text>
                                <Text style={{ color: '#6B7280', fontSize: 13, marginBottom: 8 }}>{product.urdu}</Text>
                                <Text style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 12 }}>{product.desc}</Text>

                                <Text style={{ color: '#1F2937', fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>₨{product.price}</Text>

                                <TouchableOpacity
                                    onPress={() => setCheckoutProduct(product)}
                                >
                                    <LinearGradient
                                        colors={product.color}
                                        style={{
                                            paddingVertical: 14,
                                            borderRadius: 20,
                                            shadowColor: product.color[0],
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 0.6,
                                            shadowRadius: 12,
                                            elevation: 12,
                                        }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>Buy Now</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Checkout Modal */}
            <Modal visible={checkoutProduct !== null} animationType="slide" transparent>
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <LinearGradient
                        colors={['#FFFFFF', '#F0FDF4']}
                        style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45, padding: 32, height: '70%' }}
                    >

                        <View style={{ width: 80, height: 8, backgroundColor: '#6EE7B7', borderRadius: 4, alignSelf: 'center', marginBottom: 24 }} />

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{ color: '#1F2937', fontSize: 30, fontWeight: 'bold', marginBottom: 24 }}>Checkout • چیک آؤٹ</Text>

                            <View
                                style={{
                                    backgroundColor: '#ECFDF5',
                                    borderRadius: 28,
                                    padding: 24,
                                    marginBottom: 24,
                                    borderWidth: 2,
                                    borderColor: 'rgba(16, 185, 129, 0.2)',
                                }}
                            >
                                <Text style={{ color: '#374151', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>{checkoutProduct?.name}</Text>
                                <Text style={{ color: '#6B7280', marginBottom: 8 }}>{checkoutProduct?.urdu}</Text>
                                <Text style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 16 }}>{checkoutProduct?.desc}</Text>
                                <Text style={{ color: '#1F2937', fontSize: 30, fontWeight: 'bold' }}>₨{checkoutProduct?.price}</Text>
                            </View>

                            <Text style={{ color: '#1F2937', fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Quantity • مقدار</Text>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 24,
                                    marginBottom: 24,
                                    borderWidth: 2,
                                    borderColor: 'rgba(16, 185, 129, 0.1)',
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 12,
                                    elevation: 4,
                                }}
                            >
                                <TextInput
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    keyboardType="numeric"
                                    style={{ paddingHorizontal: 24, paddingVertical: 16, color: '#1F2937', fontSize: 18, fontWeight: '500' }}
                                    placeholder="Enter quantity"
                                />
                            </View>

                            <View style={{ backgroundColor: '#ECFDF5', borderRadius: 24, padding: 20, marginBottom: 24 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <Text style={{ color: '#6B7280', fontSize: 16 }}>Subtotal:</Text>
                                    <Text style={{ color: '#1F2937', fontWeight: 'bold', fontSize: 18 }}>₨{checkoutProduct?.price * parseInt(quantity || 1)}</Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#D1FAE5', marginVertical: 12 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#1F2937', fontWeight: 'bold', fontSize: 20 }}>Total:</Text>
                                    <Text style={{ color: '#10B981', fontWeight: 'bold', fontSize: 26 }}>₨{checkoutProduct?.price * parseInt(quantity || 1)}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity
                                    onPress={() => setCheckoutProduct(null)}
                                    style={{ flex: 1 }}
                                >
                                    <View style={{ backgroundColor: '#E5E7EB', paddingVertical: 20, borderRadius: 24 }}>
                                        <Text style={{ color: '#1F2937', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleCheckout}
                                    style={{ flex: 1 }}
                                >
                                    <LinearGradient
                                        colors={['#10B981', '#059669']}
                                        style={{
                                            paddingVertical: 20,
                                            borderRadius: 24,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: '#10B981',
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 0.7,
                                            shadowRadius: 15,
                                            elevation: 15,
                                        }}
                                    >
                                        <Ionicons name="logo-whatsapp" size={24} color="white" />
                                        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 18 }}>Order</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </LinearGradient>
                </View>
            </Modal>

        </View>
    );
}
