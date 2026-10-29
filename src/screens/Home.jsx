
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { C, presets } from '../theme/tokens';
import {
  Label,
  Heading,
  Body,
  Panel,
  Action,
} from '../components/UI';
import ArtCanvas from '../components/ArtCanvas';

export default function Home({ go, selectPreset }) {
  return (
    <ScrollView
      contentContainerStyle={s.wrap}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.row}>
        <View>
          <Label>CREATIVE LAB / VOL. 01</Label>

          <Heading style={{ marginTop: 8 }}>
            Make motion{'\n'}visible.
          </Heading>
        </View>

        <Pressable
          onPress={() => go('settings')}
          accessibilityLabel="About EchoVerse"
          style={s.question}
        >
          <Text
            style={{
              color: C.text,
              fontWeight: '900',
            }}
          >
            ?
          </Text>
        </Pressable>
      </View>

      <Body style={{ marginTop: 12, marginBottom: 22 }}>
        An experimental instrument for creating visual art
        with gesture, rhythm and movement.
      </Body>

      <ArtCanvas
        preset={presets[0]}
        interactive={false}
      />

      <Action
        title="Open creative studio  →"
        onPress={() => go('studio')}
        style={{ marginTop: 16 }}
      />

      <View
        style={[
          s.row,
          {
            marginTop: 30,
            marginBottom: 12,
          },
        ]}
      >
        <Text style={s.section}>
          Explore visual worlds
        </Text>

        <Text style={s.small}>
          04 PRESETS
        </Text>
      </View>

      <View style={s.grid}>
        {presets.map(preset => (
          <Pressable
            key={preset.id}
            onPress={() => {
              selectPreset(preset.id);
              go('studio');
            }}
            style={[
              s.tile,
              {
                borderColor: preset.color + '55',
              },
            ]}
          >
            <View
              style={[
                s.bubble,
                {
                  backgroundColor: preset.color + '2C',
                  borderColor: preset.color,
                },
              ]}
            >
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 7,
                  backgroundColor: preset.color,
                }}
              />
            </View>

            <Text style={s.tileName}>
              {preset.name}
            </Text>

            <Text style={s.tileSub}>
              {preset.sub}
            </Text>
          </Pressable>
        ))}
      </View>

      <Panel style={{ marginTop: 16 }}>
        <Label>THE IDEA</Label>

        <Text
          style={[
            s.section,
            { marginTop: 8 },
          ]}
        >
          Art without a blank page.
        </Text>

        <Body style={{ marginTop: 7 }}>
          Start with a visual world, then change its energy
          and colour. Open the studio to draw with gestures,
          tilt your iPhone, listen to ambient audio and
          share your composition.
        </Body>
      </Panel>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: C.panel2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: C.border,
    borderWidth: 1,
  },
  section: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text,
  },
  small: {
    fontSize: 10,
    color: C.muted,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    backgroundColor: C.panel,
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    minHeight: 145,
  },
  bubble: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tileName: {
    color: C.text,
    fontWeight: '800',
    fontSize: 14,
  },
  tileSub: {
    color: C.muted,
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },
});
