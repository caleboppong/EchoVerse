
import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Modal,
    ScrollView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView,
} from 'react-native-safe-area-context';

import { C } from './src/theme/tokens';
import {
    Action,
    Label,
    Heading,
    Body,
} from './src/components/UI';

import Home from './src/screens/Home';
import Studio from './src/screens/Studio';
import Explore from './src/screens/Explore';
import Settings from './src/screens/Settings';

const tabs = [
    {
        id: 'home',
        name: 'Home',
        glyph: '⌂',
    },
    {
        id: 'studio',
        name: 'Studio',
        glyph: '◎',
    },
    {
        id: 'explore',
        name: 'Explore',
        glyph: '✧',
    },
    {
        id: 'settings',
        name: 'Guide',
        glyph: '☰',
    },
];

export default function App() {
    const [tab, setTab] = useState('home');
    const [presetId, setPresetId] = useState('aurora');
    const [modal, setModal] = useState('welcome');

    const openInfo = () => {
        setModal('info');
    };

    const close = () => {
        setModal(null);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={s.safe}
                edges={['top', 'bottom']}
            >
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={C.bg}
                />

                <View style={s.header}>
                    <View style={s.brand}>
                        <View style={s.brandMark}>
                            <Text style={s.brandMarkText}>
                                ◈
                            </Text>
                        </View>

                        <View>
                            <Text style={s.brandTitle}>
                                ECHOVERSE
                            </Text>

                            <Text style={s.brandSub}>
                                ART IN MOTION
                            </Text>
                        </View>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open information"
                        onPress={openInfo}
                        style={s.help}
                    >
                        <Text style={s.helpText}>
                            i
                        </Text>
                    </Pressable>
                </View>

                <View style={{ flex: 1 }}>
                    {tab === 'home' ? (
                        <Home
                            go={setTab}
                            selectPreset={setPresetId}
                        />
                    ) : tab === 'studio' ? (
                        <Studio
                            presetId={presetId}
                            setPresetId={setPresetId}
                            openInfo={openInfo}
                        />
                    ) : tab === 'explore' ? (
                        <Explore
                            go={setTab}
                            selectPreset={setPresetId}
                        />
                    ) : (
                        <Settings
                            openInfo={openInfo}
                            openWelcome={() => setModal('welcome')}
                        />
                    )}
                </View>

                <View style={s.nav}>
                    {tabs.map(item => (
                        <Pressable
                            key={item.id}
                            onPress={() => setTab(item.id)}
                            accessibilityRole="tab"
                            accessibilityState={{
                                selected: tab === item.id,
                            }}
                            style={[
                                s.navItem,
                                tab === item.id && s.navActive,
                            ]}
                        >
                            <Text
                                style={[
                                    s.navIcon,
                                    tab === item.id && {
                                        color: C.cyan,
                                    },
                                ]}
                            >
                                {item.glyph}
                            </Text>

                            <Text
                                style={[
                                    s.navText,
                                    tab === item.id && {
                                        color: C.text,
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Modal
                    visible={modal !== null}
                    transparent
                    animationType="fade"
                    onRequestClose={close}
                >
                    <View style={s.backdrop}>
                        <View style={s.modalCard}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                            >
                                <Label>
                                    {modal === 'welcome'
                                        ? 'WELCOME / ECHOVERSE'
                                        : 'STUDIO INSTRUCTIONS'}
                                </Label>

                                <Heading
                                    style={{
                                        marginTop: 12,
                                        fontSize: 28,
                                    }}
                                >
                                    {modal === 'welcome'
                                        ? 'Art begins with you.'
                                        : 'Make your first visual.'}
                                </Heading>

                                <Body style={{ marginTop: 12 }}>
                                    {modal === 'welcome'
                                        ? 'EchoVerse is an experimental visual studio. Explore four artistic worlds and shape their motion through simple interaction.'
                                        : 'Open Studio, select a visual world, tap the canvas to add an impulse, and use the energy controls to change the pace of its movement.'}
                                </Body>

                                <View style={s.modalRule} />

                                <Text style={s.modalStep}>
                                    01  CHOOSE A VISUAL WORLD
                                </Text>

                                <Body>
                                    Explore Aurora Drift, Pulse Garden,
                                    Orbit Studies or Ember Bloom.
                                </Body>

                                <Text style={s.modalStep}>
                                    02  INTERACT WITH THE CANVAS
                                </Text>

                                <Body>
                                    Touch and drag the artwork. Tilt your
                                    iPhone when motion is enabled.
                                </Body>

                                <Text style={s.modalStep}>
                                    03  SHAPE THE MOVEMENT
                                </Text>

                                <Body>
                                    Adjust the slider to change animation
                                    speed; use Share PNG to export a still image.
                                </Body>

                                <Text style={s.disclaimer}>
                                    Audio is an original ambient loop,
                                    not microphone-reactive. PNG sharing
                                    exports a still image, not a video.
                                    Motion readings may vary by device.
                                </Text>

                                <Action
                                    title={
                                        modal === 'welcome'
                                            ? 'Enter EchoVerse →'
                                            : 'Got it'
                                    }
                                    onPress={close}
                                    style={{ marginTop: 20 }}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const s = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: C.bg,
    },
    header: {
        height: 66,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: C.border,
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandMark: {
        height: 36,
        width: 36,
        borderRadius: 12,
        backgroundColor: C.violet + '25',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    brandMarkText: {
        fontSize: 25,
        color: C.violet,
    },
    brandTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: C.text,
        letterSpacing: 2,
    },
    brandSub: {
        fontSize: 9,
        color: C.muted,
        fontWeight: '800',
        letterSpacing: 2,
        marginTop: 2,
    },
    help: {
        height: 34,
        width: 34,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: C.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpText: {
        color: C.text,
        fontWeight: '800',
    },
    nav: {
        height: 69,
        backgroundColor: C.panel,
        borderTopWidth: 1,
        borderColor: C.border,
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingTop: 7,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    navActive: {
        backgroundColor: C.panel2,
    },
    navIcon: {
        fontSize: 23,
        color: C.muted,
        lineHeight: 27,
    },
    navText: {
        fontSize: 10,
        color: C.muted,
        fontWeight: '800',
        marginTop: 2,
    },
    backdrop: {
        flex: 1,
        backgroundColor: '#000000CC',
        justifyContent: 'center',
        padding: 22,
    },
    modalCard: {
        backgroundColor: C.panel,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: C.border,
        padding: 23,
        maxHeight: '86%',
    },
    modalRule: {
        height: 1,
        backgroundColor: C.border,
        marginVertical: 18,
    },
    modalStep: {
        color: C.text,
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
        marginTop: 14,
        marginBottom: 5,
    },
    disclaimer: {
        color: C.amber,
        fontSize: 11,
        lineHeight: 17,
        marginTop: 18,
    },
});
