import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { GlassView } from '../../components/GlassView';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Salam! Main aap ki kya madad kar sakta hoon?', sender: 'ai' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'user' }]);
        setInput('');
        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Main abhi seekh raha hoon. Jald hi jawab dunga!', sender: 'ai' }]);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Kisaan Chat</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.chatList}
                renderItem={({ item }) => (
                    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />

            <GlassView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor={COLORS.gray}
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
                    <Ionicons name="send" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.micBtn}>
                    <Ionicons name="mic" size={24} color={COLORS.secondary} />
                </TouchableOpacity>
            </GlassView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 24,
        color: COLORS.white,
    },
    chatList: {
        padding: 20,
        paddingBottom: 100,
    },
    messageBubble: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        maxWidth: '80%',
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    aiBubble: {
        backgroundColor: '#374151',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        color: COLORS.white,
        fontFamily: 'Hind_400Regular',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 90, // Above tab bar
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
    },
    input: {
        flex: 1,
        color: COLORS.white,
        paddingHorizontal: 10,
        fontFamily: 'Hind_400Regular',
    },
    sendBtn: {
        padding: 10,
    },
    micBtn: {
        padding: 10,
    },
});
