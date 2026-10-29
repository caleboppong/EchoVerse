
import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';
import { useAudioPlayer } from 'expo-audio';
import { captureRef } from 'react-native-view-shot';
import Slider from '@react-native-community/slider';
import { C, presets } from '../theme/tokens';
import {
    Label,
    Heading,
    Body,
    Panel,
    Chip,
    Action,
} from '../components/UI';
import ArtCanvas from '../components/ArtCanvas';

export default function Studio({ presetId, setPresetId, openInfo }) {
    const [energy, setEnergy] = useState(55);
    const [impulses, setImpulses] = useState(0);
    const [sensor, setSensor] = useState(false);
    const [motion, setMotion] = useState({ x: 0, y: 0 });
    const [audio, setAudio] = useState(false);
    const [full, setFull] = useState(false);
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState('Ready');

    const canvasRef = useRef(null);
    const player = useAudioPlayer(require('../../assets/ambient.wav'));
    const preset = presets.find(p => p.id === presetId) || presets[0];

    useEffect(() => {
        if (!sensor) return;

        let active = true;
        let subscription;

        const startMotion = async () => {
            try {
                const available = await DeviceMotion.isAvailableAsync();

                if (!available) {
                    setStatus('Motion sensor unavailable');
                    setSensor(false);
                    return;
                }

                DeviceMotion.setUpdateInterval(120);

                subscription = DeviceMotion.addListener(event => {
                    if (!active) return;

                    const rotation = event.rotation || {};

                    setMotion({
                        x: Number.isFinite(rotation.beta) ? rotation.beta : 0,
                        y: Number.isFinite(rotation.gamma) ? rotation.gamma : 0,
                    });
                });

                setStatus('Motion active');
            } catch (error) {
                setStatus('Motion unavailable: ' + error.message);
                setSensor(false);
            }
        };

        startMotion();

        return () => {
            active = false;
            subscription?.remove();
            setMotion({ x: 0, y: 0 });
        };
    }, [sensor]);

    useEffect(() => {
        return () => {
            try {
                player.pause();
            } catch { }
        };
    }, [player]);

    const toggleAudio = () => {
        try {
            if (audio) {
                player.pause();
                setAudio(false);
                setStatus('Audio paused');
            } else {
                player.loop = true;
                player.play();
                setAudio(true);
                setStatus('Ambient audio playing');
            }
        } catch (error) {
            setStatus('Audio unavailable: ' + error.message);
        }
    };

    const interact = event => {
        if (event.type === 'tap') {
            setImpulses(count => count + 1);
            Haptics.selectionAsync().catch(() => { });
        }
    };

    const exportArt = async () => {
        if (busy) return;

        setBusy(true);

        try {
            if (!canvasRef.current) {
                throw new Error('Artwork not ready');
            }

            const uri = await captureRef(canvasRef, {
                format: 'png',
                quality: 1,
                result: 'tmpfile',
            });

            const available = await Sharing.isAvailableAsync();

            if (!available) {
                Alert.alert(
                    'Sharing unavailable',
                    'Sharing is not available on this device.'
                );
                return;
            }

            await Sharing.shareAsync(uri, {
                mimeType: 'image/png',
                dialogTitle: 'Share EchoVerse artwork',
                UTI: 'public.png',
            });

            setStatus('Artwork shared');
        } catch (error) {
            Alert.alert('Export unsuccessful', error.message);
            setStatus('Export failed');
        } finally {
            setBusy(false);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={s.wrap}
            showsVerticalScrollIndicator={false}
        >
            {!full && (
                <>
                    <Label>ECHOVERSE / CREATIVE STUDIO</Label>

                    <Heading style={{ marginTop: 7 }}>
                        Shape the unseen.
                    </Heading>

                    <Body style={{ marginTop: 8, marginBottom: 16 }}>
                        Drag across the canvas, tilt your iPhone and shape
                        the rhythm of a living composition.
                    </Body>
                </>
            )}

            <ArtCanvas
                ref={canvasRef}
                preset={preset}
                energy={energy}
                motion={motion}
                large
                onInteract={interact}
            />

            <View style={s.metrics}>
                <View>
                    <Label>ENERGY</Label>
                    <Text style={s.metric}>{Math.round(energy)}%</Text>
                </View>

                <View>
                    <Label>IMPULSES</Label>
                    <Text style={s.metric}>{impulses}</Text>
                </View>

                <View>
                    <Label>SENSOR</Label>
                    <Text
                        style={[
                            s.metric,
                            { color: sensor ? C.success : C.muted },
                        ]}
                    >
                        {sensor ? 'ON' : 'OFF'}
                    </Text>
                </View>
            </View>

            {!full && (
                <>
                    <Panel style={{ marginTop: 18 }}>
                        <Text style={s.section}>
                            Choose a visual world
                        </Text>

                        <View style={s.chips}>
                            {presets.map(item => (
                                <Chip
                                    key={item.id}
                                    title={item.name}
                                    active={presetId === item.id}
                                    color={item.color}
                                    onPress={() => setPresetId(item.id)}
                                />
                            ))}
                        </View>

                        <Text style={[s.section, { marginTop: 18 }]}>
                            Energy intensity
                        </Text>

                        <Slider
                            minimumValue={10}
                            maximumValue={100}
                            step={1}
                            value={energy}
                            onValueChange={setEnergy}
                            minimumTrackTintColor={preset.color}
                            maximumTrackTintColor={C.border}
                            thumbTintColor={preset.secondary}
                            accessibilityLabel="Energy intensity"
                        />

                        <View style={s.between}>
                            <Text style={s.note}>CALM / 10</Text>
                            <Text style={s.note}>INTENSE / 100</Text>
                        </View>
                    </Panel>

                    <Panel style={{ marginTop: 14 }}>
                        <Text style={s.section}>
                            Live instruments
                        </Text>

                        <Body style={{ marginTop: 6, marginBottom: 14 }}>
                            Motion tilts the composition. Ambient sound is an
                            original locally bundled loop; it is not
                            microphone-reactive.
                        </Body>

                        <View style={s.buttons}>
                            <Action
                                title={sensor ? 'Stop motion' : 'Enable motion'}
                                outline
                                onPress={() => setSensor(value => !value)}
                                style={{ flex: 1, marginRight: 8 }}
                            />

                            <Action
                                title={audio ? 'Pause audio' : 'Play audio'}
                                onPress={toggleAudio}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </Panel>
                </>
            )}

            <View style={[s.buttons, { marginTop: 14 }]}>
                <Action
                    title={busy ? 'Preparing...' : 'Share PNG'}
                    onPress={exportArt}
                    style={{ flex: 1, marginRight: 8 }}
                />

                <Action
                    title={full ? 'Show controls' : 'Focus mode'}
                    outline
                    onPress={() => setFull(value => !value)}
                    style={{ flex: 1 }}
                />
            </View>

            {!full && (
                <Action
                    title="How does this work?"
                    outline
                    onPress={openInfo}
                    style={{ marginTop: 12 }}
                />
            )}

            <Text
                accessibilityLiveRegion="polite"
                style={s.status}
            >
                {status} · Artwork is generated on-device
            </Text>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    wrap: {
        padding: 18,
        paddingBottom: 40,
    },
    metrics: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 17,
    },
    metric: {
        color: C.text,
        fontSize: 22,
        fontWeight: '900',
        marginTop: 6,
    },
    section: {
        color: C.text,
        fontSize: 17,
        fontWeight: '800',
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 13,
    },
    between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    note: {
        color: C.muted,
        fontSize: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    status: {
        textAlign: 'center',
        fontSize: 11,
        color: C.muted,
        marginTop: 18,
    },
});
