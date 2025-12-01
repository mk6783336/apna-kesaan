import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Pakistani Agri Products
const PAK_PRODUCTS = [
    { _id: '1', name: 'Engro Urea', price: 4500, category: 'Fertilizer', image: 'https://engro.com/wp-content/uploads/2019/11/Engro-Urea-Bag.png' },
    { _id: '2', name: 'Sarsabz DAP', price: 12500, category: 'Fertilizer', image: 'https://fatima-group.com/wp-content/uploads/2021/07/Sarsabz-DAP-Bag-Front.png' },
    { _id: '3', name: 'Punjab Wheat Seed', price: 6000, category: 'Seeds', image: 'https://cdn-icons-png.flaticon.com/512/1581/1581869.png' },
    { _id: '4', name: 'Coragen (Pesticide)', price: 2500, category: 'Medicine', image: 'https://cdn-icons-png.flaticon.com/512/2829/2829841.png' },
    { _id: '5', name: 'Millat Tractor Oil', price: 3500, category: 'Machinery', image: 'https://cdn-icons-png.flaticon.com/512/3058/3058995.png' },
    { _id: '6', name: 'Roundup Herbicide', price: 1800, category: 'Medicine', image: 'https://cdn-icons-png.flaticon.com/512/10606/10606063.png' },
];

const CATEGORIES = ['All', 'Fertilizer', 'Seeds', 'Medicine', 'Tools'];

export default function StoreScreen() {
    const [products] = useState(PAK_PRODUCTS);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleBuy = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const confirmOrder = () => {
        if (selectedProduct) {
            const message = `Hello! I want to order: ${selectedProduct.name} (Price: Rs ${selectedProduct.price}). Please confirm delivery.`;
            const url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=923495474869`;

            Linking.openURL(url).catch(() => {
                Alert.alert("Error", "WhatsApp not installed on this device.");
            });
            setModalVisible(false);
        }
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleBuy(item)}
            className="flex-1 bg-white m-2 p-3 rounded-[24px] shadow-sm border border-gray-100"
        >
            <View className="h-36 w-full items-center justify-center mb-3 bg-[#F9FAFB] rounded-2xl relative">
                <Image source={{ uri: item.image }} className="w-24 h-24" resizeMode="contain" />
            </View>
            <Text className="text-gray-900 font-bold text-[15px] mb-1 line-clamp-1">{item.name}</Text>
            <Text className="text-gray-400 text-xs mb-2 font-medium">{item.category}</Text>
            <View className="flex-row justify-between items-center">
                <Text className="text-emerald-600 font-bold text-base">Rs {item.price}</Text>
                <View className="bg-emerald-600 p-1.5 rounded-full">
                    <Ionicons name="logo-whatsapp" size={16} color="white" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#F2F4F7]">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
                    <View>
                        <Text className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-1">Shop</Text>
                        <Text className="text-gray-900 text-2xl font-bold">Kisaan Market</Text>
                    </View>
                    <View className="bg-white p-2 rounded-full shadow-sm border border-gray-100 relative">
                        <Ionicons name="cart-outline" size={24} color="#1F2937" />
                    </View>
                </View>

                {/* Categories */}
                <View className="py-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                        {CATEGORIES.map((cat, index) => (
                            <TouchableOpacity key={index} className={`mr-3 px-5 py-2.5 rounded-full ${index === 0 ? 'bg-emerald-600' : 'bg-white border border-gray-200'}`}>
                                <Text className={`font-bold ${index === 0 ? 'text-white' : 'text-gray-600'}`}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Checkout Modal */}
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <View className="flex-1 justify-end bg-black/60">
                        <View className="bg-white rounded-t-[40px] p-8 h-[50%]">
                            <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-6" />

                            <Text className="text-2xl font-bold text-gray-900 mb-6">Confirm Order</Text>

                            {selectedProduct && (
                                <View className="bg-[#F9FAFB] p-4 rounded-3xl border border-gray-100 flex-row items-center mb-8">
                                    <Image source={{ uri: selectedProduct.image }} className="w-20 h-20 mr-4" resizeMode="contain" />
                                    <View className="flex-1">
                                        <Text className="text-gray-900 font-bold text-lg">{selectedProduct.name}</Text>
                                        <Text className="text-emerald-600 font-bold text-xl">Rs {selectedProduct.price}</Text>
                                    </View>
                                </View>
                            )}

                            <TouchableOpacity onPress={confirmOrder} className="bg-[#25D366] p-5 rounded-[24px] items-center shadow-lg mb-3 flex-row justify-center">
                                <Ionicons name="logo-whatsapp" size={24} color="white" style={{ marginRight: 10 }} />
                                <Text className="text-white font-bold text-lg">Order via WhatsApp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} className="p-4 items-center">
                                <Text className="text-gray-500 font-bold">Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
}
