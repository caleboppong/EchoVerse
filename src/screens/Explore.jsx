
import React from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import { C, presets } from '../theme/tokens';
import {
    Label,
    Heading,
    Body,
    Panel,
} from '../components/UI';

export default function Explore({ go, selectPreset }) {
    return (
        <ScrollView contentContainerStyle={s.wrap}>
            <Label>VISUAL LIBRARY</Label>

            <Heading style={{ marginTop: 8 }}>
                Four ways to feel.
            </Heading>

            <Body style={{ marginTop: 10, marginBottom: 20 }}>
                Each world explores a different relationship between
                rhythm, colour and form.
            </Body>

            {presets.map((preset, index) => (
                <Pressable
                    key={preset.id}
                    onPress={() => {
                        selectPreset(preset.id);
                        go('studio');
                    }}
                    style={s.item}
                >
                    <View
                        style={[
                            s.art,
                            { borderColor: preset.color + '66' },
                        ]}
                    >
                        <View
                            style={[
                                s.ring,
                                {
                                    borderColor: preset.color,
                                    width: 75 - index * 7,
                                    height: 75 - index * 7,
                                },
                            ]}
                        />

                        <View
                            style={[
                                s.dot,
                                { backgroundColor: preset.secondary },
                            ]}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={s.name}>
                            {preset.name}
                        </Text>

                        <Text style={s.sub}>
                            {preset.sub}
                        </Text>

                        <Text
                            style={[
                                s.open,
                                { color: preset.color },
                            ]}
                        >
                            EXPLORE WORLD →
                        </Text>
                    </View>
                </Pressable>
            ))}

            <Panel>
                <Label>DESIGN NOTE</Label>

                <Body style={{ marginTop: 8 }}>
                    These four studies form the foundation for a more
                    expressive engine. Try each world with touch gestures,
                    motion and different energy levels.
                </Body>
            </Panel>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    wrap: {
        padding: 20,
        paddingBottom: 32,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: C.panel,
        borderColor: C.border,
        borderWidth: 1,
        borderRadius: 22,
        padding: 13,
        marginBottom: 12,
        alignItems: 'center',
    },
    art: {
        height: 98,
        width: 98,
        backgroundColor: C.navy,
        borderWidth: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    ring: {
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    name: {
        color: C.text,
        fontWeight: '800',
        fontSize: 17,
    },
    sub: {
        color: C.muted,
        fontSize: 12,
        marginTop: 6,
    },
    open: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        marginTop: 15,
    },
});
