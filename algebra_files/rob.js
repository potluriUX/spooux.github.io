(function($){function dart(){this.x=0}var A=new dart
delete A.x
var B=new dart
delete B.x
var C=new dart
delete C.x
var D=new dart
delete D.x
var E=new dart
delete E.x
var F=new dart
delete F.x
var G=new dart
delete G.x
var H=new dart
delete H.x
var J=new dart
delete J.x
var K=new dart
delete K.x
var L=new dart
delete L.x
var M=new dart
delete M.x
var N=new dart
delete N.x
var O=new dart
delete O.x
var P=new dart
delete P.x
var Q=new dart
delete Q.x
var R=new dart
delete R.x
var S=new dart
delete S.x
var T=new dart
delete T.x
var U=new dart
delete U.x
var V=new dart
delete V.x
var W=new dart
delete W.x
var X=new dart
delete X.x
var Y=new dart
delete Y.x
var Z=new dart
delete Z.x
function I(){}
init()
$=I.p
var $$={};(function(a){"use strict"
function map(b){b={x:b}
delete b.x
return b}function processStatics(a3){for(var h in a3){if(!u.call(a3,h))continue
if(h==="^")continue
var g=a3[h]
var f=h.substring(0,1)
var e
if(f==="+"){v[e]=h.substring(1)
var d=a3[h]
if(d>0)a3[e].$reflectable=d
if(g&&g.length)init.typeInformation[e]=g}else if(f==="@"){h=h.substring(1)
$[h]["@"]=g}else if(f==="*"){n[e].$defaultValues=g
var c=a3.$methodsWithOptionalArguments
if(!c){a3.$methodsWithOptionalArguments=c={}}c[h]=e}else if(typeof g==="function"){n[e=h]=g
i.push(h)
init.globalFunctions[h]=g}else if(g.constructor===Array){addStubs(n,g,h,true,a3,i)}else{e=h
var b={}
var a0
for(var a1 in g){if(!u.call(g,a1))continue
f=a1.substring(0,1)
if(a1==="static"){processStatics(init.statics[h]=g[a1])}else if(f==="+"){w[a0]=a1.substring(1)
var d=g[a1]
if(d>0)g[a0].$reflectable=d}else if(f==="@"&&a1!=="@"){b[a1.substring(1)]["@"]=g[a1]}else if(f==="*"){b[a0].$defaultValues=g[a1]
var c=b.$methodsWithOptionalArguments
if(!c){b.$methodsWithOptionalArguments=c={}}c[a1]=a0}else{var a2=g[a1]
if(a1!=="^"&&a2!=null&&a2.constructor===Array&&a1!=="<>"){addStubs(b,a2,a1,false,g,[])}else{b[a0=a1]=a2}}}$$[h]=[n,b]
j.push(h)}}}function addStubs(b3,b4,b5,b6,b7,b8){var h,g=[b7[b5]=b3[b5]=h=b4[0]]
h.$stubName=b5
b8.push(b5)
for(var f=0;f<b4.length;f+=2){h=b4[f+1]
if(typeof h!="function")break
h.$stubName=b4[f+2]
g.push(h)
if(h.$stubName){b7[h.$stubName]=b3[h.$stubName]=h
b8.push(h.$stubName)}}for(var e=0;e<g.length;f++,e++){g[e].$callName=b4[f+1]}var d=b4[++f]
b4=b4.slice(++f)
var c=b4[0]
var b=c>>1
var a0=(c&1)===1
var a1=c===3
var a2=c===1
var a3=b4[1]
var a4=a3>>1
var a5=(a3&1)===1
var a6=b+a4!=g[0].length
var a7=b4[2]
var a8=2*a4+b+3
var a9=b4.length>a8
if(d){h=tearOff(g,b4,b6,b5,a6)
b3[b5].$getter=h
h.$getterStub=true
if(b6)init.globalFunctions[b5]=h
b7[d]=b3[d]=h
g.push(h)
if(d)b8.push(d)
h.$stubName=d
h.$callName=null
if(a6)init.interceptedNames[d]=true}if(a9){for(var e=0;e<g.length;e++){g[e].$reflectable=1
g[e].$reflectionInfo=b4}var b0=b6?init.mangledGlobalNames:init.mangledNames
var b1=b4[a8]
var b2=b1
if(d)b0[d]=b2
if(a1){b2+="="}else if(!a2){b2+=":"+b+":"+a4}b0[b5]=b2
g[0].$reflectionName=b2
g[0].$metadataIndex=a8+1
if(a4)b3[b1+"*"]=g[0]}}function tearOffGetterNoCsp(b,c,d,e){return e?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+d+z+++"(x) {"+"if (c === null) c = H.qm("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(b,c,d,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+d+z+++"() {"+"if (c === null) c = H.qm("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(b,c,d,H,null)}function tearOffGetterCsp(b,c,d,e){var h=null
return e?function(f){if(h===null)h=H.qm(this,b,c,false,[f],d)
return new h(this,b[0],f,d)}:function(){if(h===null)h=H.qm(this,b,c,false,[],d)
return new h(this,b[0],null,d)}}function tearOff(b,c,d,e,f){var h
return d?function(){if(h===void 0)h=H.qm(this,b,c,true,[],e).prototype
return h}:y(b,c,e,f)}var z=0
var y=typeof dart_precompiled=="function"?tearOffGetterCsp:tearOffGetterNoCsp
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
if(!init.interceptedNames)init.interceptedNames=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
for(var s=0;s<t;s++){var r=a[s]
var q=r[0]
var p=r[1]
var o=r[2]
var n=r[3]
var m=r[4]
var l=!!r[5]
var k=m&&m["^"]
if(k instanceof Array)k=k[0]
var j=[]
var i=[]
processStatics(m)
x.push([q,p,j,i,o,k,l,n])}})([["_foreign_helper","dart:_foreign_helper",,H,{"^":"",uD:{"^":"a;tT"}}],["_interceptors","dart:_interceptors",,J,{"^":"",x:function(a){return void 0},Qu:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},ks:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.Bv==null){H.XD()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(P.SY("Return interceptor for "+H.d(y(a,z))))}w=H.w3(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.ZQ
else return C.vB}return w},Gv:{"^":"a;",n:function(a,b){return a===b},giO:function(a){return H.eQ(a)},bu:[function(a){return H.a5(a)},"$0","gAY",0,0,72],T:function(a,b){throw H.b(P.lr(a,b.gWa(),b.gnd(),b.gVm(),null))},"%":"ArrayBuffer|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedNumberList"},kn:{"^":"Gv;",bu:[function(a){return String(a)},"$0","gAY",0,0,72],giO:function(a){return a?519018:218159},$isa2:true},YE:{"^":"Gv;",n:function(a,b){return null==b},bu:[function(a){return"null"},"$0","gAY",0,0,72],giO:function(a){return 0},T:function(a,b){return J.Gv.prototype.T.call(this,a,b)}},Ue:{"^":"Gv;",giO:function(a){return 0}},iC:{"^":"Ue;"},is:{"^":"Ue;"},Q:{"^":"Gv;",h:function(a,b){if(!!a.fixed$length)H.vh(P.f("add"))
a.push(b)},ev:function(a,b){return H.VM(new H.U5(a,b),[null])},FV:function(a,b){var z
for(z=J.GP(b);z.G();)this.h(a,z.gl())},aN:function(a,b){return H.bQ(a,b)},ez:function(a,b){return H.VM(new H.A8(a,b),[null,null])},zV:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=init
for(x=0;x<a.length;++x){w=H.d(a[x])
if(x>=z)return H.e(y,x)
y[x]=w}return y.join(b)},Zv:function(a,b){if(b<0||b>=a.length)return H.e(a,b)
return a[b]},aM:function(a,b,c){if(b>a.length)throw H.b(P.TE(b,0,a.length))
c=a.length
if(b===c)return H.VM([],[H.Kp(a,0)])
return H.VM(a.slice(b,c),[H.Kp(a,0)])},Jk:function(a,b){return this.aM(a,b,null)},grZ:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(P.w("No elements"))},tg:function(a,b){var z
for(z=0;z<a.length;++z)if(J.xC(a[z],b))return!0
return!1},gor:function(a){return a.length!==0},bu:[function(a){return P.KW(a,"[","]")},"$0","gAY",0,0,72],gA:function(a){return new H.a7(a,a.length,0,null)},giO:function(a){return H.eQ(a)},gB:function(a){return a.length},sB:function(a,b){if(b<0)throw H.b(P.N(b))
if(!!a.fixed$length)H.vh(P.f("set length"))
a.length=b},t:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.u(b))
if(b>=a.length||b<0)throw H.b(P.N(b))
return a[b]},u:function(a,b,c){if(!!a.immutable$list)H.vh(P.f("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.u(b))
if(b>=a.length||b<0)throw H.b(P.N(b))
a[b]=c},$isQ:true,$iszM:true,$aszM:null,$isqC:true,$iscX:true,$ascX:null},P:{"^":"Gv;",iM:function(a,b){var z
if(typeof b!=="number")throw H.b(P.u(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gzP(b)
if(this.gzP(a)===z)return 0
if(this.gzP(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gG0(b))return 0
return 1}else return-1},gzP:function(a){return a===0?1/a<0:a<0},gG0:function(a){return isNaN(a)},gkZ:function(a){return isFinite(a)},Vy:function(a){return Math.abs(a)},gpY:function(a){var z
if(a>0)z=1
else z=a<0?-1:a
return z},yu:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(P.f(''+a))},a3:function(a){return this.yu(Math.ceil(a))},Ap:function(a){return this.yu(Math.floor(a))},UD:function(a){if(a<0)return-Math.round(-a)
else return Math.round(a)},Sy:function(a,b){var z,y
if(typeof b!=="number")H.vh(P.u(b))
z=J.Wx(b)
if(z.C(b,0)||z.D(b,20))throw H.b(P.C3(b))
y=a.toFixed(b)
if(a===0&&this.gzP(a))return"-"+y
return y},bu:[function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},"$0","gAY",0,0,72],giO:function(a){return a&0x1FFFFFFF},J:function(a){return-a},g:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a+b},W:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a-b},V:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a/b},U:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a*b},Y:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},cU:function(a,b){return(a|0)===a?a/b|0:this.yu(a/b)},GG:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},C:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a<b},D:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a>b},E:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a<=b},F:function(a,b){if(typeof b!=="number")throw H.b(P.u(b))
return a>=b},$isFK:true,static:{"^":"Ng,nr"}},bU:{"^":"P;",$isCP:true,$isFK:true,$isKN:true},VA:{"^":"P;",$isCP:true,$isFK:true},O:{"^":"Gv;",j:function(a,b){if(b<0)throw H.b(P.N(b))
if(b>=a.length)throw H.b(P.N(b))
return a.charCodeAt(b)},dd:function(a,b){return H.ZT(a,b)},g:function(a,b){if(typeof b!=="string")throw H.b(P.u(b))
return a+b},Fr:function(a,b){return a.split(b)},Nj:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.vh(P.u(c))
if(b<0)throw H.b(P.N(b))
if(typeof c!=="number")return H.s(c)
if(b>c)throw H.b(P.N(b))
if(c>a.length)throw H.b(P.N(c))
return a.substring(b,c)},yn:function(a,b){return this.Nj(a,b,null)},U:function(a,b){var z,y
if(typeof b!=="number")return H.s(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.Eq)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},XU:function(a,b,c){if(c<0||c>a.length)throw H.b(P.TE(c,0,a.length))
return a.indexOf(b,c)},Pk:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},cn:function(a,b){return this.Pk(a,b,null)},Is:function(a,b,c){if(c>a.length)throw H.b(P.TE(c,0,a.length))
return H.b0(a,b,c)},tg:function(a,b){return this.Is(a,b,0)},gl0:function(a){return a.length===0},iM:function(a,b){var z
if(typeof b!=="string")throw H.b(P.u(b))
if(a===b)z=0
else z=a<b?-1:1
return z},bu:[function(a){return a},"$0","gAY",0,0,72],giO:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},gB:function(a){return a.length},t:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.u(b))
if(b>=a.length||b<0)throw H.b(P.N(b))
return a[b]},$isqU:true}}],["_js_helper","dart:_js_helper",,H,{"^":"",wV:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.x(a).$isXj},d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.AG(a)
if(typeof z!=="string")throw H.b(P.u(a))
return z},eQ:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},vx:[function(a){throw H.b(P.rr(a))},"$1","Rm",2,0,0],BU:function(a,b,c){var z,y
c=H.Rm()
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z!=null){y=z.length
if(2>=y)return H.e(z,2)
if(z[2]!=null)return parseInt(a,16)
if(3>=y)return H.e(z,3)
if(z[3]!=null)return parseInt(a,10)
return c.$1(a)}if(z==null)return c.$1(a)
return parseInt(a,10)},lh:function(a){var z,y
z=C.w2(J.x(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.xB.j(z,0)===36)z=C.xB.yn(z,1)
return(z+H.ia(H.oX(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},a5:function(a){return"Instance of '"+H.lh(a)+"'"},Lw:function(a){var z
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.jn.GG(z,10))>>>0,56320|z&1023)}}throw H.b(P.TE(a,0,1114111))},o2:function(a){if(a.date===void 0)a.date=new Date(a.y3)
return a.date},zo:function(a,b,c){var z,y,x
z={}
z.a=0
y=[]
x=[]
if(b!=null){z.a=b.length
C.Nm.FV(y,b)}z.b=""
if(c!=null&&!c.gl0(c))c.aN(0,new H.Cj(z,y,x))
return J.jf(a,new H.LI(C.Ka,"$"+z.a+z.b,0,y,x,null))},im:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z={}
if(c!=null&&!c.gl0(c)){y=J.x(a)["call*"]
if(y==null)return H.zo(a,b,c)
x=H.zh(y)
if(x==null||!x.Mo)return H.zo(a,b,c)
b=P.F(b,!0,null)
w=x.Rv
if(w!==b.length)return H.zo(a,b,c)
v=P.L5(null,null,null,null,null)
for(u=x.hG,t=0;t<u;++t){s=t+w
v.u(0,x.KE(s),init.metadata[x.Fk(s)])}z.a=!1
c.aN(0,new H.u8(z,v))
if(z.a)return H.zo(a,b,c)
C.Nm.FV(b,v.gUQ(v))
return y.apply(a,b)}r=[]
q=b.length
C.Nm.FV(r,b)
y=a["$"+q]
if(y==null)return H.zo(a,b,c)
return y.apply(a,r)},s:function(a){throw H.b(P.u(a))},e:function(a,b){if(a==null)J.q8(a)
if(typeof b!=="number"||Math.floor(b)!==b)H.s(b)
throw H.b(P.N(b))},b:function(a){var z
if(a==null)a=new P.LK()
z=new Error()
z.dartException=a
if("defineProperty"in Object){Object.defineProperty(z,"message",{get:H.Ju})
z.name=""}else z.toString=H.Ju
return z},Ju:[function(){return J.AG(this.dartException)},"$0","Eu",0,0,null],vh:function(a){throw H.b(a)},Ru:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new H.Am(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException"in a)return z.$1(a.dartException)
else if(!("message"in a))return a
y=a.message
if("number"in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.jn.GG(x,16)&8191)===10)switch(w){case 438:return z.$1(H.T3(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.W0(v,null))}}if(a instanceof TypeError){v=$.WD()
u=$.OI()
t=$.PH()
s=$.D1()
r=$.rx()
q=$.Y9()
p=$.zO()
$.Bi()
o=$.eA()
n=$.ko()
m=v.qS(y)
if(m!=null)return z.$1(H.T3(y,m))
else{m=u.qS(y)
if(m!=null){m.method="call"
return z.$1(H.T3(y,m))}else{m=t.qS(y)
if(m==null){m=s.qS(y)
if(m==null){m=r.qS(y)
if(m==null){m=q.qS(y)
if(m==null){m=p.qS(y)
if(m==null){m=s.qS(y)
if(m==null){m=o.qS(y)
if(m==null){m=n.qS(y)
v=m!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v){v=m==null?null:m.method
return z.$1(new H.W0(y,v))}}}v=typeof y==="string"?y:""
return z.$1(new H.vV(v))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.VS()
return z.$1(new P.AT(null))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.VS()
return a},CU:function(a){if(a==null||typeof a!='object')return J.v1(a)
else return H.eQ(a)},B7:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},ft:[function(a,b,c,d,e,f,g){var z=J.x(c)
if(z.n(c,0))return new H.dr(a).$0()
else if(z.n(c,1))return new H.TL(a,d).$0()
else if(z.n(c,2))return new H.KX(a,d,e).$0()
else if(z.n(c,3))return new H.uZ(a,d,e,f).$0()
else if(z.n(c,4))return new H.OQ(a,d,e,f,g).$0()
else throw H.b(P.eG("Unsupported number of arguments for wrapped closure"))},"$7","eH",14,0,null,1,2,3,4,5,6,7],kg:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,$,H.ft)
a.$identity=z
return z},iA:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
z.$stubName
y=z.$callName
z.$reflectionInfo=c
x=H.zh(z).AM
w=d?Object.create(new H.Bp().constructor.prototype):Object.create(new H.v(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else if(typeof dart_precompiled=="function"){u=function(g,h,i,j){this.$initialize(g,h,i,j)}
v=u}else{u=$.yj
$.yj=J.WB(u,1)
u=new Function("a","b","c","d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.bx(a,z,t)
s.$reflectionInfo=c}else{w.$name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return init.metadata[g]}}(x)
else if(u&&typeof x=="function"){q=t?H.HY:H.eZ
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bx(a,o,t)
w[n]=m}}w["call*"]=s
return v},vq:function(a,b,c,d){var z=H.eZ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},bx:function(a,b,c){var z,y,x,w,v,u
if(c)return H.eT(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
if(typeof dart_precompiled=="function"||!w||y>=27)return H.vq(y,!w,z,b)
if(y===0){w=$.mJ
if(w==null){w=H.E2("self")
$.mJ=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.yj
$.yj=J.WB(v,1)
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.mJ
if(v==null){v=H.E2("self")
$.mJ=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.yj
$.yj=J.WB(w,1)
return new Function(v+H.d(w)+"}")()},Z4:function(a,b,c,d){var z,y
z=H.eZ
y=H.HY
switch(b?-1:a){case 0:throw H.b(H.Ef("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},eT:function(a,b){var z,y,x,w,v,u,t,s
z=H.oN()
y=$.P4
if(y==null){y=H.E2("receiver")
$.P4=y}x=b.$stubName
w=b.length
v=typeof dart_precompiled=="function"
u=a[x]
t=b==null?u==null:b===u
if(v||!t||w>=28)return H.Z4(w,!t,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
t=$.yj
$.yj=J.WB(t,1)
return new Function(y+H.d(t)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
t=$.yj
$.yj=J.WB(t,1)
return new Function(y+H.d(t)+"}")()},qm:function(a,b,c,d,e,f){b.fixed$length=init
c.fixed$length=init
return H.iA(a,b,c,!!d,e,f)},ag:function(a){throw H.b(P.Gz("Cyclic initialization for static "+H.d(a)))},VM:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},oX:function(a){if(a==null)return
return a.$builtinTypeInfo},IM:function(a,b){return H.Z9(a["$as"+H.d(b)],H.oX(a))},ip:function(a,b,c){var z=H.IM(a,b)
return z==null?null:z[c]},Kp:function(a,b){var z=H.oX(a)
return z==null?null:z[b]},Ko:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.ia(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.jn.bu(a)
else return},ia:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=P.p9("")
for(y=b,x=!0,w=!0;y<a.length;++y){if(x)x=!1
else z.vM+=", "
v=a[y]
if(v!=null)w=!1
u=H.Ko(v,c)
z.vM+=typeof u==="string"?u:H.d(u)}return w?"":"<"+H.d(z)+">"},Z9:function(a,b){if(typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function"){a=H.ml(a,null,b)
if(typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.ml(a,null,b)}return b},ml:function(a,b,c){return a.apply(b,c)},F3:function(a){var z=$.NF
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},wz:function(a){return H.eQ(a)},iw:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},w3:function(a){var z,y,x,w,v,u
z=$.NF.$1(a)
y=$.nw[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.vv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.TX.$2(a,z)
if(z!=null){y=$.nw[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.vv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.Va(x)
$.nw[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.vv[z]=x
return x}if(v==="-"){u=H.Va(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.Lc(a,x)
if(v==="*")throw H.b(P.SY(z))
if(init.leafTags[z]===true){u=H.Va(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.Lc(a,x)},Lc:function(a,b){var z,y
z=Object.getPrototypeOf(a)
y=J.Qu(b,z,null,null)
Object.defineProperty(z,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return b},Va:function(a){return J.Qu(a,!1,null,!!a.$isXj)},VF:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.Qu(z,!1,null,!!z.$isXj)
else return J.Qu(z,c,null,null)},XD:function(){if(!0===$.Bv)return
$.Bv=!0
H.Z1()},Z1:function(){var z,y,x,w,v,u,t,s
$.nw=Object.create(null)
$.vv=Object.create(null)
H.kO()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.x7.$1(v)
if(u!=null){t=H.VF(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},kO:function(){var z,y,x,w,v,u,t
z=C.MA()
z=H.ud(C.Mc,H.ud(C.hQ,H.ud(C.XQ,H.ud(C.XQ,H.ud(C.Jh,H.ud(C.lR,H.ud(C.ur(C.w2),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.NF=new H.dC(v)
$.TX=new H.wN(u)
$.x7=new H.VX(t)},ud:function(a,b){return a(b)||b},ZT:function(a,b){var z,y,x,w,v,u
z=H.VM([],[P.Od])
y=b.length
x=a.length
for(w=0;!0;){v=C.xB.XU(b,a,w)
if(v===-1)break
z.push(new H.tQ(v,b,a))
u=v+x
if(u===y)break
else w=v===u?w+1:u}return z},b0:function(a,b,c){var z
if(typeof b==="string")return C.xB.XU(a,b,c)!==-1
else{z=J.x(b)
if(!!z.$isVR){z=C.xB.yn(a,c)
return b.Ej.test(z)}else return J.pO(z.dd(b,C.xB.yn(a,c)))}},LI:{"^":"a;lK,uk,xI,rq,FX,Nc",gWa:function(){return this.lK},gnd:function(){var z,y,x,w
if(this.xI===1)return C.xD
z=this.rq
y=z.length-this.FX.length
if(y===0)return C.xD
x=[]
for(w=0;w<y;++w){if(w>=z.length)return H.e(z,w)
x.push(z[w])}x.immutable$list=!0
x.fixed$length=!0
return x},gVm:function(){var z,y,x,w,v,u,t,s
if(this.xI!==0)return P.Fl(P.wv,null)
z=this.FX
y=z.length
x=this.rq
w=x.length-y
if(y===0)return P.Fl(P.wv,null)
v=P.L5(null,null,null,P.wv,null)
for(u=0;u<y;++u){if(u>=z.length)return H.e(z,u)
t=z[u]
s=w+u
if(s<0||s>=x.length)return H.e(x,s)
v.u(0,new H.GD(t),x[s])}return v},static:{"^":"hA,Bj,De"}},FD:{"^":"a;mr,Rn,XZ,Rv,hG,Mo,AM,NE",XL:function(a){var z=this.Rn[a+this.hG+3]
return init.metadata[z]},BX:function(a,b){var z=this.Rv
if(typeof b!=="number")return b.C()
if(b<z)return
return this.Rn[3+b-z]},Fk:function(a){var z=this.Rv
if(a<z)return
if(!this.Mo||this.hG===1)return this.BX(0,a)
return this.BX(0,this.e4(a-z))},KE:function(a){var z=this.Rv
if(a<z)return
if(!this.Mo||this.hG===1)return this.XL(a)
return this.XL(this.e4(a-z))},e4:function(a){var z,y,x,w,v,u
z={}
if(this.NE==null){y=this.hG
this.NE=Array(y)
x=P.Fl(P.qU,P.KN)
for(w=this.Rv,v=0;v<y;++v){u=w+v
x.u(0,this.XL(u),u)}z.a=0
y=x.gvc()
y=P.F(y,!0,H.ip(y,"mW",0))
H.rd(y,null)
H.bQ(y,new H.Nv(z,this,x))}z=this.NE
if(a<0||a>=z.length)return H.e(z,a)
return z[a]},static:{"^":"t4,X3,Oc,pv",zh:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=init
z=z
y=z[0]
x=z[1]
return new H.FD(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},Nv:{"^":"Tp:0;a,b,c",$1:function(a){var z,y,x
z=this.b.NE
y=this.a.a++
x=this.c.t(0,a)
if(y>=z.length)return H.e(z,y)
z[y]=x},$isPe:true},Cj:{"^":"Tp:73;a,b,c",$2:function(a,b){var z=this.a
z.b=z.b+"$"+H.d(a)
this.c.push(a)
this.b.push(b);++z.a},$isPe:true},u8:{"^":"Tp:73;a,b",$2:function(a,b){var z=this.b
if(z.x4(a))z.u(0,a,b)
else this.a.a=!0},$isPe:true},Zr:{"^":"a;bT,rq,Xs,Fa,Ga,cR",qS:function(a){var z,y,x
z=new RegExp(this.bT).exec(a)
if(z==null)return
y={}
x=this.rq
if(x!==-1)y.arguments=z[x+1]
x=this.Xs
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.Fa
if(x!==-1)y.expr=z[x+1]
x=this.Ga
if(x!==-1)y.method=z[x+1]
x=this.cR
if(x!==-1)y.receiver=z[x+1]
return y},static:{"^":"lm,k1,Re,fN,qi,rZ,BX,tt,dt,A7",LX:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.Zr(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},S7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},Mj:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},W0:{"^":"Ge;V7,Ga",bu:[function(a){var z=this.Ga
if(z==null)return"NullError: "+H.d(this.V7)
return"NullError: Cannot call \""+H.d(z)+"\" on null"},"$0","gAY",0,0,72],$isGe:true},az:{"^":"Ge;V7,Ga,cR",bu:[function(a){var z,y
z=this.Ga
if(z==null)return"NoSuchMethodError: "+H.d(this.V7)
y=this.cR
if(y==null)return"NoSuchMethodError: Cannot call \""+H.d(z)+"\" ("+H.d(this.V7)+")"
return"NoSuchMethodError: Cannot call \""+H.d(z)+"\" on \""+H.d(y)+"\" ("+H.d(this.V7)+")"},"$0","gAY",0,0,72],$isGe:true,static:{T3:function(a,b){var z,y
z=b==null
y=z?null:b.method
z=z?null:b.receiver
return new H.az(a,y,z)}}},vV:{"^":"Ge;V7",bu:[function(a){var z=this.V7
return C.xB.gl0(z)?"Error":"Error: "+z},"$0","gAY",0,0,72]},Am:{"^":"Tp:10;a",$1:function(a){if(!!J.x(a).$isGe)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a},$isPe:true},dr:{"^":"Tp:74;a",$0:function(){return this.a.$0()},$isPe:true},TL:{"^":"Tp:74;b,c",$0:function(){return this.b.$1(this.c)},$isPe:true},KX:{"^":"Tp:74;d,e,f",$0:function(){return this.d.$2(this.e,this.f)},$isPe:true},uZ:{"^":"Tp:74;UI,bK,Gq,Rm",$0:function(){return this.UI.$3(this.bK,this.Gq,this.Rm)},$isPe:true},OQ:{"^":"Tp:74;w3,HZ,mG,xC,cj",$0:function(){return this.w3.$4(this.HZ,this.mG,this.xC,this.cj)},$isPe:true},Tp:{"^":"a;",bu:[function(a){return"Closure"},"$0","gAY",0,0,72],$isPe:true,gKu:function(){return this}},Bp:{"^":"Tp;"},v:{"^":"Bp;nw,jm,cR,Vb",n:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!J.x(b).$isv)return!1
return this.nw===b.nw&&this.jm===b.jm&&this.cR===b.cR},giO:function(a){var z,y
z=this.cR
if(z==null)y=H.eQ(this.nw)
else y=typeof z!=="object"?J.v1(z):H.eQ(z)
return(y^H.eQ(this.jm))>>>0},$isv:true,static:{"^":"mJ,P4",eZ:function(a){return a.nw},HY:function(a){return a.cR},oN:function(){var z=$.mJ
if(z==null){z=H.E2("self")
$.mJ=z}return z},E2:function(a){var z,y,x,w,v
z=new H.v("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=init
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},tc:{"^":"Ge;G1",bu:[function(a){return"RuntimeError: "+H.d(this.G1)},"$0","gAY",0,0,72],static:{Ef:function(a){return new H.tc(a)}}},dC:{"^":"Tp:10;a",$1:function(a){return this.a(a)},$isPe:true},wN:{"^":"Tp:75;b",$2:function(a,b){return this.b(a,b)},$isPe:true},VX:{"^":"Tp:0;c",$1:function(a){return this.c(a)},$isPe:true},VR:{"^":"a;zO,Ej,Ii,Ua",gF4:function(){var z=this.Ii
if(z!=null)return z
z=this.Ej
z=H.Vq(this.zO,z.multiline,!z.ignoreCase,!0)
this.Ii=z
return z},dd:function(a,b){return new H.Qp(this,b)},ml:function(a,b){var z,y
z=this.gF4()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return H.yx(this,y)},$isVR:true,static:{Vq:function(a,b,c,d){var z,y,x,w,v
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(){try{return new RegExp(a,z+y+x)}catch(u){return u}}()
if(w instanceof RegExp)return w
v=String(w)
throw H.b(P.rr("Illegal RegExp pattern: "+a+", "+v))}}},EK:{"^":"a;zO,QK",t:function(a,b){var z=this.QK
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},VO:function(a,b){},static:{yx:function(a,b){var z=new H.EK(a,b)
z.VO(a,b)
return z}}},Qp:{"^":"mW;rN,rv",gA:function(a){return new H.Pb(this.rN,this.rv,null)},$asmW:function(){return[P.Od]},$ascX:function(){return[P.Od]}},Pb:{"^":"a;xz,rv,Wh",gl:function(){return this.Wh},G:function(){var z,y,x
if(this.rv==null)return!1
z=this.Wh
if(z!=null){z=z.QK
y=z.index
if(0>=z.length)return H.e(z,0)
z=J.q8(z[0])
if(typeof z!=="number")return H.s(z)
x=y+z
if(this.Wh.QK.index===x)++x}else x=0
z=this.xz.ml(this.rv,x)
this.Wh=z
if(z==null){this.rv=null
return!1}return!0}},tQ:{"^":"a;M,J9,zO",t:function(a,b){if(!J.xC(b,0))H.vh(P.N(b))
return this.zO}}}],["","Algebra/web/algebra.dart",,Y,{"^":"",QL:function(){var z=$.cM()
J.kW(z,"MutDLinEq",Y.KM())
J.kW(z,"MutDQuadEq",Y.lC())
J.kW(z,"MutDGenEq",M.kC())
J.kW(z,"MutDVarFracAddEq",Y.yG())
J.kW(z,"MutShowAddTermsMVar",Y.aD())
J.kW(z,"MutShowMFVar",Y.us())
J.kW(z,"MutShowMFVarFactor",Y.FR())
J.kW(z,"MutDSubAndSolve",Y.Mv())
J.kW(z,"MutDSolveSimpleSystem",Y.cl())
J.kW(z,"MutDSolveForLinVar",Y.II())
J.kW(z,"MutDPolyStep",Y.Ug())
J.kW(z,"MutFactorExpr",Y.ng())
J.kW(z,"MutMyPolyExpr",Y.f3())
J.kW(z,"MutEqToExpr",Y.RM())
J.kW(z,"MutGetSegs",Y.Yf())
J.kW(z,"MutGetEqInfo",Y.FM())
J.kW(z,"MutGetEqInfoCoefs",Y.M1())
J.kW(z,"MutMyPolyText",Y.U6())
J.kW(z,"MutSolveForVarLinCompoundIneq",Y.Pw())
J.kW(z,"MutExprToText",V.xt())
J.kW(z,"MutExprToTextH",V.la())
J.kW(z,"MutMyTutorSuggest",Y.Le())
J.kW(z,"MutDSolveForMyVar",Y.Sv())
J.kW(z,"MutEvalExpr",$.Nh)
J.kW(z,"MutExprToPoly",K.uU())
J.kW(z,"MutEvalGenVarFrac",Y.vy())
J.kW(z,"MutEvalGenVar",Y.QC())
J.kW(z,"MutPolyToCoefs",Y.E3())
J.kW(z,"MutExprToCoefs",Y.Zl())
J.kW(z,"MutExprCountIndex",Y.Wz())
J.kW(z,"MutExprToCIndex",Y.WZ())
J.kW(z,"MutMyComp",Y.uw())
J.kW(z,"MutMyPolyText2",Y.SA())
J.kW(z,"MutGetAddTerms",Y.Ad())
J.kW(z,"MutMyFracText",N.J0())
J.kW(z,"MutGetDegree",V.iM())
J.kW(z,"MutGetGCD",K.mm())
J.kW(z,"MutGetLCM",K.Yd())
J.kW(z,"MutMyCoefs",Y.LQ())
J.kW(z,"MutMyCoefs2",Y.aB())
J.kW(z,"MutGetDartEq",Y.NW())
J.kW(z,"MutPrintEqRetval",Y.a9())
J.kW(z,"MutPrintEq",Y.NM())
J.kW(z,"MutNumStr",F.xR())
J.kW(z,"MutDEqToTextH",Y.b3())
J.kW(z,"MutDoMyOp",Y.MW())
J.kW(z,"MutDoSimplifyEq",Y.yL())
J.kW(z,"MutIsSimplifiedEq",N.SS())
J.kW(z,"MutGetEqAns",Y.D3())
J.kW(z,"MutDSolveGenEq",Y.aN())},uv:[function(a){return P.jT(a.gBl())},"$1","E3",2,0,8,9],VK:[function(a){return P.jT(K.Ye(a).BC().Bl)},"$1","Zl",2,0,10,11],Vt:[function(a){return K.Ye(a).BC().XV()},"$1","WZ",2,0,12,11],iH:[function(a){return K.Ye(a).BC().ly()},"$1","Wz",2,0,13,11],dv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
y=J.x(a)
if(!!y.$iszM){x=y.t(a,0)
w=y.Jk(a,1)
v=K.Mr(Y.M7())
z.a=!0
J.kH(w,new Y.Fu(z))
if(z.a){u=v.t(0,x).$1(w)
if(J.xC(x,"simplify"))return u
else return["simplify",u]}else{t=[]
for(s=!1,r=0;r<w.length;++r){q=w[r]
if(!J.x(q).$iseu&&!s){p=Y.dv(q)
s=!0}else p=q
t.push(p)}o=[x]
C.Nm.FV(o,t)
return o}}else return a},zY:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=J.x(a)
if(!!y.$iszM){x=y.t(a,0)
w=y.Jk(a,1)
v=K.Mr(Y.M7())
z.a=!0
J.kH(w,new Y.YT(z))
if(z.a)return["color","blue",v.t(0,x).$1(w)]
else{u=[]
for(t=!1,s=0;s<w.length;++s){r=w[s]
if(!J.x(r).$iseu&&!t){q=Y.zY(r)
t=!0}else q=r
u.push(q)}p=[x]
C.Nm.FV(p,u)
return p}}else return a},K5:[function(a){return K.Ye(a).BC().Qg()},"$1","LQ",2,0,14,11],jw:[function(a){var z=K.Ye(a).BC()
return[z.Bl,z.tX]},"$1","aB",2,0,14,11],KP:function(a,b,c,d){var z,y,x,w
z=Q.Fd(a,b,c)
y=O.wi(z)
x=V.KF(a)
w=y.nD
w.push(["mmsg",C.xB.g(C.xB.g(C.xB.g("\\text'Step: Substitute '\\,\\,(",V.KF(b))+")\\,\\,\\text' for '\\,\\,",c)+"\\,\\,\\text' in '\\,\\,",x)+":",""])
w.push(["mmsg",x,""])
w.push(["mmsg",V.KF(Q.Fd(a,["color","purple",b],c)),""])
y.kV(z)
y.Ql(d)
return y},TV:[function(a,b,c,d){var z=Y.KP(a,b,c,d)
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$4","Mv",8,0,15,16,17,18,19],ML:[function(a,b,c,d){var z,y,x,w,v,u,t,s,r
z=O.wi(a)
y=V.KF(a)
x=z.nD
x.push(["mmsg",C.xB.g(C.xB.g("\\text'Step: Solve '\\,\\,",y)+"\\,\\,\\text' for '\\,\\,",c)+":",""])
x.push(["ansmsg",y,""])
z.Ql(c)
w=Y.KP(b,z.pS.gHm().te(),c,d)
C.Nm.FV(x,w.nD)
if(!w.pS.gNM().r7()){if(!z.pS.gHm().r7()){v=w.pS.gHm().te()
u=Y.KP(z.pS.qD(),v,d,c)
C.Nm.FV(x,u.nD)
t=u.pS.qD()
s=w.pS.qD()}else{t=z.pS.qD()
s=w.pS.qD()}r=J.WB(J.WB(V.KF(t),"\\,\\,\\text' and '\\,\\,"),V.KF(s))
x.push(["msg","<hr>",""])
x.push(["msg","Answer:","MHeadDiv"])
x.push(["mmsg",r,""])}else{if(w.pS.gNM().ED("0").bR()===w.pS.gHm().ED("0").bR()){x.push(["msg","<hr>",""])
x.push(["msg","Answer:","MHeadDiv"])
x.push(["msg","Infinitely many solutions.",""])}else{x.push(["msg","<hr>",""])
x.push(["msg","Answer:","MHeadDiv"])
x.push(["msg","No solutions.",""])}t=null
s=null}return Q.Sa([x,t,s])},"$4","cl",8,0,20,21,16,22,23],yO:[function(a){var z=a.qD()
return $.pS.$1(z)},"$1","RM",2,0,24,25],p2:[function(a){var z=K.Ye(a).BC().Ip(V.Bf())
return $.pS.$1(z)},"$1","uw",2,0,10,11],DI:[function(a){return V.KF(Y.qQ(a))},"$1","U6",2,0,12,11],v5:[function(a){var z=Y.qQ(a)
return $.pS.$1(z)},"$1","f3",2,0,10,11],y4:[function(a){return J.UQ(J.MQ(Y.bO(a)),1)},"$1","SA",2,0,10,11],kM:[function(a){var z=J.iN(a)
return new N.wK(K.Ye(z.t(a,1)).BC(),K.Ye(z.t(a,2)).BC(),"=")},"$1","NW",2,0,26,11],WE:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=N.Gf(a)
y=J.xC(V.KF(a),V.KF([z.pY,z.NM.te(),z.Hm.te()]))
x=z.NM.PY(1)
w=z.NM.PY(0)
v=z.Hm.PY(1)
u=z.Hm.PY(0)
t=x.bR()
s=w.bR()
r=v.bR()
q=u.bR()
p=t===0
if(!(!p&&s===0&&r===0))o=r!==0&&q===0&&p
else o=!0
n=o&&!0
if(t===1&&s!==0&&r===0)if(s>0){m=!0
l=!1}else{m=!1
l=!0}else if(r===1&&q!==0&&p)if(q>0){m=!0
l=!1}else{m=!1
l=!0}else{m=!1
l=!1}if(y)if(n)k="isSimpleMultEq"
else if(m)k=$.SO.$1(t)===!0&&$.SO.$1(s)===!0&&$.SO.$1(r)===!0&&$.SO.$1(q)===!0?"isSimpleAddEqInt":"isSimpleAddEq"
else k=l?"isSimpleSubEq":""
else k=""
return k},"$1","FM",2,0,12,27],Wj:[function(a){var z,y,x,w,v
z=N.Gf(a)
J.xC(V.KF(a),V.KF([z.pY,z.NM.te(),z.Hm.te()]))
y=z.NM.PY(1)
x=z.NM.PY(0)
w=z.Hm.PY(1)
v=z.Hm.PY(0)
return P.jT([y.O6(),x.O6(),w.O6(),v.O6()])},"$1","M1",2,0,14,27],IC:[function(a){var z=[]
z.push(["step",a.qD(),"Simplify both sides"])
return $.pS.$1(z)},"$1","a9",2,0,24,28],KU:[function(a){return V.KF(a.qD())},"$1","NM",2,0,29,28],IH:[function(a){return V.hG(a.qD())},"$1","b3",2,0,29,28],zu:[function(a){var z,y
z=N.tJ(a)
y=z.Qi
y=y==="yes"||y==="no"||y==="great"?y:C.xB.g(y,V.hG(z.Mf.Ip(V.Bf())))
return $.pS.$1([y,z.rs])},"$1","Le",2,0,30,28],bO:[function(a){var z,y,x,w,v
z=[]
y=V.lt(a)
x=V.KF(V.vg(y))
for(w=0;w<36;++w,y=v){v=Y.dv(y)
if(!J.xC(V.KF(V.vg(v)),x)){z.push(["step",C.xB.g("= ",V.KF(V.vg(Y.zY(y)))),""])
x=V.KF(V.vg(v))}if(!!J.x(v).$iseu)break}if(z.length>0)return $.pS.$1(z)
else{z.push(["step",C.xB.g("= ",x),""])
return $.pS.$1(z)}},"$1","Ug",2,0,14,11],lO:[function(a,b,c){var z,y
z=[]
y=new N.B3(a,z,[])
y.ET(b,K.Ye(c).BC())
return Q.Sa(new N.cz(z,y.pS,[],null).br(0))},"$3","MW",6,0,31,28,32,11],Wt:[function(a){var z=O.GL(a)
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$1","yL",2,0,33,27],vn:[function(a){var z,y,x,w,v,u,t
z=[]
y=J.Wx(a)
if(C.Nm.tg([">","<",">=","<="],y.gpY(a))&&a.gNM().Kg()===1&&a.gHm().Kg()===0){x=a.gHm().bR()
y=y.gpY(a)
w=J.x(y)
if(w.n(y,">")){v="("
u="+inf"
t=")"}else if(w.n(y,"<")){u=x
v="("
x="-inf"
t=")"}else if(w.n(y,">=")){v="["
u="+inf"
t=")"}else if(w.n(y,"<=")){u=x
v="("
x="-inf"
t="]"}else{v=null
x=null
u=null
t=null}z.push(P.EF(["leftbound",v,"leftval",x,"rightval",u,"rightbound",t],null,null))}return $.pS.$1(z)},"$1","Yf",2,0,24,28],cq:[function(a){var z=a.gHm().bR()
return $.pS.$1(z)},"$1","D3",2,0,24,28],Ty:[function(a){var z=O.GL(a)
z.KC()
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$1","lC",2,0,33,27],G1:[function(a){var z=O.GL(a)
z.En()
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$1","aN",2,0,33,27],ij:[function(a){return Y.Wh(K.Ye(a).BC())},"$1","ng",2,0,14,11],Wh:function(a){var z,y,x
z=E.zQ(a)
y=z.length
x=$.pS
if(y>1)return x.$1(O.GW(z))
else return x.$1([])},EH:[function(a,b){var z=O.wi(a)
z.Ql(b)
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$2","II",4,0,34,27,22],St:[function(a,b){var z=O.wi(a)
if(J.xC(J.pm(z.pS),"="))z.fB(b)
else z.fB(b)
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$2","Sv",4,0,34,27,22],qV:[function(a){var z=O.GL(a)
z.Rz()
return Q.Sa(new N.cz(z.nD,z.pS,[],null).br(0))},"$1","KM",2,0,33,27],Xp:function(a){var z,y,x
z=[]
for(y=0;y<a.length;++y){x=a[y]
z.push([x,K.Ye(x).BC().XV()])}return z},rJ:function(a){var z,y,x,w
z=P.Ls(null,null,null,null)
for(y=0;y<a.length;++y){x=a[y]
if(1>=x.length)return H.e(x,1)
z.h(0,x[1])}w=z.br(0)
H.rd(w,V.Oe())
return w},Fk:function(a){var z,y,x,w
z=["blue","green","red","purple","color5","brown","black"]
y=P.Fl(null,null)
for(x=0;x<a.length;++x){w=a[x]
if(x<7)y.u(0,w,z[x])
else y.u(0,w,"black")}return y},HP:function(a){return C.Nm.zV(Y.Al(a,V.xt()),"+")},t3:function(a,b){var z,y,x,w,v,u
z=[]
for(y=0;y<a.length;++y){x=a[y]
w=x.length
if(0>=w)return H.e(x,0)
v=x[0]
if(1>=w)return H.e(x,1)
u=b.t(0,x[1])
z.push(V.KF(["color",u==null?"black":u,v]))}return C.Nm.zV(z,"+")},Pz:function(a,b,c){var z,y,x,w,v,u,t,s
z=P.Fl(null,null)
for(y=0;y<a.length;++y){x=a[y]
w=x.length
if(0>=w)return H.e(x,0)
v=x[0]
if(1>=w)return H.e(x,1)
u=x[1]
if(z.t(0,u)==null)z.u(0,u,[])
t=b.t(0,u)
if(t==null)t="black"
z.t(0,u).push(V.KF(["color",t,v]))}s=[]
for(y=0;y<c.length;++y)s.push("("+J.XS(z.t(0,c[y]),"+")+")")
return C.Nm.zV(s,"+")},ys:function(a){return V.KF(Y.Ks(a).Ag())},Lz:function(a){var z,y,x,w
z=[]
y=Y.qQ(a)
if(!J.x(y).$iszM)y=F.T5(y)
x=V.KF(y)
if(!!J.x(y).$iszM){w=Y.ys(a)
if(!J.xC(x,w)&&V.M4(K.Ye(a).BC().Bl)===0){z.push(["MDivEq",x])
z.push(["MDivSmall","",C.xB.g("(Decimal: ",w)+")"])}else z.push(["MDivEq",x])}else z.push(["MDivEq",x])
return z},IT:[function(a){var z=Y.Lz(a)
return $.pS.$1(z)},"$1","vy",2,0,10,35],DG:[function(a){var z=[]
z.push(["MDivEq",Y.ys(a)])
return $.pS.$1(z)},"$1","QC",2,0,10,35],jB:function(a){var z
for(z=0;z<a.length;++z)if(K.Ye(a[z]).BC().ly()>1)return!1
return!0},jX:function(a){var z,y,x
z=[]
y=Y.Ks(a)
x=V.KF(y.Bm())
z.push(["MDivEq",x])
if(y.fo()){y=y.j4()
x=V.KF(y.Ip(V.Bf()))
z.push(["MDivEq",x])}if(y.d9()){y=y.BC()
x=V.KF(y.Ip(V.Bf()))
z.push(["MDivEq",x])}return[z,y,x]},h1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z={}
y=[]
y.push(["msgstr","Let's simplify step-by-step."])
x=V.KF(a)
y.push(["MDiv",x])
if(J.xC(x,V.KF(Y.qQ(a)))){y.push(["stepstr","There are no like terms."])
y.push(["msgstr","<hr>"])
y.push(["msgstr","Answer:","MHeadDiv"])
C.Nm.FV(y,Y.Lz(a))
return y}w=J.x(a)
if(!!w.$iszM&&J.xC(w.t(a,0),"-")&&w.gB(a)===3&&Y.e0(w.t(a,2)).length>1){y.push(["stepstr","Distribute the Negative Sign:"])
y.push(["MDivEq",V.KF(["-",w.t(a,1),["color","red",w.t(a,2)]])])
v=Y.e0(w.t(a,1))
u=Y.PQ(Y.e0(w.t(a,2)))
t=[]
C.Nm.FV(t,v)
H.bQ(u,new Y.NR(t))
y.push(["MDivEq",Y.HP(t)])
s=[]
C.Nm.FV(s,v)
H.bQ(u,new Y.fp(s))
r=Y.HP(s)
y.push(["MDivEq",r])
q=r
p=s}else{p=Y.e0(a)
q=V.KF(a)}z.a=[]
if(!Y.jB(p)){H.bQ(p,new Y.xU(z))
y.push(["stepstr","Distribute:"])
q=Y.HP(z.a)
y.push(["MDivEq",q])}else z.a=p
o=[]
H.bQ(z.a,new Y.EG(o))
n=Y.Xp(o)
m=Y.rJ(n)
l=Y.Fk(m)
k=Y.qQ(a)
z=J.x(k)
j=!!z.$iszM&&J.xC(z.t(k,0),"+")?z.Jk(k,1):[k]
i=Y.Xp(j)
h=Y.HP(o)
if(!J.xC(q,h))y.push(["MDivEq",h])
if(o.length>j.length){y.push(["stepstr","Combine Like Terms:"])
y.push(["MDivEq",Y.t3(n,l)])
H.rd(n,new Y.Eo())
y.push(["MDivEq",Y.Pz(n,l,m)])
if(!z.n(k,0))y.push(["MDivEq",Y.t3(i,l)])
y.push(["msgstr","<hr>"])
y.push(["msgstr","Answer:","MHeadDiv"])
C.Nm.FV(y,Y.Lz(a))
return y}else{y.push(["msgstr","<hr>"])
y.push(["msgstr","Answer:","MHeadDiv"])
C.Nm.FV(y,Y.Lz(a))
return y}},CM:[function(a){var z=Y.e0(a)
return $.pS.$1(z)},"$1","Ad",2,0,10,35],xg:[function(a){var z=Y.h1(a)
return $.pS.$1(z)},"$1","aD",2,0,10,35],aa:[function(a){var z=Y.jX(a)[0]
return $.pS.$1(z)},"$1","us",2,0,10,35],bd:[function(a){var z,y,x,w,v,u,t,s,r
z=Y.jX(a)
y=z[0]
x=z[1]
w=z[2]
if(!x.oD()&&x.Mz().length===1){v=O.GZ(x.te())
u=v.Mc
t=u.length
if(t===1){if(0>=t)return H.e(u,0)
u=E.Sc(u[0])}s=v.v5
v=s.length
if(v===1){if(0>=v)return H.e(s,0)
s=E.Sc(s[0])}r=V.KF(Y.qQ(new O.uX([new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)],s).q8(u).O6()))
if(!J.xC(r,w)){v=J.w1(y)
v.h(y,["MDivEq",V.KF(new O.uX(u,s).O6())])
v.h(y,["MDivEq",r])}}return $.pS.$1(y)},"$1","FR",2,0,10,35],Aj:[function(a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=[]
y=V.KF(a7)
x=J.iN(a7)
w=J.UQ(x.t(a7,1),1)
v=J.UQ(x.t(a7,1),2)
u=x.t(a7,3)
t=J.UQ(x.t(a7,1),0)
s=x.t(a7,2)
r=K.Ye(w).BC()
q=K.Ye(v).BC()
p=new R.I7(r,q,K.Ye(u).BC(),t,s)
q.JE()
o=V.KF(p.qD())
z.push(["MDiv",y])
if(!J.xC(y,o))z.push(["MDiva",o,"(Simplify all parts of the inequality)"])
n=q.PY(1)
m=q.PY(0)
l=n.bR()
if(m.bR()!==0){k=m.tv(new V.ov(-1,1))
r=p.NM
j=p.Hm
i=["color","blue",k.O6()]
z.push(["MDiva",R.j9([["+",r.Ip(V.Bf()),i],t,["+",q.Ip(V.Bf()),i],s,["+",j.Ip(V.Bf()),i]]),C.xB.g("(Add ",k.Gr())+" to all parts)"])
h=new V.eu(P.EF(["0",k],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
g=r.h(0,h)
f=q.h(0,h)
e=j.h(0,h)
z.push(["MDiv",R.j9([g.Ip(V.Bf()),t,f.Ip(V.Bf()),s,e.Ip(V.Bf())])])
p=new R.I7(g,f,e,t,s)}if(l===0){w=p.NM.Ip(V.Bf())
v=p.dr.Ip(V.Bf())
u=p.Hm.Ip(V.Bf())
if(J.xC($.Cl.$1([p.G8,w,v]),1)&&J.xC($.Cl.$1([p.HO,v,u]),1))z.push(["msg","All real numbers are solutions."])
else z.push(["msg","No solutions."])}else if(l!==1){r=p.NM
t=p.G8
q=p.dr
s=p.HO
j=p.Hm
d=n.O6()
z.push(["MDiva",R.j9([["/",r.Ip(V.Bf()),d],t,["/",q.Ip(V.Bf()),d],s,["/",j.Ip(V.Bf()),d]]),C.xB.g("(Divide all parts by ",J.AG(n))+")"])
c=V.jL(t,new V.eu(P.EF(["0",n],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
b=V.jL(s,new V.eu(P.EF(["0",n],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
a=q.JE()
g=r.tv(new V.eu(P.EF(["0",new V.ov(1,1).tv(n.Ec())],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
a0=C.xB.g("",a)+"1"
a1=P.Fl(null,null)
a1.u(0,a0,new V.ov(1,1))
f=new V.eu(a1,P.EF(["0",new V.ov(1,1)],null,null),0)
e=j.tv(new V.eu(P.EF(["0",new V.ov(1,1).tv(n.Ec())],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
z.push(["MDiv",R.j9([g.Ip(V.Bf()),c,f.Ip(V.Bf()),b,e.Ip(V.Bf())])])
p=new R.I7(g,f,e,t,s)}x=p.dr
a2=p.NM
a3=V.jL(p.G8,new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
a4=x.te()
a2=a2.te()
a5=p.Hm
x=x.te()
a5=a5.te()
a6=[[],null]
a6.push(z)
a6.push([[a3,a4,a2],[p.HO,x,a5],"and"])
return $.pS.$1(a6)},"$1","Pw",2,0,10,35],Fu:{"^":"Tp:10;a",$1:function(a){var z,y
z=this.a
y=z.a&&!!J.x(a).$iseu
z.a=y
return y},$isPe:true},YT:{"^":"Tp:10;a",$1:function(a){var z,y
z=this.a
y=z.a&&!!J.x(a).$iseu
z.a=y
return y},$isPe:true},NR:{"^":"Tp:10;b",$1:function(a){return this.b.push(["color","red",a])},$isPe:true},fp:{"^":"Tp:10;c",$1:function(a){return this.c.push(Y.qQ(a))},$isPe:true},xU:{"^":"Tp:10;a",$1:function(a){var z,y,x
if(Y.iH(a)<=1)this.a.a.push(a)
else{z=J.x(a)
if(!!z.$iszM)if(J.xC(z.t(a,0),"*"))if(z.gB(a)===3)y=Y.e0(z.t(a,1)).length>1||Y.e0(z.t(a,2)).length>1
else y=!1
else y=!1
else y=!1
x=this.a
if(y)H.bQ(Y.e0(z.t(a,1)),new Y.Pr(x,Y.e0(z.t(a,2))))
else C.Nm.FV(x.a,Y.e0(Y.qQ(a)))}},$isPe:true},Pr:{"^":"Tp:10;a,d",$1:function(a){H.bQ(this.d,new Y.Ss(this.a,a))},$isPe:true},Ss:{"^":"Tp:10;a,e",$1:function(a){this.a.a.push(["*paren",this.e,a])},$isPe:true},EG:{"^":"Tp:10;f",$1:function(a){var z=this.f
if(Y.iH(a)<=1)z.push(Y.qQ(a))
else C.Nm.FV(z,Y.e0(Y.qQ(a)))},$isPe:true},Eo:{"^":"Tp:76;",$2:function(a,b){return V.r3(J.UQ(a,1),J.UQ(b,1))},$isPe:true}},1],["cfrac","Algebra/web/cfrac.dart",,N,{"^":"",AC:function(a){var z,y,x
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
return $.d1().t(0,y).$1(x)}else return new V.ov(a,1)},wd:[function(a){return V.KF(N.AC(a).O6())},"$1","J0",2,0,10,11],Md:{"^":"Tp:10;",$1:function(a){var z=a.length
if(0>=z)return H.e(a,0)
if(1>=z)return H.e(a,1)
return N.AC(a[1])},$isPe:true},YJ:{"^":"Tp:10;",$1:function(a){if(0>=a.length)return H.e(a,0)
return N.AC(a[0])},$isPe:true},DO:{"^":"Tp:10;",$1:function(a){return N.AC(0)},$isPe:true},lP:{"^":"Tp:10;",$1:function(a){var z={}
z.a=new V.ov(0,1)
J.kH(a,new N.L12(z))
return z.a},$isPe:true},L12:{"^":"Tp:10;a",$1:[function(a){var z,y
z=this.a
y=z.a.h(0,N.AC(a))
z.a=y
return y},"$1",null,2,0,null,77,"call"],$isPe:true},Uf:{"^":"Tp:10;",$1:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return new V.ov(-1,1).tv(N.AC(a[0]))}else if(z===2){if(0>=z)return H.e(a,0)
z=N.AC(a[0])
if(1>=a.length)return H.e(a,1)
return z.Et(N.AC(a[1]))}else return new V.ov(0,1)},$isPe:true},wJY:{"^":"Tp:10;",$1:function(a){var z={}
z.b=new V.ov(1,1)
J.kH(a,new N.L11(z))
return z.b},$isPe:true},L11:{"^":"Tp:10;b",$1:[function(a){var z,y
z=this.b
y=z.b.tv(N.AC(a))
z.b=y
return y},"$1",null,2,0,null,77,"call"],$isPe:true},zOQ:{"^":"Tp:10;",$1:function(a){var z,y
z=a.length
if(z===2){if(1>=z)return H.e(a,1)
y=N.AC(a[1])
if(0>=a.length)return H.e(a,0)
return N.AC(a[0]).tv(y.Ec())}else return new V.ov(0,1)},$isPe:true},W6o:{"^":"Tp:10;",$1:function(a){var z,y,x,w,v
if(0>=a.length)return H.e(a,0)
z=N.AC(a[0])
if(1>=a.length)return H.e(a,1)
y=N.AC(a[1]).bR()
if(y>=0){x=z.gMc()
if(typeof x!=="number")H.vh(P.u(x))
x=Math.pow(x,y)
w=z.gv5()
if(typeof w!=="number")H.vh(P.u(w))
return new V.ov(x,Math.pow(w,y))}else{x=z.gv5()
w=-y
if(typeof x!=="number")H.vh(P.u(x))
x=Math.pow(x,w)
v=z.gMc()
if(typeof v!=="number")H.vh(P.u(v))
return new V.ov(x,Math.pow(v,w))}},$isPe:true},MdQ:{"^":"Tp:10;",$1:function(a){var z,y,x
if(0>=a.length)return H.e(a,0)
z=N.AC(a[0])
y=z.gMc()
if(typeof y!=="number")H.vh(P.u(y))
y=Math.sqrt(y)
x=z.gv5()
if(typeof x!=="number")H.vh(P.u(x))
return new V.ov(y,Math.sqrt(x))},$isPe:true},YJG:{"^":"Tp:10;",$1:function(a){return new V.ov(0,1)},$isPe:true},DOe:{"^":"Tp:10;",$1:function(a){return new V.ov(0,1)},$isPe:true},lPa:{"^":"Tp:10;",$1:function(a){return new V.ov(0,1)},$isPe:true}}],["cgenpoly","Algebra/web/cgenpoly.dart",,N,{"^":"",Ux:[function(a){var z,y,x
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
return N.JX(N.Cv()).t(0,y).$1(x)}else return new F.GC(new V.eu(P.EF(["0",new V.ov(a,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))},"$1","Cv",2,0,36,11],JG:function(a,b,c){var z
if(c.gMa().Kg()===0)return new F.GC(new V.eu(P.EF(["0",new V.ov(b,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
else if(c.up())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
else{z=c.gMa()
P.EF(["0",new V.ov(0,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
return F.Q8(new F.Vn(a,[z]))}},JX:function(a){var z=P.EF(["color",new N.j6(a),"simplify",new N.ir(a),"?",new N.xc(a),"+",new N.OJ(a),"-",new N.Qw(a),"*",new N.nd(a),"/",new N.ya(a),"^",new N.HA(a),"sqrt",new N.Pd(a),"sin",new N.Ca(a),"cos",new N.j66(a),"tan",new N.irr(a),"log",new N.xcD(a),"ln",new N.OJN(a),"abs",new N.Qwx(a),"var",new N.ndv(),"+-",new N.yad()],null,null)
z.u(0,"frac",z.t(0,"/"))
z.u(0,"dfrac",z.t(0,"/"))
z.u(0,"*show",z.t(0,"*"))
z.u(0,"*paren",z.t(0,"*"))
return z},j6:{"^":"Tp:10;c",$1:[function(a){var z=J.iN(a)
z.t(a,0)
return this.c.$1(z.t(a,1))},"$1",null,2,0,null,66,"call"],$isPe:true},ir:{"^":"Tp:10;d",$1:[function(a){return this.d.$1(J.UQ(a,0))},"$1",null,2,0,null,66,"call"],$isPe:true},xc:{"^":"Tp:10;e",$1:[function(a){return this.e.$1(0)},"$1",null,2,0,null,66,"call"],$isPe:true},OJ:{"^":"Tp:10;f",$1:[function(a){var z={}
z.a=new F.GC(new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
J.kH(a,new N.JN(z,this.f))
return z.a},"$1",null,2,0,null,66,"call"],$isPe:true},JN:{"^":"Tp:10;a,UI",$1:[function(a){var z,y
z=this.a
y=z.a.h(0,this.UI.$1(a))
z.a=y
return y},"$1",null,2,0,null,77,"call"],$isPe:true},Qw:{"^":"Tp:10;bK",$1:[function(a){var z,y
z=J.iN(a)
if(z.gB(a)===1)return new F.GC(new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null)).tv(this.bK.$1(z.t(a,0)))
else if(z.gB(a)===2){y=this.bK
return y.$1(z.t(a,0)).Et(y.$1(z.t(a,1)))}else return new F.GC(new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))},"$1",null,2,0,null,66,"call"],$isPe:true},nd:{"^":"Tp:10;Gq",$1:[function(a){var z={}
z.b=new F.GC(new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
J.kH(a,new N.LD(z,this.Gq))
return z.b},"$1",null,2,0,null,66,"call"],$isPe:true},LD:{"^":"Tp:10;b,Rm",$1:[function(a){var z,y
z=this.b
y=z.b.tv(this.Rm.$1(a))
z.b=y
return y},"$1",null,2,0,null,77,"call"],$isPe:true},ya:{"^":"Tp:10;w3",$1:[function(a){var z,y,x
z=J.iN(a)
if(z.gB(a)===2){y=this.w3
x=y.$1(z.t(a,1))
return y.$1(z.t(a,0)).Rq(x)}else return new F.GC(new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))},"$1",null,2,0,null,66,"call"],$isPe:true},HA:{"^":"Tp:10;HZ",$1:[function(a){var z,y,x,w,v
z=this.HZ
y=J.iN(a)
x=z.$1(y.t(a,0))
w=z.$1(y.t(a,1))
if(w.gMa().oD()&&w.gMa().Kg()===0){v=w.gMa().bR()
if(v===0)return new F.GC(new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
else if($.SO.$1(v)===!0)if(Math.abs(v)<=4)return x.Sw(w)
else if(Math.abs(v)<=10&&x.gMa().lu()<=1)return x.Sw(w)
else if(x.gMa().K9())return x.Sw(w)
else return F.hc(x,w)
else if(x.gMa().K9())if(x.gMa().Kg()===0){z=x.gMa().bR()
return new F.GC(new V.eu(P.EF(["0",new V.ov(Math.pow(z,v),1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))}else return F.hc(x,w)
else return F.hc(x,w)}else return F.hc(x,w)},"$1",null,2,0,null,66,"call"],$isPe:true},Pd:{"^":"Tp:10;mG",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.mG
x=y.$1(z).gMa().bR()
return N.JG("sqrt",Math.sqrt(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},Ca:{"^":"Tp:10;xC",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.xC
x=y.$1(z).gMa().bR()
return N.JG("sin",Math.sin(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},j66:{"^":"Tp:10;cj",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.cj
x=y.$1(z).gMa().bR()
return N.JG("cos",Math.cos(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},irr:{"^":"Tp:10;jk",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.jk
x=y.$1(z).gMa().bR()
return N.JG("tan",Math.tan(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},xcD:{"^":"Tp:10;i0",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.i0
x=y.$1(z).gMa().bR()
x=Math.log(x)
return N.JG("log",x/Math.log(10),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},OJN:{"^":"Tp:10;r",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.r
x=y.$1(z).gMa().bR()
return N.JG("ln",Math.log(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},Qwx:{"^":"Tp:10;YC",$1:[function(a){var z,y
z=J.UQ(a,0)
y=this.YC
return N.JG("abs",Math.abs(y.$1(z).gMa().bR()),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},ndv:{"^":"Tp:10;",$1:[function(a){return new F.GC(new V.eu(P.EF([J.WB(J.UQ(a,0),"1"),new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))},"$1",null,2,0,null,66,"call"],$isPe:true},yad:{"^":"Tp:10;",$1:[function(a){return 0/0},"$1",null,2,0,null,66,"call"],$isPe:true}}],["compoundeq","Algebra/web/compoundeq.dart",,R,{"^":"",j9:function(a){var z=a[0]
return V.KF(["comp",[a[1],z,a[2]],a[3],a[4]])},I7:{"^":"a;NM<,dr,Hm<,G8,HO",qD:function(){return["comp",[this.G8,this.NM.Ip(V.Bf()),this.dr.Ip(V.Bf())],this.HO,this.Hm.Ip(V.Bf())]},ob:function(){return this.dr.JE()},EY:function(a){return this.NM.PY(a)},B2:function(a){return this.Hm.PY(a)}}}],["compute","Algebra/web/compute.dart",,V,{"^":"",qW:[function(a){var z,y
if(typeof a==="number")return a
else{z=J.iN(a)
y=z.t(a,0)
return J.UQ($.cU(),y).$1(z.Jk(a,1))}},"$1","fB",2,0,13,11],W6:{"^":"Tp:78;",$2:function(a,b){return a.$1(V.qW(J.UQ(b,0)))},$isPe:true},wJ:{"^":"Tp:74;",$0:function(){var z=P.L5(null,null,null,null,null)
z.u(0,"color",new V.Lf())
z.u(0,"simplify",new V.fT())
z.u(0,"eof",new V.pp())
z.u(0,"pt",new V.Nq())
z.u(0,"?",new V.nl())
z.u(0,"+",new V.Fb())
z.u(0,"-",new V.ej())
z.u(0,"*",new V.ik())
z.u(0,"/",new V.xb())
z.u(0,"space",new V.LfS())
z.u(0,"^",new V.fTP())
z.u(0,"sqrt",new V.ppY())
z.u(0,"sin",new V.r3y())
z.u(0,"cos",new V.Nqv())
z.u(0,"tan",new V.nl4())
z.u(0,"ln",new V.Fbi())
z.u(0,"log",new V.ejb())
z.u(0,"abs",new V.ika())
z.u(0,"=",new V.xba())
z.u(0,">",new V.L0())
z.u(0,"<",new V.L1())
z.u(0,">=",new V.L2())
z.u(0,"<=",new V.L4())
z.u(0,"comp",new V.L6())
z.u(0,"and",new V.L7())
z.u(0,"or",new V.L8())
z.u(0,";",new V.L9())
z.u(0,"+-",new V.L10())
z.u(0,"frac",z.t(0,"/"))
z.u(0,"dfrac",z.t(0,"/"))
z.u(0,"*show",z.t(0,"*"))
z.u(0,"*paren",z.t(0,"*"))
return z},$isPe:true},Lf:{"^":"Tp:79;",$1:[function(a){var z=J.iN(a)
z.t(a,0)
return V.qW(z.t(a,1))},"$1",null,2,0,null,66,"call"],$isPe:true},fT:{"^":"Tp:79;",$1:[function(a){return V.qW(J.UQ(a,0))},"$1",null,2,0,null,66,"call"],$isPe:true},pp:{"^":"Tp:79;",$1:[function(a){return 0},"$1",null,2,0,null,66,"call"],$isPe:true},Nq:{"^":"Tp:79;",$1:[function(a){return 0},"$1",null,2,0,null,66,"call"],$isPe:true},nl:{"^":"Tp:79;",$1:[function(a){return 0},"$1",null,2,0,null,66,"call"],$isPe:true},Fb:{"^":"Tp:79;",$1:[function(a){var z={}
z.a=0
J.kH(a,new V.mf(z))
return z.a},"$1",null,2,0,null,66,"call"],$isPe:true},mf:{"^":"Tp:10;a",$1:[function(a){var z,y,x,w
z=this.a
y=z.a
x=V.qW(a)
if(typeof x!=="number")return H.s(x)
w=y+x
z.a=w
return w},"$1",null,2,0,null,77,"call"],$isPe:true},ej:{"^":"Tp:79;",$1:[function(a){var z,y,x,w,v,u
z=J.iN(a)
if(z.gB(a)===1)return J.jz(V.qW(z.t(a,0)))
else{y=0
x=0
while(!0){w=z.gB(a)
if(typeof w!=="number")return H.s(w)
if(!(x<w))break
v=z.t(a,x)
w=x===0?1:-1
u=V.qW(v)
if(typeof u!=="number")return H.s(u)
y+=w*u;++x}return y}},"$1",null,2,0,null,66,"call"],$isPe:true},ik:{"^":"Tp:79;",$1:[function(a){var z={}
z.b=1
J.kH(a,new V.HK(z))
return z.b},"$1",null,2,0,null,66,"call"],$isPe:true},HK:{"^":"Tp:10;b",$1:[function(a){var z,y,x,w
z=this.b
y=z.b
x=V.qW(a)
if(typeof x!=="number")return H.s(x)
w=y*x
z.b=w
return w},"$1",null,2,0,null,77,"call"],$isPe:true},xb:{"^":"Tp:79;",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=1
x=0
while(!0){w=z.gB(a)
if(typeof w!=="number")return H.s(w)
if(!(x<w))break
v=V.qW(z.t(a,x))
if(x===0)w=v
else{if(typeof v!=="number")return H.s(v)
w=1/v}if(typeof w!=="number")return H.s(w)
y*=w;++x}return y},"$1",null,2,0,null,66,"call"],$isPe:true},LfS:{"^":"Tp:79;",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=V.qW(y)
z=J.Wx(w)
if(z.F(w,0))return z.g(w,V.qW(x))
else{v=V.qW(x)
if(typeof v!=="number")return H.s(v)
return z.g(w,-1*v)}},"$1",null,2,0,null,66,"call"],$isPe:true},fTP:{"^":"Tp:79;",$1:[function(a){var z,y,x,w
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=V.qW(y)
w=V.qW(x)
if(typeof z!=="number")H.vh(P.u(z))
if(typeof w!=="number")H.vh(P.u(w))
return Math.pow(z,w)},"$1",null,2,0,null,66,"call"],$isPe:true},ppY:{"^":"Tp:79;",$1:[function(a){return $.yE().$2(P.I5(),a)},"$1",null,2,0,null,66,"call"],$isPe:true},r3y:{"^":"Tp:79;",$1:[function(a){return $.yE().$2(P.JP(),a)},"$1",null,2,0,null,66,"call"],$isPe:true},Nqv:{"^":"Tp:79;",$1:[function(a){return $.yE().$2(P.YG(),a)},"$1",null,2,0,null,66,"call"],$isPe:true},nl4:{"^":"Tp:79;",$1:[function(a){return $.yE().$2(P.yq(),a)},"$1",null,2,0,null,66,"call"],$isPe:true},Fbi:{"^":"Tp:79;",$1:[function(a){return $.yE().$2(P.kl(),a)},"$1",null,2,0,null,66,"call"],$isPe:true},ejb:{"^":"Tp:79;",$1:[function(a){var z=$.yE().$2(P.kl(),a)
return J.FW(z,Math.log(10))},"$1",null,2,0,null,66,"call"],$isPe:true},ika:{"^":"Tp:79;",$1:[function(a){return J.yH(V.qW(J.UQ(a,0)))},"$1",null,2,0,null,66,"call"],$isPe:true},xba:{"^":"Tp:79;",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=F.hb(V.qW(y))
v=F.hb(V.qW(x))
z=J.x(w)
if(z.n(w,v)||Math.abs(z.W(w,v))/(z.Vy(w)+J.yH(v))<0.0001)if(z.gkZ(w))return 1
else return 0
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L0:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.xZ(F.T5(V.qW(y)),F.T5(V.qW(x))))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L1:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.u6(F.T5(V.qW(y)),F.T5(V.qW(x))))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L2:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.J5(F.T5(V.qW(y)),F.T5(V.qW(x))))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L4:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.Bl(F.T5(V.qW(y)),F.T5(V.qW(x))))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L6:{"^":"Tp:79;",$1:[function(a){var z,y,x,w
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=z.t(a,2)
if(J.xC(V.qW(y),1)&&J.xC(V.qW([x,J.UQ(y,2),w]),1))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L7:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.xC(V.qW(y),1)&&J.xC(V.qW(x),1))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L8:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.xC(V.qW(y),1)||J.xC(V.qW(x),1))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L9:{"^":"Tp:79;",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
if(J.xC(V.qW(y),1)&&J.xC(V.qW(x),1))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},L10:{"^":"Tp:79;",$1:[function(a){return 0/0},"$1",null,2,0,null,66,"call"],$isPe:true}}],["cpoly","Algebra/web/cpoly.dart",,K,{"^":"",Nx:[function(a){return K.Ye(a).BC()},"$1","uU",2,0,37,11],Ye:[function(a){var z,y,x,w
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
w=K.Mr(K.Q0()).t(0,y).$1(x)
if(w.oD())return w
else return w.dD()}else return new V.eu(P.EF(["0",new V.ov(a,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},"$1","Q0",2,0,37,11],Mr:function(a){var z=P.EF(["color",new K.wt(a),"simplify",new K.Hu(a),"?",new K.BD(a),"+",new K.dn(a),"-",new K.wC(a),"*",new K.zN(a),"/",new K.dP(a),"^",new K.Tf(a),"sqrt",new K.Ra(a),"sin",new K.wt5(a),"cos",new K.zu9(a),"tan",new K.HuJ(a),"log",new K.BDO(a),"ln",new K.dnP(a),"abs",new K.wCG(a),"=",new K.zNe(a),"var",new K.dPa(),"+-",new K.Tfa()],null,null)
z.u(0,"frac",z.t(0,"/"))
z.u(0,"dfrac",z.t(0,"/"))
z.u(0,"*show",z.t(0,"*"))
z.u(0,"*paren",z.t(0,"*"))
return z},UA:function(a,b){if(b.Kg()===0)return new V.eu(P.EF(["0",new V.ov(a,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
else return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},wt:{"^":"Tp:10;c",$1:[function(a){var z=J.iN(a)
z.t(a,0)
return this.c.$1(z.t(a,1))},"$1",null,2,0,null,66,"call"],$isPe:true},Hu:{"^":"Tp:10;d",$1:[function(a){return this.d.$1(J.UQ(a,0)).BC()},"$1",null,2,0,null,66,"call"],$isPe:true},BD:{"^":"Tp:10;e",$1:[function(a){return this.e.$1(0)},"$1",null,2,0,null,66,"call"],$isPe:true},dn:{"^":"Tp:10;f",$1:[function(a){var z={}
z.a=new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
J.kH(a,new K.Hw(z,this.f))
return z.a},"$1",null,2,0,null,66,"call"],$isPe:true},Hw:{"^":"Tp:10;a,UI",$1:[function(a){var z,y
z=this.a
y=z.a.h(0,this.UI.$1(a))
z.a=y
return y},"$1",null,2,0,null,77,"call"],$isPe:true},wC:{"^":"Tp:10;bK",$1:[function(a){var z,y
z=J.iN(a)
if(z.gB(a)===1)return new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0).tv(this.bK.$1(z.t(a,0)))
else if(z.gB(a)===2){y=this.bK
return y.$1(z.t(a,0)).Et(y.$1(z.t(a,1)))}else return new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},"$1",null,2,0,null,66,"call"],$isPe:true},zN:{"^":"Tp:10;Gq",$1:[function(a){var z={}
z.b=new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
J.kH(a,new K.xI(z,this.Gq))
return z.b},"$1",null,2,0,null,66,"call"],$isPe:true},xI:{"^":"Tp:10;b,Rm",$1:[function(a){var z,y
z=this.b
y=z.b.tv(this.Rm.$1(a))
z.b=y
return y},"$1",null,2,0,null,77,"call"],$isPe:true},dP:{"^":"Tp:10;w3",$1:[function(a){var z,y,x
z=J.iN(a)
if(z.gB(a)===2){y=this.w3
x=y.$1(z.t(a,1))
return y.$1(z.t(a,0)).Rq(x)}else return new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},"$1",null,2,0,null,66,"call"],$isPe:true},Tf:{"^":"Tp:10;HZ",$1:[function(a){var z,y,x,w,v,u
z=this.HZ
y=J.iN(a)
x=z.$1(y.t(a,0))
w=z.$1(y.t(a,1))
P.EF(["0",new V.ov(1,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
if(w.Kg()===0){v=w.bR()
if(v===0)u=new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
else if($.SO.$1(v)===!0)u=x.Sw(w)
else if(x.K9()){z=x.bR()
u=K.UA(Math.pow(z,v),x)}else u=new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)}else u=new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
return u},"$1",null,2,0,null,66,"call"],$isPe:true},Ra:{"^":"Tp:10;mG",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.mG
x=y.$1(z).bR()
return K.UA(Math.sqrt(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},wt5:{"^":"Tp:10;xC",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.xC
x=y.$1(z).bR()
return K.UA(Math.sin(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},zu9:{"^":"Tp:10;cj",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.cj
x=y.$1(z).bR()
return K.UA(Math.cos(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},HuJ:{"^":"Tp:10;jk",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.jk
x=y.$1(z).bR()
return K.UA(Math.tan(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},BDO:{"^":"Tp:10;i0",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.i0
x=y.$1(z).bR()
x=Math.log(x)
return K.UA(x/Math.log(10),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},dnP:{"^":"Tp:10;r",$1:[function(a){var z,y,x
z=J.UQ(a,0)
y=this.r
x=y.$1(z).bR()
return K.UA(Math.log(x),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},wCG:{"^":"Tp:10;YC",$1:[function(a){var z,y
z=J.UQ(a,0)
y=this.YC
return K.UA(Math.abs(y.$1(z).bR()),y.$1(z))},"$1",null,2,0,null,66,"call"],$isPe:true},zNe:{"^":"Tp:10;Pz",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.Pz
if(J.xC(z.$1(y),z.$1(x)))return 1
else return 0},"$1",null,2,0,null,66,"call"],$isPe:true},dPa:{"^":"Tp:10;",$1:[function(a){return new V.eu(P.EF([J.WB(J.UQ(a,0),"1"),new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},"$1",null,2,0,null,66,"call"],$isPe:true},Tfa:{"^":"Tp:10;",$1:[function(a){return 0/0},"$1",null,2,0,null,66,"call"],$isPe:true}}],["dart._internal","dart:_internal",,H,{"^":"",bQ:function(a,b){var z
for(z=new H.a7(a,a.length,0,null);z.G();)b.$1(z.lo)},Ap:function(a,b){var z,y,x,w,v
z=[]
y=a.length
for(x=y,w=0;w<y;++w){if(w>=x)return H.e(a,w)
v=a[w]
if(b.$1(v)!==!0)z.push(v)
x=a.length
if(y!==x)throw H.b(P.a4(a))}x=z.length
if(x===y)return
C.Nm.sB(a,x)
for(w=0;w<z.length;++w)C.Nm.u(a,w,z[w])},rd:function(a,b){if(b==null)b=P.n4()
H.ZE(a,0,a.length-1,b)},Wp:function(){return new P.lj("No element")},ZE:function(a,b,c,d){if(c-b<=32)H.w9(a,b,c,d)
else H.d4(a,b,c,d)},w9:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.iN(a);z<=c;++z){x=y.t(a,z)
w=z
while(!0){if(!(w>b&&J.xZ(d.$2(y.t(a,w-1),x),0)))break
v=w-1
y.u(a,w,y.t(a,v))
w=v}y.u(a,w,x)}},d4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.jn.cU(c-b+1,6)
y=b+z
x=c-z
w=C.jn.cU(b+c,2)
v=w-z
u=w+z
t=J.iN(a)
s=t.t(a,y)
r=t.t(a,v)
q=t.t(a,w)
p=t.t(a,u)
o=t.t(a,x)
if(J.xZ(d.$2(s,r),0)){n=r
r=s
s=n}if(J.xZ(d.$2(p,o),0)){n=o
o=p
p=n}if(J.xZ(d.$2(s,q),0)){n=q
q=s
s=n}if(J.xZ(d.$2(r,q),0)){n=q
q=r
r=n}if(J.xZ(d.$2(s,p),0)){n=p
p=s
s=n}if(J.xZ(d.$2(q,p),0)){n=p
p=q
q=n}if(J.xZ(d.$2(r,o),0)){n=o
o=r
r=n}if(J.xZ(d.$2(r,q),0)){n=q
q=r
r=n}if(J.xZ(d.$2(p,o),0)){n=o
o=p
p=n}t.u(a,y,s)
t.u(a,w,q)
t.u(a,x,o)
t.u(a,v,t.t(a,b))
t.u(a,u,t.t(a,c))
m=b+1
l=c-1
if(J.xC(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.t(a,k)
i=d.$2(j,r)
h=J.x(i)
if(h.n(i,0))continue
if(h.C(i,0)){if(k!==m){t.u(a,k,t.t(a,m))
t.u(a,m,j)}++m}else for(;!0;){i=d.$2(t.t(a,l),r)
h=J.Wx(i)
if(h.D(i,0)){--l
continue}else{g=l-1
if(h.C(i,0)){t.u(a,k,t.t(a,m))
f=m+1
t.u(a,m,t.t(a,l))
t.u(a,l,j)
l=g
m=f
break}else{t.u(a,k,t.t(a,l))
t.u(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.t(a,k)
if(J.u6(d.$2(j,r),0)){if(k!==m){t.u(a,k,t.t(a,m))
t.u(a,m,j)}++m}else if(J.xZ(d.$2(j,p),0))for(;!0;)if(J.xZ(d.$2(t.t(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.u6(d.$2(t.t(a,l),r),0)){t.u(a,k,t.t(a,m))
f=m+1
t.u(a,m,t.t(a,l))
t.u(a,l,j)
l=g
m=f}else{t.u(a,k,t.t(a,l))
t.u(a,l,j)
l=g}break}}e=!1}h=m-1
t.u(a,b,t.t(a,h))
t.u(a,h,r)
h=l+1
t.u(a,c,t.t(a,h))
t.u(a,h,p)
H.ZE(a,b,m-2,d)
H.ZE(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.xC(d.$2(t.t(a,m),r),0);)++m
for(;J.xC(d.$2(t.t(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.t(a,k)
if(J.xC(d.$2(j,r),0)){if(k!==m){t.u(a,k,t.t(a,m))
t.u(a,m,j)}++m}else if(J.xC(d.$2(j,p),0))for(;!0;)if(J.xC(d.$2(t.t(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.u6(d.$2(t.t(a,l),r),0)){t.u(a,k,t.t(a,m))
f=m+1
t.u(a,m,t.t(a,l))
t.u(a,l,j)
l=g
m=f}else{t.u(a,k,t.t(a,l))
t.u(a,l,j)
l=g}break}}H.ZE(a,m,l,d)}else H.ZE(a,m,l,d)},aL:{"^":"mW;",gA:function(a){return new H.a7(this,this.gB(this),0,null)},aN:function(a,b){var z,y
z=this.gB(this)
for(y=0;y<z;++y){b.$1(this.Zv(0,y))
if(z!==this.gB(this))throw H.b(P.a4(this))}},gl0:function(a){return this.gB(this)===0},grZ:function(a){if(this.gB(this)===0)throw H.b(H.Wp())
return this.Zv(0,this.gB(this)-1)},zV:function(a,b){var z,y,x,w,v
z=this.gB(this)
if(b.length!==0){if(z===0)return""
y=H.d(this.Zv(0,0))
if(z!==this.gB(this))throw H.b(P.a4(this))
x=P.p9(y)
for(w=1;w<z;++w){x.vM+=b
v=this.Zv(0,w)
x.vM+=typeof v==="string"?v:H.d(v)
if(z!==this.gB(this))throw H.b(P.a4(this))}return x.vM}else{x=P.p9("")
for(w=0;w<z;++w){v=this.Zv(0,w)
x.vM+=typeof v==="string"?v:H.d(v)
if(z!==this.gB(this))throw H.b(P.a4(this))}return x.vM}},ev:function(a,b){return P.mW.prototype.ev.call(this,this,b)},ez:function(a,b){return H.VM(new H.A8(this,b),[null,null])},V3:function(a,b){var z,y,x
if(b){z=H.VM([],[H.ip(this,"aL",0)])
C.Nm.sB(z,this.gB(this))}else{y=Array(this.gB(this))
y.fixed$length=init
z=H.VM(y,[H.ip(this,"aL",0)])}for(x=0;x<this.gB(this);++x){y=this.Zv(0,x)
if(x>=z.length)return H.e(z,x)
z[x]=y}return z},br:function(a){return this.V3(a,!0)},zH:function(a){var z,y
z=P.Ls(null,null,null,H.ip(this,"aL",0))
for(y=0;y<this.gB(this);++y)z.h(0,this.Zv(0,y))
return z},$isqC:true},a7:{"^":"a;l6,SW,G7,lo",gl:function(){return this.lo},G:function(){var z,y,x,w
z=this.l6
y=J.iN(z)
x=y.gB(z)
if(this.SW!==x)throw H.b(P.a4(z))
w=this.G7
if(w>=x){this.lo=null
return!1}this.lo=y.Zv(z,w);++this.G7
return!0}},i1:{"^":"mW;l6,T6",mb:function(a){return this.T6.$1(a)},gA:function(a){var z=this.l6
z=new H.MH(null,z.gA(z),this.T6)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},gB:function(a){var z=this.l6
return z.gB(z)},gl0:function(a){var z=this.l6
return z.gl0(z)},grZ:function(a){var z=this.l6
return this.mb(z.grZ(z))},$asmW:function(a,b){return[b]},$ascX:function(a,b){return[b]},static:{K1:function(a,b,c,d){if(!!a.$isqC)return H.VM(new H.xy(a,b),[c,d])
return H.VM(new H.i1(a,b),[c,d])}}},xy:{"^":"i1;l6,T6",$isqC:true},MH:{"^":"Ov;lo,OI,T6",mb:function(a){return this.T6.$1(a)},G:function(){var z=this.OI
if(z.G()){this.lo=this.mb(z.gl())
return!0}this.lo=null
return!1},gl:function(){return this.lo}},A8:{"^":"aL;CR,T6",mb:function(a){return this.T6.$1(a)},gB:function(a){return J.q8(this.CR)},Zv:function(a,b){return this.mb(J.i4(this.CR,b))},$asaL:function(a,b){return[b]},$asmW:function(a,b){return[b]},$ascX:function(a,b){return[b]},$isqC:true},U5:{"^":"mW;l6,T6",gA:function(a){var z=new H.vG(J.GP(this.l6),this.T6)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},vG:{"^":"Ov;OI,T6",mb:function(a){return this.T6.$1(a)},G:function(){for(var z=this.OI;z.G();)if(this.mb(z.gl())===!0)return!0
return!1},gl:function(){return this.OI.gl()}},SU:{"^":"a;",sB:function(a,b){throw H.b(P.f("Cannot change the length of a fixed-length list"))},h:function(a,b){throw H.b(P.f("Cannot add to a fixed-length list"))}},GD:{"^":"a;fN<",n:function(a,b){if(b==null)return!1
return!!J.x(b).$isGD&&J.xC(this.fN,b.fN)},giO:function(a){return 536870911&664597*J.v1(this.fN)},bu:[function(a){return"Symbol(\""+H.d(this.fN)+"\")"},"$0","gAY",0,0,74],$isGD:true,static:{"^":"RW,ES,qu,KG,Np,fb"}}}],["dart.collection","dart:collection",,P,{"^":"",cW:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},a0:function(){var z=Object.create(null)
P.cW(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z},EF:function(a,b,c){return H.B7(a,H.VM(new P.YB(0,null,null,null,null,null,0),[b,c]))},Fl:function(a,b){return H.VM(new P.YB(0,null,null,null,null,null,0),[a,b])},Ou:[function(a,b){return J.xC(a,b)},"$2","iv",4,0,38],T9:[function(a){return J.v1(a)},"$1","py",2,0,39,40],UD:function(a,b){return H.VM(new P.PL(0,null,null,null,null),[a,b])},EP:function(a,b,c){var z,y
if(P.nH(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.Ex()
y.push(a)
try{P.T4(a,z)}finally{if(0>=y.length)return H.e(y,0)
y.pop()}y=P.p9(b)
y.We(z,", ")
y.KF(c)
return y.vM},KW:function(a,b,c){var z,y
if(P.nH(a))return b+"..."+c
z=P.p9(b)
y=$.Ex()
y.push(a)
try{z.We(a,", ")}finally{if(0>=y.length)return H.e(y,0)
y.pop()}z.KF(c)
return z.gvM()},nH:function(a){var z,y
for(z=0;y=$.Ex(),z<y.length;++z)if(a===y[z])return!0
return!1},T4:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.G())return
w=H.d(z.gl())
b.push(w)
y+=w.length+2;++x}if(!z.G()){if(x<=5)return
if(0>=b.length)return H.e(b,0)
v=b.pop()
if(0>=b.length)return H.e(b,0)
u=b.pop()}else{t=z.gl();++x
if(!z.G()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.e(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gl();++x
for(;z.G();t=s,s=r){r=z.gl();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},L5:function(a,b,c,d,e){return H.VM(new P.YB(0,null,null,null,null,null,0),[d,e])},Ls:function(a,b,c,d){return H.VM(new P.b6(0,null,null,null,null,null,0),[d])},vW:function(a){var z,y
z={}
if(P.nH(a))return"{...}"
y=P.p9("")
try{$.Ex().push(a)
y.KF("{")
z.a=!0
J.kH(a,new P.LG(z,y))
y.KF("}")}finally{z=$.Ex()
if(0>=z.length)return H.e(z,0)
z.pop()}return y.gvM()},bA:{"^":"a;",gB:function(a){return this.X5},gvc:function(){return H.VM(new P.fG(this),[H.Kp(this,0)])},x4:function(a){var z,y
if(typeof a==="string"&&a!=="__proto__"){z=this.vv
return z==null?!1:z[a]!=null}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.OX
return y==null?!1:y[a]!=null}else return this.Zt(a)},Zt:function(a){var z=this.OB
if(z==null)return!1
return this.aH(z[this.nm(a)],a)>=0},t:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.vv
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.OX
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.Dl(b)},Dl:function(a){var z,y,x
z=this.OB
if(z==null)return
y=z[this.nm(a)]
x=this.aH(y,a)
return x<0?null:y[x+1]},u:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"&&b!=="__proto__"){z=this.vv
if(z==null){z=P.a0()
this.vv=z}this.dg(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.OX
if(y==null){y=P.a0()
this.OX=y}this.dg(y,b,c)}else{x=this.OB
if(x==null){x=P.a0()
this.OB=x}w=this.nm(b)
v=x[w]
if(v==null){P.cW(x,w,[b,c]);++this.X5
this.aw=null}else{u=this.aH(v,b)
if(u>=0)v[u+1]=c
else{v.push(b,c);++this.X5
this.aw=null}}}},aN:function(a,b){var z,y,x,w
z=this.Ig()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.t(0,w))
if(z!==this.aw)throw H.b(P.a4(this))}},Ig:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.aw
if(z!=null)return z
y=Array(this.X5)
y.fixed$length=init
x=this.vv
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.OX
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.OB
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.aw=y
return y},dg:function(a,b,c){if(a[b]==null){++this.X5
this.aw=null}P.cW(a,b,c)},nm:function(a){return J.v1(a)&0x3ffffff},aH:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.xC(a[y],b))return y
return-1},$isT8:true},PL:{"^":"bA;X5,vv,OX,OB,aw",nm:function(a){return H.CU(a)&0x3ffffff},aH:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2){x=a[y]
if(x==null?b==null:x===b)return y}return-1}},fG:{"^":"mW;Fb",gB:function(a){return this.Fb.X5},gl0:function(a){return this.Fb.X5===0},gA:function(a){var z=this.Fb
return new P.EQ(z,z.Ig(),0,null)},aN:function(a,b){var z,y,x,w
z=this.Fb
y=z.Ig()
for(x=y.length,w=0;w<x;++w){b.$1(y[w])
if(y!==z.aw)throw H.b(P.a4(z))}},$isqC:true},EQ:{"^":"a;Fb,aw,zi,fD",gl:function(){return this.fD},G:function(){var z,y,x
z=this.aw
y=this.zi
x=this.Fb
if(z!==x.aw)throw H.b(P.a4(x))
else if(y>=z.length){this.fD=null
return!1}else{this.fD=z[y]
this.zi=y+1
return!0}}},YB:{"^":"a;X5,vv,OX,OB,H9,lX,zN",gB:function(a){return this.X5},gl0:function(a){return this.X5===0},gvc:function(){return H.VM(new P.i5(this),[H.Kp(this,0)])},gUQ:function(a){return H.K1(H.VM(new P.i5(this),[H.Kp(this,0)]),new P.a1(this),H.Kp(this,0),H.Kp(this,1))},x4:function(a){var z,y
if(typeof a==="string"&&a!=="__proto__"){z=this.vv
if(z==null)return!1
return z[a]!=null}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.OX
if(y==null)return!1
return y[a]!=null}else return this.Zt(a)},Zt:function(a){var z=this.OB
if(z==null)return!1
return this.aH(z[this.nm(a)],a)>=0},FV:function(a,b){b.aN(0,new P.S9(this))},t:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.vv
if(z==null)return
y=z[b]
return y==null?null:y.gcA()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.OX
if(x==null)return
y=x[b]
return y==null?null:y.gcA()}else return this.Dl(b)},Dl:function(a){var z,y,x
z=this.OB
if(z==null)return
y=z[this.nm(a)]
x=this.aH(y,a)
if(x<0)return
return y[x].gcA()},u:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.vv
if(z==null){z=P.Qs()
this.vv=z}this.dg(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.OX
if(y==null){y=P.Qs()
this.OX=y}this.dg(y,b,c)}else this.ms(b,c)},ms:function(a,b){var z,y,x,w
z=this.OB
if(z==null){z=P.Qs()
this.OB=z}y=this.nm(a)
x=z[y]
if(x==null)z[y]=[this.pE(a,b)]
else{w=this.aH(x,a)
if(w>=0)x[w].scA(b)
else x.push(this.pE(a,b))}},aN:function(a,b){var z,y
z=this.H9
y=this.zN
for(;z!=null;){b.$2(z.gkh(),z.gcA())
if(y!==this.zN)throw H.b(P.a4(this))
z=z.gDG()}},dg:function(a,b,c){var z=a[b]
if(z==null)a[b]=this.pE(b,c)
else z.scA(c)},pE:function(a,b){var z,y
z=new P.db(a,b,null,null)
if(this.H9==null){this.lX=z
this.H9=z}else{y=this.lX
z.zQ=y
y.sDG(z)
this.lX=z}++this.X5
this.zN=this.zN+1&67108863
return z},nm:function(a){return J.v1(a)&0x3ffffff},aH:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.xC(a[y].gkh(),b))return y
return-1},bu:[function(a){return P.vW(this)},"$0","gAY",0,0,72],$isT8:true,static:{Qs:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},a1:{"^":"Tp:10;a",$1:[function(a){return this.a.t(0,a)},"$1",null,2,0,null,80,"call"],$isPe:true},S9:{"^":"Tp;a",$2:[function(a,b){this.a.u(0,a,b)},"$2",null,4,0,null,81,82,"call"],$isPe:true,$signature:function(){return H.IG(function(a,b){return{func:"oK",args:[a,b]}},this.a,"YB")}},db:{"^":"a;kh<,cA@,DG@,zQ"},i5:{"^":"mW;Fb",gB:function(a){return this.Fb.X5},gl0:function(a){return this.Fb.X5===0},gA:function(a){var z,y
z=this.Fb
y=new P.N6(z,z.zN,null,null)
y.zq=z.H9
return y},aN:function(a,b){var z,y,x
z=this.Fb
y=z.H9
x=z.zN
for(;y!=null;){b.$1(y.gkh())
if(x!==z.zN)throw H.b(P.a4(z))
y=y.gDG()}},$isqC:true},N6:{"^":"a;Fb,zN,zq,fD",gl:function(){return this.fD},G:function(){var z=this.Fb
if(this.zN!==z.zN)throw H.b(P.a4(z))
else{z=this.zq
if(z==null){this.fD=null
return!1}else{this.fD=z.gkh()
this.zq=this.zq.gDG()
return!0}}}},b6:{"^":"CA;X5,vv,OX,OB,H9,lX,zN",gA:function(a){var z=new P.HG(this,this.zN,null,null)
z.zq=this.H9
return z},gB:function(a){return this.X5},gl0:function(a){return this.X5===0},aN:function(a,b){var z,y
z=this.H9
y=this.zN
for(;z!=null;){b.$1(z.gGc())
if(y!==this.zN)throw H.b(P.a4(this))
z=z.gDG()}},grZ:function(a){var z=this.lX
if(z==null)throw H.b(P.w("No elements"))
return z.gGc()},h:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.vv
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.vv=y
z=y}return this.jn(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.OX
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.OX=y
x=y}return this.jn(x,b)}else return this.NZ(b)},NZ:function(a){var z,y,x
z=this.OB
if(z==null){z=P.T2()
this.OB=z}y=this.nm(a)
x=z[y]
if(x==null)z[y]=[this.xf(a)]
else{if(this.aH(x,a)>=0)return!1
x.push(this.xf(a))}return!0},jn:function(a,b){if(a[b]!=null)return!1
a[b]=this.xf(b)
return!0},xf:function(a){var z,y
z=new P.tj(a,null,null)
if(this.H9==null){this.lX=z
this.H9=z}else{y=this.lX
z.zQ=y
y.sDG(z)
this.lX=z}++this.X5
this.zN=this.zN+1&67108863
return z},nm:function(a){return J.v1(a)&0x3ffffff},aH:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.xC(a[y].gGc(),b))return y
return-1},$isqC:true,$iscX:true,$ascX:null,static:{T2:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},tj:{"^":"a;Gc<,DG@,zQ"},HG:{"^":"a;O2,zN,zq,fD",gl:function(){return this.fD},G:function(){var z=this.O2
if(this.zN!==z.zN)throw H.b(P.a4(z))
else{z=this.zq
if(z==null){this.fD=null
return!1}else{this.fD=z.gGc()
this.zq=this.zq.gDG()
return!0}}}},CA:{"^":"Vj;"},mW:{"^":"a;",ez:function(a,b){return H.K1(this,b,H.ip(this,"mW",0),null)},ev:function(a,b){return H.VM(new H.U5(this,b),[H.ip(this,"mW",0)])},aN:function(a,b){var z
for(z=this.gA(this);z.G();)b.$1(z.gl())},zV:function(a,b){var z,y,x
z=this.gA(this)
if(!z.G())return""
y=P.p9("")
if(b==="")do{x=H.d(z.gl())
y.vM+=x}while(z.G())
else{y.KF(H.d(z.gl()))
for(;z.G();){y.vM+=b
x=H.d(z.gl())
y.vM+=x}}return y.vM},gB:function(a){var z,y
z=this.gA(this)
for(y=0;z.G();)++y
return y},gl0:function(a){return!this.gA(this).G()},gor:function(a){return!this.gl0(this)},grZ:function(a){var z,y
z=this.gA(this)
if(!z.G())throw H.b(H.Wp())
do y=z.gl()
while(z.G())
return y},Zv:function(a,b){var z,y,x
if(b<0)throw H.b(P.N(b))
for(z=this.gA(this),y=b;z.G();){x=z.gl()
if(y===0)return x;--y}throw H.b(P.N(b))},bu:[function(a){return P.EP(this,"(",")")},"$0","gAY",0,0,72],$iscX:true,$ascX:null},lD:{"^":"a;",gA:function(a){return new H.a7(a,this.gB(a),0,null)},Zv:function(a,b){return this.t(a,b)},aN:function(a,b){var z,y
z=this.gB(a)
for(y=0;y<z;++y){b.$1(this.t(a,y))
if(z!==this.gB(a))throw H.b(P.a4(a))}},grZ:function(a){if(this.gB(a)===0)throw H.b(P.w("No elements"))
return this.t(a,this.gB(a)-1)},zV:function(a,b){var z
if(this.gB(a)===0)return""
z=P.p9("")
z.We(a,b)
return z.vM},ev:function(a,b){return H.VM(new H.U5(a,b),[H.ip(a,"lD",0)])},ez:function(a,b){return H.VM(new H.A8(a,b),[null,null])},h:function(a,b){var z=this.gB(a)
this.sB(a,z+1)
this.u(a,z,b)},pZ:function(a,b,c){if(b>this.gB(a))throw H.b(P.TE(b,0,this.gB(a)))
if(typeof c!=="number")return c.C()
if(c<b||c>this.gB(a))throw H.b(P.TE(c,b,this.gB(a)))},aM:function(a,b,c){var z,y,x,w
c=this.gB(a)
this.pZ(a,b,c)
z=c-b
y=H.VM([],[H.ip(a,"lD",0)])
C.Nm.sB(y,z)
for(x=0;x<z;++x){w=this.t(a,b+x)
if(x>=y.length)return H.e(y,x)
y[x]=w}return y},Jk:function(a,b){return this.aM(a,b,null)},bu:[function(a){return P.KW(a,"[","]")},"$0","gAY",0,0,72],$iszM:true,$aszM:null,$isqC:true,$iscX:true,$ascX:null},LG:{"^":"Tp:76;a,b",$2:function(a,b){var z=this.a
if(!z.a)this.b.KF(", ")
z.a=!1
z=this.b
z.KF(a)
z.KF(": ")
z.KF(b)},$isPe:true},lf:{"^":"a;",gl0:function(a){return this.gB(this)===0},FV:function(a,b){var z
for(z=J.GP(b);z.G();)this.h(0,z.gl())},V3:function(a,b){var z,y,x,w,v
if(b){z=H.VM([],[H.Kp(this,0)])
C.Nm.sB(z,this.gB(this))}else{y=Array(this.gB(this))
y.fixed$length=init
z=H.VM(y,[H.Kp(this,0)])}for(y=this.gA(this),x=0;y.G();x=v){w=y.fD
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},br:function(a){return this.V3(a,!0)},ez:function(a,b){return H.VM(new H.xy(this,b),[H.Kp(this,0),null])},bu:[function(a){return P.KW(this,"{","}")},"$0","gAY",0,0,72],ev:function(a,b){var z=new H.U5(this,b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},aN:function(a,b){var z
for(z=this.gA(this);z.G();)b.$1(z.fD)},zV:function(a,b){var z,y,x
z=this.gA(this)
if(!z.G())return""
y=P.p9("")
y.KF(H.d(z.fD))
for(;z.G();){y.vM+=b
x=H.d(z.fD)
y.vM+=x}return y.vM},grZ:function(a){var z,y
z=this.gA(this)
if(!z.G())throw H.b(H.Wp())
do y=z.fD
while(z.G())
return y},$isqC:true,$iscX:true,$ascX:null},Vj:{"^":"lf;"}}],["dart.core","dart:core",,P,{"^":"",Te:function(a){return},Wc:[function(a,b){return J.oE(a,b)},"$2","n4",4,0,41],hl:function(a){var z,y,x,w,v
if(typeof a==="number"||typeof a==="boolean"||null==a)return J.AG(a)
if(typeof a==="string"){z=new P.Rn("")
z.vM="\""
for(y=a.length,x=0,w="\"";x<y;++x){v=C.xB.j(a,x)
if(v<=31)if(v===10)w=z.vM+="\\n"
else if(v===13)w=z.vM+="\\r"
else if(v===9)w=z.vM+="\\t"
else{w=z.vM+="\\x"
if(v<16)z.vM=w+"0"
else{z.vM=w+"1"
v-=16}w=H.Lw(v<10?48+v:87+v)
w=z.vM+=w}else if(v===92)w=z.vM+="\\\\"
else if(v===34)w=z.vM+="\\\""
else{w=H.Lw(v)
w=z.vM+=w}}y=w+"\""
z.vM=y
return y}return"Instance of '"+H.lh(a)+"'"},eG:function(a){return new P.XW(a)},ad:[function(a,b){return a==null?b==null:a===b},"$2","N3",4,0,42],xv:[function(a){return H.CU(a)},"$1","J2",2,0,43],F:function(a,b,c){var z,y
z=H.VM([],[c])
for(y=J.GP(a);y.G();)z.push(y.gl())
if(b)return z
z.fixed$length=init
return z},xh:{"^":"Tp:76;a",$2:function(a,b){this.a.u(0,a.gfN(),b)},$isPe:true},CL:{"^":"Tp:83;a",$2:function(a,b){var z=this.a
if(z.b>0)z.a.KF(", ")
z.a.KF(a.gfN())
z.a.KF(": ")
z.a.KF(P.hl(b));++z.b},$isPe:true},a2:{"^":"a;",bu:[function(a){return this?"true":"false"},"$0","gAY",0,0,72],$isa2:true},"+bool":0,iP:{"^":"a;y3<,aL",n:function(a,b){if(b==null)return!1
if(!J.x(b).$isiP)return!1
return this.y3===b.y3&&this.aL===b.aL},iM:function(a,b){return C.CD.iM(this.y3,b.gy3())},giO:function(a){return this.y3},bu:[function(a){var z,y,x,w,v,u,t,s
z=this.aL
y=P.Gq(z?H.o2(this).getUTCFullYear()+0:H.o2(this).getFullYear()+0)
x=P.h0(z?H.o2(this).getUTCMonth()+1:H.o2(this).getMonth()+1)
w=P.h0(z?H.o2(this).getUTCDate()+0:H.o2(this).getDate()+0)
v=P.h0(z?H.o2(this).getUTCHours()+0:H.o2(this).getHours()+0)
u=P.h0(z?H.o2(this).getUTCMinutes()+0:H.o2(this).getMinutes()+0)
t=P.h0(z?H.o2(this).getUTCSeconds()+0:H.o2(this).getSeconds()+0)
s=P.Vx(z?H.o2(this).getUTCMilliseconds()+0:H.o2(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},"$0","gAY",0,0,72],h:function(a,b){return P.Wu(C.CD.g(this.y3,b.gVs()),this.aL)},Et:function(a){return P.Wu(C.CD.W(this.y3,a.gVs()),this.aL)},RM:function(a,b){if(Math.abs(a)>8640000000000000)throw H.b(P.u(a))},$isiP:true,static:{"^":"oH,Vp,Ej,yz,ch,JE,Px,Yp,kc,Gi,k3,cR,Sx,Ke,Cg,Nr,bm,FI,Kz,LT,yf,I2",Wu:function(a,b){var z=new P.iP(a,b)
z.RM(a,b)
return z},Gq:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},Vx:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},h0:function(a){if(a>=10)return""+a
return"0"+a}}},CP:{"^":"FK;",$isCP:true},"+double":0,Ge:{"^":"a;",$isGe:true},LK:{"^":"Ge;",bu:[function(a){return"Throw of null."},"$0","gAY",0,0,72]},AT:{"^":"Ge;G1",bu:[function(a){var z=this.G1
if(z!=null)return"Illegal argument(s): "+H.d(z)
return"Illegal argument(s)"},"$0","gAY",0,0,72],static:{u:function(a){return new P.AT(a)}}},bJ:{"^":"AT;G1",bu:[function(a){return"RangeError: "+H.d(this.G1)},"$0","gAY",0,0,72],static:{C3:function(a){return new P.bJ(a)},N:function(a){return new P.bJ("value "+H.d(a))},TE:function(a,b,c){return new P.bJ("value "+H.d(a)+" not in range "+b+".."+H.d(c))}}},JS:{"^":"Ge;uF,UP,mP,SA,vG",bu:[function(a){var z,y,x,w,v,u
z={}
z.a=P.p9("")
z.b=0
for(y=this.mP,x=0;w=y.length,x<w;x=++z.b){if(x>0){v=z.a
v.vM+=", "}v=z.a
if(x<0)return H.e(y,x)
u=P.hl(y[x])
v.vM+=typeof u==="string"?u:H.d(u)}this.SA.aN(0,new P.CL(z))
return"NoSuchMethodError : method not found: '"+this.UP.bu(0)+"'\nReceiver: "+H.d(P.hl(this.uF))+"\nArguments: ["+z.a.vM+"]"},"$0","gAY",0,0,72],static:{lr:function(a,b,c,d,e){return new P.JS(a,b,c,d,e)}}},ub:{"^":"Ge;G1",bu:[function(a){return"Unsupported operation: "+this.G1},"$0","gAY",0,0,72],static:{f:function(a){return new P.ub(a)}}},ds:{"^":"Ge;G1",bu:[function(a){var z=this.G1
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"},"$0","gAY",0,0,72],$isGe:true,static:{SY:function(a){return new P.ds(a)}}},lj:{"^":"Ge;G1",bu:[function(a){return"Bad state: "+this.G1},"$0","gAY",0,0,72],static:{w:function(a){return new P.lj(a)}}},UV:{"^":"Ge;YA",bu:[function(a){var z=this.YA
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.hl(z))+"."},"$0","gAY",0,0,72],static:{a4:function(a){return new P.UV(a)}}},k5:{"^":"a;",bu:[function(a){return"Out of Memory"},"$0","gAY",0,0,72],$isGe:true},VS:{"^":"a;",bu:[function(a){return"Stack Overflow"},"$0","gAY",0,0,72],$isGe:true},t7:{"^":"Ge;Wo",bu:[function(a){return"Reading static variable '"+this.Wo+"' during its initialization"},"$0","gAY",0,0,72],static:{Gz:function(a){return new P.t7(a)}}},XW:{"^":"a;G1",bu:[function(a){return"Exception: "+this.G1},"$0","gAY",0,0,72]},aE:{"^":"a;G1",bu:[function(a){return"FormatException: "+this.G1},"$0","gAY",0,0,72],static:{rr:function(a){return new P.aE(a)}}},KN:{"^":"FK;",$isKN:true},"+int":0,Ov:{"^":"a;"},zM:{"^":"a;",$iszM:true,$aszM:null,$isqC:true,$iscX:true,$ascX:null},"+List":0,uJ:{"^":"a;",bu:[function(a){return"null"},"$0","gAY",0,0,72]},"+Null":0,FK:{"^":"a;",$isFK:true},"+num":0,a:{"^":";",n:function(a,b){return this===b},giO:function(a){return H.eQ(this)},bu:[function(a){return H.a5(this)},"$0","gAY",0,0,72],T:function(a,b){throw H.b(P.lr(this,b.gWa(),b.gnd(),b.gVm(),null))}},Od:{"^":"a;"},qU:{"^":"a;",$isqU:true},"+String":0,Rn:{"^":"a;vM<",gB:function(a){return this.vM.length},KF:function(a){this.vM+=typeof a==="string"?a:H.d(a)},We:function(a,b){var z,y
z=J.GP(a)
if(!z.G())return
if(b.length===0)do{y=z.gl()
this.vM+=typeof y==="string"?y:H.d(y)}while(z.G())
else{this.KF(z.gl())
for(;z.G();){this.vM+=b
y=z.gl()
this.vM+=typeof y==="string"?y:H.d(y)}}},bu:[function(a){return this.vM},"$0","gAY",0,0,72],PD:function(a){this.vM=a},static:{p9:function(a){var z=new P.Rn("")
z.PD(a)
return z}}},wv:{"^":"a;"}}],["dart.dom.html","dart:html",,W,{"^":"",NN:{"^":"h4;","%":"HTMLAppletElement|HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},Gh:{"^":"NN;",bu:[function(a){return a.toString()},"$0","gAY",0,0,72],"%":"HTMLAnchorElement"},fY:{"^":"NN;",bu:[function(a){return a.toString()},"$0","gAY",0,0,72],"%":"HTMLAreaElement"},Az:{"^":"Gv;",$isAz:true,"%":"Blob|File"},OM:{"^":"KV;B:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},BK:{"^":"Gv;",bu:[function(a){return a.toString()},"$0","gAY",0,0,72],"%":"DOMException"},h4:{"^":"KV;",bu:[function(a){return a.localName},"$0","gAY",0,0,72],"%":"SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphElement|SVGAltGlyphItemElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGDiscardElement|SVGElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGGraphicsElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRadialGradientElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement;Element"},ea:{"^":"Gv;",$isea:true,"%":"AudioProcessingEvent|AutocompleteErrorEvent|BeforeLoadEvent|BeforeUnloadEvent|CSSFontFaceLoadEvent|CloseEvent|CompositionEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|FocusEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|InstallPhaseEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MSPointerEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|MouseScrollEvent|MouseWheelEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PointerEvent|PopStateEvent|ProgressEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|SpeechInputEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|WheelEvent|XMLHttpRequestProgressEvent"},D0:{"^":"Gv;","%":";EventTarget"},Yu:{"^":"NN;B:length=","%":"HTMLFormElement"},Sg:{"^":"Gv;",$isSg:true,"%":"ImageData"},Mi:{"^":"NN;",$isKV:true,"%":"HTMLInputElement"},KV:{"^":"D0;",bu:[function(a){var z=a.nodeValue
return z==null?J.Gv.prototype.bu.call(this,a):z},"$0","gAY",0,0,72],$isKV:true,"%":"Attr|Document|DocumentFragment|DocumentType|HTMLDocument|Notation|ShadowRoot|XMLDocument;Node"},lp:{"^":"NN;B:length=","%":"HTMLSelectElement"},u9:{"^":"D0;",bu:[function(a){return a.toString()},"$0","gAY",0,0,72],$isu9:true,"%":"DOMWindow|Window"}}],["dart.dom.indexed_db","dart:indexed_db",,P,{"^":"",hF:{"^":"Gv;",$ishF:true,"%":"IDBKeyRange"}}],["dart.js","dart:js",,P,{"^":"",R4:[function(a,b,c,d){var z
if(b===!0){z=[c]
C.Nm.FV(z,d)
d=z}return P.wY(H.im(a,P.F(J.C0(d,P.Xl()),!0,null),P.Te(null)))},"$4","uu",8,0,null,44,45,46,47],Dm:function(a,b,c){var z
if(Object.isExtensible(a))try{Object.defineProperty(a,b,{value:c})
return!0}catch(z){H.Ru(z)}return!1},Om:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},wY:[function(a){var z
if(a==null)return
else if(typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
else{z=J.x(a)
if(!!z.$isAz||!!z.$isea||!!z.$ishF||!!z.$isSg||!!z.$isKV||!!z.$isAS||!!z.$isu9)return a
else if(!!z.$isiP)return H.o2(a)
else if(!!z.$isE4)return a.dq
else if(!!z.$isPe)return P.hE(a,"$dart_jsFunction",new P.DV())
else return P.hE(a,"_$dart_jsObject",new P.Hp($.hs()))}},"$1","En",2,0,10,48],hE:function(a,b,c){var z=P.Om(a,b)
if(z==null){z=c.$1(a)
P.Dm(a,b,z)}return z},dU:[function(a){var z
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else{if(a instanceof Object){z=J.x(a)
z=!!z.$isAz||!!z.$isea||!!z.$ishF||!!z.$isSg||!!z.$isKV||!!z.$isAS||!!z.$isu9}else z=!1
if(z)return a
else if(a instanceof Date)return P.Wu(a.getTime(),!1)
else if(a.constructor===$.hs())return a.o
else return P.ND(a)}},"$1","Xl",2,0,49,48],ND:function(a){if(typeof a=="function")return P.iQ(a,$.Dp(),new P.Nz())
else if(a instanceof Array)return P.iQ(a,$.Iq(),new P.Jd())
else return P.iQ(a,$.Iq(),new P.QS())},iQ:function(a,b,c){var z=P.Om(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.Dm(a,b,z)}return z},E4:{"^":"a;dq",t:function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.b(P.u("property is not a String or num"))
return P.dU(this.dq[b])},u:function(a,b,c){if(typeof b!=="string"&&typeof b!=="number")throw H.b(P.u("property is not a String or num"))
this.dq[b]=P.wY(c)},giO:function(a){return 0},n:function(a,b){if(b==null)return!1
return!!J.x(b).$isE4&&this.dq===b.dq},bu:[function(a){var z,y
try{z=String(this.dq)
return z}catch(y){H.Ru(y)
return P.a.prototype.bu.call(this,this)}},"$0","gAY",0,0,72],mS:function(a,b){var z,y
z=this.dq
y=b==null?null:P.F(H.VM(new H.A8(b,P.En()),[null,null]),!0,null)
return P.dU(z[a].apply(z,y))},$isE4:true,static:{jT:function(a){var z=J.x(a)
if(!z.$isT8&&!z.$iscX)throw H.b(P.u("object must be a Map or Iterable"))
return P.ND(P.M0(a))},M0:function(a){return new P.Gn(P.UD(null,null)).$1(a)}}},Gn:{"^":"Tp:10;a",$1:[function(a){var z,y,x,w,v
z=this.a
if(z.x4(a))return z.t(0,a)
y=J.x(a)
if(!!y.$isT8){x={}
z.u(0,a,x)
for(z=a.gvc(),z=z.gA(z);z.G();){w=z.gl()
x[w]=this.$1(y.t(a,w))}return x}else if(!!y.$iscX){v=[]
z.u(0,a,v)
C.Nm.FV(v,y.ez(a,this))
return v}else return P.wY(a)},"$1",null,2,0,null,48,"call"],$isPe:true},r7:{"^":"E4;dq"},Tz:{"^":"Wk;dq",t:function(a,b){var z
if(typeof b==="number"&&b===C.CD.yu(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gB(this)
else z=!1
if(z)H.vh(P.TE(b,0,this.gB(this)))}return P.E4.prototype.t.call(this,this,b)},u:function(a,b,c){var z
if(typeof b==="number"&&b===C.jn.yu(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gB(this)
else z=!1
if(z)H.vh(P.TE(b,0,this.gB(this)))}P.E4.prototype.u.call(this,this,b,c)},gB:function(a){var z=this.dq.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.b(P.w("Bad JsArray length"))},sB:function(a,b){P.E4.prototype.u.call(this,this,"length",b)},h:function(a,b){this.mS("push",[b])}},Wk:{"^":"E4+lD;",$iszM:true,$aszM:null,$isqC:true,$iscX:true,$ascX:null},DV:{"^":"Tp:10;",$1:function(a){var z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.R4,a,!1)
P.Dm(z,$.Dp(),a)
return z},$isPe:true},Hp:{"^":"Tp:10;a",$1:function(a){return new this.a(a)},$isPe:true},Nz:{"^":"Tp:10;",$1:function(a){return new P.r7(a)},$isPe:true},Jd:{"^":"Tp:10;",$1:function(a){return H.VM(new P.Tz(a),[null])},$isPe:true},QS:{"^":"Tp:10;",$1:function(a){return new P.E4(a)},$isPe:true}}],["dart.math","dart:math",,P,{"^":"",J:function(a,b){if(typeof a!=="number")throw H.b(P.u(a))
if(typeof b!=="number")throw H.b(P.u(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.ON.gzP(b)||C.ON.gG0(b))return b
return a}return a},y:function(a,b){if(typeof a!=="number")throw H.b(P.u(a))
if(typeof b!=="number")throw H.b(P.u(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(C.ON.gG0(b))return b
return a}if(b===0&&C.CD.gzP(a))return b
return a},q4:[function(a){if(typeof a!=="number")H.vh(P.u(a))
return Math.sin(a)},"$1","JP",2,0,50],If:[function(a){if(typeof a!=="number")H.vh(P.u(a))
return Math.cos(a)},"$1","YG",2,0,50],Hb:[function(a){if(typeof a!=="number")H.vh(P.u(a))
return Math.tan(a)},"$1","yq",2,0,50],m0:[function(a){if(typeof a!=="number")H.vh(P.u(a))
return Math.sqrt(a)},"$1","I5",2,0,50],E6:[function(a){if(typeof a!=="number")H.vh(P.u(a))
return Math.log(a)},"$1","kl",2,0,50]}],["dart.typed_data.implementation","dart:_native_typed_data",,H,{"^":"",ET:{"^":"Gv;",GF:function(a,b,c){var z=J.Wx(b)
if(z.C(b,0)||z.F(b,c))throw H.b(P.TE(b,0,c))
else throw H.b(P.u("Invalid list index "+H.d(b)))},AO:function(a,b,c){if(b>>>0!==b||b>=c)this.GF(a,b,c)},Mp:function(a,b,c,d){this.AO(a,b,d+1)
return d},$isAS:true,"%":";ArrayBufferView;LZ|fj|GV|Dg|dy|Ip|Pg"},Cq:{"^":"ET;",$isAS:true,"%":"DataView"},zU:{"^":"Dg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Float32Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.CP]},$isqC:true,$iscX:true,$ascX:function(){return[P.CP]},$isAS:true,"%":"Float32Array"},K8:{"^":"Dg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Float64Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.CP]},$isqC:true,$iscX:true,$ascX:function(){return[P.CP]},$isAS:true,"%":"Float64Array"},xj:{"^":"Pg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Int16Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":"Int16Array"},EW:{"^":"Pg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Int32Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":"Int32Array"},Zc:{"^":"Pg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Int8Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":"Int8Array"},hx:{"^":"Pg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Uint16Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":"Uint16Array"},Pq:{"^":"Pg;",t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Uint32Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":"Uint32Array"},LN:{"^":"Pg;",gB:function(a){return a.length},t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Uint8ClampedArray(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":"CanvasPixelArray|Uint8ClampedArray"},V6:{"^":"Pg;",gB:function(a){return a.length},t:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
return a[b]},u:function(a,b,c){var z=a.length
if(b>>>0!==b||b>=z)this.GF(a,b,z)
a[b]=c},aM:function(a,b,c){return new Uint8Array(a.subarray(b,this.Mp(a,b,c,a.length)))},Jk:function(a,b){return this.aM(a,b,null)},$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]},$isAS:true,"%":";Uint8Array"},LZ:{"^":"ET;",gB:function(a){return a.length},$isXj:true},Dg:{"^":"GV;",$iszM:true,$aszM:function(){return[P.CP]},$isqC:true,$iscX:true,$ascX:function(){return[P.CP]}},fj:{"^":"LZ+lD;",$iszM:true,$aszM:function(){return[P.CP]},$isqC:true,$iscX:true,$ascX:function(){return[P.CP]}},GV:{"^":"fj+SU;"},Pg:{"^":"Ip;",$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]}},dy:{"^":"LZ+lD;",$iszM:true,$aszM:function(){return[P.KN]},$isqC:true,$iscX:true,$ascX:function(){return[P.KN]}},Ip:{"^":"dy+SU;"}}],["eqscratch","Algebra/web/eqscratch.dart",,N,{"^":"",Gf:function(a){var z,y
z=J.iN(a)
y=z.t(a,0)
return new N.wK(K.Ye(z.t(a,1)).BC(),K.Ye(z.t(a,2)).BC(),y)},or:function(a,b,c){var z,y
z=J.WB(a," = ")
H.rd(b,null)
for(y=0;y<b.length;++y){if(y>0)z=J.WB(z,",")
if(y>=b.length)return H.e(b,y)
z=J.WB(z,F.lq(b[y],c))}return z},qL:function(a,b,c){if(c!==0)return new V.eu(P.EF([J.WB(b,C.jn.bu(c)),a],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
else return new V.eu(P.EF(["0",a],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},Uo:function(a){var z
for(z=a.Kg()-1;z>0;--z)if(a.PY(z).bR()!==0)return!1
return!0},D5:[function(a){var z=N.Gf(a)
return J.xC(V.KF(a),V.KF([z.pY,z.NM.te(),z.Hm.te()]))},"$1","SS",2,0,51,52],yT:function(a,b,c){var z,y,x,w
z=a.gNM()
y=a.gHm()
x=J.x(b)
if(x.n(b,"flip")){z=a.gHm()
y=a.gNM()
w=V.jL(J.pm(a),new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))}else if(x.n(b,"+")){z=J.hv(z,c)
y=J.hv(y,c)
w=J.pm(a)}else if(x.n(b,"-")){z=z.Et(c)
y=y.Et(c)
w=J.pm(a)}else if(x.n(b,"*")){z=z.tv(c)
y=y.tv(c)
w=V.jL(J.pm(a),c)}else if(x.n(b,"/")){z=z.Rq(c)
y=y.Rq(c)
w=V.jL(J.pm(a),c)}else w=null
return new N.wK(z,y,w)},tJ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
y=a.ob()
x=a.EY(1)
w=a.EY(0)
v=a.B2(1)
u=a.B2(0)
if(v.bR()!==0&&x.bR()===0){z=new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
t="flip"
s="flip the equation"}else if(v.bR()!==0){r=v.Lx(-1)
q=J.Qc(y)
if(J.FW(r.Mc,r.v5)>0){p=C.xB.g(C.xB.g("",V.hG(r.O6())),y)
z=new V.eu(P.EF([q.g(y,"1"),r],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
s="add "+p+" to both sides"
t="+"}else{p=C.xB.g(C.xB.g("",V.hG(r.tv(new V.ov(-1,1)).O6())),y)
o=r.tv(new V.ov(-1,1))
z=new V.eu(P.EF([q.g(y,"1"),o],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
s="subtract "+p+" from both sides"
t="-"}}else if(w.bR()!==0){r=w.Lx(-1)
if(J.FW(r.Mc,r.v5)>0){z=new V.eu(P.EF(["0",r],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
s=C.xB.g("add ",V.hG(r.O6()))+" to both sides"
t="+"}else{z=new V.eu(P.EF(["0",r.tv(new V.ov(-1,1))],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
s=C.xB.g("subtract ",V.hG(r.tv(new V.ov(-1,1)).O6()))+" from both sides"
t="-"}}else if(x.Et(v).bR()===0)if(J.xC($.Cl.$1([J.pm(a),w.Et(u).bR(),0]),1)){t="yes"
s="All real numbers are solutions."}else{t="no"
s="There are no solutions."}else if(x.Et(v).bR()!==1){n=x.Et(v)
z=new V.eu(P.EF(["0",n],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
s=C.xB.g("divide both sides by ",n.Gr())
t="/"}else{s=C.xB.g(C.xB.g("The answer is ",y)+"=",u.Gr())
t="great"}return new N.uY(t,z,s)},wK:{"^":"fm;NM<,Hm<,pY>",qD:function(){return[this.pY,this.NM.te(),this.Hm.te()]},ob:function(){var z=this.NM.JE()
if(z!=null)return z
else return this.Hm.JE()},EY:function(a){return this.NM.PY(a)},B2:function(a){return this.Hm.PY(a)}},fm:{"^":"a;"},cz:{"^":"a;nD,pS,zr<,bd",br:function(a){var z,y,x,w
z=this.bd
y=this.nD
x=this.pS
w=this.zr
if(z!=null)return[y,x,w,z]
else return[y,x,w]}},B3:{"^":"a;pS,nD,NP<",DD:function(a,b){var z,y,x,w,v,u,t,s
z=b.te()
y=["color","blue",z]
x=J.x(a)
if(x.n(a,"flip"));else{w=J.pm(this.pS)
v=this.pS.gNM().te()
u=this.pS.gHm().te()
t=V.hG(z)
if(x.n(a,"+"))s=C.xB.g("Add ",t)+" to both sides"
else if(x.n(a,"-"))s=C.xB.g("Subtract ",t)+" from both sides"
else if(x.n(a,"*"))s=C.xB.g("Multiply both sides by ",t)
else s=x.n(a,"/")?C.xB.g("Divide both sides by ",t):""
this.nD.push(["step",[w,[a,v,y],[a,u,y]],s])}},aa:function(){var z,y,x
if(!this.pS.gNM().oD()){z=new V.eu(this.pS.gNM().gtX(),P.EF(["0",new V.ov(1,1)],null,null),0)
y=C.xB.g("Multiply both sides by ",V.hG(z.Ip(V.Bf())))
x=new N.wK(new V.eu(this.pS.gNM().gBl(),P.EF(["0",new V.ov(1,1)],null,null),0),this.pS.gHm().tv(z),V.jL(J.pm(this.pS),z))
this.pS=x
this.nD.push(["step",x.qD(),y])}if(!this.pS.gHm().oD()){z=new V.eu(this.pS.gHm().gtX(),P.EF(["0",new V.ov(1,1)],null,null),0)
y=C.xB.g("Multiply both sides by ",V.hG(z.Ip(V.Bf())))
x=new N.wK(this.pS.gNM().tv(z),new V.eu(this.pS.gHm().gBl(),P.EF(["0",new V.ov(1,1)],null,null),0),V.jL(J.pm(this.pS),z))
this.pS=x
this.nD.push(["step",x.qD(),y])}return this},ET:function(a,b){var z,y,x
this.DD(a,b)
this.pS=N.yT(this.pS,a,b)
z=J.xC(a,"flip")
y=this.pS
x=this.nD
if(z)x.push(["step",y.qD(),"Flip the equation"])
else x.push(["step",y.qD(),""])
return this},AG:function(){var z,y
z=[]
C.Nm.FV(z,this.pS.gNM().AG())
C.Nm.FV(z,this.pS.gHm().AG())
y=P.Ls(null,null,null,H.Kp(z,0))
y.FV(0,z)
return y.br(0)},JL:function(){var z,y,x,w,v,u
z=this.nD
z.push(["step","","Use cubic formula"])
y=N.p3(this.pS.gNM())
x=this.pS.ob()
w=[]
C.Nm.FV(w,y)
v=N.or(x,w,null)
z.push(["mmsg",v,""])
z.push(["ans",v,"answer"])
for(z=this.NP,u=0;u<y.length;++u)z.push(N.Gf(["=",["var",x],y[u]]))
return this},Bv:function(){var z,y,x,w,v,u
z=this.nD
z.push(["step","","Use quartic formula"])
y=N.du(this.pS.gNM())
x=this.pS.ob()
if(y.length===0){z.push(["msg","No real solutions.",""])
z.push(["ansmsg","No real solutions.",""])
return this}else{w=[]
C.Nm.FV(w,y)
v=N.or(x,w,6)
z.push(["mmsg",v,""])
z.push(["ans",v,"answer"])
for(z=this.NP,u=0;u<y.length;++u)z.push(N.Gf(["=",["var",x],y[u]]))
return this}},c6:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=E.zQ(this.pS.gNM())
y=[]
y.push("*")
C.Nm.FV(y,z)
x=this.nD
x.push(["step",V.KF(["=",V.vg(y),0]),"Factor left side of equation"])
w=[]
H.bQ(z,new N.IV())
for(v=0;v<z.length;++v){u=z[v]
if(u.Kg()===1)w.push(u)}for(t="",v=0;v<w.length;++v){if(v>0)t+="\\,\\,\\text' or '\\,\\,"
t=C.xB.g(t,J.WB(V.KF(w[v].te()),"= 0"))}x.push(["step",t,"Set factors equal to 0"])
s=w.length
if(0>=s)return H.e(w,0)
r=w[0]
if(1>=s)return H.e(w,1)
q=w[1]
if(J.xC(r,q)){p=r.JE()
o=r.av().tv(new V.ov(-1,1)).Rq(r.PY(1)).O6()
n=J.WB(J.WB(p," = "),V.KF(o))
x.push(["mmsg",n,""])
x.push(["ans",n,"answer"])
this.NP.push(N.Gf(["=",["var",p],o]))}else{m=r.JE()
l=q.JE()
k=r.av().tv(new V.ov(-1,1)).Rq(r.PY(1))
j=q.av().tv(new V.ov(-1,1)).Rq(q.PY(1))
i=k.O6()
h=j.O6()
g=J.WB(J.WB(m," = "),V.KF(i))
f=J.WB(J.WB(l," = "),V.KF(h))
s=J.Qc(g)
x.push(["mmsg",J.WB(s.g(g,"\\,\\,\\text' or '\\,\\,"),f),""])
if(k.bR()===j.bR())x.push(["ans",g,"answer"])
else x.push(["ans",J.WB(s.g(g,"\\,\\,\\text' or '\\,\\,"),f),"answer"])
x=this.NP
x.push(N.Gf(["=",["var",m],i]))
x.push(N.Gf(["=",["var",l],h]))}return this},mN:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=E.zQ(this.pS.gNM())
y=[]
y.push("*")
C.Nm.FV(y,z)
x=this.nD
x.push(["step",V.KF(["=",V.vg(y),0]),"Factor left side of equation"])
w=[]
for(v=0;v<z.length;++v){u=z[v]
if(u.Kg()>0)w.push(u)}for(t="",v=0;v<w.length;++v){if(v>0)t+="\\,\\,\\text' or '\\,\\,"
t=C.xB.g(t,J.WB(V.KF(w[v].te()),"= 0"))}x.push(["step",t,"Set factors equal to 0"])
s=[]
for(r=this.NP,q="",v=0;v<w.length;++v){if(v>=z.length)return H.e(z,v)
u=z[v]
if(u.Kg()===1){p=u.av().tv(new V.ov(-1,1)).Rq(u.PY(1)).O6()
o=V.KF(p)
if(s.length>0)q+="\\,\\,\\text' or '\\,\\,"
q=C.xB.g(q,J.WB(J.WB(u.JE()," = "),o))
s.push(o)
r.push(N.Gf(["=",["var",u.JE()],p]))}else if(u.Kg()===2){n=u.PY(2).bR()
m=u.PY(1).bR()
l=u.PY(0).bR()
u.JE()
p=[]
k=m*m-4*n*l
if(k===0)p.push(-1*m/(2*n))
else if(k<0)p=[]
else{j=-1*m
i=Math.pow(k,0.5)
h=2*n
g=Math.pow(k,0.5)
p.push((j+i)/h)
p.push((j-g)/h)}for(f=0;f<p.length;++f){e=p[f]
if(s.length>0)q+="\\,\\,\\text' or '\\,\\,"
q=C.xB.g(q,J.WB(J.WB(u.JE()," = "),C.CD.bu(e)))
s.push(C.CD.gAY(e))
r.push(N.Gf(["=",["var",u.JE()],e]))}}else if(u.Kg()===3){d=N.p3(u)
for(f=0;f<d.length;++f){p=d[f]
if(s.length>0)q+="\\,\\,\\text' or '\\,\\,"
q=C.xB.g(q,J.WB(J.WB(u.JE()," = "),J.AG(F.T5(p))))
s.push(C.CD.gAY(p))
r.push(N.Gf(["=",["var",u.JE()],p]))}}else if(u.Kg()===4){d=N.du(u)
for(f=0;f<d.length;++f){p=d[f]
if(s.length>0)q+="\\,\\,\\text' or '\\,\\,"
q=C.xB.g(q,J.WB(J.WB(u.JE()," = "),J.AG(F.T5(p))))
s.push(J.m2(p))
r.push(N.Gf(["=",["var",u.JE()],p]))}}else if(u.Kg()>4){if(s.length>0)q+="\\,\\,\\text' or '\\,\\,"
q=C.xB.g(q,J.WB(J.WB(u.JE()," = "),C.jn.bu(0)))
s.push(C.jn.gAY(0))
r.push(N.Gf(["=",["var",u.JE()],0]))}}x.push(["mmsg",q,""])
x.push(["ans",q,"answer"])
return this},kV:function(a){var z,y,x
if(!N.D5(a)){z=J.xC(J.pm(this.pS),"=")
y=this.pS
x=this.nD
if(z)x.push(["step",y.qD(),"Simplify both sides of the equation"])
else x.push(["step",y.qD(),"Simplify both sides of the inequality"])}return this},Rz:function(){var z,y,x,w
for(z=0;z<36;++z){y=N.tJ(this.pS)
x=y.Qi
w=x==="yes"
if(w||x==="no"){this.nD.push(["ansmsg",y.rs,""])
if(w)this.NP.push(N.Gf(["=",0,0]))
break}else if(x==="great"){this.nD.push(["ans",this.pS.qD(),"answer"])
this.NP.push(this.pS)
break}this.ET(x,y.Mf)}return this},CM:function(a){var z=this.pS.gNM().PY(a)
if(z.bR()>0)this.ET("-",N.qL(z,this.pS.ob(),a))
else if(z.bR()<0)this.ET("+",N.qL(z.tv(new V.ov(-1,1)),this.pS.ob(),a))
return this},rD:function(a){var z=this.pS.gHm().PY(a)
if(z.bR()>0)this.ET("-",N.qL(z,this.pS.ob(),a))
else if(z.bR()<0)this.ET("+",N.qL(z.tv(new V.ov(-1,1)),this.pS.ob(),a))
return this},yd:function(){if(this.pS.gHm().Kg()>0||this.pS.gHm().av().bR()!==0)this.ET("-",this.pS.gHm())
return this},mD:function(a){if(this.pS.gNM().PY(a).bR()!==1)this.ET("/",new V.eu(P.EF(["0",this.pS.gNM().PY(a)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
return this},En:function(){var z,y,x,w
z=this.pS.gNM().Et(this.pS.gHm())
if(z.Kg()>10)return this.Ak()
else if(z.Kg()<=3){if(this.pS.gNM().Kg()>3)this.yd()
return this.yf()}else if(z.Kg()<=4){if(this.pS.gNM().Kg()>4)this.yd()
return this.DC()}else if(N.Uo(z))this.U3()
else{this.yd()
y=E.Sc(this.pS.gNM())
x=y.length
w=H.VM(new H.U5(y,new N.JA()),[null])
if(w.gB(w)===x)return this.mN()
else return this.Ak()}},U3:function(){var z,y,x,w,v,u,t,s,r,q
z=this.pS.gNM().Et(this.pS.gHm())
if(this.pS.gHm().Kg()>0)this.yd()
if(C.CD.Y(z.Kg(),2)===0){this.CM(0)
y=this.pS.gNM().Kg()
this.mD(y)
x=this.pS.gHm().PY(0)
w=this.pS.ob()
v=this.nD
v.push(["step",C.xB.g("",w)+(" = \u00b1("+H.d(J.AG(x))+")^(1/")+C.CD.bu(y)+")","Take root"])
if(x.bR()===0){u=["=",["var",w],0]
v.push(["mmsg",V.KF(u),""])
v.push(["ans",V.KF(u),"answer"])
this.NP.push(N.Gf(u))}else if(x.bR()<0)v.push(["ansmsg","No real solutions.",""])
else{t=x.bR()
s=1/y
r=F.T5(Math.pow(t,s))
t=x.bR()
q=F.T5(-1*Math.pow(t,s))
t=J.x(r)
s=J.x(q)
v.push(["mmsg",C.xB.g(C.xB.g(C.xB.g("",w)+" = ",t.bu(r))+",",s.bu(q)),""])
v.push(["ans",C.xB.g(C.xB.g(C.xB.g("",w)+" = ",t.bu(r))+",",s.bu(q)),"answer"])
s=this.NP
s.push(N.Gf(["=",["var",w],r]))
s.push(N.Gf(["=",["var",w],q]))}return this}else{this.CM(0)
y=this.pS.gNM().Kg()
this.mD(y)
x=this.pS.gHm().PY(0)
w=this.pS.ob()
v=this.nD
v.push(["step",C.xB.g("",w)+(" = ("+H.d(J.AG(x))+")^(1/")+C.CD.bu(y)+")","Take root"])
if(x.bR()===0){u=["=",["var",w],0]
v.push(["mmsg",V.KF(u),""])
v.push(["ans",V.KF(u),"answer"])
this.NP.push(N.Gf(["=",["var",w],0]))}else{t=1/y
if(x.bR()<0){s=Math.abs(x.bR())
r=F.T5(-1*Math.pow(s,t))
t=J.x(r)
v.push(["mmsg",C.xB.g(C.xB.g("",w)+" = ",t.bu(r)),""])
v.push(["ans",C.xB.g(C.xB.g("",w)+" = ",t.bu(r)),"answer"])
this.NP.push(N.Gf(["=",["var",w],r]))}else{s=x.bR()
r=F.T5(Math.pow(s,t))
t=J.x(r)
v.push(["mmsg",C.xB.g(C.xB.g("",w)+" = ",t.bu(r)),""])
v.push(["ans",C.xB.g(C.xB.g("",w)+" = ",t.bu(r)),"answer"])
this.NP.push(N.Gf(["=",["var",w],r]))}}return this}},DC:function(){var z,y
z=this.pS.gNM().Et(this.pS.gHm())
if(z.Kg()>4)return this.Ak()
else if(z.Kg()<4){this.rD(4)
return this.yf()}else if(N.Uo(z))return this.U3()
else{this.yd()
y=H.VM(new H.U5(E.zQ(this.pS.gNM()),new N.Rl()),[null])
if(y.gB(y)>1)return this.mN()
else return this.Bv()}},yf:function(){var z,y,x,w,v,u,t,s
z=this.pS.gNM().Et(this.pS.gHm())
if(z.Kg()>3)return this.Ak()
else if(z.Kg()<3){this.rD(3)
return this.KC()}else if(z.PY(2).bR()===0&&z.PY(1).bR()===0){this.rD(3)
this.rD(2)
this.rD(1)
this.CM(0)
this.mD(3)
y=this.pS.gHm().PY(0)
x=this.pS.ob()
w=this.nD
w.push(["step",C.xB.g("",x)+(" = ("+H.d(J.AG(y))+")^(1/3)"),"Take cube root"])
if(y.bR()===0){v=["=",["var",x],0]
w.push(["mmsg",V.KF(v),""])
w.push(["ans",V.KF(v),"answer"])
this.NP.push(N.Gf(["=",["var",x],0]))}else if(y.bR()<0){u=Math.abs(y.bR())
t=-1*Math.pow(u,0.3333333333333333)
s=F.lq(t,null)
w.push(["mmsg",C.xB.g("",x)+" = "+s,""])
w.push(["ans",C.xB.g("",x)+" = "+s,"answer"])
this.NP.push(N.Gf(["=",["var",x],t]))}else{u=y.bR()
t=Math.pow(u,0.3333333333333333)
s=F.lq(t,null)
w.push(["mmsg",C.xB.g("",x)+" = "+s,""])
w.push(["ans",C.xB.g("",x)+" = "+s,"answer"])
this.NP.push(N.Gf(["=",["var",x],t]))}return this}else{this.yd()
w=H.VM(new H.U5(E.zQ(this.pS.gNM()),new N.mw()),[null])
if(w.gB(w)>0)return this.mN()
else return this.JL()}},KC:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.pS.gNM().Et(this.pS.gHm())
if(z.Kg()<2){this.rD(2)
return this.Rz()}else if(z.PY(1).bR()===0){this.rD(2)
this.rD(1)
this.CM(0)
this.mD(2)
y=this.pS.gHm().PY(0)
x=this.pS.ob()
w=this.nD
w.push(["step",C.xB.g("",x)+(" = \u00b1sqrt{("+H.d(J.AG(y))+")}"),"Take square root"])
if(y.bR()===0){v=["=",["var",x],0]
w.push(["mmsg",V.KF(v),""])
w.push(["ans",V.KF(v),"answer"])
this.NP.push(N.Gf(v))}else if(y.bR()<0)w.push(["ansmsg","No real solutions.",""])
else{u=y.bR()
t=F.T5(Math.pow(u,0.5))
u=y.bR()
s=F.T5(-1*Math.pow(u,0.5))
u=J.x(t)
r=J.x(s)
w.push(["mmsg",C.xB.g(C.xB.g(C.xB.g("",x)+" = ",u.bu(t))+",",r.bu(s)),""])
w.push(["ans",C.xB.g(C.xB.g(C.xB.g("",x)+" = ",u.bu(t))+",",r.bu(s)),"answer"])
r=this.NP
r.push(N.Gf(["=",["var",x],t]))
r.push(N.Gf(["=",["var",x],s]))}return this}else{this.yd()
w=H.VM(new H.U5(E.zQ(this.pS.gNM()),new N.QI()),[null])
if(w.gB(w)===2)return this.c6()
else{q=this.pS.gNM().PY(2).bR()
p=this.pS.gNM().PY(1).bR()
o=this.pS.gNM().PY(0).bR()
x=this.pS.ob()
n=p*p-4*q*o
w=this.nD
w.push(["step",C.xB.g("",x)+" = {-b\u00b1sqrt{(b^{2}-4ac)}}/{2a}","Use quadratic formula with a="+H.d(q)+", b="+H.d(p)+", c="+H.d(o)])
w.push(["mmsg",C.xB.g("",x)+(" = {-("+H.d(p)+")\u00b1sqrt{(("+H.d(p)+")^{2}-4("+H.d(q)+")("+H.d(o)+"))}}/{2("+H.d(q)+")}"),""])
u=-1*p
r=2*q
w.push(["mmsg",C.xB.g("",x)+(" = {"+H.d(u)+"\u00b1sqrt{("+H.d(F.T5(n))+")}}/{"+H.d(r)+"}"),""])
if(n===0){t=u/r
v=["=",["var",x],t]
w.push(["mmsg",V.KF(v),""])
w.push(["ans",V.KF(v),"answer"])
this.NP.push(N.Gf(["=",["var",x],t]))}else if(n<0)w.push(["ansmsg","No real solutions.",""])
else{t=(u+Math.pow(n,0.5))/r
s=(u-Math.pow(n,0.5))/r
w.push(["mmsg",C.xB.g("",x)+" = "+C.CD.bu(t)+","+C.CD.bu(s),""])
w.push(["ans",C.xB.g("",x)+" = "+C.CD.bu(t)+","+C.CD.bu(s),"answer"])
w=this.NP
w.push(N.Gf(["=",["var",x],t]))
w.push(N.Gf(["=",["var",x],s]))}return this}}},Ql:function(a){var z,y,x,w,v,u,t,s,r
J.pm(this.pS)
z=this.pS.gNM()
y=this.pS.gHm()
x=z.UO(a,1)
w=y.UO(a,1)
if(w.bR()!==0){v=["*",w.tv(new V.ov(-1,1)).O6(),["var",a]]
this.ET("+",K.Ye(v).BC())}else v=null
z=this.pS.gNM()
u=J.WB(a,"1")
for(t=z.gBl().gvc().Fb,s=new P.N6(t,t.zN,null,null),s.zq=t.H9;s.G();){r=s.fD
if(!J.xC(r,u)){v=V.E0(z.gBl().t(0,r).tv(new V.ov(-1,1)),r,V.Bf())
if(v!=null)this.ET("+",K.Ye(v).BC())}}if(x.Et(w).bR()===0){t=this.nD
if(J.xC(this.pS.gHm().te(),0))t.push(["ansmsg","All real numbers are solutions.",""])
else t.push(["ansmsg","No solutions.",""])}else if(x.Et(w).bR()!==1)this.ET("/",new V.eu(P.EF(["0",x.Et(w)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
return this},Ak:function(){var z=this.nD
if(J.xC(J.pm(this.pS),"="))z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this equation.</font>",""])
else z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this inequality.</font>",""])
z.push(["msg","<font color=\"red\" style=\"line-height:30px\">If you need help with this problem, please click the button (with the \"?\") on the bottom right, and let me know. I'll get back to you.</font>",""])
return this},jN:function(a){var z,y,x,w
z=[]
for(y=this.pS.gNM().gBl().gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
if(J.xZ(V.Fi(w,a),0)&&this.pS.gNM().gBl().t(0,w).bR()!==0)z.push(V.Fi(w,a))}for(y=this.pS.gHm().gBl().gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
if(J.xZ(V.Fi(w,a),0)&&this.pS.gHm().gBl().t(0,w).bR()!==0)z.push(V.Fi(w,a))}y=P.Ls(null,null,null,H.Kp(z,0))
y.FV(0,z)
z=y.br(0)
y=z.length
if(y!==1)return-1
else{if(0>=y)return H.e(z,0)
return z[0]}},fB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
if(!this.pS.gNM().oD()){z=new V.eu(this.pS.gNM().gtX(),P.EF(["0",new V.ov(1,1)],null,null),0)
y=C.xB.g("Multiply both sides by ",V.hG(z.Ip(V.Bf())))
x=new N.wK(new V.eu(this.pS.gNM().gBl(),P.EF(["0",new V.ov(1,1)],null,null),0),this.pS.gHm().tv(z).dD(),V.jL(J.pm(this.pS),z))
this.pS=x
this.nD.push(["step",x.qD(),y])}if(!this.pS.gHm().oD()){z=new V.eu(this.pS.gHm().gtX(),P.EF(["0",new V.ov(1,1)],null,null),0)
y=C.xB.g("Multiply both sides by ",V.hG(z.Ip(V.Bf())))
x=new N.wK(this.pS.gNM().tv(z),new V.eu(this.pS.gHm().gBl(),P.EF(["0",new V.ov(1,1)],null,null),0),V.jL(J.pm(this.pS),z))
this.pS=x
this.nD.push(["step",x.qD(),y])}w=this.jN(a)
x=J.x(w)
if(x.n(w,-1)){this.Ak()
return this}if(x.n(w,1))v=["var",a]
else if(x.n(w,2)&&J.xC(J.pm(this.pS),"="))v=["^",["var",a],w]
else{this.Ak()
return this}for(u=this.pS.gNM().gBl().gvc().Fb,t=new P.N6(u,u.zN,null,null),t.zq=u.H9,s=!1;t.G();){r=t.fD
if(J.xZ(V.Fi(r,a),0)&&this.pS.gNM().gBl().t(0,r).bR()!==0)s=!0}for(u=this.pS.gHm().gBl().gvc().Fb,t=new P.N6(u,u.zN,null,null),t.zq=u.H9,q=!1;t.G();){r=t.fD
if(J.xZ(V.Fi(r,a),0)&&this.pS.gHm().gBl().t(0,r).bR()!==0)q=!0}if(q&&!s)this.ET("flip",new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
for(u=this.pS.gHm().gBl().gvc().Fb,t=new P.N6(u,u.zN,null,null),t.zq=u.H9;t.G();){r=t.fD
if(J.J5(V.Fi(r,a),1)&&this.pS.gHm().gBl().t(0,r).bR()!==0){p=V.E0(this.pS.gHm().gBl().t(0,r).tv(new V.ov(-1,1)),r,V.Bf())
if(p!=null)this.ET("+",K.Ye(p).BC())}}for(u=this.pS.gNM().gBl().gvc().Fb,t=new P.N6(u,u.zN,null,null),t.zq=u.H9;t.G();){r=t.fD
if(J.xC(V.Fi(r,a),0)&&this.pS.gNM().gBl().t(0,r).bR()!==0){p=V.E0(this.pS.gNM().gBl().t(0,r).tv(new V.ov(-1,1)),r,V.Bf())
if(p!=null)this.ET("+",K.Ye(p).BC())}}o=this.pS.gNM().Et(K.Ye(v).BC())
if(o.r7()){o.av().bR()
u=!1}else u=!0
if(u){n=new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
for(u=this.pS.gNM().gBl().gvc().Fb,t=new P.N6(u,u.zN,null,null),t.zq=u.H9,m=0;t.G();){r=t.fD
if(J.xC(V.Fi(r,a),w)&&this.pS.gNM().gBl().t(0,r).bR()!==0){p=V.E0(this.pS.gNM().gBl().t(0,r),r,V.Bf())
if(p!=null){l=K.Ye(p).BC().Rq(K.Ye(v).BC()).BC().tH()
n=n.h(0,l.fo()?l.j4():l);++m}}}u=m>1
if(u&&!J.xC(J.pm(this.pS),"=")){this.Ak()
return this}if(u){u=this.nD
u.push(["step",["=",["*",v,n.Ip(V.Bf())],this.pS.gHm().te()],C.xB.g("Factor out variable ",a)])
u.push(["step",["=",["/",["*",v,n.Ip(V.Bf())],n.Ip(V.Bf())],["/",this.pS.gHm().te(),n.Ip(V.Bf())]],C.xB.g("Divide both sides by ",V.hG(n.Ip(V.Bf())))])
u.push(["step",["=",v,this.pS.gHm().Rq(n).BC().dD().Ip(V.Bf())],""])
this.pS=new N.wK(K.Ye(v).BC(),this.pS.gHm().Rq(n),"=")}else{this.DD("/",n)
k=K.Ye(v).BC()
u=V.M4(n.Bl)
t=this.pS
j=u===0?t.gHm().Rq(n):t.gHm().Rq(n).BC().dD()
u=new N.wK(k,j,V.jL(J.pm(this.pS),n))
this.pS=u
this.nD.push(["step",u.qD(),""])}}x=x.n(w,2)
u=this.pS
t=this.nD
if(x){i=J.WB(J.WB(V.KF(["=",["var",a],["sqrt",u.gHm().te()]]),"\\,\\,\\text' or '\\,\\,"),V.KF(["=",["var",a],["-",["sqrt",this.pS.gHm().te()]]]))
t.push(["step",i,"Take square root"])
t.push(["ans",i,"answer"])}else t.push(["ans",u.qD(),"answer"])
return this},static:{p3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=a.PY(3)
y=a.PY(2).Rq(z).bR()
x=a.PY(1).Rq(z).bR()
w=a.PY(0).Rq(z).bR()
a.JE()
v=(3*x-y*y)/3
u=(2*y*y*y-9*y*x+27*w)/27
if(Math.abs(v)<1e-7)if(u<0)return[Math.pow(-1*u,0.3333333333333333)-y/3]
else return[-1*Math.pow(u,0.3333333333333333)-y/3]
if(Math.abs(u)<1e-7){t=-1*y
if(v<0){s=t/3
t=-1*v
r=Math.pow(t,0.5)
return[s,s+r,s-Math.pow(t,0.5)]}else return[t/3]}q=u*u/4+v*v*v/27
if(Math.abs(q)<1e-7)if(u<0){t=-1*u/2
r=Math.pow(t,0.3333333333333333)
p=y/3
return[2*r-p,-1*Math.pow(t,0.3333333333333333)-p]}else{t=u/2
r=Math.pow(t,0.3333333333333333)
p=y/3
return[-2*r-p,Math.pow(t,0.3333333333333333)-p]}else if(q>0){o=-1*u/2+Math.pow(q,0.5)
n=u/2+Math.pow(q,0.5)
if(o<0)m=-1*Math.pow(-1*o,0.3333333333333333)
else m=Math.pow(o,0.3333333333333333)
if(n<0)l=-1*Math.pow(-1*n,0.3333333333333333)
else l=Math.pow(n,0.3333333333333333)
return[m-l-y/3]}else{k=Math.pow(-1*v/3,1.5)
j=Math.acos(-1*u/(2*k))
t=Math.pow(k,0.3333333333333333)
r=Math.cos(j/3)
p=y/3
i=Math.pow(k,0.3333333333333333)
h=Math.cos((j+6.283185307179586)/3)
g=Math.pow(k,0.3333333333333333)
return[2*t*r-p,2*i*h-p,2*g*Math.cos((j+12.566370614359172)/3)-p]}},du:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=a.PY(4).bR()
y=a.PY(3).bR()/z
x=a.PY(2).bR()/z
w=a.PY(1).bR()/z
v=3*y*y
u=x/1-v/8
t=y*y
s=w/1-y*x/2+t*y/8
r=a.PY(0).bR()/z/1-y*w/4+t*x/16-v*y*y/256
q=N.p3(V.YY([8,-4*u,-8*r,4*u*r-s*s],a.JE()))
v=q.length
if(0>=v)return H.e(q,0)
p=q[0]
for(o=0;o<v;++o){p=q[o]
if(p!==0)break}v=-2*p-u
t=2*s
n=2*p-u
m=v+t/Math.sqrt(n)
l=v-t/Math.sqrt(n)
if(p===0&&Math.abs(n)<1e-7){v=-1*r
t=Math.sqrt(v)
n=y/4
k=-0.5*Math.sqrt(4*t)-n
v=Math.sqrt(v)
j=0.5*Math.sqrt(4*v)-n
i=0/0
h=0/0}else if(Math.abs(m)<1e-7&&Math.abs(l)<1e-7&&Math.abs(n)<1e-7){k=-1*y/4
i=0/0
j=0/0
h=0/0}else{if(Math.abs(m)<1e-7){k=-0.5*Math.sqrt(n)-y/4
i=0/0}else{g=Math.sqrt(n)
f=Math.sqrt(n)
e=y/4
k=-0.5*g+0.5*Math.sqrt(v+t/f)-e
g=Math.sqrt(n)
f=Math.sqrt(n)
i=-0.5*g-0.5*Math.sqrt(v+t/f)-e}if(Math.abs(l)<1e-7){j=0.5*Math.sqrt(n)-y/4
h=0/0}else{g=Math.sqrt(n)
f=Math.sqrt(n)
e=y/4
j=0.5*g+0.5*Math.sqrt(v-t/f)-e
g=Math.sqrt(n)
n=Math.sqrt(n)
h=0.5*g-0.5*Math.sqrt(v-t/n)-e}}v=new H.U5([k,i,j,h],new N.MF())
v.$builtinTypeInfo=[null]
return P.F(v,!0,H.ip(v,"mW",0))}}},MF:{"^":"Tp:84;",$1:function(a){return J.Qd(a)},$isPe:true},IV:{"^":"Tp:10;",$1:function(a){return a.Kg()===1},$isPe:true},JA:{"^":"Tp:10;",$1:function(a){var z
if(!(a.Kg()<=4))z=a.Kg()===4&&N.Uo(a)
else z=!0
return z},$isPe:true},Rl:{"^":"Tp:10;",$1:function(a){return a.Kg()>0},$isPe:true},mw:{"^":"Tp:10;",$1:function(a){return a.Kg()===1},$isPe:true},QI:{"^":"Tp:10;",$1:function(a){return a.Kg()===1},$isPe:true},uY:{"^":"a;Qi<,Mf,rs"}}],["factor","Algebra/web/factor.dart",,E,{"^":"",zQ:function(a){var z,y
z=[]
if(a.cP()){y=a.rX()
a=a.Uz()
z.push(y)}if(a.Kg()>=3&&a.Kg()<=10)C.Nm.FV(z,E.Qk(a))
else if(a.Kg()===2)C.Nm.FV(z,E.qo(a))
else if(a.Kg()===1)C.Nm.FV(z,E.eW(a))
else z.push(a)
return z},Sc:function(a){var z,y,x,w
z=[]
if(J.xZ(a.NV(),1)&&a.Kg()>0){y=new V.eu(P.EF(["0",new V.ov(a.NV(),1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
a=a.Rq(y)
z.push(y)}x=a.DQ()
if(x.gvc().Fb.X5>0&&a.Kg()>1){w=V.ms(x)
a=a.fi(x)
C.Nm.FV(z,w)
if(V.M4(a.Bl)===0&&a.av().bR()===1)return z}if(a.Kg()>=3&&a.Kg()<=10)C.Nm.FV(z,E.Qk(a))
else if(a.Kg()===2)C.Nm.FV(z,E.qo(a))
else if(a.Kg()===1)C.Nm.FV(z,E.eW(a))
else z.push(a)
return z},qo:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.PY(2).bR()
y=a.PY(1).bR()
x=a.PY(0).bR()
w=a.WW()
v=$.qr.$1([z,y,x])
u=[]
t=J.Wx(v)
if(t.D(v,1)){if(z<0)v=t.U(v,-1)
if(typeof v!=="number")return H.s(v)
z/=v
y/=v
x/=v
s=V.YY([z,y,x],w)
u.push(new V.eu(P.EF(["0",new V.ov(v,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))}else s=a
r=E.Uz(Math.abs(z))
q=E.Uz(Math.abs(x))
if(z>=0)for(p=0;t=r.length,p<t;++p){o=r[p]
n=t-1-p
if(n<0)return H.e(r,n)
m=r[n]
if(o>m)break
l=E.zZ(z,y,x,m,o,q,w)
if(l.length>1){C.Nm.FV(u,l)
return u}}else for(p=0;t=r.length,p<t;++p){o=r[p]
n=t-1-p
if(n<0)return H.e(r,n)
l=E.zZ(z,y,x,-r[n],o,q,w)
if(l.length>1){C.Nm.FV(u,l)
return u}}u.push(s)
return u},eW:function(a){var z,y,x,w,v,u,t
z=a.PY(1).bR()
y=a.PY(0).bR()
x=a.WW()
w=$.qr.$1([z,y])
v=[]
u=J.Wx(w)
if(u.D(w,1)){if(z<0)w=u.U(w,-1)
if(typeof w!=="number")return H.s(w)
t=V.YY([z/w,y/w],x)
v.push(new V.eu(P.EF(["0",new V.ov(w,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))}else t=a
v.push(t)
return v},Qk:function(a){var z,y,x,w,v,u
z=E.ce(a)
y=a.WW()
x=$.qr.$1(z)
w=[]
v=J.Wx(x)
if(v.D(x,1)){if(0>=z.length)return H.e(z,0)
if(J.u6(z[0],0))x=v.U(x,-1)
for(u=0;u<z.length;++u){v=J.FW(z[u],x)
if(u>=z.length)return H.e(z,u)
z[u]=v}V.YY(z,y)
w.push(new V.eu(P.EF(["0",new V.ov(x,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))}C.Nm.FV(w,E.rm(z,y))
return w},XY:function(a,b){var z,y,x,w,v,u,t,s
z=E.ce(a)
y=[]
for(x=b-1,w=0;v=z.length,u=v-1,w<u;++w){y.push(z[w])
for(t=0;t<x;++t)y.push(0)}if(u<0)return H.e(z,u)
y.push(z[u])
s=a.JE()
return V.YY(y,s==null?"x":s)},jK:function(a,b){var z,y
z=[]
for(y=0;y<a.length;++y)z.push(E.XY(a[y],b))
return z},rm:function(a,b){var z,y,x,w,v,u
z=a.length
if(z===5){if(1>=z)return H.e(a,1)
if(J.xC(a[1],0)){if(3>=a.length)return H.e(a,3)
z=J.xC(a[3],0)}else z=!1}else z=!1
if(z){z=a.length
if(0>=z)return H.e(a,0)
y=a[0]
if(2>=z)return H.e(a,2)
x=a[2]
if(4>=z)return H.e(a,4)
w=E.jK(E.Ni([y,x,a[4]],b),2)
v=[]
for(u=0;u<w.length;++u)C.Nm.FV(v,E.Ni(E.ce(w[u]),b))
return v}else return E.Ni(a,b)},Ni:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=V.YY(a,b)
y=[]
if(0>=a.length)return H.e(a,0)
x=E.Uz(J.yH(a[0]))
w=a.length
v=w-1
if(v<0)return H.e(a,v)
u=E.Uz(J.yH(a[v]))
for(t=0;t<u.length;++t){s=u[t]
r=[-1*s,s]
for(q=0;q<2;++q){p=r[q]
for(w=-1*p,o=0;o<x.length;++o){n=x[o]
for(v=-1*n,m=p/n,l=0;l<a.length;++l)if(J.xC(F.T5($.Cl.$1(Q.Fd(z.Ip(V.Bf()),m,b))),0)){k=z.PY(V.M4(z.Bl)).bR()>0?V.YY([n,w],b):V.YY([v,p],b)
y.push(k)
z=E.rQ(z,k)}else break}}}if(V.M4(z.Bl)>0||z.av().bR()!==1)y.push(z)
return y},Uz:function(a){var z,y,x
z=[]
y=new E.uc(z)
for(x=1;x*x<=a;++x)if(C.CD.Y(a,x)===0){y.$1(x)
y.$1(a/x)}return E.v2(z)},v2:function(a){H.rd(a,new E.Ln())
return a},v9:function(a,b,c,d,e,f){if(a*d+c*b===e)return[V.YY([a,b],f),V.YY([c,d],f)]
else return[]},zZ:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
z=[]
if(c>=0)for(y=d===e,x=0;w=f.length,x<w;++x){v=f[x]
u=w-1-x
if(u<0)return H.e(f,u)
t=f[u]
if(y&&v>t)break
z=E.v9(d,v,e,t,b,g)
if(z.length>1)return z
z=E.v9(d,-v,e,-t,b,g)
if(z.length>1)return z}else for(x=0;y=f.length,x<y;++x){v=f[x]
w=y-1-x
if(w<0)return H.e(f,w)
t=f[w]
z=E.v9(d,v,e,-t,b,g)
if(z.length>1)return z
z=E.v9(d,-v,e,t,b,g)
if(z.length>1)return z}return z},rQ:function(a,b){var z,y,x,w,v,u,t,s,r
z=E.ce(a)
y=a.JE()
if(y==null)y="x"
x=b.PY(1).bR()
w=b.PY(0).bR()
v=[]
for(u=0;u<z.length-1;){t=J.FW(z[u],x)
v.push(t)
if(u>=z.length)return H.e(z,u)
s=J.xH(z[u],t*x)
r=z.length
if(u>=r)return H.e(z,u)
z[u]=s;++u
if(u>=r)return H.e(z,u)
r=J.xH(z[u],t*w)
if(u>=z.length)return H.e(z,u)
z[u]=r}return V.YY(v,y)},ce:function(a){var z,y,x
z=a.Kg()
y=[]
for(x=z;x>=0;--x)y.push(a.PY(x).bR())
return y},uc:{"^":"Tp:10;a",$1:function(a){var z=this.a
if(!C.Nm.tg(z,a))z.push(a)},$isPe:true},Ln:{"^":"Tp:76;",$2:function(a,b){return J.xH(a,b)},$isPe:true}}],["geneqscratch","Algebra/web/geneqscratch.dart",,O,{"^":"",bT:function(a){var z,y,x,w,v,u
z=J.iN(a)
y=z.t(a,0)
x=N.Ux(z.t(a,1))
w=F.D2(x,N.Ux(z.t(a,2)))
z=x.gMa()
v=w.oM
P.Fl(null,null)
u=w.Ma
P.Fl(null,null)
return new O.Zw(new O.xe(new F.GC(z,v),new F.GC(u,v),y),[],[])},TT:function(a,b,c){var z,y,x,w,v,u,t
z=O.fX(b)
y=z.zr
x=z.NP
w=z.bd
v=[]
if(a.pS.NM.oM.gvc().Fb.X5>0){u=a.pS.NM.oM.t(0,"#").gKw()
if(0>=u.length)return H.e(u,0)
t=!u[0].oD()}else t=!1
if(J.xC(a.pS.pY,"="))u=a.pS.Hm.Ma.Kg()>0||t
else u=!1
if(u){J.hv(y,["msgstr","<hr>"])
O.ly(y,x,v,c,"Check answers. (Plug them in to make sure they work.)")}else C.Nm.FV(v,x)
return new O.Tu(y,v,w,null,null,null,null)},fX:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[]
y=[]
if(0>=a.length)return H.e(a,0)
x=a[0]
w=O.ax(x)
if(2>=a.length)return H.e(a,2)
v=K.Ye(a[2]).BC()
if(V.M4(v.Bl)===0){u=v.av().bR()
if(u<0){t=J.x(x)
t=t.n(x,"=")||t.n(x,"<=")||t.n(x,"<")}else t=!1
if(t){z.push(["msgstr","No solutions. (Absolute value cannot be less than 0.)"])
return new O.Tu(z,y,null,null,null,null,null)}s=!(u===0&&J.xC(x,"="))}else s=!0
if(1>=a.length)return H.e(a,1)
t=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
r=[x,t,a[2]]
q=V.jL(x,new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
if(1>=a.length)return H.e(a,1)
t=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
p=[q,t,["-",a[2]]]
o=V.KF(r)
n=V.KF(p)
if(s)if(w==="and")z.push(["MDiv",C.xB.g(C.xB.g("\\text'We know '\\,\\,",o)+"\\,\\,\\text' and '\\,\\,",n)])
else z.push(["MDiv",C.xB.g(C.xB.g("\\text'We know either '\\,\\,",o)+"\\,\\,\\text' or '\\,\\,",n)])
else z.push(["MDiv",C.xB.g("\\text'We know '\\,\\,",o)])
z.push(["msgstr","<hr>"])
t=w==="and"
if(t)z.push(["MDiva",o,"(Condition 1)"])
else z.push(["MDiva",o,"(Possibility 1)"])
m=O.hC(r)
C.Nm.FV(z,m.zr)
l=m.Ay.qD()
k=m.rR
j=m.uR
C.Nm.FV(y,m.NP)
if(s){z.push(["msgstr","<hr>"])
if(t)z.push(["MDiva",n,"(Condition 2)"])
else z.push(["MDiva",n,"(Possibility 2)"])
i=O.hC(p)
C.Nm.FV(z,i.zr)
h=i.Ay.qD()
C.Nm.FV(y,i.NP)}else h=null
return new O.Tu(z,y,[l,h,w],k,j,null,null)},ZX:[function(a){var z=O.GL(a)
z.En()
return O.xa(z)},"$1","c0",2,0,53,35],ZN:function(a){var z,y,x,w,v
z=O.GL(a)
y=!z.pS.gNM().oD()?V.mx(z.pS.gNM().gtX(),V.Bf()):null
x=!z.pS.gHm().oD()?V.mx(z.pS.gHm().gtX(),V.Bf()):null
w=P.Fl(null,null)
v=y==null
if(!v||x!=null){if(!v)w.u(0,"ldanslist",O.ZX(["=",y,0]).NP)
if(x!=null)w.u(0,"rdanslist",O.ZX(["=",x,0]).NP)}return w},hC:[function(a){var z,y,x
z=O.GL(a)
z.aa()
z.En()
y=O.xa(z)
x=O.ZN(a)
if(x.t(0,"ldanslist")!=null)y.rR=x.t(0,"ldanslist")
if(x.t(0,"rdanslist")!=null)y.uR=x.t(0,"rdanslist")
return y},"$1","yb",2,0,53],GL:function(a){var z=O.wi(a)
z.kV(a)
return z},wi:function(a){return new N.B3(N.Gf(a),[],[])},xa:function(a){var z=a.pS
return new O.Tu(O.ic(a.nD,1)[0],a.NP,null,null,null,null,z)},ic:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=[]
for(y=0;y<a.length;++y){x=a[y]
w=J.iN(x)
v=w.t(x,0)
u=J.x(v)
if(u.n(v,"step")){t=[]
s=V.KF(w.t(x,1))
r=w.t(x,2)
if(r!=null&&!J.xC(r,""))if(!J.xC(s,""))t.push(["MDiva",s,C.xB.g("(",r)+")"])
else t.push(["msgstr",C.xB.g("(",r)+")"])
else t.push(["MDiv",s])
q=P.EF(["printList",t,"stepnum",b],null,null)
C.Nm.FV(z,q.t(0,"printList"))
b=q.t(0,"stepnum")}else if(u.n(v,"msg")){p=w.t(x,1)
u=w.gB(x)
if(typeof u!=="number")return u.E()
if(u<=2)z.push(["msgstr",p])
else z.push(["msgstr",p,w.t(x,2)])}else if(u.n(v,"mmsg"))z.push(["MDiv",w.t(x,1)])}return[z,b]},ax:function(a){return C.Nm.tg(["<","<="],a)?"and":"or"},x9:function(a){var z,y,x,w,v,u
z=[]
y=[]
for(x=0;x<a.length;++x){w=a[x]
v=J.pm(w)
u=w.gHm().bR()
if(J.xC(v,"=")){if(!C.Nm.tg(z,u)){y.push(w)
z.push(u)}}else y.push(w)}return y},yJ:function(a,b,c,d,e){var z,y,x,w,v,u
z=c.$1(a)
y=z.gzr()
x=z.gNP()
w=[]
if(!d)w=x
else O.ly(y,x,w,b,"Check answers. (Plug them in to make sure they work.)")
v=O.x9(w)
if(e){u=J.w1(y)
u.h(y,["msgstr","<hr>"])
u.h(y,["msgstr","<u>Answer:</u>"])
u.h(y,O.jZ(v,"or",null))}return new O.Tu(y,v,null,null,null,null,null)},ly:function(a,b,c,d,e){var z,y,x,w
if(b.length>0){z=J.w1(a)
z.h(a,["msgstr",e])
for(y=0;y<b.length;++y){x=b[y]
w=Q.Fd(d,x.gHm().bR(),x.ob())
if(J.xC($.Cl.$1(w),1)){c.push(x)
z.h(a,["MDiva",V.KF(x.qD()),"(Works in original equation)"])}else z.h(a,["MDiva",V.KF(x.qD()),"(Doesn't work in original equation)"])}}},jZ:function(a,b,c){var z,y,x
if(a.length===0)return["msgstr","No solutions."]
else{for(z="",y=0;y<a.length;++y){if(y>0)z+="\\,\\,\\text' "+b+" '\\,\\,"
x=a[y]
z=C.xB.g(z,V.KF(x.qD()))
if(x.gNM().Kg()===0&&x.gHm().Kg()===0&&x.gNM().bR()===x.gHm().bR())return["msgstr","All real numbers are solutions."]}if(c==null)return["MDiv",z]
else return["MDiva",z,c]}},HZ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=[]
y=[]
if(0>=a.length)return H.e(a,0)
x=a[0]
w=O.ax(x)
if(2>=a.length)return H.e(a,2)
v=K.Ye(a[2]).BC()
if(V.M4(v.Bl)===0){u=v.av().bR()
if(u<0){t=J.x(x)
t=t.n(x,"=")||t.n(x,"<=")||t.n(x,"<")}else t=!1
if(t){z.push(["msgstr","No solutions. (Absolute value cannot be less than 0.)"])
return new O.Tu(z,y,null,null,null,null,null)}s=!(u===0&&J.xC(x,"="))}else s=!0
if(1>=a.length)return H.e(a,1)
t=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
r=[x,t,a[2]]
q=V.jL(x,new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
if(1>=a.length)return H.e(a,1)
t=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
p=[q,t,["-",a[2]]]
o=V.KF(r)
n=V.KF(p)
if(s)if(w==="and")z.push(["MDiv",C.xB.g(C.xB.g("\\text'We know '\\,\\,",o)+"\\,\\,\\text' and '\\,\\,",n)])
else z.push(["MDiv",C.xB.g(C.xB.g("\\text'We know either '\\,\\,",o)+"\\,\\,\\text' or '\\,\\,",n)])
else z.push(["MDiv",C.xB.g("\\text'We know '\\,\\,",o)])
z.push(["msgstr","<hr>"])
t=w==="and"
if(t)z.push(["MDiva",o,"(Condition 1)"])
else z.push(["MDiva",o,"(Possibility 1)"])
m=O.LW(r)
C.Nm.FV(z,m.zr)
l=m.Ay.qD()
C.Nm.FV(y,m.NP)
if(s){z.push(["msgstr","<hr>"])
if(t)z.push(["MDiva",n,"(Condition 2)"])
else z.push(["MDiva",n,"(Possibility 2)"])
k=O.LW(p)
C.Nm.FV(z,k.zr)
j=k.Ay.qD()
C.Nm.FV(y,k.NP)}else j=null
return new O.Tu(z,y,[l,j,w],null,null,null,null)},LW:function(a){var z=O.GL(a)
z.Rz()
return O.xa(z)},Tu:{"^":"a;zr<,NP<,bd,rR<,uR<,kr<,Ay"},xe:{"^":"fm;NM<,Hm<,pY>",qD:function(){return[this.pY,this.NM.te(),this.Hm.te()]},KT:function(){var z,y
if(this.NM.oM.gvc().Fb.X5>0)return this.NM.L7()
else if(this.Hm.oM.gvc().Fb.X5>0)return this.Hm.L7()
else{z=P.EF(["0",new V.ov(0,1)],null,null)
y=P.EF(["0",new V.ov(1,1)],null,null)
P.EF(["0",new V.ov(0,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
return new F.Vn("+",[new V.eu(z,y,0)])}},bA:function(a,b,c){P.Fl(null,null)
this.NM=new F.GC(a,c)
P.Fl(null,null)
this.Hm=new F.GC(b,c)},static:{F5:function(a,b,c){var z=new O.xe(null,null,"=")
z.bA(a,b,c)
return z}}},Zw:{"^":"a;pS,nD,NP<",zB:function(a,b){var z,y,x,w,v,u
z=["color","blue",b]
if(a==="flip")this.nD.push(["step","","Flip the equation"])
else{y=this.pS
x=y.pY
y=y.NM.te()
w=this.pS.Hm.te()
v=V.hG(b)
if(a==="+")u=C.xB.g("Add ",v)+" to both sides"
else if(a==="-")u=C.xB.g("Subtract ",v)+" from both sides"
else if(a==="*")u=C.xB.g("Multiply both sides by ",v)
else u=a==="/"?C.xB.g("Divide both sides by ",v):""
this.nD.push(["step",[x,[a,y,z],[a,w,z]],u])}},Xb:function(){if(this.pS.NM.Ma.Kg()===0&&this.pS.Hm.Ma.Kg()===0&&this.pS.NM.Ma.oD()&&this.pS.Hm.Ma.oD())return!0
else return!1},QQ:function(a,b){var z,y
z=this.pS
y=N.yT(new N.wK(z.NM.Ma,z.Hm.Ma,z.pY),a,b)
z=this.pS
z.NM.Ma=y.NM
z.Hm.Ma=y.Hm
z.pY=y.pY
return this},ET:function(a,b){var z
this.zB(a,b.Ip(V.Bf()))
this.QQ(a,b)
z=this.pS
this.nD.push(["step",[z.pY,z.NM.te(),z.Hm.te()],""])
return this},Ef:function(a,b,c){var z
P.Fl(null,null)
this.zB(a,new F.GC(b,c).te())
this.QQ(a,b)
z=this.pS
this.nD.push(["step",[z.pY,z.NM.te(),z.Hm.te()],""])
return this},T7:function(){var z=this.nD
if(J.xC(this.pS.pY,"="))z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this equation.</font>",""])
else z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this inequality.</font>",""])
z.push(["msg","<font color=\"red\" style=\"line-height:30px\">If you need help with this problem, please click the button (with the \"?\") on the bottom right, and let me know. I'll get back to you.</font>",""])
return this},zl:function(){this.T7()
return new N.cz(this.nD,this.pS,[],null)},OQ:function(){this.T7()
return Q.Sa(new N.cz(this.nD,this.pS,[],null).br(0))},fB:function(a){var z,y,x,w,v,u,t,s,r,q
this.pS.NM.oM.t(0,a)
if(!this.pS.NM.Ma.oD()||!this.pS.Hm.Ma.oD()){this.T7()
return this}for(z=this.pS.NM.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.xZ(V.Fi(x,a),1)&&this.pS.NM.Ma.gBl().t(0,x).bR()!==0){z=this.nD
if(J.xC(this.pS.pY,"="))z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this equation.</font>",""])
else z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this inequality.</font>",""])
z.push(["msg","<font color=\"red\" style=\"line-height:30px\">If you need help with this problem, please click the button (with the \"?\") on the bottom right, and let me know. I'll get back to you.</font>",""])
return this}}for(z=this.pS.Hm.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.xZ(V.Fi(x,a),1)&&this.pS.Hm.Ma.gBl().t(0,x).bR()!==0){z=this.nD
if(J.xC(this.pS.pY,"="))z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this equation.</font>",""])
else z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this inequality.</font>",""])
z.push(["msg","<font color=\"red\" style=\"line-height:30px\">If you need help with this problem, please click the button (with the \"?\") on the bottom right, and let me know. I'll get back to you.</font>",""])
return this}}for(z=this.pS.NM.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,w=!1;y.G();){x=y.fD
if(J.xZ(V.Fi(x,a),0)&&this.pS.NM.Ma.gBl().t(0,x).bR()!==0)w=!0}for(z=this.pS.Hm.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,v=!1;y.G();){x=y.fD
if(J.xZ(V.Fi(x,a),0)&&this.pS.Hm.Ma.gBl().t(0,x).bR()!==0)v=!0}if(v&&!w)this.ET("flip",new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
for(z=this.pS.Hm.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.J5(V.Fi(x,a),1)&&this.pS.Hm.Ma.gBl().t(0,x).bR()!==0){u=V.E0(this.pS.Hm.Ma.gBl().t(0,x).tv(new V.ov(-1,1)),x,V.Bf())
if(u!=null)this.Ef("+",K.Ye(u).BC(),this.pS.NM.oM)}}for(z=this.pS.NM.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.xC(V.Fi(x,a),0)&&this.pS.NM.Ma.gBl().t(0,x).bR()!==0){u=V.E0(this.pS.NM.Ma.gBl().t(0,x).tv(new V.ov(-1,1)),x,V.Bf())
if(u!=null)this.Ef("+",K.Ye(u).BC(),this.pS.NM.oM)}}t=this.pS.NM.Ma.Et(K.Ye(["var",a]).BC())
if(!t.r7()||t.av().bR()!==0){s=new V.eu(P.EF(["0",new V.ov(0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
for(z=this.pS.NM.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,r=0;y.G();){x=y.fD
if(J.xC(V.Fi(x,a),1)&&this.pS.NM.Ma.gBl().t(0,x).bR()!==0){u=V.E0(this.pS.NM.Ma.gBl().t(0,x),x,V.Bf())
if(u!=null){q=K.Ye(u).BC().Rq(K.Ye(["var",a]).BC()).BC().tH()
s=s.h(0,q.fo()?q.j4():q);++r}}}if(r>1){z=this.nD
z.push(["step",["=",["*",["var",a],s.Ip(V.Bf())],this.pS.Hm.te()],"Factor out variable "+a])
z.push(["step",["=",["/",["*",["var",a],s.Ip(V.Bf())],s.Ip(V.Bf())],["/",this.pS.Hm.te(),s.Ip(V.Bf())]],C.xB.g("Divide both sides by ",V.hG(s.Ip(V.Bf())))])
z.push(["step",["=",["var",a],this.pS.Hm.Ma.Rq(s).BC().dD().Ip(V.Bf())],""])
this.pS.NM.Ma=K.Ye(["var",a]).BC()
z=this.pS.Hm
z.Ma=z.Ma.Rq(s)}else{if(s.oD()&&V.M4(s.Bl)===0&&s.av().bR()===0)return this
this.zB("/",s.Ip(V.Bf()))
this.pS.NM.Ma=K.Ye(["var",a]).BC()
z=this.pS.Hm
z.Ma=z.Ma.Rq(s)
z=this.pS
z.pY=V.jL(z.pY,s)
z=this.pS
this.nD.push(["step",[z.pY,z.NM.te(),z.Hm.te()],""])}}return this},yC:function(a,b){var z,y,x,w
for(z=this.pS.NM.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.xC(V.Fi(x,a),0)&&J.xC(V.Fi(x,b),0)){w=V.E0(this.pS.NM.Ma.gBl().t(0,x).tv(new V.ov(-1,1)),x,V.Bf())
if(w!=null){z=K.Ye(w).BC()
this.zB("+",z.Ip(V.Bf()))
this.QQ("+",z)
z=this.pS
this.nD.push(["step",[z.pY,z.NM.te(),z.Hm.te()],""])}}}for(z=this.pS.Hm.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.J5(V.Fi(x,a),1)||J.J5(V.Fi(x,b),1)){w=V.E0(this.pS.Hm.Ma.gBl().t(0,x).tv(new V.ov(-1,1)),x,V.Bf())
if(w!=null)this.Ef("+",K.Ye(w).BC(),this.pS.NM.oM)}}return this},WL:function(a,b){var z,y,x,w
if(this.pS.NM.Ma.ED("0").bR()===0)return this
for(z=this.pS.Hm.Ma.gBl().gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(J.xC(V.Fi(x,a),0)&&J.xC(V.Fi(x,b),0)){w=V.E0(this.pS.Hm.Ma.gBl().t(0,x).tv(new V.ov(-1,1)),x,V.Bf())
if(w!=null){z=K.Ye(w).BC()
this.zB("+",z.Ip(V.Bf()))
this.QQ("+",z)
z=this.pS
this.nD.push(["step",[z.pY,z.NM.te(),z.Hm.te()],""])}}}return this},v2:function(a,b,c){var z,y,x,w,v,u
z=O.TT(this,a,b)
y=z.zr
x=z.bd
w=O.x9(z.NP)
if(c){v=J.w1(y)
v.h(y,["msgstr","<hr>"])
v.h(y,["msgstr","<u>Answer:</u>"])
v.h(y,O.jZ(w,O.ax(this.pS.pY),null))}C.Nm.FV(this.NP,w)
u=new N.cz(this.nD,this.pS,[],null)
u.zr=y
u.bd=x
return u},tt:function(a,b,c,d,e){var z,y,x
z=O.yJ(a,b,c,d,e)
y=z.zr
C.Nm.FV(this.NP,z.NP)
x=new N.cz(this.nD,this.pS,[],null)
x.zr=y
x.bd=null
return x}}}],["genpoly","Algebra/web/genpoly.dart",,F,{"^":"",Ah:function(a){var z,y,x
z=a.gQi()
y=[]
H.bQ(a.gKw(),new F.vS(y))
x=[z]
C.Nm.FV(x,y)
return x},IN:function(a,b){var z,y,x
if(a.gQi()!==b.gQi())return!1
else if(a.gKw().length!==b.gKw().length)return!1
else for(z=0;z<a.gKw().length;++z){y=a.gKw()
if(z>=y.length)return H.e(y,z)
y=y[z]
x=b.gKw()
if(z>=x.length)return H.e(x,z)
if(!J.xC(y,x[z]))return!1}return!0},D2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=new F.QB()
y=b.gMa().gBl()
x=P.L5(null,null,null,null,null)
x.FV(0,y)
y=b.gMa().gtX()
w=P.L5(null,null,null,null,null)
w.FV(0,y)
v=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
v.Bl=x
v.tX=w
v.FQ=1
w=a.goM()
u=P.L5(null,null,null,null,null)
u.FV(0,w)
for(y=b.goM().gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){t=x.fD
s=b.goM().t(0,t)
for(y=a.goM().gvc().Fb,w=new P.N6(y,y.zN,null,null),w.zq=y.H9;r="",w.G();){q=w.fD
if(F.IN(s,a.goM().t(0,q))){r=q
break}}if(J.xC(r,"")){y=new P.i5(u)
y.$builtinTypeInfo=[H.Kp(u,0)]
p=z.$1(P.F(y,!0,H.ip(y,"mW",0)))
v=K.Ye(Q.Fd(v.Ip(V.Bf()),["var",p],t)).BC()
u.u(0,p,s)}else v=K.Ye(Q.Fd(v.Ip(V.Bf()),["var",r],t)).BC()}P.Fl(null,null)
return new F.GC(v,u)},Vn:{"^":"a;Qi<,Kw<",JE:function(){var z,y,x
for(z=this.Kw,y=null,x=0;x<z.length;++x){y=z[x].JE()
if(y!=null)break}return y},WW:function(){var z=this.JE()
if(z!=null)return z
else return"x"}},vS:{"^":"Tp:8;a",$1:function(a){this.a.push(a.te())},$isPe:true},QB:{"^":"Tp:85;",$1:function(a){var z=["#","&","%","@"]
H.Ap(z,new F.Tv(a))
if(z.length>0)return z[0]
else return"("},$isPe:true},Tv:{"^":"Tp:10;a",$1:function(a){return C.Nm.tg(this.a,a)},$isPe:true},GC:{"^":"a;Ma<,oM<",te:function(){var z,y,x,w
z=this.Ma.te()
for(y=this.oM.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
z=Q.Fd(z,F.Ah(this.oM.t(0,w)),w)}return z},up:function(){return this.oM.gvc().Fb.X5>0},J6:function(){return this.oM.gvc().Fb.X5},L7:function(){var z,y,x
z=this.oM.t(0,"#")
if(z!=null)return z
else{y=P.EF(["0",new V.ov(0,1)],null,null)
x=P.EF(["0",new V.ov(1,1)],null,null)
P.EF(["0",new V.ov(0,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
return new F.Vn("+",[new V.eu(y,x,0)])}},hL:function(){return this.Ma.hL()},h:function(a,b){var z,y,x
if(this.Ma.hL()||b.hL())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
if(this.oM.gvc().Fb.X5>0&&b.up()){z=F.D2(this,b)
if(z.oM.gvc().Fb.X5<=2){y=J.hv(this.Ma,z.Ma)
x=z.oM
P.Fl(null,null)
return new F.GC(y,x)}else return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))}else if(this.oM.gvc().Fb.X5>0){y=J.hv(this.Ma,b.gMa())
x=this.oM
P.Fl(null,null)
return new F.GC(y,x)}else{y=b.up()
x=this.Ma
if(y){y=J.hv(x,b.gMa())
x=b.goM()
P.Fl(null,null)
return new F.GC(y,x)}else return new F.GC(J.hv(x,b.gMa()),P.Fl(null,null))}},Et:function(a){if(this.Ma.hL()||a.hL())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
return this.h(0,a.tv(new F.GC(new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))))},tv:function(a){var z,y
if(this.Ma.hL()||a.hL())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
if(this.oM.gvc().Fb.X5>0&&a.up())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
else if(this.oM.gvc().Fb.X5>0){z=this.Ma.tv(a.gMa())
y=this.oM
P.Fl(null,null)
return new F.GC(z,y)}else{z=a.up()
y=this.Ma
if(z){z=y.tv(a.gMa())
y=a.goM()
P.Fl(null,null)
return new F.GC(z,y)}else return new F.GC(y.tv(a.gMa()),P.Fl(null,null))}},Rq:function(a){var z,y
if(this.Ma.hL()||a.hL())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
if(this.oM.gvc().Fb.X5>0&&a.up())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
else if(this.oM.gvc().Fb.X5>0){z=this.Ma.Rq(a.gMa())
y=this.oM
P.Fl(null,null)
return new F.GC(z,y)}else{z=a.up()
y=this.Ma
if(z){z=y.Rq(a.gMa())
y=a.goM()
P.Fl(null,null)
return new F.GC(z,y)}else return new F.GC(y.Rq(a.gMa()),P.Fl(null,null))}},Sw:function(a){var z,y
if(this.Ma.hL()||a.hL())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
if(this.oM.gvc().Fb.X5>0&&a.up())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
else if(this.oM.gvc().Fb.X5>0){z=this.Ma.Sw(a.gMa())
y=this.oM
P.Fl(null,null)
return new F.GC(z,y)}else{z=a.up()
y=this.Ma
if(z){z=y.Sw(a.gMa())
y=a.goM()
P.Fl(null,null)
return new F.GC(z,y)}else return new F.GC(y.Sw(a.gMa()),P.Fl(null,null))}},Js:function(a){this.Ma=new V.eu(P.EF(["#1",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
this.oM=P.EF(["#",a],null,null)},static:{Q8:function(a){var z=new F.GC(null,P.Fl(null,null))
z.Js(a)
return z},hc:function(a,b){var z,y
if(a.up()||b.up())return new F.GC(new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null))
z=a.gMa()
y=b.gMa()
P.EF(["0",new V.ov(0,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
return F.Q8(new F.Vn("^",[z,y]))}}}}],["myjs","Algebra/web/myjs.dart",,Q,{"^":"",Sa:[function(a){if(!!J.x(a).$iscX)return P.jT(a)
else return a},"$1","Pf",2,0,10,54]}],["mylib","Algebra/web/mylib.dart",,V,{"^":"",lt:[function(a){var z,y,x
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
return V.WX(V.Sr()).t(0,y).$1(x)}else return new V.eu(P.EF(["0",new V.ov(a,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},"$1","Sr",2,0,10,11],vg:[function(a){var z,y,x
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
return V.WX(V.S2()).t(0,y).$1(x)}else return a.te()},"$1","S2",2,0,10,55],bR:function(a,b,c){var z,y
z=[]
J.kH(b,new V.MP(c,z))
y=[a]
C.Nm.FV(y,z)
return y},WX:function(a){var z=P.EF(["color",new V.jR(a),"+",new V.ig(a),"-",new V.ka(a),"*",new V.xJ(a),"/",new V.k6(a),"^",new V.jb(a),"frac",new V.o2J(a),"dfrac",new V.jRF(a),"sqrt",new V.igF(a),"sin",new V.Mjw(a),"cos",new V.ubm(a),"tan",new V.kaU(a),"log",new V.xJg(a),"ln",new V.k6a(a),"=",new V.qia(a),"simplify",new V.jba(a),"?",new V.o0(a),"abs",new V.o3(a),"var",new V.o4(),"+-",new V.o5(a)],null,null)
z.u(0,"*show",z.t(0,"*"))
z.u(0,"*paren",z.t(0,"*"))
return z},u3:function(a){return P.EF(["color",new V.Yx(a),"simplify",new V.SM(a),"!",new V.Cf(a),"eof",new V.Za(),"pt",new V.o1(a),"space",new V.Fh(a),"@",new V.eb(a),"+",new V.YxE(a),"+my",new V.SMW(a),"-",new V.Cf8(a),"*old",new V.kWU(a),"*",new V.UgQ(a),"*show",new V.Zag(a),"*paren",new V.o1a(a),"times",new V.Fha(a),"/",new V.eba(a),"/h",new V.Y0(a),"frac",new V.Y1(a),"dfrac",new V.Y2(a),"^",new V.Y3(a),"^h",new V.Y4(a),"sqrt",new V.Y5(a),"sin",new V.Y6(a),"cos",new V.Y7(a),"tan",new V.Y8(a),"sec",new V.Y10(a),"csc",new V.Y11(a),"cot",new V.Y12(a),"ln",new V.Y13(a),"log",new V.Y14(a),"abs",new V.Y15(a),"var",new V.Y16(),"?",new V.Y17(),"=",new V.Y18(a),">",new V.Y19(a),"<",new V.Y20(a),">=",new V.Y21(a),"<=",new V.Y22(a),"comp",new V.Y23(a),"and",new V.Y24(a),"or",new V.Y25(a),";",new V.Y26(a),",",new V.Y27(a),"+-",new V.Y28(a)],null,null)},Nl:function(a){var z=J.x(a)
if(!!z.$iszM)if(J.xC(z.t(a,0),"color"))return V.Nl(z.t(a,2))
else if(J.xC(z.t(a,0),"simplify"))return V.Nl(z.t(a,1))
else if(J.xC(z.t(a,0),"-")&&z.gB(a)===2&&J.xC(V.Nl(z.t(a,1)),"number"))return"number"
else return z.t(a,0)
else if(typeof a==="number")return"number"
else if(typeof a==="string")return"string"
else return"other"},aw:function(a){return J.Nj(V.KF(a),0,1)==="-"},ni:function(a){switch(V.Nl(a)){case"color":return V.ni(J.UQ(a,2))
case"simplify":return V.ni(J.UQ(a,1))
case"/":return V.ni(J.UQ(a,1))
case"+":case"-":return!0
case"number":return J.u6($.Cl.$1(a),0)
case"string":return J.Nj(a,0,1)==="-"
default:return!1}},bo:function(a){var z
switch(V.Nl(a)){case"color":return V.bo(J.UQ(a,2))
case"simplify":return V.bo(J.UQ(a,1))
case"+":case"-":case"/":case"frac":case"dfrac":return!1
case"^":z=J.iN(a)
return!J.xC(V.Nl(z.t(a,1)),"number")||J.u6($.Cl.$1(z.t(a,1)),0)
case"number":return J.J5($.Cl.$1(a),0)
case"*":return J.Nj(V.KF(a),0,1)!=="-"
case"var":case"sqrt":return!0
default:z=J.q8(a)
if(typeof z!=="number")return z.E()
return z<=1}},vt:function(a){var z,y
switch(V.Nl(a)){case"+":case"-":case"*":case"/":case"^":case"ln":case"dfrac":case"sqrt":z=!0
y=null
break
case"number":z=J.u6($.Cl.$1(a),0)
y=null
break
case"color":z=V.vt(J.UQ(a,2))
y=null
break
case"simplify":z=V.vt(J.UQ(a,1))
y=null
break
case"sin":case"cos":case"tan":case"csc":case"sec":case"cot":z=!1
y=!0
break
default:z=!1
y=!1}return[z,y]},B6:function(a){var z
switch(V.Nl(a)){case"color":return V.B6(J.UQ(a,2))
case"simplify":return V.B6(J.UQ(a,1))
case"+":case"-":case"/":case"frac":case"dfrac":case"*":return!1
case"^":z=J.iN(a)
return!J.xC(V.Nl(z.t(a,1)),"number")||J.u6(z.t(a,1),0)
case"number":return J.J5($.Cl.$1(a),0)
case"var":case"sqrt":return!0
default:z=J.q8(a)
if(typeof z!=="number")return z.E()
return z<=1}},wT:function(a,b){return J.xC(V.Nl(a),"dfrac")?C.xB.g("(",b.$1(a))+")":C.xB.g("(",b.$1(a))+")"},KF:[function(a){var z,y,x
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
return V.u3(V.xt()).t(0,y).$1(x)}else if(typeof a==="number")return F.lq(a,null)
else return z.bu(a)},"$1","xt",2,0,12,11],hG:[function(a){var z,y,x,w
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
w=V.u3(V.la())
w.u(0,"/",w.t(0,"/h"))
w.u(0,"^",w.t(0,"^h"))
return w.t(0,y).$1(x)}else if(typeof a==="number")return F.lq(a,null)
else return z.bu(a)},"$1","la",2,0,12,11],dO:[function(a){return a.O6()},"$1","Bf",2,0,56,57],B9:[function(a){return a.bR()},"$1","Ci",2,0,56],jL:function(a,b){var z,y,x
z=b.Kg()===0?b.bR():b.Vl().bR()
y=J.x(a)
if(y.n(a,"="))x="="
else if(z>=0)x=a
else if(y.n(a,">"))x="<"
else if(y.n(a,"<"))x=">"
else if(y.n(a,">="))x="<="
else if(y.n(a,"<="))x=">="
else if(y.n(a,"\u2264"))x="\u2265"
else x=y.n(a,"\u2265")?"\u2264":"="
return x},MP:{"^":"Tp:10;a,b",$1:[function(a){return this.b.push(this.a.$1(a))},"$1",null,2,0,null,77,"call"],$isPe:true},jR:{"^":"Tp:10;a",$1:[function(a){var z=J.iN(a)
return["color",z.t(a,0),this.a.$1(z.t(a,1))]},"$1",null,2,0,null,66,"call"],$isPe:true},ig:{"^":"Tp:10;b",$1:[function(a){return V.bR("+",a,this.b)},"$1",null,2,0,null,66,"call"],$isPe:true},ka:{"^":"Tp:10;c",$1:[function(a){return V.bR("-",a,this.c)},"$1",null,2,0,null,66,"call"],$isPe:true},xJ:{"^":"Tp:10;d",$1:[function(a){return V.bR("*",a,this.d)},"$1",null,2,0,null,66,"call"],$isPe:true},k6:{"^":"Tp:10;e",$1:[function(a){return V.bR("/",a,this.e)},"$1",null,2,0,null,66,"call"],$isPe:true},jb:{"^":"Tp:10;f",$1:[function(a){return V.bR("^",a,this.f)},"$1",null,2,0,null,66,"call"],$isPe:true},o2J:{"^":"Tp:10;UI",$1:[function(a){return V.bR("frac",a,this.UI)},"$1",null,2,0,null,66,"call"],$isPe:true},jRF:{"^":"Tp:10;bK",$1:[function(a){return V.bR("dfrac",a,this.bK)},"$1",null,2,0,null,66,"call"],$isPe:true},igF:{"^":"Tp:10;Gq",$1:[function(a){return V.bR("sqrt",a,this.Gq)},"$1",null,2,0,null,66,"call"],$isPe:true},Mjw:{"^":"Tp:10;Rm",$1:[function(a){return V.bR("sin",a,this.Rm)},"$1",null,2,0,null,66,"call"],$isPe:true},ubm:{"^":"Tp:10;w3",$1:[function(a){return V.bR("cos",a,this.w3)},"$1",null,2,0,null,66,"call"],$isPe:true},kaU:{"^":"Tp:10;HZ",$1:[function(a){return V.bR("tan",a,this.HZ)},"$1",null,2,0,null,66,"call"],$isPe:true},xJg:{"^":"Tp:10;mG",$1:[function(a){return V.bR("log",a,this.mG)},"$1",null,2,0,null,66,"call"],$isPe:true},k6a:{"^":"Tp:10;xC",$1:[function(a){return V.bR("ln",a,this.xC)},"$1",null,2,0,null,66,"call"],$isPe:true},qia:{"^":"Tp:10;cj",$1:[function(a){return V.bR("=",a,this.cj)},"$1",null,2,0,null,66,"call"],$isPe:true},jba:{"^":"Tp:10;jk",$1:[function(a){return V.bR("simplify",a,this.jk)},"$1",null,2,0,null,66,"call"],$isPe:true},o0:{"^":"Tp:10;i0",$1:[function(a){return V.bR("?",a,this.i0)},"$1",null,2,0,null,66,"call"],$isPe:true},o3:{"^":"Tp:10;r",$1:[function(a){return V.bR("abs",a,this.r)},"$1",null,2,0,null,66,"call"],$isPe:true},o4:{"^":"Tp:10;",$1:[function(a){return new V.eu(P.EF([J.WB(J.UQ(a,0),"1"),new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)},"$1",null,2,0,null,66,"call"],$isPe:true},o5:{"^":"Tp:10;YC",$1:[function(a){return V.bR("+-",a,this.YC)},"$1",null,2,0,null,66,"call"],$isPe:true},Yx:{"^":"Tp:79;a",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
return C.xB.g(C.xB.g("\\cl ",y)+" {",this.a.$1(x))+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},SM:{"^":"Tp:79;b",$1:[function(a){return this.b.$1(J.UQ(a,0))},"$1",null,2,0,null,66,"call"],$isPe:true},Cf:{"^":"Tp:79;c",$1:[function(a){var z,y
z=J.UQ(a,0)
y=this.c
if(!!J.x(z).$iszM)return C.xB.g("(",y.$1(z))+")!"
else return J.WB(y.$1(z),"!")},"$1",null,2,0,null,66,"call"],$isPe:true},Za:{"^":"Tp:79;",$1:[function(a){return""},"$1",null,2,0,null,66,"call"],$isPe:true},o1:{"^":"Tp:79;d",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.d
return C.xB.g(C.xB.g("(",z.$1(y))+", ",z.$1(x))+")"},"$1",null,2,0,null,66,"call"],$isPe:true},Fh:{"^":"Tp:79;e",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=$.Cl.$1(y)
z=J.Wx(w)
v=this.e
if(z.F(w,0))return C.xB.g(C.xB.g("",z.bu(w))+" ",v.$1(x))
else return C.xB.g("-"+C.CD.bu(z.J(w))+" ",v.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},eb:{"^":"Tp:79;f",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.f
return J.WB(J.WB(z.$1(y),"\\,\\, @ \\,\\,"),z.$1(["color","purple",x]))},"$1",null,2,0,null,66,"call"],$isPe:true},YxE:{"^":"Tp:79;UI",$1:[function(a){var z,y
z=J.vo(a,new V.yQ())
y=H.K1(z,new V.Ox(this.UI),H.ip(z,"mW",0),null).zV(0,"")
if(C.xB.Nj(y,0,1)==="+")return C.xB.yn(y,1)
else return y},"$1",null,2,0,null,66,"call"],$isPe:true},yQ:{"^":"Tp:10;",$1:[function(a){return a!=null},"$1",null,2,0,null,77,"call"],$isPe:true},Ox:{"^":"Tp:10;bK",$1:[function(a){switch(V.Nl(a)){}a=this.bK.$1(a)
return J.Nj(a,0,1)!=="-"||!1?C.xB.g("+",a):a},"$1",null,2,0,null,77,"call"],$isPe:true},SMW:{"^":"Tp:79;Gq",$1:[function(a){var z,y
z=J.vo(a,new V.fJ())
y=H.K1(z,new V.pX(this.Gq),H.ip(z,"mW",0),null).zV(0,"")
if(C.xB.Nj(y,0,1)==="+")return C.xB.yn(y,1)
else return y},"$1",null,2,0,null,66,"call"],$isPe:true},fJ:{"^":"Tp:10;",$1:[function(a){return a!=null},"$1",null,2,0,null,77,"call"],$isPe:true},pX:{"^":"Tp:10;Rm",$1:[function(a){var z
switch(V.Nl(a)){case"*":z=V.aw(a)
break
default:z=!1}a=this.Rm.$1(a)
if(z)a=C.xB.g("(",a)+")"
return J.Nj(a,0,1)!=="-"||z?C.xB.g("+",a):a},"$1",null,2,0,null,77,"call"],$isPe:true},Cf8:{"^":"Tp:79;w3",$1:[function(a){var z,y,x,w,v,u,t,s
z=J.iN(a)
if(z.gB(a)===1)return this.w3.$1(["*old",-1,z.t(a,0)])
else{y=[]
x=this.w3
w=0
while(!0){v=z.gB(a)
if(typeof v!=="number")return H.s(v)
if(!(w<v))break
u=z.t(a,w)
t=V.ni(u)
switch(V.Nl(u)){case"+":case"-":s=w>0
break
default:s=!1}u=x.$1(u)
y.push(t&&w>0||s?C.xB.g("(",u)+")":u);++w}return C.Nm.zV(y,"-")}},"$1",null,2,0,null,66,"call"],$isPe:true},kWU:{"^":"Tp:79;HZ",$1:[function(a){var z,y,x,w
z=["*"]
y=J.w1(a)
C.Nm.FV(z,y.Jk(a,1))
if(J.xC(y.t(a,0),1)&&z.length>1)return this.HZ.$1(z)
else{y=J.xC(y.t(a,0),-1)&&z.length>1
x=this.HZ
if(y){w=x.$1(z)
if(1>=z.length)return H.e(z,1)
if(V.ni(z[1]))return C.xB.g("-(",w)+")"
else return C.xB.g("-",w)}else return x.$1(C.Nm.FV(["*"],a))}},"$1",null,2,0,null,66,"call"],$isPe:true},UgQ:{"^":"Tp:79;mG",$1:[function(a){var z,y,x,w,v,u,t,s,r
C.Nm.FV(["*"],a)
z=J.iN(a)
y=z.gB(a)
if(typeof y!=="number")return y.D()
x=this.mG
if(y>1){y=H.Vq("\\d",!1,!0,!1)
w=C.xB.tg(J.Nj(x.$1(z.t(a,1)),0,1),new H.VR("\\d",y,null,null))
v=J.xC(V.Nl(z.t(a,0)),"number")&&J.xC(V.Nl(z.t(a,1)),"number")
u=[]
t=0
while(!0){y=z.gB(a)
if(typeof y!=="number")return H.s(y)
if(!(t<y))break
s=z.t(a,t)
switch(V.Nl(s)){case"number":r=t>0&&!0
break
case"/":r=t>0
break
case"?":r=!0
break
default:if(V.bo(s))r=t===1&&w
else r=!0
break}if(!v)v=r
s=x.$1(s)
u.push(v?C.xB.g("(",s)+")":s);++t}return C.Nm.zV(u,"")}else return x.$1(z.t(a,0))},"$1",null,2,0,null,66,"call"],$isPe:true},Zag:{"^":"Tp:79;xC",$1:[function(a){var z,y,x,w,v,u,t,s
C.Nm.FV(["*"],a)
z=J.iN(a)
y=z.gB(a)
if(typeof y!=="number")return y.D()
if(y>1){x=J.xC(V.Nl(z.t(a,0)),"number")&&J.xC(V.Nl(z.t(a,1)),"number")
w=[]
y=this.xC
v=0
while(!0){u=z.gB(a)
if(typeof u!=="number")return H.s(u)
if(!(v<u))break
t=z.t(a,v)
switch(V.Nl(t)){case"number":s=v>0&&!0
break
default:s=!V.bo(t)
break}if(!x)x=s
t=y.$1(t)
w.push(x?C.xB.g("(",t)+")":t);++v}return C.Nm.zV(w,"*")}else return this.xC.$1(z.t(a,0))},"$1",null,2,0,null,66,"call"],$isPe:true},o1a:{"^":"Tp:79;cj",$1:[function(a){var z,y,x,w,v
C.Nm.FV(["*"],a)
z=J.iN(a)
y=z.gB(a)
if(typeof y!=="number")return y.D()
if(y>1){x=[]
y=this.cj
w=0
while(!0){v=z.gB(a)
if(typeof v!=="number")return H.s(v)
if(!(w<v))break
x.push(C.xB.g("(",y.$1(z.t(a,w)))+")");++w}return C.Nm.zV(x,"")}else return C.xB.g("(",this.cj.$1(z.t(a,0)))+")"},"$1",null,2,0,null,66,"call"],$isPe:true},Fha:{"^":"Tp:79;jk",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=V.bo(y)
w=V.bo(x)
v=this.jk
y=v.$1(y)
x=v.$1(x)
if(!z)y=C.xB.g("(",y)+")"
if(!w)x=C.xB.g("(",x)+")"
return J.WB(J.WB(y," \\times "),x)},"$1",null,2,0,null,66,"call"],$isPe:true},eba:{"^":"Tp:79;i0",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.i0
y=z.$1(y)
x=z.$1(x)
return C.xB.g(C.xB.g("\\,{",y)+"}/{",x)+"}\\,"},"$1",null,2,0,null,66,"call"],$isPe:true},Y0:{"^":"Tp:79;r",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=V.B6(y)
w=V.B6(x)
v=this.r
y=v.$1(y)
x=v.$1(x)
if(!z)y=C.xB.g("(",y)+")"
if(!w)x=C.xB.g("(",x)+")"
return C.xB.g(C.xB.g("",y)+"/",x)},"$1",null,2,0,null,66,"call"],$isPe:true},Y1:{"^":"Tp:79;YC",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.YC
return C.xB.g(C.xB.g("\\frac{",z.$1(y))+"}{",z.$1(x))+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y2:{"^":"Tp:79;Pz",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.Pz
return C.xB.g(C.xB.g("{",z.$1(y))+"}/{",z.$1(x))+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y3:{"^":"Tp:79;Of",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=V.vt(y)
z=w.length
if(0>=z)return H.e(w,0)
v=w[0]
if(1>=z)return H.e(w,1)
z=this.Of
y=v===!0?V.wT(y,z):z.$1(y)
x=z.$1(x)
return J.WB(J.WB(J.WB(y,"^{"),x),"}")},"$1",null,2,0,null,66,"call"],$isPe:true},Y4:{"^":"Tp:79;Fc",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=V.vt(y)
z=w.length
if(0>=z)return H.e(w,0)
v=w[0]
if(1>=z)return H.e(w,1)
z=this.Fc
y=v===!0?V.wT(y,z):z.$1(y)
x=z.$1(x)
return J.WB(J.WB(J.WB(y,"^"),x),"")},"$1",null,2,0,null,66,"call"],$isPe:true},Y5:{"^":"Tp:79;ES",$1:[function(a){return C.xB.g("\u221a{",this.ES.$1(J.UQ(a,0)))+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y6:{"^":"Tp:79;x",$1:[function(a){return"\\sin{"+V.wT(J.UQ(a,0),this.x)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y7:{"^":"Tp:79;y",$1:[function(a){return"\\cos{"+V.wT(J.UQ(a,0),this.y)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y8:{"^":"Tp:79;z",$1:[function(a){return"\\tan{"+V.wT(J.UQ(a,0),this.z)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y10:{"^":"Tp:79;Sv",$1:[function(a){return"\\sec{"+V.wT(J.UQ(a,0),this.Sv)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y11:{"^":"Tp:79;pt",$1:[function(a){return"\\sec{"+V.wT(J.UQ(a,0),this.pt)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y12:{"^":"Tp:79;U9",$1:[function(a){return"\\sec{"+V.wT(J.UQ(a,0),this.U9)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y13:{"^":"Tp:79;T4",$1:[function(a){return"\\ln{"+V.wT(J.UQ(a,0),this.T4)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y14:{"^":"Tp:79;yL",$1:[function(a){return"\\log{"+V.wT(J.UQ(a,0),this.yL)+"}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y15:{"^":"Tp:79;VI",$1:[function(a){return C.xB.g("|",this.VI.$1(J.UQ(a,0)))+"|"},"$1",null,2,0,null,66,"call"],$isPe:true},Y16:{"^":"Tp:79;",$1:[function(a){return J.UQ(a,0)},"$1",null,2,0,null,66,"call"],$isPe:true},Y17:{"^":"Tp:79;",$1:[function(a){return"\\cl red {?}"},"$1",null,2,0,null,66,"call"],$isPe:true},Y18:{"^":"Tp:79;dl",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.dl
return J.WB(J.WB(z.$1(y)," = "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y19:{"^":"Tp:79;vp",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.vp
return J.WB(J.WB(z.$1(y)," > "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y20:{"^":"Tp:79;a6",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.a6
return J.WB(J.WB(z.$1(y)," < "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y21:{"^":"Tp:79;x3",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.x3
return J.WB(J.WB(z.$1(y)," \u2265 "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y22:{"^":"Tp:79;cK",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.cK
return J.WB(J.WB(z.$1(y)," \u2264 "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y23:{"^":"Tp:79;bF",$1:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
w=z.t(a,2)
z=J.x(x)
if(z.n(x,">")){z=this.bF
return J.WB(J.WB(z.$1(y)," > "),z.$1(w))}else if(z.n(x,"<")){z=this.bF
return J.WB(J.WB(z.$1(y)," < "),z.$1(w))}else{v=this.bF
if(z.n(x,">="))return J.WB(J.WB(v.$1(y)," \u2265 "),v.$1(w))
else return J.WB(J.WB(v.$1(y)," \u2264 "),v.$1(w))}},"$1",null,2,0,null,66,"call"],$isPe:true},Y24:{"^":"Tp:79;Gl",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.Gl
return J.WB(J.WB(z.$1(y),"\\,\\,\\text' and '\\,\\,"),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y25:{"^":"Tp:79;dj",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.dj
return J.WB(J.WB(z.$1(y),"\\,\\,\\text' or '\\,\\,"),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y26:{"^":"Tp:79;IZ",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.IZ
return J.WB(J.WB(z.$1(y)," ; "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y27:{"^":"Tp:79;DZ",$1:[function(a){var z,y,x
z=J.iN(a)
y=z.t(a,0)
x=z.t(a,1)
z=this.DZ
if(x==null)return J.WB(z.$1(y)," , ")
else return J.WB(J.WB(z.$1(y)," , "),z.$1(x))},"$1",null,2,0,null,66,"call"],$isPe:true},Y28:{"^":"Tp:79;Q",$1:[function(a){var z,y
z=J.iN(a)
y=this.Q
if(z.gB(a)===1)return"\\pm "+V.wT(z.t(a,0),y)
else return z.ez(a,y).zV(0," \\pm ")},"$1",null,2,0,null,66,"call"],$isPe:true},ov:{"^":"a;Mc<,v5<",bR:function(){return J.FW(this.Mc,this.v5)},wI:function(){return["/",this.Mc,this.v5]},O6:function(){var z,y
z=this.v5
if(J.xC(z,1))return F.T5(this.Mc)
else{y=this.Mc
if(K.WL(y)&&K.WL(z))return["/",y,z]
else return J.FW(y,z)}},J2:function(){var z,y,x,w
z=this.Mc
y=this.v5
x=J.Qc(z)
w=J.u6(x.U(z,y),0)?-1:1
return new V.ov(w*x.Vy(z),J.yH(y))},rd:function(a){var z,y,x
z=this.Mc
y=this.v5
x=K.k7([z,y])
return new V.ov(J.FW(z,x),J.FW(y,x))},Ec:function(){return new V.ov(this.v5,this.Mc)},WA:function(){return new V.ov(J.jz(this.Mc),this.v5)},h:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.J2()
y=b.J2()
x=z.v5
w=y.v5
v=K.eO([x,w])
u=J.Wx(v)
t=u.V(v,x)
s=[J.vX(z.Mc,t),J.vX(x,t)]
r=u.V(v,w)
u=J.vX(y.Mc,r)
w=J.vX(w,r)
return new V.ov(J.WB(s[0],[u,w][0]),s[1]).rd(0)},Et:function(a){return this.h(0,a.WA())},tv:function(a){var z,y
z=this.J2()
y=a.J2()
return new V.ov(J.vX(z.Mc,y.Mc),J.vX(z.v5,y.v5)).rd(0)},Lx:function(a){return this.tv(new V.ov(a,1))},Rq:function(a){return this.tv(a.Ec())},Sw:function(a){var z,y,x
z=J.Wx(a)
if(z.F(a,0)){z=this.Mc
if(typeof z!=="number")H.vh(P.u(z))
y=typeof a!=="number"
if(y)H.vh(P.u(a))
z=Math.pow(z,a)
x=this.v5
if(typeof x!=="number")H.vh(P.u(x))
if(y)H.vh(P.u(a))
return new V.ov(z,Math.pow(x,a))}else{y=this.v5
x=z.Vy(a)
if(typeof y!=="number")H.vh(P.u(y))
y=Math.pow(y,x)
x=this.Mc
z=z.Vy(a)
if(typeof x!=="number")H.vh(P.u(x))
return new V.ov(y,Math.pow(x,z))}},bu:[function(a){return V.KF(this.O6())},"$0","gAY",0,0,72],Gr:function(){return V.hG(this.O6())}},eu:{"^":"a;Bl<,tX<,FQ",n:function(a,b){var z,y,x
if(b==null)return!1
if(V.M4(this.Bl)===b.Kg()){z=V.M4(this.Bl)
for(y=!1,x=0;x<=z;++x)if(this.PY(x).bR()!==b.PY(x).bR())y=!0
if(!J.xC(this.JE(),b.JE()))y=!0}else y=!0
if(this.oD()===b.oD()){if(!this.oD())y=this.tX!==b.gtX()?!0:y}else y=!0
return!y},giO:function(a){return this.PY(0).bR()},Qg:function(){var z,y,x,w,v
z=P.Fl(null,null)
y=P.Fl(null,null)
for(x=this.Bl.gvc().Fb,w=new P.N6(x,x.zN,null,null),w.zq=x.H9;w.G();){v=w.fD
z.u(0,v,this.Bl.t(0,v).wI())}for(x=this.tX.gvc().Fb,w=new P.N6(x,x.zN,null,null),w.zq=x.H9;w.G();){v=w.fD
y.u(0,v,this.tX.t(0,v).wI())}return Q.Sa([z,y])},bR:function(){return this.av().bR()},av:function(){var z,y
z=V.Zv(this.tX,"0").bR()
y=this.Bl
if(z!==0)return V.Zv(y,"0").Rq(V.Zv(this.tX,"0"))
else return V.Zv(y,"0")},Vl:function(){var z,y
z=V.Zv(this.tX,"0").bR()
y=this.Bl
if(z!==0)return V.cK(y).Rq(V.Zv(this.tX,"0"))
else return V.cK(y)},ED:function(a){var z=this.Bl.t(0,a)
return z==null?new V.ov(0,1):z},PY:function(a){var z,y,x
if(a===0){z=this.Bl.t(0,"0")
return z==null?new V.ov(0,1):z}else{y=this.JE()
if(y==null)y="x"
x=J.WB(y,C.CD.bu(a))
z=this.Bl.t(0,x)
return z==null?new V.ov(0,1):z}},UO:function(a,b){var z
if(b===0)return V.Zv(this.Bl,"0")
else{z=J.WB(a,C.jn.bu(b))
return V.Zv(this.Bl,z)}},oD:function(){if(this.FQ!==0)var z=V.Zv(this.tX,"0").bR()===1&&this.tX.gvc().Fb.X5===1
else z=!0
return z},hL:function(){return isNaN(V.Zv(this.Bl,"0").bR())},cG:function(){var z,y,x,w
if(this.tX.gvc().Fb.X5===0)return!1
else{for(z=this.tX.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
w=this.tX.t(0,x)
if((w==null?new V.ov(0,1):w).bR()>0)return!1}return!0}},K9:function(){return this.oD()&&V.Zv(this.Bl,"0").bR()!==0&&this.Bl.gvc().Fb.X5===1},r7:function(){var z,y,x
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(!J.xC(x,"0")&&this.Bl.t(0,x).bR()!==0)return!1}return!0},Ip:function(a){if(this.oD())return V.mx(this.Bl,a)
else return this.dD().P2(a)},vP:function(a){if(this.oD())return V.mx(this.Bl,a)
else return this.P2(a)},P2:function(a){var z,y
z=this.oD()
y=this.Bl
if(z)return V.mx(y,a)
else return["/",V.mx(y,a),V.mx(this.tX,a)]},te:function(){return this.Ip(V.Bf())},Bm:function(){return this.vP(V.Bf())},Ag:function(){return this.Ip(V.Ci())},j4:function(){var z,y,x,w
z=this.vu()
y=V.z1(this.tX,z)
x=V.z1(this.Bl,z)
w=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
w.Bl=x
w.tX=y
w.FQ=1
return w},Uz:function(){var z,y
z=this.DQ()
y=this.NV()
return this.fi(z).Rq(new V.eu(P.EF(["0",new V.ov(y,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))},fi:function(a){var z,y,x
z=this.tX
y=V.z1(this.Bl,a)
x=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
x.Bl=y
x.tX=z
x.FQ=1
return x},tH:function(){var z,y,x,w,v,u
z=V.jy(this.tX)
y=V.jy(this.Bl)
x=J.Qc(y)
w=V.DK(this.tX,x.U(y,z))
v=V.DK(this.Bl,x.U(y,z))
u=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
u.Bl=v
u.tX=w
u.FQ=1
if(u.cG())return u.T8()
else return u},dD:function(){var z=this.tH()
return z.fo()?z.j4():z},BC:function(){var z,y,x,w
z=this.f9()
y=V.Jz(this.tX,z)
x=V.Jz(this.Bl,z)
w=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
w.Bl=x
w.tX=y
w.FQ=1
if(w.cG())return w.T8()
else return w},T8:function(){var z,y,x
z=V.Jz(this.tX,-1)
y=V.Jz(this.Bl,-1)
x=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
x.Bl=y
x.tX=z
x.FQ=1
return x},vu:function(){var z,y,x
if(this.oD())return P.Fl(null,null)
else{for(z=this.tX.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=null;y.G();)x=V.Hf(x,V.Gk(y.fD))
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();)x=V.Hf(x,V.Gk(y.fD))
if(x==null)return P.Fl(null,null)
else return x}},DQ:function(){var z,y,x,w
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=null;y.G();){w=y.fD
if(this.Bl.t(0,w).bR()!==0)x=V.Hf(x,V.Gk(w))}if(x==null)return P.Fl(null,null)
else return x},lu:function(){var z,y,x,w
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=0;y.G();){w=y.fD
if(this.Bl.t(0,w).bR()!==0)++x}return x},rX:function(){var z,y
z=this.DQ()
y=P.Fl(null,null)
y.u(0,V.Ew(z),new V.ov(1,1))
return new V.eu(y,P.EF(["0",new V.ov(1,1)],null,null),0).tv(new V.eu(P.EF(["0",new V.ov(this.NV(),1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))},f9:function(){var z,y,x,w
if(this.oD())return 1
else{for(z=this.tX.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=null;y.G();){w=y.fD
x=V.cH(x,this.tX.t(0,w).gMc())}for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){w=y.fD
x=V.cH(x,this.Bl.t(0,w).gMc())}return x}},NV:function(){var z,y,x,w,v
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=null;y.G();){w=y.fD
v=this.Bl.t(0,w)
x=$.SO.$1(v.bR())===!0?V.tb(x,v.gMc()):1}if($.SO.$1(x)===!0&&!J.xC(x,0))return x
else return 1},fo:function(){if(this.vu().gvc().Fb.X5>0)return!0
else return!1},cP:function(){if(this.DQ().gvc().Fb.X5>0&&this.lu()>1)return!0
else return!1},d9:function(){if(J.xZ(this.f9(),1))return!0
else if(this.cG())return!0
else return!1},XV:function(){var z,y,x,w
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x="0";y.G();){w=y.fD
if(!J.xC(w,"0")&&this.Bl.t(0,w).bR()!==0)x=w}return x},ly:function(){var z,y,x,w
for(z=this.Bl.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=0;y.G();){w=y.fD
if(this.Bl.t(0,w).bR()!==0)++x}return x},AG:function(){return V.Ut(this.Bl)},Mz:function(){var z,y
z=V.Ut(this.Bl)
if(!this.oD())C.Nm.FV(z,V.Ut(this.tX))
y=P.Ls(null,null,null,H.Kp(z,0))
y.FV(0,z)
return y.br(0)},JE:function(){var z=V.L3(this.Bl)
if(z!=null)return z
else if(!this.oD())return V.L3(this.tX)
else return z},WW:function(){var z=this.JE()
return z==null?"x":z},Kg:function(){return V.M4(this.Bl)},aY:function(){if(this.oD())return 0
return V.M4(this.tX)},h:function(a,b){var z,y,x,w
if(isNaN(V.Zv(this.Bl,"0").bR())||b.hL())return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
if(this.oD()&&b.oD())return new V.eu(V.bS(this.Bl,b.gBl()),P.EF(["0",new V.ov(1,1)],null,null),0)
else{z=V.lK(this.tX,b.gtX())
y=this.Bl
if(z){x=V.bS(y,b.gBl())
z=this.tX
y=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
y.Bl=x
y.tX=z
y.FQ=1
return y}else{x=V.bS(V.Bs(y,b.gtX()),V.Bs(b.gBl(),this.tX))
w=V.Bs(this.tX,b.gtX())
z=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
z.Bl=x
z.tX=w
z.FQ=1
return z}}},Et:function(a){if(isNaN(V.Zv(this.Bl,"0").bR())||a.hL())return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
return this.h(0,a.tv(new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)))},tv:function(a){var z,y,x,w,v,u
if(isNaN(V.Zv(this.Bl,"0").bR())||a.hL())return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
z=P.Fl(null,null)
P.Fl(null,null)
if(a.K9()){for(y=this.Bl.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
v=this.Bl.t(0,w)
if(v==null)v=new V.ov(0,1)
z.u(0,w,v.tv(a.av()))}y=this.tX
x=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
x.Bl=z
x.tX=y
x.FQ=1
return x}else{z=V.Bs(this.Bl,a.gBl())
u=V.Bs(this.tX,a.gtX())
y=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
y.Bl=z
y.tX=u
y.FQ=1
return y}},Rq:function(a){var z,y,x,w,v
if(isNaN(V.Zv(this.Bl,"0").bR())||a.hL())return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
z=P.Fl(null,null)
if(a.K9()){for(y=this.Bl.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
z.u(0,w,this.Bl.t(0,w).Rq(a.av()))}y=this.tX
x=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
x.Bl=z
x.tX=y
x.FQ=1
return x}else{y=a.gtX()
x=a.gBl()
v=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
v.Bl=y
v.tX=x
v.FQ=1
return this.tv(v)}},Sw:function(a){var z,y,x,w
if(isNaN(V.Zv(this.Bl,"0").bR())||a.hL())return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
if(a.K9());else return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
z=a.av().bR()
if(this.K9())return new V.eu(P.EF(["0",this.av().Sw(z)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
else{y=new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
if(Math.abs(z-C.CD.yu(C.CD.UD(z)))>0.0001)return new V.eu(P.EF(["0",new V.ov(0/0,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0)
if(z>=0)for(x=0;x<z;++x)y=y.tv(this)
else for(w=-z,x=0;x<w;++x)y=y.Rq(this)
return y}},BI:function(a,b){var z,y,x,w,v,u
z=P.Fl(null,null)
for(y=J.Qc(b),x=0;w=a.length,x<w;++x){v=w-1-x
u=a[x]
if(v!==0)z.u(0,y.g(b,C.jn.bu(v)),new V.ov(u,1))
else z.u(0,"0",new V.ov(u,1))}this.Bl=z},$iseu:true,static:{YY:function(a,b){var z=new V.eu(null,P.EF(["0",new V.ov(1,1)],null,null),0)
z.BI(a,b)
return z},uN:function(a,b,c){if(a.bR()===1)return b
else if(a.bR()===-1)return["-",b]
else return["*",c.$1(a),b]},jy:function(a){var z=[]
a.gvc().aN(0,new V.c8(a,z))
return K.eO(z)},E0:function(a,b,c){var z,y,x,w,v,u,t
if(a==null||a.bR()===0)return
z=J.x(b)
if(z.n(b,"0"))return c.$1(a)
else{y=z.Fr(b,",")
for(x=1,w=0;w<y.length;++w){v=y[w]
z=J.iN(v)
u=z.t(v,0)
t=H.BU(z.yn(v,1),null,null)
x=w===0?V.bE(u,t):["*",x,V.bE(u,t)]}}return V.uN(a,x,c)},wB:function(a){var z,y,x,w,v
z=J.x(a)
if(z.n(a,"0"))return 0
else{y=z.Fr(a,",")
for(x=0,w=0;w<y.length;++w){v=H.BU(J.ZZ(y[w],1),null,null)
if(typeof v!=="number")return H.s(v)
x+=v}}return x},Fi:[function(a,b){var z,y,x,w
z=J.x(a)
if(z.n(a,"0"))return 0
else{y=z.Fr(a,",")
for(x=0;x<y.length;++x){w=y[x]
z=J.iN(w)
if(J.xC(z.t(w,0),b))return H.BU(z.yn(w,1),null,null)}}return 0},"$2","iM",4,0,58,59,60],Gk:function(a){var z,y,x,w,v,u,t
z=P.Fl(null,null)
y=J.x(a)
if(y.n(a,"0"))return z
else{x=y.Fr(a,",")
for(w=0;w<x.length;++w){v=x[w]
y=J.iN(v)
u=y.t(v,0)
t=H.BU(y.yn(v,1),null,null)
if(!J.xC(t,0))z.u(0,u,t)}}return z},Hf:function(a,b){var z,y,x,w,v
z=P.Fl(null,null)
if(a==null)return b
else for(y=b.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
if(a.t(0,w)!=null){v=P.J(a.t(0,w),b.t(0,w))
if(v!==0)z.u(0,w,v)}}return z},cH:function(a,b){var z
if(a==null)if($.SO.$1(b)===!0&&!J.xC(b,0))return b
else return 1
else if($.SO.$1(a)===!0&&$.SO.$1(b)===!0){z=$.qr.$1([a,b])
return J.xC(z,0)?1:z}else return 1},tb:function(a,b){var z
if(a==null)if($.SO.$1(b)===!0&&!J.xC(b,0))return b
else return 0
else if($.SO.$1(a)===!0&&$.SO.$1(b)===!0){z=$.qr.$1([a,b])
return J.xC(z,0)?1:z}else return 1},v4:function(a,b){var z,y,x,w,v
z=P.Fl(null,null)
if(b==null)return a
else for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
v=b.t(0,w)!=null?J.xH(a.t(0,w),b.t(0,w)):a.t(0,w)
if(!J.xC(v,0))z.u(0,w,v)}return z},fq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=J.x(a)
if(z.n(a,"0")&&J.xC(b,"0"))return 0
else if(z.n(a,"0"))return 1
else{y=J.x(b)
if(y.n(b,"0"))return-1}x=[]
w=[]
v=[]
u=[]
t=z.Fr(a,",")
for(s=0;s<t.length;++s){r=t[s]
z=J.iN(r)
q=z.t(r,0)
p=H.BU(z.yn(r,1),null,null)
x.push(q)
w.push(p)}o=y.Fr(b,",")
for(s=0;s<o.length;++s){r=o[s]
z=J.iN(r)
q=z.t(r,0)
p=H.BU(z.yn(r,1),null,null)
v.push(q)
u.push(p)}for(s=0;s<P.J(x.length,v.length);++s){if(s>=x.length)return H.e(x,s)
n=x[s]
if(s>=w.length)return H.e(w,s)
m=w[s]
if(s>=v.length)return H.e(v,s)
l=v[s]
if(s>=u.length)return H.e(u,s)
k=u[s]
j=J.oE(n,l)
if(j!==0)return j
else{z=J.Wx(m)
if(z.C(m,k))return 1
else if(z.D(m,k))return-1}}return 0},bE:function(a,b){var z=J.x(b)
if(z.n(b,0))return 1
else if(z.n(b,1))return["var",a]
else return["^",["var",a],b]},lT:function(a,b){var z,y,x,w,v,u,t,s,r
z=P.Fl(null,null)
y=J.x(a)
if(y.n(a,"0")&&J.xC(b,"0"))return"0"
else if(y.n(a,"0"))return b
else{x=J.x(b)
if(x.n(b,"0"))return a}w=y.Fr(a,",")
for(v=0;v<w.length;++v){u=w[v]
y=J.iN(u)
t=y.t(u,0)
s=H.BU(y.yn(u,1),null,null)
if(z.t(0,t)==null)z.u(0,t,s)
else z.u(0,t,J.WB(z.t(0,t),s))}r=x.Fr(b,",")
for(v=0;v<r.length;++v){u=r[v]
y=J.iN(u)
t=y.t(u,0)
s=H.BU(y.yn(u,1),null,null)
if(z.t(0,t)==null)z.u(0,t,s)
else z.u(0,t,J.WB(z.t(0,t),s))}return V.Ew(z)},Ew:function(a){var z,y,x,w,v,u,t
z=[]
a.gvc().aN(0,new V.Vu(z))
y=P.n4()
x=z.length-1
if(x-0<=32)H.w9(z,0,x,y)
else H.d4(z,0,x,y)
w=[]
for(v=0;v<z.length;++v){u=z[v]
w.push(C.xB.g(C.xB.g("",u),J.AG(a.t(0,u))))}t=C.Nm.zV(w,",")
return t===""?"0":t},ms:function(a){var z,y,x,w,v,u,t,s
z=[]
y=[]
a.gvc().aN(0,new V.ca(y))
H.rd(y,null)
for(x=0;x<y.length;++x){w=y[x]
v=a.t(0,w)
if(typeof v!=="number")return H.s(v)
u=0
for(;u<v;++u){t=C.xB.g("",w)+"1"
s=P.Fl(null,null)
s.u(0,t,new V.ov(1,1))
z.push(new V.eu(s,P.EF(["0",new V.ov(1,1)],null,null),0))}}return z},Zv:function(a,b){var z=a.t(0,b)
return z==null?new V.ov(0,1):z},cK:function(a){var z,y,x
for(z=a.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(!J.xC(x,"0"))return a.t(0,x)}return new V.ov(0,1)},z1:function(a,b){var z,y,x,w,v
z=P.Fl(null,null)
for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
v=V.Ew(V.v4(V.Gk(w),b))
if(a.t(0,w).bR()!==0)z.u(0,v,a.t(0,w))}return z},DK:function(a,b){var z,y,x,w
z=P.Fl(null,null)
for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
z.u(0,w,a.t(0,w).tv(new V.ov(b,1)))}return z},Jz:function(a,b){var z,y,x,w
z=P.Fl(null,null)
for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
z.u(0,w,a.t(0,w).Rq(new V.ov(b,1)))}return z},r3:[function(a,b){var z,y
z=V.wB(a)
y=V.wB(b)
if(z===y)return V.fq(a,b)
else if(z<y)return 1
else return-1},"$2","Oe",4,0,58,61,62],mx:function(a,b){var z,y,x,w,v,u,t
z=["+"]
y=[]
x=[]
for(w=a.gvc().Fb,v=new P.N6(w,w.zN,null,null),v.zq=w.H9;v.G();){u=v.fD
if(!J.xC(u,"0"))y.push(u)
else x.push(u)}H.rd(y,V.Oe())
C.Nm.FV(y,x)
for(w=new H.a7(y,y.length,0,null);w.G();){u=w.lo
t=V.E0(a.t(0,u),u,b)
if(t!=null)z.push(t)}w=z.length
if(w===1)z=0
else if(w===2){if(1>=w)return H.e(z,1)
z=z[1]}return z},Ut:function(a){var z,y,x,w,v,u,t
z=[]
for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
y=J.x(w)
if(y.n(w,"0"))continue
else if(a.t(0,w).bR()===0)continue
else{v=y.Fr(w,",")
for(u=0;u<v.length;++u){t=J.UQ(v[u],0)
if(!C.Nm.tg(z,t))z.push(t)}}}return z},L3:function(a){var z,y,x,w,v
for(z=a.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=null;y.G();){w=y.fD
z=J.x(w)
if(z.n(w,"0"))continue
else{v=z.Fr(w,",")
z=v.length
if(z===1){if(0>=z)return H.e(v,0)
x=J.UQ(v[0],0)
if(x!=null)break}}}return x},M4:function(a){var z,y,x,w,v,u
for(z=a.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9,x=0;y.G();){w=y.fD
v=V.wB(w)
if(v>x){u=a.t(0,w)
z=(u==null?new V.ov(0,1):u).bR()!==0}else z=!1
if(z)x=v}return x},bS:function(a,b){var z,y,x,w
z=P.Fl(null,null)
for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
if(z.t(0,w)==null)z.u(0,w,a.t(0,w))
else z.u(0,w,J.hv(z.t(0,w),a.t(0,w)))}for(y=b.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
if(z.t(0,w)==null)z.u(0,w,b.t(0,w))
else z.u(0,w,J.hv(z.t(0,w),b.t(0,w)))}return z},lK:function(a,b){var z,y,x,w
for(z=a.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(a.t(0,x)!=null&&a.t(0,x).bR()!==0){w=a.t(0,x)
z=(w==null?new V.ov(0,1):w).bR()
w=b.t(0,x)
if(z!==(w==null?new V.ov(0,1):w).bR())return!1}}for(z=b.gvc().Fb,y=new P.N6(z,z.zN,null,null),y.zq=z.H9;y.G();){x=y.fD
if(b.t(0,x)!=null&&b.t(0,x).bR()!==0){w=a.t(0,x)
z=(w==null?new V.ov(0,1):w).bR()
w=b.t(0,x)
if(z!==(w==null?new V.ov(0,1):w).bR())return!1}}return!0},Bs:function(a,b){var z,y,x,w,v,u,t,s,r
z=P.Fl(null,null)
for(y=a.gvc().Fb,x=new P.N6(y,y.zN,null,null),x.zq=y.H9;x.G();){w=x.fD
v=a.t(0,w)
if((v==null?new V.ov(0,1):v).bR()===0)continue
for(y=b.gvc().Fb,u=new P.N6(y,y.zN,null,null),u.zq=y.H9;u.G();){t=u.fD
v=b.t(0,t)
if((v==null?new V.ov(0,1):v).bR()===0)continue
v=a.t(0,w)
if(v==null)v=new V.ov(0,1)
s=b.t(0,t)
v=v.tv(s==null?new V.ov(0,1):s)
r=V.lT(w,t)
if(z.t(0,r)==null)z.u(0,r,v)
else z.u(0,r,J.hv(z.t(0,r),v))}}return z}}},c8:{"^":"Tp:10;a,b",$1:function(a){return this.b.push(this.a.t(0,a).gv5())},$isPe:true},Vu:{"^":"Tp:10;a",$1:function(a){return this.a.push(a)},$isPe:true},ca:{"^":"Tp:10;a",$1:function(a){return this.a.push(a)},$isPe:true}}],["mymath","Algebra/web/mymath.dart",,K,{"^":"",WL:[function(a){return typeof a==="number"&&C.CD.Y(a,1)===0},"$1","Ep",2,0,63,64],k7:[function(a){var z,y,x,w,v,u
z=J.iN(a)
y=z.gB(a)
if(typeof y!=="number")return y.D()
if(y>2){x=z.Jk(a,1)
return K.k7([z.t(a,0),K.k7(x)])}else if(z.gB(a)===2){w=z.t(a,0)
v=z.t(a,1)
w=J.yH(w)
v=J.yH(v)
if(!K.WL(w)||!K.WL(v))return 1
if(w===0)return v
if(v===0)return w
for(;v>=1;w=v,v=u)u=C.CD.Y(w,v)
return w}else if(z.gB(a)===1)return J.yH(z.t(a,0))
else return 0},"$1","mm",2,0,65,66],eO:[function(a){var z,y,x,w,v
z=J.iN(a)
y=z.gB(a)
if(typeof y!=="number")return y.D()
if(y>2){x=z.Jk(a,1)
return K.eO([z.t(a,0),K.eO(x)])}else if(z.gB(a)===2){w=z.t(a,0)
v=z.t(a,1)
return J.yH(J.vX(w,v))/K.k7([w,v])}else if(z.gB(a)===1)return z.t(a,0)
else return 1},"$1","Yd",2,0,65,66]}],["polyfrac","Algebra/web/polyfrac.dart",,O,{"^":"",GW:function(a){var z=[]
z.push("*")
C.Nm.FV(z,a)
return V.vg(z)},uX:{"^":"a;Mc<,v5<",O6:function(){var z,y
z=O.GW(this.Mc)
y=this.v5
return y.length===0?z:["/",z,O.GW(y)]},ij:function(){var z,y,x
z=this.v5
y=z.length
x=this.Mc
if(y===1){if(0>=y)return H.e(z,0)
return new O.uX(x,E.Sc(z[0]))}else return new O.uX(x,z)},od:function(a){var z,y,x
z={}
y=[]
C.Nm.FV(y,this.Mc)
x=[]
z.a=!1
H.bQ(this.v5,new O.Vf(z,a,x))
if(!z.a)y.push(a)
return new O.uX(y,x)},q8:function(a){var z={}
z.a=new O.uX(this.Mc,this.v5)
H.bQ(a,new O.WH(z))
return z.a},static:{GZ:[function(a){var z=J.x(a)
if(!!z.$iszM&&J.xC(z.t(a,0),"/")&&z.gB(a)===3)return new O.uX([K.Ye(z.t(a,1)).BC()],[K.Ye(z.t(a,2)).BC()])
else return new O.uX([K.Ye(a).BC()],[])},"$1","mX",2,0,67]}},Vf:{"^":"Tp:10;a,b,c",$1:function(a){if(J.xC(a,this.b)&&!this.a.a)this.a.a=!0
else this.c.push(a)},$isPe:true},WH:{"^":"Tp:10;a",$1:function(a){var z,y
z=this.a
y=z.a.od(a)
z.a=y
return y},$isPe:true}}],["round","Algebra/web/round.dart",,F,{"^":"",lq:[function(a,b){var z,y,x,w
z=J.r0(a,b==null?6:b)
if(H.b0(z,".",0))y=!H.b0(z,"e",0)
else y=!1
if(y){for(x=z.length-1;x>0;--x)if(z[x]==="0")continue
else break
w=C.xB.Nj(z,0,x+1)
if(C.xB.cn(w,".")===w.length-1){w=C.xB.Nj(w,0,x)
if(w==="-0")return"0"
else return w}else return w}else return z},function(a){return F.lq(a,null)},null,"$2","$1","xR",2,2,68,69,70,71],hb:function(a){var z,y,x
z=J.Wx(a)
if(!z.gkZ(a))return a
if(z.F(a,0)){y=z.Ap(a)
a=y+C.CD.yu(C.CD.UD(z.W(a,y)*1000))/1000}else{x=z.a3(a)
a=x+C.CD.yu(C.CD.UD(z.W(a,x)*1000))/1000}return a},T5:function(a){var z,y,x,w,v
z=J.Wx(a)
if(!z.gkZ(a))return a
if(z.F(a,0)){y=z.Ap(a)
x=z.W(a,y)
if(Math.abs(x)>0.00001||y!==0)a=y+C.CD.yu(C.CD.UD(x*1000000))/1000000}else{w=z.a3(a)
v=z.W(a,w)
if(Math.abs(v)>0.00001||w!==0)a=w+C.CD.yu(C.CD.UD(v*1000000))/1000000}return a}}],["solvegen","Algebra/web/solvegen.dart",,M,{"^":"",O1:function(a,b){var z,y,x
z=a.pS
y=M.cA([z.pY,z.NM.te(),z.Hm.te()],b,M.Ib(),!0,a.pS.NM.oM.t(0,"#").WW(),!0)
x=new N.cz(a.nD,a.pS,[],null)
x.zr=y
return x},Ix:function(a,b,c){var z,y,x
z=a.pS
y=M.cA([z.pY,z.NM.te(),z.Hm.te()],b,M.Q1(c),!0,a.pS.NM.oM.t(0,"#").WW(),!0)
x=new N.cz(a.nD,a.pS,[],null)
x.zr=y
return x},cA:function(a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z={}
y=[]
y.push(["msgstr","Let's find the critical points of the inequality."])
if(0>=a5.length)return H.e(a5,0)
x=a5[0]
z.a="="
w=J.x(x)
if(w.n(x,"<")||w.n(x,">"))z.a="<"
else z.a="\u2264"
w=a5.length
if(1>=w)return H.e(a5,1)
v=a5[1]
if(2>=w)return H.e(a5,2)
u=["=",v,a5[2]]
y.push(["MDiv",V.KF(u)])
t=a7.$1(u)
s=t.gzr()
r=t.gNP()
q=t.grR()
p=t.guR()
o=t.gkr()
n=[]
w=q!=null
if(w)C.Nm.FV(n,q)
v=p!=null
if(v)C.Nm.FV(n,p)
m=H.VM(new H.A8(H.VM(new H.A8(n,new M.p6()),[null,null]).zH(0).br(0),new M.F0()),[null,null]).br(0)
l=H.VM(new H.A8(H.VM(new H.A8(r,new M.I8()),[null,null]).zH(0).br(0),new M.eS()),[null,null]).br(0)
C.Nm.FV(l,m)
k=H.VM(new H.A8(l,new M.w7()),[null,null]).br(0)
if(o!=null){j=H.VM(new H.U5(o,new M.O0(k)),[null])
i=P.F(j,!0,H.ip(j,"mW",0))
C.Nm.FV(l,H.VM(new H.A8(H.VM(new H.A8(i,new M.nz()),[null,null]).zH(0).br(0),new M.ym()),[null,null]).br(0))}else i=null
if(b0){j=J.w1(s)
j.h(s,["msgstr","<hr>"])
j.h(s,["msgstr","<u>Critical points:</u>"])
if(r.length>0){if(n.length>0)j.h(s,O.jZ(r,O.ax("="),"(Makes both sides equal)"))
else j.h(s,O.jZ(r,O.ax("="),null))
h=!0}else h=!1
if(w&&q.length>0){j.h(s,O.jZ(q,O.ax("="),"(Makes left denominator equal to 0)"))
h=!0}if(v&&p.length>0){j.h(s,O.jZ(p,O.ax("="),"(Makes right denominator equal to 0)"))
h=!0}if(i!=null&&i.length>0){j.h(s,O.jZ(i,O.ax("="),"(Makes term equal to 0)"))
h=!0}if(!h)j.h(s,["msgstr","No critical points."])}H.rd(l,new M.Ob())
g=[]
f=[]
e=[]
w=l.length
if(w===0)g.push(new M.wj(new M.cv(0/0,$.hJ.$1(0/0),!1,!1),new M.cv(0/0,$.hJ.$1(0/0),!1,!1)))
else if(w===1){d=$.hJ.$1(0/0)
if(0>=l.length)return H.e(l,0)
g.push(new M.wj(new M.cv(0/0,d,!1,!1),l[0]))
if(0>=l.length)return H.e(l,0)
g.push(new M.wj(l[0],new M.cv(0/0,$.hJ.$1(0/0),!1,!1)))}else for(c=0;w=l.length,c<=w;++c){if(c===0)b=new M.cv(0/0,$.hJ.$1(0/0),!1,!1)
else{v=c-1
if(v<0)return H.e(l,v)
b=l[v]}w=l.length
if(c===w)a=new M.cv(0/0,$.hJ.$1(0/0),!1,!1)
else{if(c>=w)return H.e(l,c)
a=l[c]}g.push(new M.wj(b,a))}if(g.length>0){w=J.w1(s)
w.h(s,["msgstr","Check intervals in between critical points. (Test values in the intervals to see if they work.)"])
for(c=0;c<g.length;++c){a0=g[c]
b=$.hJ.$1(a0.My.gXx())
a=$.hJ.$1(a0.m7.gXx())
v=J.Qc(b)
a1=J.FW(v.g(b,a),2)
if(v.gG0(b)&&J.cE(a))a1=0
else if(v.gG0(b))a1=J.xH(a,1)
else if(J.cE(a))a1=v.g(b,1)
a2=Q.Fd(a6,a1,a9)
if(J.xC($.hJ.$1(a2),1)){f.push(a0)
w.h(s,["MDiva",M.Eh(a0,a9,z.a),"(Works in original inequality)"])}else{e.push(a0)
w.h(s,["MDiva",M.Eh(a0,a9,z.a),"(Doesn't work in original inequality)"])}}}w=J.w1(s)
w.h(s,["msgstr","<hr>"])
w.h(s,["msgstr","<u>Answer:</u>"])
a3=H.VM(new H.A8(f,new M.na(z,a9)),[null,null]).br(0)
for(v=J.Qc(a9),c=0;c<e.length-1;++c){if(z.a==="\u2264"){j=e[c].m7.gIj()
a4=c+1
if(a4>=e.length)return H.e(e,a4)
if(J.xC(j,e[a4].My.gIj())){if(c>=e.length)return H.e(e,c)
j=e[c].m7.gai()}else j=!1}else j=!1
if(j){j=v.g(a9,"=")
if(c>=e.length)return H.e(e,c)
C.Nm.h(a3,J.WB(j,V.KF(e[c].m7.gXx())))}}if(a3.length>0)w.h(s,["MDiv",C.Nm.zV(a3,"\\,\\,\\text' or '\\,\\,")])
else w.h(s,["msgstr","No solutions."])
C.Nm.FV(y,s)
return y},Eh:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=a.gMy()
y=a.gm7()
x=z.gXx()
w=y.gXx()
v=$.hJ.$1(x)
u=$.hJ.$1(w)
t=!z.gai()?"<":c
s=!y.gai()?"<":c
if(z.gal())t="\u2264"
if(y.gal())s="\u2264"
r=J.Wx(v)
if(r.gG0(v)&&J.cE(u))q="\\text'All real numbers'"
else if(r.gG0(v))q=J.WB(J.WB(b,s),V.KF(w))
else q=J.cE(u)?J.WB(J.WB(b,V.jL(t,new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))),V.KF(x)):J.WB(J.WB(J.WB(J.WB(V.KF(x),t),b),s),V.KF(w))
return q},oa:function(a,b,c){var z,y,x
z=O.wi(b)
if(z.AG().length>1||J.xC(J.pm(z.pS),"="))return a.zl()
if(!z.pS.gNM().oD()||!z.pS.gHm().oD()){if(z.pS.gNM().aY()>4||z.pS.gHm().aY()>4)return a.zl()
y=M.cA(z.pS.qD(),c,M.rR(),!0,z.pS.ob(),!0)
x=new N.cz(a.nD,a.pS,[],null)
x.zr=y
return x}else{y=M.cA(z.pS.qD(),c,O.c0(),!0,z.pS.ob(),!1)
x=new N.cz(a.nD,a.pS,[],null)
x.zr=y
return x}},dM:[function(a){var z=O.GL(a)
z.yf()
return O.xa(z)},"$1","Ts",2,0,53],VH:[function(a){var z,y,x,w
z=O.GL(a)
if(!z.pS.gNM().oD()||!z.pS.gHm().oD())z.aa()
z.En()
y=O.xa(z)
x=M.YL(a,y.zr,y.NP)
w=O.ZN(a)
if(w.t(0,"ldanslist")!=null)x.rR=w.t(0,"ldanslist")
if(w.t(0,"rdanslist")!=null)x.uR=w.t(0,"rdanslist")
return x},"$1","rR",2,0,53],YL:function(a,b,c){var z=[]
if(c.length>0)J.hv(b,["msgstr","<hr>"])
O.ly(b,c,z,a,"Check possible critical points.")
return new O.Tu(b,z,null,null,null,null,null)},FB:function(a,b,c,d,e){var z,y,x,w
if(!J.xC(J.UQ(b,0),"="))return M.oa(a,b,c)
z=O.wi(b)
if(z.AG().length>1)return a.zl()
if(!z.pS.gNM().oD()||!z.pS.gHm().oD()){z.aa()
y=O.yJ(z.pS.qD(),c,O.c0(),!0,e).zr}else if(d)y=O.yJ(z.pS.qD(),c,O.c0(),!0,e).zr
else{z.En()
y=[]}x=a.nD
C.Nm.FV(x,z.nD)
w=new N.cz(x,a.pS,[],null)
w.zr=y
C.Nm.FV(a.NP,z.NP)
return w},Q1:function(a){return new M.Oj(a)},pM:[function(a){var z,y,x,w,v
z=O.bT(a)
y=M.xd(z,a,a,!1)
x=y.pS
w=y.zr
v=O.ic(y.nD,1)[0]
J.bj(v,w)
return new O.Tu(v,z.NP,null,null,null,null,x)},"$1","Ib",2,0,53,27],xd:function(a,b,c,d){var z,y,x
z=J.iN(b)
y=N.Ux(z.t(b,1))
x=N.Ux(z.t(b,2))
if(y.J6()===0&&x.J6()===0)return M.FB(a,b,c,!1,d)
else if(a.Xb()){z=a.pS
return M.FB(a,[z.pY,z.NM.te(),z.Hm.te()],c,!1,d)}else if(y.J6()===1&&x.J6()===1)return M.wg(a,y,x,c,d)
else if(y.J6()===1&&x.J6()===0)return M.YR(a,c,d)
else if(y.J6()===0&&x.J6()===1)return M.YR(a,c,d)
else if(y.J6()===2&&x.J6()===0)return M.eg(a,y,x,c,d)
return a.zl()},Jf:[function(a){var z,y,x,w
z=O.bT(a)
y=V.KF(a)
x=z.pS
w=V.KF([x.pY,x.NM.te(),x.Hm.te()])
x=z.nD
x.push(["step",y,""])
if(z.pS.NM.Ma.hL()||z.pS.Hm.Ma.hL())return z.OQ()
if(!J.xC(y,w))x.push(["step",w,""])
return Q.Sa(M.xd(z,a,a,!0).br(0))},"$1","kC",2,0,33,27],DJ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.yC("#","&")
z=a.pS.NM.Ma.gBl().t(0,"#1")
y=a.pS.NM.Ma.gBl().t(0,"&1")
if(z.bR()!==1||y.bR()!==1)return a.zl()
x=a.pS.NM.oM.t(0,"#")
w=a.pS.NM.oM.t(0,"&")
v=x.gKw()
if(0>=v.length)return H.e(v,0)
u=v[0]
v=w.gKw()
if(0>=v.length)return H.e(v,0)
t=v[0]
s=x.gQi()==="ln"?"ln":"log"
v=a.nD
v.push(["mmsg",V.KF(["=",[s,["*",u.te(),t.te()]],a.pS.Hm.te()])])
r=K.Ye(["var","#"]).BC()
q=u.tv(t)
P.EF(["0",new V.ov(0,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
p=P.EF(["#",new F.Vn(s,[q])],null,null)
P.Fl(null,null)
o=new F.GC(r,p)
n=new O.xe(o,a.pS.Hm,"=")
a.pS=n
v.push(["mmsg",V.KF(["=",o.te(),n.Hm.te()])])
return M.t8(a,b,a.pS.NM.oM.t(0,"#"),"#",!0,c)},LF:function(a,b,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=a.pS.NM.oM.t(0,"#")
y=a.pS.Hm.oM.t(0,"&")
a.WL("#","&")
x=a.pS.NM.Ma.Sw(new V.eu(P.EF(["0",new V.ov(2,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
w=a.pS.Hm.Ma.Sw(new V.eu(P.EF(["0",new V.ov(2,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
v=a.pS
u=v.NM.oM
P.Fl(null,null)
v=v.Hm.oM
P.Fl(null,null)
t=a.nD
t.push(["step",["=",new F.GC(x,u).te(),new F.GC(w,v).te()],"Square both sides"])
s=x.ED("#2")
r=x.ED("#1")
q=x.ED("0")
v=z.gKw()
if(0>=v.length)return H.e(v,0)
p=v[0]
v=y.gKw()
if(0>=v.length)return H.e(v,0)
o=v[0]
n=w.ED("&2")
m=w.ED("&1")
l=w.ED("0")
k=V.uN(s,p.te(),V.Bf())
j=V.uN(r,["sqrt",p.te()],V.Bf())
i=q.O6()
h=V.uN(n,o.te(),V.Bf())
g=V.uN(m,["sqrt",o.te()],V.Bf())
f=l.O6()
e=q.bR()!==0?["+",k,j,i]:k
t.push(["mmsg",V.KF(["=",e,l.bR()!==0?["+",h,g,f]:h])])
d=V.uN(r,["var","#"],V.Bf())
c=V.uN(m,["var","&"],V.Bf())
v=O.F5(K.Ye(["+",d,k,i]).BC(),K.Ye(["+",c,h,f]).BC(),a.pS.NM.oM)
a.pS=v
t.push(["mmsg",V.KF([v.pY,v.NM.te(),v.Hm.te()])])
if(q.bR()!==0)return M.Wn(a,b,a.pS.NM.oM.t(0,"#"),"#",a0)
else{v=l.bR()
u=a.pS
if(v!==0)return M.Wn(a,b,u.Hm.oM.t(0,"&"),"&",a0)
else return M.FB(a,[u.pY,u.NM.te(),u.Hm.te()],b,!0,a0)}},eg:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
if(!M.Bd(a.pS.pY,b,c))return a.zl()
z=a.pS.NM.oM.t(0,"#")
y=a.pS.NM.oM.t(0,"&")
if(z.gQi()==="abs"&&y.gQi()==="abs")if(!J.xC(a.pS.pY,"="))return M.O1(a,d)
else return M.hZ(a,d,e)
if(!J.xC(a.pS.pY,"="))return a.zl()
if(z.gQi()==="sqrt"&&y.gQi()==="sqrt"){z=a.pS.NM.oM.t(0,"#")
y=a.pS.NM.oM.t(0,"&")
a.yC("#","&")
x=a.pS.NM.Ma.Sw(new V.eu(P.EF(["0",new V.ov(2,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
w=a.pS
v=w.NM.oM
P.Fl(null,null)
w=w.Hm.Ma.Sw(new V.eu(P.EF(["0",new V.ov(2,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0))
u=a.pS.NM.oM
P.Fl(null,null)
t=new F.GC(w,u)
u=a.nD
u.push(["step",["=",new F.GC(x,v).te(),t.te()],"Square both sides"])
s=x.gBl().t(0,"#2")
r=x.gBl().t(0,"#1,&1")
q=x.gBl().t(0,"&2")
v=z.gKw()
if(0>=v.length)return H.e(v,0)
p=v[0]
v=y.gKw()
if(0>=v.length)return H.e(v,0)
o=v[0]
n=V.uN(s,p.te(),V.Bf())
m=V.uN(r,["sqrt",["*",p.te(),o.te()]],V.Bf())
l=V.uN(q,o.te(),V.Bf())
u.push(["mmsg",V.KF(["=",["+",n,m,l],t.te()])])
k=K.Ye(["+",V.uN(r,["var","#"],V.Bf()),n,l]).BC()
j=p.tv(o)
P.EF(["0",new V.ov(0,1)],null,null)
P.EF(["0",new V.ov(1,1)],null,null)
i=P.EF(["#",new F.Vn("sqrt",[j])],null,null)
v=O.F5(k,t.Ma,i)
a.pS=v
u.push(["mmsg",V.KF([v.pY,v.NM.te(),v.Hm.te()])])
return M.YR(a,d,e)}if(z.gQi()==="log"&&y.gQi()==="log")return M.DJ(a,d,e)
if(z.gQi()==="ln"&&y.gQi()==="ln")return M.DJ(a,d,e)
return a.zl()},JF:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
if(a.pS.NM.Ma.Kg()>2||a.pS.Hm.Ma.Kg()>2)return a.zl()
if(!a.pS.NM.Ma.oD()||!a.pS.Hm.Ma.oD())return a.zl()
z=c.gKw()
if(0>=z.length)return H.e(z,0)
y=z[0]
x=[]
C.Nm.FV(x,y.AG())
C.Nm.FV(x,a.pS.NM.Ma.AG())
C.Nm.FV(x,a.pS.Hm.Ma.AG())
z=P.Ls(null,null,null,H.Kp(x,0))
z.FV(0,x)
if(z.br(0).length>2)return a.zl()
a.fB(d)
if(a.Xb()){z=a.pS
return M.FB(a,[z.pY,z.NM.te(),z.Hm.te()],b,!1,!1)}for(z=a.pS.NM.Ma.gBl().gvc().Fb,w=new P.N6(z,z.zN,null,null),w.zq=z.H9;w.G();){v=w.fD
if(J.J5(V.Fi(v,d),1)&&V.wB(v)>1){z=a.nD
if(J.xC(a.pS.pY,"="))z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this equation.</font>",""])
else z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this inequality.</font>",""])
z.push(["msg","<font color=\"red\" style=\"line-height:30px\">If you need help with this problem, please click the button (with the \"?\") on the bottom right, and let me know. I'll get back to you.</font>",""])
return new N.cz(z,a.pS,[],null)}}for(z=a.pS.Hm.Ma.gBl().gvc().Fb,w=new P.N6(z,z.zN,null,null),w.zq=z.H9;w.G();){v=w.fD
if(J.J5(V.Fi(v,d),1)&&V.wB(v)>1){z=a.nD
if(J.xC(a.pS.pY,"="))z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this equation.</font>",""])
else z.push(["msg","<font color=\"red\" style=\"line-height:30px\">Sorry, I don't know how to solve this inequality.</font>",""])
z.push(["msg","<font color=\"red\" style=\"line-height:30px\">If you need help with this problem, please click the button (with the \"?\") on the bottom right, and let me know. I'll get back to you.</font>",""])
return new N.cz(z,a.pS,[],null)}}z=a.nD
if(z.length>2){w=a.pS
z.push(["step",[w.pY,w.NM.te(),w.Hm.te()],"Solve Absolute Value"])}else{z.push(["msg","Solve Absolute Value."])
w=a.pS
z.push(["mmsg",V.KF([w.pY,w.NM.te(),w.Hm.te()])])}if(J.xC(a.pS.pY,"=")){z=a.pS
return a.v2([z.pY,z.NM.te(),z.Hm.te()],b,e)}else{if(y.Kg()>1||y.aY()>1)return a.zl()
w=a.pS.Hm.Ma.Kg()===0&&y.oD()
u=a.pS
if(w){t=O.HZ([u.pY,u.NM.te(),u.Hm.te()])
s=t.zr
r=t.NP
q=t.bd
p=[]
if(J.xC(a.pS.pY,"=")&&a.pS.Hm.Ma.Kg()>0){J.hv(s,["msgstr","<hr>"])
O.ly(s,r,p,b,"Check answers. (Plug them in to make sure they work.)")}else C.Nm.FV(p,r)
w=J.w1(s)
w.h(s,["msgstr","<hr>"])
w.h(s,["msgstr","<u>Answer:</u>"])
w.h(s,O.jZ(p,O.ax(a.pS.pY),null))
o=new N.cz(z,a.pS,[],null)
o.zr=s
o.bd=q
return o}else{s=M.cA([u.pY,u.NM.te(),u.Hm.te()],b,M.An(),!0,a.pS.KT().WW(),!0)
o=new N.cz(z,a.pS,[],null)
o.zr=s
return o}}},Wn:function(a,b,c,d,e){var z,y,x,w
if(a.pS.NM.Ma.Kg()>2||a.pS.Hm.Ma.Kg()>2)return a.zl()
if(!a.pS.NM.Ma.oD()||!a.pS.Hm.Ma.oD())return a.zl()
if(!J.xC(a.pS.pY,"=")){z=c.gKw()
if(0>=z.length)return H.e(z,0)
return M.Ix(a,b,["=",z[0].te(),0])}z=c.gKw()
if(0>=z.length)return H.e(z,0)
y=z[0]
if(!y.oD())return a.zl()
x=[]
C.Nm.FV(x,y.AG())
C.Nm.FV(x,a.pS.NM.Ma.AG())
C.Nm.FV(x,a.pS.Hm.Ma.AG())
z=P.Ls(null,null,null,H.Kp(x,0))
z.FV(0,x)
if(z.br(0).length>2)return a.zl()
a.fB(d)
if(a.pS.Hm.Ma.Kg()>2)return a.zl()
z=a.nD
if(z.length>2){w=a.pS
z.push(["step",[w.pY,w.NM.te(),w.Hm.te()],"Solve Square Root"])}else{z.push(["msg","Solve Square Root."])
w=a.pS
z.push(["mmsg",V.KF([w.pY,w.NM.te(),w.Hm.te()])])}z=a.pS
return a.tt([z.pY,z.NM.te(),z.Hm.te()],b,M.FA(),!0,e)},rH:function(a,b,c,d,e){var z,y,x,w,v
if(a.pS.NM.Ma.Kg()>1||a.pS.Hm.Ma.Kg()>1)return a.zl()
if(!a.pS.NM.Ma.oD()||!a.pS.Hm.Ma.oD())return a.zl()
z=c.gKw()
if(0>=z.length)return H.e(z,0)
y=z[0]
z=c.gKw()
if(1>=z.length)return H.e(z,1)
x=z[1]
w=[]
C.Nm.FV(w,x.Mz())
C.Nm.FV(w,a.pS.NM.Ma.AG())
C.Nm.FV(w,a.pS.Hm.Ma.AG())
z=P.Ls(null,null,null,H.Kp(w,0))
z.FV(0,w)
if(z.br(0).length>2)return a.zl()
if(x.oD()){if(!(y.Kg()===0&&x.Kg()<=4))z=y.Kg()===1&&x.Kg()===0
else z=!0
if(z);else return a.zl()}else if(y.Kg()===0&&x.Kg()===0&&x.aY()===1);else return a.zl()
if(!J.xC(a.pS.pY,"="))if(y.Kg()===1&&x.Kg()===0&&$.SO.$1(x.av().bR())!==!0){z=c.gKw()
if(0>=z.length)return H.e(z,0)
return M.Ix(a,b,["=",z[0].te(),0])}else return M.O1(a,b)
a.fB(d)
if(a.pS.Hm.Ma.Kg()>0)z=!(x.oD()&&x.Kg()===0&&J.yH(x.av().gMc())===1&&$.SO.$1(x.av().gv5())===!0)
else z=!1
if(z)return a.zl()
z=a.nD
if(z.length>2){v=a.pS
z.push(["step",[v.pY,v.NM.te(),v.Hm.te()],"Solve Exponent"])}else{z.push(["msg","Solve Exponent."])
v=a.pS
z.push(["mmsg",V.KF([v.pY,v.NM.te(),v.Hm.te()])])}if(x.oD()&&y.Kg()===0&&x.Kg()<=4){z=M.Um(O.c0())
v=a.pS
return a.tt([v.pY,v.NM.te(),v.Hm.te()],b,z,!1,e)}else if(x.oD()&&y.Kg()===1&&x.Kg()===0){z=a.pS
return a.tt([z.pY,z.NM.te(),z.Hm.te()],b,M.KB(),!0,e)}else if(!x.oD()&&y.Kg()===0&&x.Kg()===0&&x.aY()===1){z=M.Um(O.yb())
v=a.pS
return a.tt([v.pY,v.NM.te(),v.Hm.te()],b,z,!0,e)}else return a.zl()},t8:function(a,b,c,d,e,f){var z,y,x,w,v
if(a.pS.NM.Ma.Kg()>1||a.pS.Hm.Ma.Kg()>1)return a.zl()
if(!a.pS.NM.Ma.oD()||!a.pS.Hm.Ma.oD())return a.zl()
if(!J.xC(a.pS.pY,"="))return a.zl()
z=c.gKw()
if(0>=z.length)return H.e(z,0)
y=z[0]
if(y.oD()){if(y.Kg()>3)return a.zl()}else if(y.Kg()<=1&&y.aY()<=1);else return a.zl()
x=[]
C.Nm.FV(x,y.Mz())
C.Nm.FV(x,a.pS.NM.Ma.AG())
C.Nm.FV(x,a.pS.Hm.Ma.AG())
z=P.Ls(null,null,null,H.Kp(x,0))
z.FV(0,x)
if(z.br(0).length>2)return a.zl()
a.fB("#")
if(a.pS.Hm.Ma.Kg()>0)return a.zl()
z=a.nD
if(z.length>2){w=a.pS
z.push(["step",[w.pY,w.NM.te(),w.Hm.te()],"Solve Logarithm"])}else{z.push(["msg","Solve Logarithm."])
w=a.pS
z.push(["mmsg",V.KF([w.pY,w.NM.te(),w.Hm.te()])])}v=e&&!0
z=y.oD()
w=a.pS
if(z){z=M.oB(O.c0())
return a.tt([w.pY,w.NM.te(),w.Hm.te()],b,z,v,f)}else{z=M.oB(O.yb())
return a.tt([w.pY,w.NM.te(),w.Hm.te()],b,z,!0,f)}},YR:function(a,b,c){var z,y
z=a.pS.KT()
y=z.gQi()
if(y==="abs")return M.JF(a,b,z,"#",c)
else if(y==="sqrt")return M.Wn(a,b,z,"#",c)
else if(y==="^")return M.rH(a,b,z,"#",c)
else if(y==="log"||y==="ln")return M.t8(a,b,z,"#",!1,c)
else return a.zl()},oB:function(a){return new M.TY(a)},eE:[function(a){var z,y,x,w,v
z=[]
y=a.length
if(0>=y)return H.e(a,0)
x=a[0]
if(1>=y)return H.e(a,1)
y=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
z.push(["MDiva",V.KF([x,y,["^",a[2],2]]),"(Square both sides)"])
if(1>=a.length)return H.e(a,1)
y=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
w=[x,y,K.Ye(["^",a[2],2]).BC().Ip(V.Bf())]
z.push(["MDiv",V.KF(w)])
v=O.hC(w)
C.Nm.FV(z,v.zr)
return new O.Tu(z,v.NP,null,v.rR,v.uR,null,null)},"$1","FA",2,0,53],kv:function(a,b){var z,y,x,w,v,u
z=a.L7()
z.gQi()
y=b.L7()
y.gQi()
if(!a.gMa().oD()||!b.gMa().oD())return!1
x=z.gKw()
if(0>=x.length)return H.e(x,0)
w=x[0]
x=y.gKw()
if(0>=x.length)return H.e(x,0)
v=x[0]
if(w.Kg()>2)return!1
if(!w.oD())return!1
if(v.Kg()>2)return!1
if(!v.oD())return!1
u=[]
C.Nm.FV(u,w.AG())
C.Nm.FV(u,v.AG())
x=P.Ls(null,null,null,H.Kp(u,0))
x.FV(0,u)
if(x.br(0).length>1)return!1
return!0},RZ:function(a,b){if(a.gMa().Kg()===1&&a.gMa().gBl().gvc().Fb.X5===1)if(a.gMa().PY(1).bR()===1&&a.gMa().PY(0).bR()===0);else return!1
else return!1
if(b.gMa().Kg()===1&&b.gMa().gBl().gvc().Fb.X5===1)if(b.gMa().PY(1).bR()===1&&b.gMa().PY(0).bR()===0);else return!1
else return!1
return!0},tR:function(a){var z,y
z=["#","0"]
C.Nm.FV(z,a.gMa().AG())
y=P.Ls(null,null,null,H.Kp(z,0))
y.FV(0,z)
if(y.br(0).length!==2)return!1
return!0},oG:function(a,b){if(M.tR(a)&&M.tR(b))return!0
return!1},Bd:function(a,b,c){var z,y,x,w,v,u,t
z=b.goM().t(0,"#")
y=b.goM().t(0,"&")
if(!b.gMa().oD()||!c.gMa().oD())return!1
x=z.gKw()
if(0>=x.length)return H.e(x,0)
w=x[0]
x=y.gKw()
if(0>=x.length)return H.e(x,0)
v=x[0]
if(w.Kg()>2)return!1
if(!w.oD())return!1
if(v.Kg()>2)return!1
if(!v.oD())return!1
u=[]
C.Nm.FV(u,w.AG())
C.Nm.FV(u,v.AG())
x=P.Ls(null,null,null,H.Kp(u,0))
x.FV(0,u)
u=x.br(0)
if(u.length>1)return!1
t=[]
C.Nm.FV(t,u)
C.Nm.FV(t,b.gMa().AG())
C.Nm.FV(t,c.gMa().AG())
x=P.Ls(null,null,null,H.Kp(t,0))
x.FV(0,t)
if(x.br(0).length!==3)return!1
if(b.gMa().Kg()>1)return!1
if(c.gMa().Kg()>1)return!1
return!0},hZ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
a.fB("#")
z=a.pS.Hm.oM.t(0,"#").gKw()
if(0>=z.length)return H.e(z,0)
y=z[0]
z=a.pS
x=z.NM.oM
P.Fl(null,null)
w=new F.GC(y,x)
z=z.Hm
x=z.Ma
z=z.oM
P.Fl(null,null)
v=new F.GC(x,z)
z=w.tv(new F.GC(new V.eu(P.EF(["0",new V.ov(1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null)))
x=v.tv(new F.GC(new V.eu(P.EF(["0",new V.ov(-1,1)],null,null),P.EF(["0",new V.ov(1,1)],null,null),0),P.Fl(null,null)))
u=V.KF(["=",w.te(),v.te()])
t=V.KF(["=",w.te(),["-",v.te()]])
s=a.nD
s.push(["mmsg",C.xB.g(C.xB.g("\\text'Either '\\,\\,",u)+"\\,\\,\\text' or '\\,\\,",t)])
s.push(["msg","<hr>"])
a.pS.Hm.oM.t(0,"&")
r=[]
r.push(["MDiv",C.xB.g("\\text'Part 1: '\\,\\,",u)])
u=[]
q=new O.Zw(new O.xe(w,v,"="),u,[])
q.fB("&")
C.Nm.FV(r,O.ic(u,1)[0])
u=q.pS
p=O.TT(q,[u.pY,u.NM.te(),u.Hm.te()],b)
C.Nm.FV(r,p.zr)
r.push(["msgstr","<hr>"])
r.push(["msgstr","<hr>"])
r.push(["MDiv",C.xB.g("\\text'Part 2: '\\,\\,",t)])
t=[]
o=new O.Zw(new O.xe(z,x,"="),t,[])
o.fB("&")
C.Nm.FV(r,O.ic(t,1)[0])
t=o.pS
n=O.TT(o,[t.pY,t.NM.te(),t.Hm.te()],b)
C.Nm.FV(r,n.zr)
m=[]
C.Nm.FV(m,p.NP)
C.Nm.FV(m,n.NP)
l=O.x9(m)
if(c){r.push(["msgstr","<hr>"])
r.push(["msgstr","<u>Answer:</u>"])
r.push(O.jZ(l,O.ax(a.pS.pY),null))}C.Nm.FV(a.NP,l)
k=new N.cz(s,a.pS,[],null)
k.zr=r
return k},Wm:function(a,b,c,d,e){var z,y,x
z=b.L7().gKw()
if(0>=z.length)return H.e(z,0)
z=z[0]
y=c.L7().gKw()
if(0>=y.length)return H.e(y,0)
if(J.xC(z,y[0]))return M.JF(a,d,b.L7(),"#",e)
else if(M.RZ(b,c)){z=a.nD
z.push(["msg","Solve Absolute Value."])
y=a.pS
z.push(["mmsg",V.KF([y.pY,y.NM.te(),y.Hm.te()])])
y=a.pS.pY
z=b.te()
x=F.Ah(c.L7())
if(1>=x.length)return H.e(x,1)
return a.v2([y,z,x[1]],d,e)}else if(M.oG(b,c))return M.hZ(a,d,e)
else return a.zl()},wg:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=b.L7()
y=z.gQi()
x=c.L7()
w=x.gQi()
if(y==="abs"&&w==="abs"){if(!M.kv(b,c))return a.zl()
if(!J.xC(a.pS.pY,"="))return M.O1(a,d)
else return M.Wm(a,b,c,d,e)}else if(y==="^"&&w==="^"){if(!b.gMa().oD()||!c.gMa().oD())return a.zl()
v=z.gKw()
if(0>=v.length)return H.e(v,0)
u=v[0]
v=z.gKw()
if(1>=v.length)return H.e(v,1)
t=v[1]
v=x.gKw()
if(0>=v.length)return H.e(v,0)
s=v[0]
v=x.gKw()
if(1>=v.length)return H.e(v,1)
r=v[1]
if(u.Kg()>0)return a.zl()
if(t.Kg()>1)return a.zl()
if(!t.oD())return a.zl()
if(s.Kg()>0)return a.zl()
if(r.Kg()>1)return a.zl()
if(!r.oD())return a.zl()
q=[]
C.Nm.FV(q,t.AG())
C.Nm.FV(q,r.AG())
v=P.Ls(null,null,null,H.Kp(q,0))
v.FV(0,q)
if(v.br(0).length>1)return a.zl()
if(b.gMa().Kg()===1)if(b.gMa().PY(1).bR()===1&&b.gMa().PY(0).bR()===0);else return a.zl()
else return a.zl()
if(c.gMa().Kg()===1)if(c.gMa().PY(1).bR()===1&&c.gMa().PY(0).bR()===0);else return a.zl()
else return a.zl()
if(!J.xC(a.pS.pY,"="))return M.O1(a,d)
v=a.nD
v.push(["msg","Solve Exponent."])
p=a.pS
v.push(["mmsg",V.KF([p.pY,p.NM.te(),p.Hm.te()])])
p=a.pS
return a.tt([p.pY,p.NM.te(),p.Hm.te()],d,M.pI(),!1,e)}else if(y==="sqrt"&&w==="sqrt"){if(!M.kv(b,c))return a.zl()
if(!J.xC(a.pS.pY,"="))return a.zl()
v=b.L7().gKw()
if(0>=v.length)return H.e(v,0)
v=v[0]
p=c.L7().gKw()
if(0>=p.length)return H.e(p,0)
if(J.xC(v,p[0]))return M.Wn(a,d,b.L7(),"#",e)
if(M.RZ(b,c)){v=a.nD
v.push(["msg","Solve Square Root."])
p=a.pS
v.push(["mmsg",V.KF([p.pY,p.NM.te(),p.Hm.te()])])
p=a.pS
return a.tt([p.pY,p.NM.te(),p.Hm.te()],d,M.UK(),!0,e)}else if(M.oG(b,c))return M.LF(a,d,e)
else return a.zl()}else return a.zl()},xq:[function(a){var z,y,x,w,v,u
z=[]
y=a.length
if(0>=y)return H.e(a,0)
x=a[0]
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
z.push(["MDiva",V.KF([x,["^",w,2],["^",a[2],2]]),"(Square both sides)"])
if(1>=a.length)return H.e(a,1)
w=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
v=[x,w,J.UQ(a[2],1)]
z.push(["MDiv",V.KF(v)])
u=M.dM(v)
C.Nm.FV(z,u.zr)
return new O.Tu(z,u.NP,null,null,null,null,null)},"$1","UK",2,0,53],mi:[function(a){var z,y,x,w,v,u,t
z=[]
y=a.length
if(0>=y)return H.e(a,0)
x=a[0]
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
z.push(["MDiva",V.KF([x,["log",w],["log",a[2]]]),"(Take log of both sides)"])
if(1>=a.length)return H.e(a,1)
w=J.UQ(a[1],2)
if(1>=a.length)return H.e(a,1)
y=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
v=J.UQ(a[2],2)
if(2>=a.length)return H.e(a,2)
z.push(["MDiv",V.KF([x,["*show",w,["log",y]],["*show",v,["log",J.UQ(a[2],1)]]])])
if(1>=a.length)return H.e(a,1)
v=J.UQ(a[1],2)
if(2>=a.length)return H.e(a,2)
y=J.UQ(a[2],1)
if(1>=a.length)return H.e(a,1)
w=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
z.push(["MDiv",V.KF([x,v,["*show",["/",["log",y],["log",w]],J.UQ(a[2],2)]])])
if(1>=a.length)return H.e(a,1)
w=J.UQ(a[1],2)
y=$.hJ
if(2>=a.length)return H.e(a,2)
v=J.UQ(a[2],1)
if(1>=a.length)return H.e(a,1)
v=F.T5(y.$1(["/",["log",v],["log",J.UQ(a[1],1)]]))
if(2>=a.length)return H.e(a,2)
u=[x,w,["*show",v,J.UQ(a[2],2)]]
z.push(["MDiv",V.KF(u)])
t=O.LW(u)
C.Nm.FV(z,t.zr)
return new O.Tu(z,t.NP,null,null,null,null,null)},"$1","pI",2,0,53],Um:function(a){return new M.yP(a)},oV:[function(a){var z,y,x,w,v,u,t
z=[]
y=a.length
if(0>=y)return H.e(a,0)
x=a[0]
if(1>=y)return H.e(a,1)
w=new V.eu(P.EF(["0",new V.ov(1,1).tv(K.Ye(J.UQ(a[1],2)).BC().av().Ec())],null,null),P.EF(["0",new V.ov(1,1)],null,null),0).Ip(V.Bf())
y=a.length
if(1>=y)return H.e(a,1)
v=a[1]
if(2>=y)return H.e(a,2)
z.push(["MDiva",V.KF([x,["^",v,w],["^",a[2],w]]),"(Raise both sides to power)"])
if(1>=a.length)return H.e(a,1)
v=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
u=[x,v,K.Ye(["^",a[2],w]).BC().Ip(V.Bf())]
z.push(["MDiv",V.KF(u)])
t=O.ZX(u)
C.Nm.FV(z,t.zr)
return new O.Tu(z,t.NP,null,null,null,null,null)},"$1","KB",2,0,53],b9:[function(a){var z,y,x,w,v
z=O.fX(a)
y=z.zr
x=z.rR
w=z.uR
v=M.YL(a,y,z.NP)
if(x!=null)v.rR=x
if(w!=null)v.uR=w
return v},"$1","An",2,0,53],cv:{"^":"a;Xx<,Ij<,ai<,al<"},wj:{"^":"a;My<,m7<"},p6:{"^":"Tp:10;",$1:[function(a){return a.gHm().av().O6()},"$1",null,2,0,null,86,"call"],$isPe:true},F0:{"^":"Tp:10;",$1:[function(a){return new M.cv(a,$.hJ.$1(a),!1,!1)},"$1",null,2,0,null,87,"call"],$isPe:true},I8:{"^":"Tp:10;",$1:[function(a){return a.gHm().av().O6()},"$1",null,2,0,null,86,"call"],$isPe:true},eS:{"^":"Tp:10;",$1:[function(a){return new M.cv(a,$.hJ.$1(a),!0,!1)},"$1",null,2,0,null,87,"call"],$isPe:true},w7:{"^":"Tp:89;",$1:[function(a){return a.gIj()},"$1",null,2,0,null,88,"call"],$isPe:true},O0:{"^":"Tp:10;b",$1:function(a){return!C.Nm.tg(this.b,a.gHm().av().bR())},$isPe:true},nz:{"^":"Tp:10;",$1:[function(a){return a.gHm().av().O6()},"$1",null,2,0,null,86,"call"],$isPe:true},ym:{"^":"Tp:10;",$1:[function(a){return new M.cv(a,$.hJ.$1(a),!0,!0)},"$1",null,2,0,null,87,"call"],$isPe:true},Ob:{"^":"Tp:90;",$2:function(a,b){if(J.xC(a.gIj(),b.gIj()))return 0
else if(J.xZ(a.gIj(),b.gIj()))return 1
else return-1},$isPe:true},na:{"^":"Tp:10;a,c",$1:[function(a){return M.Eh(a,this.c,this.a.a)},"$1",null,2,0,null,91,"call"],$isPe:true},Oj:{"^":"Tp:79;a",$1:function(a){var z,y,x
z=M.pM(a)
y=this.a
x=O.bT(y)
M.xd(x,y,y,!1)
z.kr=x.NP
return z},$isPe:true},TY:{"^":"Tp:53;a",$1:function(a){var z,y,x,w,v,u,t,s
z=[]
y=a.length
if(0>=y)return H.e(a,0)
x=a[0]
if(1>=y)return H.e(a,1)
if(J.xC(J.UQ(a[1],0),"ln")){w=["var","e"]
v=2.718281828459045}else{w=10
v=10}y=a.length
if(1>=y)return H.e(a,1)
u=a[1]
if(2>=y)return H.e(a,2)
z.push(["MDiva",V.KF([x,["^",w,u],["^",w,a[2]]]),"(Take exponent of both sides)"])
if(1>=a.length)return H.e(a,1)
u=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
z.push(["MDiv",V.KF([x,u,["^",w,a[2]]])])
if(1>=a.length)return H.e(a,1)
u=J.UQ(a[1],1)
y=$.hJ
if(2>=a.length)return H.e(a,2)
t=[x,u,F.T5(y.$1(["^",v,a[2]]))]
z.push(["MDiv",V.KF(t)])
s=this.a.$1(t)
C.Nm.FV(z,s.gzr())
return new O.Tu(z,s.gNP(),null,null,null,null,null)},$isPe:true},yP:{"^":"Tp:53;a",$1:function(a){var z,y,x,w,v,u
z=[]
y=a.length
if(0>=y)return H.e(a,0)
x=a[0]
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
z.push(["MDiva",V.KF([x,["log",w],["log",a[2]]]),"(Take log of both sides)"])
if(1>=a.length)return H.e(a,1)
w=J.UQ(a[1],2)
if(1>=a.length)return H.e(a,1)
y=J.UQ(a[1],1)
if(2>=a.length)return H.e(a,2)
z.push(["MDiv",V.KF([x,["*show",w,["log",y]],["log",a[2]]])])
if(1>=a.length)return H.e(a,1)
y=J.UQ(a[1],2)
if(2>=a.length)return H.e(a,2)
z.push(["MDiv",V.KF([x,y,["/",["log",a[2]],["log",J.UQ(a[1],1)]]])])
if(1>=a.length)return H.e(a,1)
y=J.UQ(a[1],2)
w=$.hJ
if(2>=a.length)return H.e(a,2)
v=[x,y,F.T5(w.$1(["/",["log",a[2]],["log",J.UQ(a[1],1)]]))]
z.push(["MDiv",V.KF(v)])
u=this.a.$1(v)
C.Nm.FV(z,u.gzr())
return new O.Tu(z,u.gNP(),null,null,null,null,null)},$isPe:true}}],["toplib","Algebra/web/toplib.dart",,Q,{"^":"",Fd:function(a,b,c){var z,y,x,w
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
if(J.xC(y,"var"))if(c==null)return b
else{if(0>=x.length)return H.e(x,0)
if(J.xC(x[0],c))return b
else return a}else{w=[]
w.push(y)
J.kH(x,new Q.rL(b,c,w))
return w}}else return a},rL:{"^":"Tp:10;a,b,c",$1:function(a){this.c.push(Q.Fd(a,this.a,this.b))},$isPe:true}}],["varfraceq","Algebra/web/varfraceq.dart",,Y,{"^":"",Al:function(a,b){var z=[]
H.bQ(a,new Y.Jp(b,z))
return z},qZ:function(a){return C.Nm.zV(Y.Al(a,new Y.ee()),"+")},tY:function(a){var z=P.Fl(null,null)
J.kH(a,new Y.Cw(z))
return z},aG:function(a,b){var z=P.Fl(null,null)
a.gvc().aN(0,new Y.ZL(a,z))
b.gvc().aN(0,new Y.ZF(b,z))
return z},el:function(a){var z=[]
a.gvc().aN(0,new Y.XA(a,z))
return z},kY:function(a){var z=["+"]
C.Nm.FV(z,Y.Al(a,new Y.jD()))
return z},PQ:function(a){var z=[]
H.bQ(a,new Y.hR(z))
return z},SW:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z={}
y=O.bT(a)
x=[]
w=V.KF(a)
v=y.nD
v.push(["step",w,""])
u=J.iN(a)
t=Y.e0(u.t(a,1))
s=Y.e0(u.t(a,2))
r=Y.Al(t,O.mX())
q=Y.Al(s,O.mX())
p=Y.Al(r,new Y.tM())
o=Y.Al(q,new Y.kx())
n=Y.qZ(p)+" = "+Y.qZ(o)
if(n!==w)x.push(["MDiv",n])
z.a=P.Fl(null,null)
H.bQ(p,new Y.FV(z))
H.bQ(o,new Y.X7(z))
m=[]
H.bQ(Y.el(z.a),new Y.ZR(m))
if(m.length>0)x.push(["msgstr",C.xB.g("Multiply all terms by ",V.hG(O.GW(m)))+" and cancel:"])
else return y.OQ()
l=Y.Al(p,new Y.hp(m))
k=Y.Al(o,new Y.bl(m))
x.push(["MDiv",Y.qZ(l)+"="+Y.qZ(k)])
C.Nm.FV(x,O.yJ(["=",Y.kY(l),Y.kY(k)],a,M.Ts(),!0,!0).zr)
j=new N.cz(v,y.pS,[],null)
j.zr=x
return Q.Sa(j.br(0))},"$1","yG",2,0,14,27],e0:function(a){var z,y,x,w,v,u,t
z=[]
y=J.x(a)
if(!!y.$iszM){x=y.t(a,0)
w=y.Jk(a,1)
y=J.x(x)
if((y.n(x,"+")||y.n(x,"-"))&&w.length===2){if(0>=w.length)return H.e(w,0)
v=Y.e0(w[0])
if(1>=w.length)return H.e(w,1)
u=Y.e0(w[1])
if(y.n(x,"+"))C.Nm.FV(v,u)
else C.Nm.FV(v,Y.PQ(u))
z=v}else if(y.n(x,"+")&&w.length>2){if(0>=w.length)return H.e(w,0)
v=Y.e0(w[0])
for(t=1;t<w.length;++t)C.Nm.FV(v,Y.e0(w[t]))
z=v}else if(y.n(x,"-")&&w.length>1){if(0>=w.length)return H.e(w,0)
C.Nm.FV(z,Y.PQ(Y.e0(w[0])))}else z=[a]}else z=[a]
return z},Ks:function(a){return Y.T1(V.lt(a))},qQ:function(a){return Y.Ks(a).te()},T1:[function(a){var z,y,x
z=J.x(a)
if(!!z.$iszM){y=z.t(a,0)
x=z.Jk(a,1)
return K.Mr(Y.M7()).t(0,y).$1(x)}else return a},"$1","M7",2,0,37,55],Jp:{"^":"Tp:10;a,b",$1:function(a){return this.b.push(this.a.$1(a))},$isPe:true},ee:{"^":"Tp:10;",$1:function(a){return V.KF(a.O6())},$isPe:true},Cw:{"^":"Tp:10;a",$1:[function(a){var z,y
z=this.a
y=J.iN(z)
if(z.gvc().Fb.x4(a))y.u(z,a,J.WB(y.t(z,a),1))
else y.u(z,a,1)},"$1",null,2,0,null,9,"call"],$isPe:true},ZL:{"^":"Tp:10;a,b",$1:function(a){this.b.u(0,a,this.a.t(0,a))},$isPe:true},ZF:{"^":"Tp:10;c,d",$1:function(a){var z,y
z=this.d
y=this.c
if(z.gvc().Fb.x4(a))z.u(0,a,P.y(z.t(0,a),J.UQ(y,a)))
else z.u(0,a,J.UQ(y,a))},$isPe:true},XA:{"^":"Tp:10;a,b",$1:function(a){var z,y,x
z=this.a.t(0,a)
if(typeof z!=="number")return H.s(z)
y=this.b
x=0
for(;x<z;++x)y.push(new V.eu(a.gBl(),P.EF(["0",new V.ov(1,1)],null,null),0))},$isPe:true},jD:{"^":"Tp:10;",$1:function(a){return a.O6()},$isPe:true},hR:{"^":"Tp:10;a",$1:function(a){var z,y,x
z=J.x(a)
y=!!z.$iszM&&J.xC(z.t(a,0),"*")&&z.gB(a)===3&&!J.x(z.t(a,1)).$iszM
x=this.a
if(y)x.push(["*",["-",z.t(a,1)],z.t(a,2)])
else x.push(Y.qQ(["*",-1,a]))},$isPe:true},tM:{"^":"Tp:10;",$1:function(a){return a.ij()},$isPe:true},kx:{"^":"Tp:10;",$1:function(a){return a.ij()},$isPe:true},FV:{"^":"Tp:10;a",$1:function(a){var z,y
z=Y.tY(a.gv5())
y=this.a
y.a=Y.aG(y.a,z)},$isPe:true},X7:{"^":"Tp:10;a",$1:function(a){var z,y
z=Y.tY(a.gv5())
y=this.a
y.a=Y.aG(y.a,z)},$isPe:true},ZR:{"^":"Tp:10;b",$1:function(a){if(a.Kg()>0)this.b.push(a)},$isPe:true},hp:{"^":"Tp:92;c",$1:function(a){return a.q8(this.c)},$isPe:true},bl:{"^":"Tp:92;d",$1:function(a){return a.q8(this.d)},$isPe:true}}],])
I.$finishClasses($$,$,null)
$$=null
J.Qc=function(a){if(typeof a=="number")return J.P.prototype
if(typeof a=="string")return J.O.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.is.prototype
return a}
J.Wx=function(a){if(typeof a=="number")return J.P.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.is.prototype
return a}
J.iN=function(a){if(typeof a=="string")return J.O.prototype
if(a==null)return a
if(a.constructor==Array)return J.Q.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.rY=function(a){if(typeof a=="string")return J.O.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.is.prototype
return a}
J.w1=function(a){if(a==null)return a
if(a.constructor==Array)return J.Q.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.x=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bU.prototype
return J.VA.prototype}if(typeof a=="string")return J.O.prototype
if(a==null)return J.YE.prototype
if(typeof a=="boolean")return J.kn.prototype
if(a.constructor==Array)return J.Q.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.AG=function(a){return J.x(a).bu(a)}
J.Bl=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.Wx(a).E(a,b)}
J.C0=function(a,b){return J.w1(a).ez(a,b)}
J.FW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.Wx(a).V(a,b)}
J.GP=function(a){return J.w1(a).gA(a)}
J.J5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.Wx(a).F(a,b)}
J.MQ=function(a){return J.w1(a).grZ(a)}
J.Nj=function(a,b,c){return J.rY(a).Nj(a,b,c)}
J.Qd=function(a){return J.Wx(a).gkZ(a)}
J.UQ=function(a,b){if(a.constructor==Array||typeof a=="string"||H.wV(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.iN(a).t(a,b)}
J.WB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.Qc(a).g(a,b)}
J.XS=function(a,b){return J.w1(a).zV(a,b)}
J.ZZ=function(a,b){return J.rY(a).yn(a,b)}
J.bj=function(a,b){return J.w1(a).FV(a,b)}
J.cE=function(a){return J.Wx(a).gG0(a)}
J.hv=function(a,b){return J.w1(a).h(a,b)}
J.i4=function(a,b){return J.w1(a).Zv(a,b)}
J.jf=function(a,b){return J.x(a).T(a,b)}
J.jz=function(a){if(typeof a=="number")return-a
return J.Wx(a).J(a)}
J.kH=function(a,b){return J.w1(a).aN(a,b)}
J.kW=function(a,b,c){if((a.constructor==Array||H.wV(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.w1(a).u(a,b,c)}
J.m2=function(a){return J.x(a).gAY(a)}
J.oE=function(a,b){return J.Qc(a).iM(a,b)}
J.pO=function(a){return J.iN(a).gor(a)}
J.pm=function(a){return J.Wx(a).gpY(a)}
J.q8=function(a){return J.iN(a).gB(a)}
J.r0=function(a,b){return J.Wx(a).Sy(a,b)}
J.u6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.Wx(a).C(a,b)}
J.v1=function(a){return J.x(a).giO(a)}
J.vX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.Qc(a).U(a,b)}
J.vo=function(a,b){return J.w1(a).ev(a,b)}
J.xC=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.x(a).n(a,b)}
J.xH=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.Wx(a).W(a,b)}
J.xZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.Wx(a).D(a,b)}
J.yH=function(a){return J.Wx(a).Vy(a)}
C.Nm=J.Q.prototype
C.ON=J.VA.prototype
C.jn=J.bU.prototype
C.CD=J.P.prototype
C.xB=J.O.prototype
C.ZQ=J.iC.prototype
C.vB=J.is.prototype
C.Eq=new P.k5()
C.Mc=function(hooks){if(typeof dartExperimentalFixupGetTag!="function")return hooks;hooks.getTag=dartExperimentalFixupGetTag(hooks.getTag);}
C.lR=function(hooks){var userAgent=typeof navigator=="object"?navigator.userAgent:"";if(userAgent.indexOf("Firefox")==-1)return hooks;var getTag=hooks.getTag;var quickMap={"BeforeUnloadEvent":"Event","DataTransfer":"Clipboard","GeoGeolocation":"Geolocation","Location":"!Location","WorkerMessageEvent":"MessageEvent","XMLDocument":"!Document"};function getTagFirefox(o){var tag=getTag(o);return quickMap[tag]||tag;}
hooks.getTag=getTagFirefox;}
C.w2=function getTagFallback(o){var constructor=o.constructor;if(typeof constructor=="function"){var name=constructor.name;if(typeof name=="string"&&name.length>2&&name!=="Object"&&name!=="Function.prototype"){return name;}}
var s=Object.prototype.toString.call(o);return s.substring(8,s.length-1);}
C.XQ=function(hooks){return hooks;}
C.ur=function(getTagFallback){return function(hooks){if(typeof navigator!="object")return hooks;var ua=navigator.userAgent;if(ua.indexOf("DumpRenderTree")>=0)return hooks;if(ua.indexOf("Chrome")>=0){function confirm(p){return typeof window=="object"&&window[p]&&window[p].name==p;}
if(confirm("Window")&&confirm("HTMLElement"))return hooks;}
hooks.getTag=getTagFallback;};}
C.MA=function(){function typeNameInChrome(o){var name=o.constructor.name;if(name)return name;var s=Object.prototype.toString.call(o);return s.substring(8,s.length-1);}
function getUnknownTag(object,tag){if(/^HTML[A-Z].*Element$/.test(tag)){var name=Object.prototype.toString.call(object);if(name=="[object Object]")return null;return"HTMLElement";}}
function getUnknownTagGenericBrowser(object,tag){if(object instanceof HTMLElement)return"HTMLElement";return getUnknownTag(object,tag);}
function prototypeForTag(tag){if(typeof window=="undefined")return null;if(typeof window[tag]=="undefined")return null;var constructor=window[tag];if(typeof constructor!="function")return null;return constructor.prototype;}
function discriminator(tag){return null;}
var isBrowser=typeof navigator=="object";return{getTag:typeNameInChrome,getUnknownTag:isBrowser?getUnknownTagGenericBrowser:getUnknownTag,prototypeForTag:prototypeForTag,discriminator:discriminator};}
C.Jh=function(hooks){var userAgent=typeof navigator=="object"?navigator.userAgent:"";if(userAgent.indexOf("Trident/")==-1)return hooks;var getTag=hooks.getTag;var quickMap={"BeforeUnloadEvent":"Event","DataTransfer":"Clipboard","HTMLDDElement":"HTMLElement","HTMLDTElement":"HTMLElement","HTMLPhraseElement":"HTMLElement","Position":"Geoposition"};function getTagIE(o){var tag=getTag(o);var newTag=quickMap[tag];if(newTag)return newTag;if(tag=="Object"){if(window.DataView&&(o instanceof window.DataView))return"DataView";}
return tag;}
function prototypeForTagIE(tag){var constructor=window[tag];if(constructor==null)return null;return constructor.prototype;}
hooks.getTag=getTagIE;hooks.prototypeForTag=prototypeForTagIE;}
C.hQ=function(hooks){var getTag=hooks.getTag;var prototypeForTag=hooks.prototypeForTag;function getTagFixed(o){var tag=getTag(o);if(tag=="Document"){if(!!o.xmlVersion)return"!Document";return"!HTMLDocument";}
return tag;}
function prototypeForTagFixed(tag){if(tag=="Document")return null;return prototypeForTag(tag);}
hooks.getTag=getTagFixed;hooks.prototypeForTag=prototypeForTagFixed;}
I.uL=function(a){a.immutable$list=init
a.fixed$length=init
return a}
C.xD=I.uL([])
C.Ka=new H.GD("call")
$.libraries_to_load={}
$.yj=0
$.mJ=null
$.P4=null
$.NF=null
$.TX=null
$.x7=null
$.nw=null
$.vv=null
$.Bv=null
$.Nh=V.fB()
$.pS=Q.Pf()
$.Cl=V.fB()
$.SO=K.Ep()
$.qr=K.mm()
$.hJ=V.fB()
I.$lazy($,"noSuchMethodPattern","lm","WD",function(){return H.LX(H.S7({toString:function(){return"$receiver$"}}))})
I.$lazy($,"notClosurePattern","k1","OI",function(){return H.LX(H.S7({$method$:null,toString:function(){return"$receiver$"}}))})
I.$lazy($,"nullCallPattern","Re","PH",function(){return H.LX(H.S7(null))})
I.$lazy($,"nullLiteralCallPattern","fN","D1",function(){return H.LX(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())})
I.$lazy($,"undefinedCallPattern","qi","rx",function(){return H.LX(H.S7(void 0))})
I.$lazy($,"undefinedLiteralCallPattern","rZ","Y9",function(){return H.LX(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())})
I.$lazy($,"nullPropertyPattern","BX","zO",function(){return H.LX(H.Mj(null))})
I.$lazy($,"nullLiteralPropertyPattern","tt","Bi",function(){return H.LX(function(){try{null.$method$}catch(z){return z.message}}())})
I.$lazy($,"undefinedPropertyPattern","dt","eA",function(){return H.LX(H.Mj(void 0))})
I.$lazy($,"undefinedLiteralPropertyPattern","A7","ko",function(){return H.LX(function(){try{(void 0).$method$}catch(z){return z.message}}())})
I.$lazy($,"computeFracOperators","PC","d1",function(){return P.EF(["color",new N.Md(),"simplify",new N.YJ(),"?",new N.DO(),"+",new N.lP(),"-",new N.Uf(),"*",new N.wJY(),"/",new N.zOQ(),"^",new N.W6o(),"sqrt",new N.MdQ(),"=",new N.YJG(),"var",new N.DOe(),"+-",new N.lPa()],null,null)})
I.$lazy($,"myComputeOperators","qt","cU",function(){return $.GR().$0()})
I.$lazy($,"applyf","yS","yE",function(){return new V.W6()})
I.$lazy($,"makeComputeOperators","wU","GR",function(){return new V.wJ()})
I.$lazy($,"_toStringVisiting","nM","Ex",function(){return[]})
I.$lazy($,"context","eo","cM",function(){return P.ND(function(){return this}())})
I.$lazy($,"_DART_OBJECT_PROPERTY_NAME","kt","Iq",function(){return init.getIsolateTag("_$dart_dartObject")})
I.$lazy($,"_DART_CLOSURE_PROPERTY_NAME","Ri","Dp",function(){return init.getIsolateTag("_$dart_dartClosure")})
I.$lazy($,"_dartProxyCtor","Je","hs",function(){return function DartObject(a){this.o=a}})
init.functionAliases={}
init.metadata=[{func:"uO",args:[P.qU]},"closure","isolate","numberOfArguments","arg1","arg2","arg3","arg4",{func:"Sx",args:[V.eu]},"poly",{func:"aB",args:[null]},"expr",{func:"ju",ret:P.qU,args:[null]},{func:"S0",ret:P.FK,args:[null]},{func:"Ze",ret:P.zM,args:[null]},{func:"GS",ret:P.zM,args:[P.zM,null,P.qU,P.qU]},"eqexpr2","subexpr","subvar","solvevar",{func:"I7",ret:P.zM,args:[P.zM,P.zM,P.qU,P.qU]},"eqexpr1","var1","var2",{func:"iJ",ret:P.zM,args:[N.wK]},"equation",{func:"Pl",ret:N.wK,args:[null]},"eqexpr","myEquation",{func:"Yd",ret:P.qU,args:[N.wK]},{func:"ht",args:[N.wK]},{func:"I6",ret:P.zM,args:[N.wK,P.qU,null]},"op",{func:"R1",ret:P.zM,args:[P.zM]},{func:"BW",ret:P.zM,args:[P.zM,P.qU]},"ans",{func:"uP",ret:F.GC,args:[null]},{func:"P7",ret:V.eu,args:[null]},{func:"Ib",ret:P.a2,args:[null,null]},{func:"bX",ret:P.KN,args:[null]},"a",{func:"f0",ret:P.KN,args:[P.fR,P.fR]},{func:"E0",ret:P.a2,args:[P.a,P.a]},{func:"ZY",ret:P.KN,args:[P.a]},"callback","captureThis","self","arguments","o",{func:"uJ",ret:P.a,args:[null]},{func:"E9",ret:P.CP,args:[P.FK]},{func:"yY",ret:P.a2,args:[P.zM]},"eq",{func:"Jj",ret:O.Tu,args:[P.zM]},"newexpr","visit1",{func:"Fp",args:[V.ov]},"frac",{func:"CV",ret:P.FK,args:[P.qU,P.qU]},"varid","myvar","vid1","vid2",{func:"Q7",ret:P.a2,args:[P.FK]},"n",{func:"tB",ret:P.FK,args:[[P.zM,P.FK]]},"myargs",{func:"NY",ret:O.uX,args:[null]},{func:"em",ret:P.qU,args:[P.FK],opt:[P.KN]},,"val","prec",{func:"I0",ret:P.qU},{func:"Za",args:[P.qU,null]},{func:"NT"},{func:"TS",args:[null,P.qU]},{func:"bh",args:[null,null]},"term",{func:"jJ",args:[null,P.zM]},{func:"mR",args:[P.zM]},"each","key","value",{func:"lv",args:[P.wv,null]},{func:"c7",args:[P.FK]},{func:"i8",ret:P.qU,args:[P.zM]},"anseq","fracexpr","bound",{func:"Yf",args:[M.cv]},{func:"XT",args:[M.cv,M.cv]},"myrange",{func:"zW",args:[O.uX]},];$=null
I=I.$finishIsolateConstructor(I)
$=new I()
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}
A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
!function(){function intern(a){var u={}
u[a]=1
return Object.keys(convertToFastObject(u))[0]}init.getIsolateTag=function(a){return intern("___dart_"+a+init.isolateTag)}
var z="___dart_isolate_tags_"
var y=Object[z]||(Object[z]=Object.create(null))
var x="_ZxYxX"
for(var w=0;;w++){var v=intern(x+"_"+w+"_")
if(!(v in y)){y[v]=1
init.isolateTag=v
break}}}()
init.dispatchPropertyName=init.getIsolateTag("dispatch_record");(function(a){if(typeof document==="undefined"){a(null)
return}if(document.currentScript){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x){z[x].removeEventListener("load",onLoad,false)}a(b.target)}for(var y=0;y<z.length;++y){z[y].addEventListener("load",onLoad,false)}})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function"){dartMainRunner(Y.QL,[])}else{Y.QL([])}})
function init(){I.p={}
function generateAccessor(a,b,c){var y=a.split("-")
var x=y[0]
var w=x.length
var v=x.charCodeAt(w-1)
var u
if(y.length>1)u=true
else u=false
v=v>=60&&v<=64?v-59:v>=123&&v<=126?v-117:v>=37&&v<=43?v-27:0
if(v){var t=v&3
var s=v>>2
var r=x=x.substring(0,w-1)
var q=x.indexOf(":")
if(q>0){r=x.substring(0,q)
x=x.substring(q+1)}if(t){var p=t&2?"r":""
var o=t&1?"this":"r"
var n="return "+o+"."+x
var m=c+".prototype.g"+r+"="
var l="function("+p+"){"+n+"}"
if(u)b.push(m+"$reflectable("+l+");\n")
else b.push(m+l+";\n")}if(s){var p=s&2?"r,v":"v"
var o=s&1?"this":"r"
var n=o+"."+x+"=v"
var m=c+".prototype.s"+r+"="
var l="function("+p+"){"+n+"}"
if(u)b.push(m+"$reflectable("+l+");\n")
else b.push(m+l+";\n")}}return x}I.p.$generateAccessor=generateAccessor
function defineClass(a,b,c){var y=[]
var x="function "+b+"("
var w=""
for(var v=0;v<c.length;v++){if(v!=0)x+=", "
var u=generateAccessor(c[v],y,b)
var t="parameter_"+u
x+=t
w+="this."+u+" = "+t+";\n"}x+=") {\n"+w+"}\n"
x+=b+".builtin$cls=\""+a+"\";\n"
x+="$desc=$collectedClasses."+b+";\n"
x+="if($desc instanceof Array) $desc = $desc[1];\n"
x+=b+".prototype = $desc;\n"
if(typeof defineClass.name!="string"){x+=b+".name=\""+b+"\";\n"}x+=y.join("")
return x}var z=function(){function tmp(){}var y=Object.prototype.hasOwnProperty
return function(a,b){tmp.prototype=b.prototype
var x=new tmp()
var w=a.prototype
for(var v in w)if(y.call(w,v))x[v]=w[v]
x.constructor=a
a.prototype=x
return x}}()
I.$finishClasses=function(a,b,c){var y={}
if(!init.allClasses)init.allClasses={}
var x=init.allClasses
var w=Object.prototype.hasOwnProperty
if(typeof dart_precompiled=="function"){var v=dart_precompiled(a)}else{var u="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
var t=[]}for(var s in a){if(w.call(a,s)){var r=a[s]
if(r instanceof Array)r=r[1]
var q=r["^"],p,o=s,n=q
if(typeof q=="string"){var m=q.split("/")
if(m.length==2){o=m[0]
n=m[1]}}var l=n.split(";")
n=l[1]==""?[]:l[1].split(",")
p=l[0]
m=p.split(":")
if(m.length==2){p=m[0]
var k=m[1]
if(k)r.$signature=function(d){return function(){return init.metadata[d]}}(k)}if(p&&p.indexOf("+")>0){l=p.split("+")
p=l[0]
var j=a[l[1]]
if(j instanceof Array)j=j[1]
for(var i in j){if(w.call(j,i)&&!w.call(r,i))r[i]=j[i]}}if(typeof dart_precompiled!="function"){u+=defineClass(o,s,n)
t.push(s)}if(p)y[s]=p}}if(typeof dart_precompiled!="function"){u+="return [\n  "+t.join(",\n  ")+"\n]"
var v=new Function("$collectedClasses",u)(a)
u=null}for(var h=0;h<v.length;h++){var g=v[h]
var s=g.name
var r=a[s]
var f=b
if(r instanceof Array){f=r[0]||b
r=r[1]}x[s]=g
f[s]=g}v=null
var e={}
init.interceptorsByTag=Object.create(null)
init.leafTags={}
function finishClass(a9){var d=Object.prototype.hasOwnProperty
if(d.call(e,a9))return
e[a9]=true
var a0=y[a9]
if(!a0||typeof a0!="string")return
finishClass(a0)
var a1=x[a9]
var a2=x[a0]
if(!a2)a2=c[a0]
var a3=z(a1,a2)
if(d.call(a3,"%")){var a4=a3["%"].split(";")
if(a4[0]){var a5=a4[0].split("|")
for(var a6=0;a6<a5.length;a6++){init.interceptorsByTag[a5[a6]]=a1
init.leafTags[a5[a6]]=true}}if(a4[1]){a5=a4[1].split("|")
if(a4[2]){var a7=a4[2].split("|")
for(var a6=0;a6<a7.length;a6++){var a8=x[a7[a6]]
a8.$nativeSuperclassTag=a5[0]}}for(a6=0;a6<a5.length;a6++){init.interceptorsByTag[a5[a6]]=a1
init.leafTags[a5[a6]]=false}}}}for(var s in y)finishClass(s)}
I.$lazy=function(a,b,c,d,e){var y={}
var x={}
a[c]=y
a[d]=function(){var w=$[c]
try{if(w===y){$[c]=x
try{w=$[c]=e()}finally{if(w===y)if($[c]===x)$[c]=null}}else{if(w===x)H.ag(b)}return w}finally{$[d]=function(){return this[c]}}}}
I.$finishIsolateConstructor=function(a){var y=a.p
function Isolate(){var x=Object.prototype.hasOwnProperty
for(var w in y)if(x.call(y,w))this[w]=y[w]
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=y
Isolate.$finishClasses=a.$finishClasses
Isolate.uL=a.uL
return Isolate}}})()