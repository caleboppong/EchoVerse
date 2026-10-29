import React from 'react';
import {View,Text,Pressable,StyleSheet} from 'react-native';
import {C} from '../theme/tokens';
export function Label({children,style}) {return <Text style={[s.label,style]}>{children}</Text>}
export function Heading({children,style}) {return <Text style={[s.heading,style]}>{children}</Text>}
export function Body({children,style}) {return <Text style={[s.body,style]}>{children}</Text>}
export function Panel({children,style}) {return <View style={[s.panel,style]}>{children}</View>}
export function Action({title,onPress,outline=false,style,disabled=false}) {return <Pressable accessibilityRole="button" accessibilityLabel={title} disabled={disabled} onPress={onPress} style={({pressed})=>[s.action,outline&&s.outline,style,pressed&&{opacity:.8},disabled&&{opacity:.45}]}><Text style={[s.actionText,outline&&{color:C.text}]}>{title}</Text></Pressable>}
export function Chip({title,active,onPress,color=C.violet}) {return <Pressable accessibilityRole="button" accessibilityState={{selected:active}} onPress={onPress} style={[s.chip,active&&{backgroundColor:color+'28',borderColor:color}]}><Text style={[s.chipText,active&&{color:C.text}]}>{title}</Text></Pressable>}
const s=StyleSheet.create({label:{fontSize:11,fontWeight:'800',letterSpacing:2,color:C.cyan,textTransform:'uppercase'},heading:{fontSize:31,fontWeight:'800',letterSpacing:-1,color:C.text},body:{fontSize:14,lineHeight:22,color:C.muted},panel:{backgroundColor:C.panel,borderRadius:24,borderWidth:1,borderColor:C.border,padding:18},action:{backgroundColor:C.violet,minHeight:50,paddingHorizontal:20,justifyContent:'center',alignItems:'center',borderRadius:16},outline:{backgroundColor:C.panel2,borderWidth:1,borderColor:C.border},actionText:{fontSize:15,fontWeight:'800',color:C.navy},chip:{borderWidth:1,borderColor:C.border,backgroundColor:C.panel2,borderRadius:24,paddingHorizontal:14,paddingVertical:10,marginRight:8,marginBottom:8},chipText:{color:C.muted,fontWeight:'700',fontSize:12}});
