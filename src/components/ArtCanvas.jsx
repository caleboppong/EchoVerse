import React,{forwardRef,useEffect,useMemo,useRef,useState} from 'react';
import {View,Text,StyleSheet,Animated,PanResponder} from 'react-native';
import Svg,{Circle,Ellipse,Line,Path,Defs,RadialGradient,Stop} from 'react-native-svg';
import {C} from '../theme/tokens';
const N=48;
const particles=Array.from({length:N},(_,i)=>({angle:i*2.399963,rad:14+Math.sqrt((i+.5)/N)*130,r:1.5+(i%5)*.75,phase:(i*17)%31}));
const ArtCanvas=forwardRef(function ArtCanvas({preset,energy=55,motion={x:0,y:0},interactive=true,large=false,onInteract,showLabels=true},ref){
 const spin=useRef(new Animated.Value(0)).current;
 const [point,setPoint]=useState({x:150,y:150});const [touches,setTouches]=useState(0);
 const handler=useRef(null);handler.current=onInteract;
 const responder=useRef(PanResponder.create({onStartShouldSetPanResponder:()=>interactive,onMoveShouldSetPanResponder:()=>interactive,onPanResponderGrant:e=>{const {locationX,locationY}=e.nativeEvent;setPoint({x:locationX,y:locationY});setTouches(v=>v+1);handler.current?.({x:locationX,y:locationY,type:'tap'});},onPanResponderMove:e=>{const {locationX,locationY}=e.nativeEvent;setPoint({x:locationX,y:locationY});handler.current?.({x:locationX,y:locationY,type:'drag'});}})).current;
 useEffect(()=>{spin.setValue(0);const a=Animated.loop(Animated.timing(spin,{toValue:1,duration:Math.max(2600,14500-energy*95),useNativeDriver:true}));a.start();return()=>a.stop()},[spin,energy,preset.id]);
 const rotate=spin.interpolate({inputRange:[0,1],outputRange:['0deg','360deg']});
 const scale=1+energy/550;
 const mx=Math.max(-25,Math.min(25,motion.x*18)),my=Math.max(-25,Math.min(25,motion.y*18));
 return <View ref={ref} collapsable={false} style={[s.canvas,large&&{height:370}]} {...responder.panHandlers}>
 <View style={s.ambient}/>
 <Animated.View pointerEvents="none" style={[s.art,{transform:[{translateX:mx},{translateY:my},{rotate},{scale}]}]}>
 <Svg width="300" height="300" viewBox="0 0 300 300">
 <Defs><RadialGradient id="halo"><Stop offset="0" stopColor={preset.color} stopOpacity=".24"/><Stop offset="1" stopColor={preset.color} stopOpacity="0"/></RadialGradient></Defs>
 <Circle cx="150" cy="150" r="147" fill="url(#halo)"/>
 {Array.from({length:5},(_,i)=>preset.shape==='wave'?<Ellipse key={i} cx="150" cy="150" rx={53+i*18} ry={28+i*12} stroke={i%2?preset.secondary:preset.color} strokeOpacity={.8-i*.12} strokeWidth={i===0?2.5:1} fill="none"/>:<Circle key={i} cx="150" cy="150" r={38+i*23} stroke={i%2?preset.secondary:preset.color} strokeOpacity={.7-i*.11} strokeWidth={i===0?2.5:1} fill="none"/>)}
 {preset.shape==='orbit'&&Array.from({length:9},(_,i)=><Line key={'l'+i} x1="150" y1="150" x2={150+Math.cos(i*2.399)*126} y2={150+Math.sin(i*2.399)*126} stroke={preset.secondary} strokeOpacity=".23"/>)}
 {particles.map((p,i)=>{const a=p.angle+(preset.shape==='sparks'?p.phase*.08:0);const r=p.rad*(preset.shape==='rings'?.9:1);return <Circle key={i} cx={150+Math.cos(a)*r} cy={150+Math.sin(a)*r} r={p.r} fill={i%3?preset.color:preset.secondary} opacity={.28+(i%6)*.11}/>})}
 <Circle cx="150" cy="150" r="20" fill={preset.color} opacity=".17"/><Circle cx="150" cy="150" r="11" fill={preset.color}/>
 </Svg></Animated.View>
 {interactive&&<View pointerEvents="none" style={[s.touch,{left:Math.max(0,point.x-17),top:Math.max(0,point.y-17),borderColor:preset.secondary,opacity:touches?0.8:0}]} />}
 {showLabels&&<><View pointerEvents="none" style={s.top}><Text style={s.label}>GENERATIVE / LIVE</Text><Text style={[s.label,{color:preset.color}]}>● ACTIVE</Text></View><View pointerEvents="none" style={s.bottom}><Text style={s.name}>{preset.name.toUpperCase()}</Text><Text style={s.label}>{interactive?'TOUCH + DRAG TO SHAPE':'VISUAL STUDY'} · {touches} IMPULSES</Text></View></>}
 </View>;
});export default ArtCanvas;
const s=StyleSheet.create({canvas:{height:290,backgroundColor:'#080E20',borderRadius:24,overflow:'hidden',borderWidth:1,borderColor:C.border,alignItems:'center',justifyContent:'center'},ambient:{position:'absolute',inset:0,backgroundColor:'#0B1430'},art:{width:300,height:300,alignItems:'center',justifyContent:'center'},top:{position:'absolute',top:17,left:17,right:17,flexDirection:'row',justifyContent:'space-between'},bottom:{position:'absolute',bottom:17,left:17},label:{color:C.muted,fontSize:10,fontWeight:'800',letterSpacing:1},name:{color:C.text,fontSize:13,fontWeight:'900',letterSpacing:1.2,marginBottom:5},touch:{position:'absolute',width:34,height:34,borderRadius:17,borderWidth:2}});
