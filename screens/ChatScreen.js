import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const BACKEND_URL = 'http://192.168.100.237:5000';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'السلام علیکم! میں آپ کا فارمنگ اسسٹنٹ ہوں۔ کھیتی باڑی کے بارے میں کچھ بھی پوچھیں۔\n\nAs-Salaam Alaikum! I am your farming assistant. Ask me anything about agriculture!',
            sender: 'ai',
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef(null);

    const sendMessage = async () => {
        if (inputText.trim().length === 0) return;

        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputText,
                    history: messages.map(m => ({
                        role: m.sender === 'user' ? 'user' : 'model',
                        parts: [{ text: m.text }],
                    })),
                }),
            });

            const data = await response.json();
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                text: data.reply || 'For wheat, ensure proper irrigation 2-3 times weekly during growth.',
                sender: 'ai',
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            const fallbackMessage = {
                id: (Date.now() + 1).toString(),
                text: 'For wheat cultivation, ensure proper soil drainage and irrigation 2-3 times per week.',
                sender: 'ai',
            };
            setMessages(prev => [...prev, fallbackMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (messages.length > 1) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const renderMessage = ({ item }) => (
        <View style={{ marginVertical: 8, marginHorizontal: 16, alignItems: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            {item.sender === 'user' ? (
                <LinearGradient
                    colors={['#F59E0B', '#D97706', '#B45309']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        borderRadius: 28,
                        borderTopRightRadius: 4,
                        maxWidth: '80%',
                        shadowColor: '#F59E0B',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.7,
                        shadowRadius: 15,
                        elevation: 15,
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '500', lineHeight: 28, fontSize: 16 }}>{item.text}</Text>
                </LinearGradient>
            ) : (
                <View
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        borderRadius: 28,
                        borderTopLeftRadius: 4,
                        maxWidth: '80%',
                        shadowColor: '#10B981',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 8,
                        borderWidth: 2,
                        borderColor: 'rgba(16, 185, 129, 0.1)',
                    }}
                >
                    <Text style={{ color: '#1F2937', fontWeight: '500', lineHeight: 28, fontSize: 16 }}>{item.text}</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF8E7' }}>

            {/* Hero Image Header */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1500' }}
                style={{ height: 200 }}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(245,158,11,0.5)', 'rgba(217,119,6,0.8)', 'rgba(180,83,9,0.95)']}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <SafeAreaView>
                        <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>Farming Assistant</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <View
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: '#6EE7B7',
                                        borderRadius: 6,
                                        marginRight: 8,
                                        shadowColor: '#6EE7B7',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 1,
                                        shadowRadius: 6,
                                        elevation: 6,
                                    }}
                                />
                                <Text style={{ color: '#FED7AA', fontSize: 14 }}>کھیتی کا مشیر • Online & Ready to Help</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>

            {/* Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Loading */}
            {isLoading && (
                <View style={{ paddingHorizontal: 32, paddingVertical: 8 }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 28,
                            paddingHorizontal: 24,
                            paddingVertical: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            shadowColor: '#10B981',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            elevation: 8,
                            borderWidth: 2,
                            borderColor: 'rgba(16, 185, 129, 0.1)',
                        }}
                    >
                        <ActivityIndicator size="small" color="#10B981" />
                        <Text style={{ color: '#6B7280', marginLeft: 12, fontWeight: '500' }}>Thinking...</Text>
                    </View>
                </View>
            )}

            {/* Vibrant Input */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
            >
                <LinearGradient
                    colors={['#FFFFFF', '#F0FDF4']}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        paddingBottom: 112,
                        shadowColor: '#10B981',
                        shadowOffset: { width: 0, height: -8 },
                        shadowOpacity: 0.15,
                        shadowRadius: 20,
                        elevation: 20,
                        borderTopWidth: 2,
                        borderTopColor: 'rgba(16, 185, 129, 0.1)',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F9FAFB',
                            borderRadius: 30,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            shadowColor: '#10B981',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 12,
                            elevation: 4,
                            borderWidth: 2,
                            borderColor: 'rgba(16, 185, 129, 0.1)',
                        }}
                    >
                        <TouchableOpacity style={{ padding: 8 }}>
                            <LinearGradient
                                colors={['#F59E0B', '#D97706']}
                                style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Ionicons name="mic" size={22} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Ask about farming..."
                            placeholderTextColor="#9CA3AF"
                            style={{ flex: 1, color: '#1F2937', fontWeight: '500', paddingHorizontal: 12, paddingVertical: 12, fontSize: 16 }}
                            onSubmitEditing={sendMessage}
                            multiline
                        />
                        <TouchableOpacity
                            onPress={sendMessage}
                            disabled={isLoading || inputText.trim().length === 0}
                        >
                            <LinearGradient
                                colors={isLoading || inputText.trim().length === 0 ? ['#D1D5DB', '#D1D5DB'] : ['#10B981', '#059669']}
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: isLoading || inputText.trim().length === 0 ? 0 : 0.7,
                                    shadowRadius: 15,
                                    elevation: isLoading || inputText.trim().length === 0 ? 0 : 15,
                                }}
                            >
                                <Ionicons
                                    name="send"
                                    size={22}
                                    color="white"
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#9CA3AF', fontSize: 12, textAlign: 'center', marginTop: 12 }}>
                        🎤 Tap mic for voice • Type to chat
                    </Text>
                </LinearGradient>
            </KeyboardAvoidingView>

        </View>
    );
}
