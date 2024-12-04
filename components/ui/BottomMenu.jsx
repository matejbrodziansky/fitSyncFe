import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontAwesome } from 'react-native-vector-icons';
import { Link } from 'expo-router';

const BottomMenu = () => {
    return (
        <View style={styles.bottomMenu}>
            <TouchableOpacity style={styles.menuItem}>
                <Link href="/" style={styles.link}>
                    <View style={styles.linkContent}>
                    <IconSymbol size={28} name="house.fill" color={Colors.light.text} />
                    <Text style={styles.menuItemText}>Domov</Text>
                    </View>
                </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <FontAwesome name="clipboard" size={28} color={Colors.light.text} />
                <Text style={styles.menuItemText}>Cvičenia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <FontAwesome name="video-camera" size={28} color={Colors.light.text} />
                <Text style={styles.menuItemText}>Videá</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <FontAwesome name="trophy" size={28} color={Colors.light.text} />
                <Text style={styles.menuItemText}>Body</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <FontAwesome name="users" size={28} color={Colors.light.text} />
                <Text style={styles.menuItemText}>Odborníci</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <Link href="/profile" style={styles.link}>
                    <View style={styles.linkContent}>
                        <FontAwesome name="user" size={28} color={Colors.light.text} />
                        <Text style={styles.menuItemText}>Profil</Text>
                    </View>
                </Link>
            </TouchableOpacity>


        </View>
    );
};

export default BottomMenu;

const styles = StyleSheet.create({
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.light.background,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: Colors.light.border,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 12,
        color: Colors.light.text,
        marginTop: 4,
    },
    linkContent: {
        alignItems: 'center', // Zarovná obsah na stred
        flexDirection: 'column', // Umiestni ikonu a text pod seba
    },
    link: {
        textDecorationLine: 'none', // Odstráni podčiarknutie
    },


});
