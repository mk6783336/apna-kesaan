import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// REPLACE THIS WITH YOUR COMPUTER'S IP ADDRESS!
const BACKEND_URL = 'http://192.168.100.237:5000';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Salam! Main Kisaan Rahnuma hoon. Faslon ke baray mein poochain.', sender: 'ai' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (inputText.trim().length === 0) return;

        const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputText,
                    history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }))
                })
            });

            const data = await response.json();
            const aiMsg = { id: (Date.now() + 1).toString(), text: data.reply || "Connection issue.", sender: 'ai' };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg = { id: (Date.now() + 1).toString(), text: "Network Error. Check connection.", sender: 'ai' };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View className={`flex-row my-2 px-4 ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {item.sender === 'ai' && (
                <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center mr-2 self-end mb-1">
                    <Ionicons name="leaf" size={16} color="#10B981" />
                </View>
            )}
            <View className={`px-5 py-3 rounded-[24px] max-w-[80%] shadow-sm ${item.sender === 'user' ? 'bg-emerald-600 rounded-tr-sm' : 'bg-white border border-gray-100 rounded-tl-sm'}`}>
                <Text className={`text-[15px] leading-6 ${item.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-[#F2F4F7]">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="px-6 py-4 flex-row items-center justify-between bg-white border-b border-gray-100">
                    <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-emerald-500 rounded-full items-center justify-center">
                            <Ionicons name="chatbubbles" size={20} color="white" />
                        </View>
                        <View className="ml-3">
                            <Text className="text-gray-900 text-lg font-bold">Kisaan Rahnuma</Text>
                            <Text className="text-emerald-600 text-xs font-bold">AI Expert</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    className="flex-1"
                    contentContainerStyle={{ paddingVertical: 20 }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Input Area */}
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={90}>
                    <View className="p-4 bg-white border-t border-gray-100 pb-8">
                        <View className="flex-row items-center bg-gray-50 rounded-[24px] px-2 py-2 border border-gray-200">
                            <TouchableOpacity className="p-3">
                                <Ionicons name="mic" size={24} color="#10B981" />
                            </TouchableOpacity>
                            <TextInput
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Ask about crops..."
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 text-gray-800 font-medium h-10 px-2"
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} disabled={isLoading} className={`p-3 rounded-full ${isLoading ? 'bg-gray-300' : 'bg-emerald-600'}`}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Ionicons name="send" size={20} color="white" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
