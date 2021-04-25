(function(){var
initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var
_super=this.prototype;initializing=true;var
prototype=new
this();initializing=false;for(var
name
in
prop){prototype[name]=typeof
prop[name]=="function"&&typeof
_super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var
tmp=this._super;this._super=_super[name];var
ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}function
Class(){if(!initializing&&this.init)this.init.apply(this,arguments);}Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;return Class;};})();var
AccountDock=(function(){var
$this=$({}),_handlers={},defaults={host:'accountdock.com',live:'1',assets:{js:[]},admin:'0',version:'1',source:'external',key:'ad_acco_12345',customer:'cus_12345',tab:'transactions',name:false,email:false,container:'modal'};var
_addPostMessageListeners=function(){var
listener=function(event){if(event.origin==='https://'+(defaults.host)){if(event.data[0]==='{'){var
data=JSON.parse(event.data);if(data.action==='message.app.opened'){var
$handler=_handlers[data.handler];if($handler){var
parsed=data.extra;parsed.handler=$handler;AccountDock.trigger('internal.app.opened',parsed);}}else
if(data.action==='message.app.close'){var
$handler=_handlers[data.handler];if($handler){var
parsed=data.extra;parsed.handler=$handler;AccountDock.trigger('internal.app.close',parsed);}}else
if(data.action==='message.app.resize'){var
$handler=_handlers[data.handler];if($handler){if($handler.options.container!=='modal'&&$handler.options.container!=='window'){var
parsed=data.extra;parsed.handler=$handler;$($handler.iFrame.getElement()).css('height',parsed.height);}}}}}};window.addEventListener?addEventListener('message',listener,false):attachEvent('onmessage',listener);};_addPostMessageListeners();var
_preload=function(){var
element=document.createElement('iframe'),body=$('body').first()[0],internal=Math.floor(Math.random()*1000000)+1,src='https://s3-us-west-2.amazonaws.com/files.accountdock.com/pre.prod.html?cache='+(internal);src+='&assets='+encodeURIComponent(JSON.stringify(defaults.assets));element.setAttribute('frameborder','0');element.setAttribute('allowtransparency','true');element.setAttribute('style','position: absolute; left: -10000px; top: -10000px;');body.appendChild(element);element.setAttribute('src',src);};_preload();$this.configure=function(options){defaults=jQuery.extend(true,{},defaults,options||{});var
$handler=$({}),internal=Math.floor(Math.random()*1000000)+1,id='ad-h'+(internal);$handler.id=id;_handlers[id]=$handler;$handler.open=function(options){if(options&&options.host){alert('host must be set in AccountDock.configure call');return;}options=jQuery.extend(true,{},defaults,options||{});this.options=options;if(this.options.key==='ad_acco_12345'){alert('Please change your AccountDock key from the default');}else
if(this.options.customer==='cus_12345'){alert('Please change the Stripe customer id from the default');}else
if(this.options.customer===''){alert('No Stripe customer id was passed');}else{var
src='https://'+(this.options.host)+'/app'+'?key='+(this.options.key)+'&handler='+(this.id);if(options.container==='window'){var
width=940,height=565;if(true){}this.reference=window.open(src,'AccountDock','scrollbars=no,width='+(width)+',height='+(height));this.reference.focus();}else
if(options.container==='modal'){src+='&container=modal';var
iFrame=(new
AccountDock.IFrame());iFrame.setIFrame(src,$('body').first()[0],false);this.iFrame=iFrame;this.reference=iFrame.getElement().contentWindow;}else{src+='&container=inline';var
iFrame=(new
AccountDock.IFrame());iFrame.setIFrame(src,$(options.container)[0],true);this.iFrame=iFrame;this.reference=iFrame.getElement().contentWindow;}}};$handler.close=function(){var
data={action:'message.app.close'};this.reference.postMessage(JSON.stringify(data),'https://'+(this.options.host));};return $handler;};$this.getHandler=function(id){return _handlers[id];};$this.getHandlers=function(){var
simple=[];for(var
key
in
_handlers){simple.push(_handlers[key]);}return simple;};$this.on('internal.app.opened',function(event,data){var
message={action:'message.app.storeParams',params:data.handler.options};data.handler.reference.postMessage(JSON.stringify(message),'https://'+(data.handler.options.host));AccountDock.trigger('app.opened',data);data.handler.trigger('app.opened',data);});$this.on('internal.app.close',function(event,data){if(data.handler.options.container==='window'){if(data.autoClose===true){data.handler.reference.close();}AccountDock.trigger('app.closed',data);data.handler.trigger('app.closed',data);}else{data.handler.iFrame.remove();AccountDock.trigger('app.closed',data);data.handler.trigger('app.closed',data);}});return $this;})();(function(){AccountDock.IFrame=Class.extend({_element:null,init:function(){},_draw:function(inline){var
element=document.createElement('iframe');element.setAttribute('frameborder','0');element.setAttribute('allowtransparency','true');element.setAttribute('style',this._getStylesString(inline));this._element=element;},_getStyles:function(inline){var
styles={'z-index':'9999','display':'block','border':'0px none transparent','overflow-x':'hidden','overflow-y':'auto','visibility':'visible','margin':'0px','padding':'0px','-webkit-tap-highlight-color':'transparent','position':'fixed','left':'0px','top':'0px','width':'100%','height':'100%','background':'rgba(0, 0, 0, 0.00392157);'};if(inline){styles['position']='static';styles['height']='0px';styles['max-width']='940px';}return styles;},_getStylesString:function(inline){var
styles=this._getStyles(inline),str='';for(var
property
in
styles){str+=(property)+': '+(styles[property])+';';}return str;},append:function(parentElement){parentElement.appendChild(this._element);},getElement:function(){return this._element;},remove:function(){this._element.parentNode.removeChild(this._element);},setIFrame:function(src,parentElement,inline){this._element&&this.remove();this._draw(inline);this.append(parentElement);this._element.setAttribute('src',src);}});})();