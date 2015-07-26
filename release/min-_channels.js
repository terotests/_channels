(function(){var t={},n=function(){var n=function(){!function(t){var n,i,e,r,o;t.add=function(t,n,e){if(n||e){var r;"[object Array]"===Object.prototype.toString.call(e)?r=e:(r=Array.prototype.slice.call(arguments,2),r||(r=[])),i.push([n,t,r])}else i.push(t)},t.asap=function(t){this.add(t)},t.every=function(t,n,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),r[i]={step:Math.floor(1e3*t),fn:n,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!n){var t,s;if(this.polyfill(),"undefined"!=typeof window){var t=window.requestAnimationFrame,s=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(n){t||(t=window[n+"RequestAnimationFrame"],s=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),s||(s=function(t){clearTimeout(t)}),i=[],e={},r={},o=[];var a=0,u=function(){for(var n,s=(new Date).getTime();n=i.shift();)"[object Array]"===Object.prototype.toString.call(n)?n[1].apply(n[0],n[2]):n();for(var f=0;f<o.length;f++){var c=o[f];c()}for(var l in e)if(e.hasOwnProperty(l)){var h=e[l];h[0](h[1]),delete e[l]}for(var l in r)if(r.hasOwnProperty(l)){var h=r[l];h.nextTime<s&&(h.fn(),h.nextTime=s+h.step),h.until&&h.until<s&&delete r[l]}t(u),a=s};u(),n=!0}}),t.once=function(t,n,i){e[t]=[n,i]},t.onFrame=function(t){o.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var n=o.indexOf(t);return n>=0?(t._onRemove&&t._onRemove(),o.splice(n,1),!0):!1}}(this)},i=function(t,n,e,r,o,s,a,u){var f,c=this;if(!(c instanceof i))return new i(t,n,e,r,o,s,a,u);var l=[t,n,e,r,o,s,a,u];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,l)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,r,o,s,a,u)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};i._classInfo={name:"later"},i.prototype=new n;var e=function(){!function(t){t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){t.all=function(t){var n;n=this.isArray(t)?t:Array.prototype.slice.call(arguments,0);var i=n.length,e=0,o=[],s=new Array(i);return this.then(function(){var t=r();return 0==n.length&&t.resolve([]),n.forEach(function(n,r){n.then?(o.push(n),n.then(function(n){s[r]=n,e++,e==i&&t.resolve(s)},function(n){t.reject(n)})):t.reject("Not list of promises")}),t})},t.collect=function(t,n,i){var e;e=this.isArray(n)?n:[n];var o=e.length,s=!1,a=!1,u=0,f=[],c=i||{};return this.then(function(){var n=r();return e.forEach(function(i){i.then?(f.push(i),i.then(function(i){u++,s=t(i,c),(s&&!a||0==a&&o==u)&&(n.resolve(c),a=!0)},function(t){n.reject(t)})):n.reject("Not list of promises")}),n})},t.fail=function(t){return this.then(null,t)},t.fulfill=function(t){if(!(this._rejected||this._fulfilled&&t!=this._stateValue)){this._fulfilled=!0,this._stateValue=t;for(var n=this._childPromises.length;n--;){var i=this._childPromises.shift();if(i._onFulfill)try{var e=i._onFulfill(t);"undefined"!=typeof e?i.resolve(e):i.fulfill(t)}catch(r){i.reject(r)}else i.fulfill(t)}this._state=1,this.triggerStateChange()}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){if(this._state=0,this._stateValue=null,this._isAPromise=!0,this._childPromises=[],this.isFunction(t)&&(this._onFulfill=t),this.isFunction(n)&&(this._onReject=n),!n&&this.isFunction(t)){var e=this;i().asap(function(){t(function(t){e.resolve(t)},function(t){e.reject(t)})})}}),t.isFulfilled=function(){return 1==this._state},t.isPending=function(){return 0==this._state},t.isRejected=function(){return 2==this._state},t.onStateChange=function(t){this._listeners||(this._listeners=[]),this._listeners.push(t)},t.reject=function(t){if(!(this._fulfilled||this._rejected&&t!=this._rejectReason)){this._state=2,this._rejected=!0,this._rejectReason=t;for(var n=this._childPromises.length;n--;){var i=this._childPromises.shift();if(i._onReject)try{i._onReject(t),i.reject(t)}catch(e){i.reject(e)}else i.reject(t)}this.triggerStateChange()}},t.rejectReason=function(t){return t?void(this._rejectReason=t):this._rejectReason},t.resolve=function(t){if(!(this._state>0)){if(t==this)return this._rejectReason="TypeError",void this.reject(this._rejectReason);if(this.isObject(t)&&t._isAPromise){if(this._state=t._state,this._stateValue=t._stateValue,this._rejectReason=t._rejectReason,0===this._state){var n=this;t.onStateChange(function(){1==t._state&&n.resolve(t.value()),2==t._state&&n.reject(t.rejectReason())})}return 1==this._state&&this.fulfill(this._stateValue),void(2==this._state&&this.reject(this._rejectReason))}if(this.isObject(t)&&t.then&&this.isFunction(t.then)){var i=!1;try{var n=this;t.then.call(t,function(t){i||(n.resolve(t),i=!0)},function(t){i||(n.reject(t),i=!0)})}catch(e){i||this.reject(e)}}else this._state=1,this._stateValue=t,this.fulfill(t)}},t.state=function(t){return"undefined"!=typeof t&&(this._state=t),this._state},t.then=function(t,n){n||(n=function(){});var e=new r(t,n),o=this;return 1==this._state&&i().asap(function(){o.fulfill(o.value())}),2==this._state&&i().asap(function(){o.reject(o.rejectReason())}),this._childPromises.push(e),e},t.triggerStateChange=function(){var t=this;this._listeners&&(this._listeners.forEach(function(n){n(t)}),this._listeners.length=0)},t.value=function(t){return"undefined"!=typeof t?(this._stateValue=t,this):this._stateValue}}(this)},r=function(t,n,i,e,o,s,a,u){var f,c=this;if(!(c instanceof r))return new r(t,n,i,e,o,s,a,u);var l=[t,n,i,e,o,s,a,u];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,l)}),"function"==typeof f){if(f._classInfo.name!=r._classInfo.name)return new f(t,n,i,e,o,s,a,u)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};r._classInfo={name:"_promise"},r.prototype=new e;var o=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t,i){return t===!1&&i?void 0:(n||(n={}),n[t]?n[t]:void(n[t]=this))}),t.addCommands=function(t,n){if(this.isArray(t)){var i=this;return t.forEach(function(t){i.addCommands(t)}),this}this._commands.push({fnCmd:t,fnFail:n,async:!0})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._commands||(this._commands=[],this.waitingList=[],this._index=0);var e=this;n||i().every(1/30,function(){e.step()})}),t.step=function(){var t=this._index,n=this._commands.length;if(t!=n){for(var i=r(),e=i,o=r(),s=this;n>t;){var a=this._commands[t];!function(t){e=e.then(function(){var n=r();return t.fnCmd(function(){n.resolve(!0)},function(i){n.resolve(!0),t.fnFail&&t.fnFail(i)}),n}).fail(function(n){t.fnFail&&t.fnFail(n)})}(a),this._index++,t++}return e.then(function(){if(s.waitingList.shift(),o.resolve(!0),s.waitingList.length){var t=s.waitingList[0];t.resolve(!0)}}).fail(function(){}),this.waitingList.push(i),1==this.waitingList.length&&i.resolve(!0),o}}}(this)},s=function(t,n,i,e,r,o,a,u){var f,c=this;if(!(c instanceof s))return new s(t,n,i,e,r,o,a,u);var l=[t,n,i,e,r,o,a,u];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,l)}),"function"==typeof f){if(f._classInfo.name!=s._classInfo.name)return new f(t,n,i,e,r,o,a,u)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};s._classInfo={name:"sequenceStepper"},s.prototype=new o;var a=function(){!function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n,i){this._server=t,this._auth=i;this._server.on("connect",function(t){var e;t.on("requestChannel",function(i,r){n.findPath(i.channelId).then(function(o){o?(t.join(i.channelId),e=h(i.channelId,n),e.then(function(){r({success:!0,channelId:i.channelId})})):r({success:!1,channelId:null})})}),t.on("auth",function(n,e){i?i.login(n.userId,n.password).then(function(n){if(n.result===!0){var i=n.userId,r=n.groups;console.log("AUTH groups ",n.groups),t.setAuthInfo(i,r),e({success:!0,userId:t.getUserId(),groups:n.groups})}else e({success:!1,userId:null})}):e({success:!1,userId:null})}),t.on("whoami",function(n,i){i({success:!0,userId:t.getUserId()})}),t.on("channelCommand",function(n,i){return t.getUserId()?t.isInRoom(n.channelId)?void e.run(n,function(t){i&&i(t)},t):void i({success:!1,reason:"not in room"}):void i({success:!1,reason:"socket is not authenticated."})})})})}(this)},u=function(t,n,i,e,r,o,s,a){var f,c=this;if(!(c instanceof u))return new u(t,n,i,e,r,o,s,a);var l=[t,n,i,e,r,o,s,a];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,l)}),"function"==typeof f){if(f._classInfo.name!=u._classInfo.name)return new f(t,n,i,e,r,o,s,a)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};u._classInfo={name:"_serverChannelMgr"},u.prototype=new a,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._serverChannelMgr=u,this._serverChannelMgr=u):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._serverChannelMgr=u:this._serverChannelMgr=u}.call(new Function("return this")());var f=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t,i){return n||(n={}),t+=i.id(),n[t]?n[t]:void(n[t]=this)}),t._createChannelDir=function(t){var n=t;"/"==n.charAt(0)&&(n=n.substring(1));var i=n.split("/"),e=this._fs,o=e,s=r(),a=s,u=this;return i.forEach(function(t){t=t.trim(),0!=t.length&&(s=s.then(function(){return o.isFolder(t)}).then(function(n){return n?!0:o.createDir(t)}).then(function(){return o.getFolder(t)}).then(function(t){o=t}))}),s=s.then(function(){u._folder=o}),a.resolve(!0),s},t._createChannelSettings=function(){var t=this._folder,n=this;return r(function(i){var e=!1;t.isFile("ch.settings").then(function(i){return i?!0:(e=!0,t.writeFile("ch.settings",JSON.stringify({version:1,name:"Initial version",utc:(new Date).getTime(),channelId:n._channelId,journalLine:0})))}).then(function(){return t.readFile("ch.settings")}).then(function(t){var e=JSON.parse(t);n._settings=e,i(n._settings)})})},t._textLinesToArray=function(t){if(!t||"string"!=typeof t)return[];var n=t.split("\n"),i=[];return n.forEach(function(t){0!=t.trim().length&&i.push(JSON.parse(t))}),i},t._writeSettings=function(){return this._folder.writeFile("ch.settings",JSON.stringify(this._settings))},t.childForkTree=function(){var t=(this._folder,this);return r(function(n){t.getForks().then(function(i){var e=[],o=[];if(!i||0==i.length)return void n([]);i.forEach(function(n){var i=c(n.to,t._fs);e.push(i.childForkTree())});var s=r();s.all(e).then(function(t){i.forEach(function(n,i){n.children=t[i],o.push(n)}),n(o)}),s.resolve(!0)})})},t.fork=function(t){var n=this._folder,i=this;return r(function(e){var r=i._settings,o={fromJournalLine:r.journalLine,version:1,channelId:t.channelId,fromVersion:r.version,from:i._channelId,to:t.channelId,name:t.name,utc:(new Date).getTime()};n.appendFile("forks",JSON.stringify(o)+"\n").then(function(){var n=c(t.channelId,i._fs);n.then(function(){return n.set(o)}).then(function(){e(o)})})})},t.get=function(t){var n=this._db,i=this;return r(function(e){i.then(function(){var i=n.table("settings");i.get(t).then(function(t){e(t.value)})})})},t.getCurrentVersion=function(){var t=(this._folder,this);return r(function(n){n(t._settings.version)})},t.getForks=function(){var t=this._folder,n=this;return r(function(i){n.then(function(){return t.readFile("forks")}).then(function(t){i(t?n._textLinesToArray(t):[])}).fail(function(){i([])})})},t.incrementVersion=function(){var t=(this._folder,this);return r(function(n){t.then(function(){var i=t._settings;i.version++,i.journalLine=0,t._writeSettings().then(function(){n(i.version)})})})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._channelId=t,this._latestVersion=1,this._fs=n;var i=this;i._createChannelDir(t).then(function(){return i._createChannelSettings()}).then(function(){i.resolve(!0)}).fail(function(t){console.error(t)})}),t.readBuildTree=function(t,n,i){var e=(this._folder,this);return r(t?function(r){var o=c(t,e._fs);o.then(function(){o.readBuildTree(null,n,null).then(function(t){var n=t[0].length;n>i&&t[0].splice(i,n-i),r(t)})})}:function(t){var i,r,o=[];e.then(function(){return e.readMain(n)}).then(function(t){return t&&(i=JSON.parse(t)),e.readJournal(n)}).then(function(n){if(r=n,e._settings.from&&!i){var s=e._settings;e.readBuildTree(s.from,s.fromVersion,s.fromJournalLine).then(function(i){o.push(n),i.forEach(function(t){o.push(t)}),t(o)})}else t([n,i])}).fail(function(t){console.error(t)})})},t.readJournal=function(t){var n=this._folder,i=this,e=t||i._settings.version;return r(function(t){n.readFile("journal."+e).then(function(n){return n?void t(i._textLinesToArray(n)):void t([])}).fail(function(){t([])})})},t.readMain=function(t){var n=this._folder,i=this,e=t||i._settings.version;return 1==e?r(function(t){t(null)}):n.readFile("file."+e)},t.set=function(t,n){var i=(this._folder,this._settings);if(this.isObject(t))for(var e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);else i[t]=n;return this._writeSettings(i)},t.snapshot=function(t){var n=(this._folder,this);return r(function(i){var e;n.incrementVersion().then(function(i){return e=i-1,n.writeMain(t)}).then(function(){n._settings.journalLine=0,i(!0)})})},t.status=function(){var t=(this._folder,this);return r(function(n){t.then(function(){n(t._settings)})})},t.treeOfLife=function(t){var n=(this._folder,this);if(t){var i=c(t,this._fs);return i.treeOfLife()}return r(function(t){n.then(function(){n._settings.from?n.treeOfLife(n._settings.from).then(t):n.childForkTree().then(t)})})},t.writeMain=function(t,n){var i=this._folder,e=this,r=n||e._settings.version;return"string"!=typeof t&&(t=JSON.stringify(t)),i.writeFile("file."+r,t)},t.writeToJournal=function(t){var n=this._folder,i=this;if(this.isArray(t[0])){var e="",o=0;return t.forEach(function(t){e+=JSON.stringify(t)+"\n",o++}),r(function(t){n.appendFile("journal."+i._settings.version,e).then(function(){i._settings.journalLine+=o,i._writeSettings(),t(!0)})})}return r(function(e){n.appendFile("journal."+i._settings.version,JSON.stringify(t)+"\n").then(function(){i._settings.journalLine++,i._writeSettings(),e(!0)})})}}(this)},c=function(t,n,i,e,r,o,s,a){var u,f=this;if(!(f instanceof c))return new c(t,n,i,e,r,o,s,a);var l=[t,n,i,e,r,o,s,a];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){u=t.apply(f,l)}),"function"==typeof u){if(u._classInfo.name!=c._classInfo.name)return new u(t,n,i,e,r,o,s,a)}else if(u)return u;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,l)}):"function"==typeof f.init&&f.init.apply(f,l)};f.prototype=r.prototype,c._classInfo={name:"_localChannelModel"},c.prototype=new f,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._localChannelModel=c,this._localChannelModel=c):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._localChannelModel=c:this._localChannelModel=c}.call(new Function("return this")());var l=function(){!function(t){var n,i;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t,i){return n||(n={}),t+=i.id(),n[t]?n[t]:void(n[t]=this)}),t._groupACL=function(t,n){var i=this;if(!i._acl)return!1;for(var e=t.getUserRoles(),r=!1,o=0;o<e.length;o++)if(i._acl.find("",e[o]+"@",n)){r=!0;break}return r},t._initCmds=function(){if(i||(i={}),!this._cmds){var t=this;this._cmds={treeOfLife:function(n,i,e){return t._groupACL(e,"r")?void t._model.treeOfLife().then(function(t){i(t)}):void i(null)},readBuildTree:function(n,i,e){return t._groupACL(e,"r")?void t._model.readBuildTree().then(function(t){i(t)}):void i(null)},getForks:function(n,i,e){return t._groupACL(e,"r")?void t._model.getForks().then(function(t){i(t)}):void i(null)},channelStatus:function(n,i,e){return t._groupACL(e,"tc")?void t._model.status().then(function(t){i(t)}):void i(null)},raw:function(n,i,e){i(t._groupACL(e,"tc")?t._chData.getData():null)},fork:function(n,i,e){return t._groupACL(e,"w")?n.data?void t._model.fork(n.data).then(function(t){i(t)}):void i({ok:!1}):void i(null)},snapshot:function(n,i,e){return t._groupACL(e,"w")?n.data?void t._model.snapshot(n.data).then(function(t){i({ok:!0,snapshot:t})}):void i({ok:!1}):void i(null)},writeMain:function(n,i,e){return t._groupACL(e,"w")?void t._model.writeFile("main",n.data).then(function(){i({ok:!0})}):void i(null)},readMain:function(n,i,e){return t._groupACL(e,"r")?void t._model.readMain().then(function(t){i(t)}):void i(null)},readMainVersion:function(n,i,e){return t._groupACL(e,"r")?void t._model.readMain(n.data).then(function(t){i(t)}):void i(null)},changeFrame:function(n,i,e){if(!t._groupACL(e,"w"))return void i(null);var r=t._tManager.execute(n.data);r.validCnt>0?(n.data.commands.length=r.validCnt,t._model.writeToJournal(n.data.commands).then(function(){e.broadcast.to(n.channelId).emit("frame_"+n.channelId,n),i(r)})):i(r)},writeJournal:function(n,i,e){return t._groupACL(e,"w")?void t._model.writeToJournal(n.data).then(function(){e.broadcast.to(n.channelId).emit("ch_"+n.channelId,n),i({ok:!0})}):void i(null)},readJournal:function(n,i,e){return t._groupACL(e,"r")?void t._model.readJournal().then(function(t){i(t)}):void i(null)},readJournalVersion:function(n,i,e){return t._groupACL(e,"r")?void t._model.readJournal(n.data).then(function(t){i(t)}):void i(null)}}}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._channelId=t,this._commands=s(t),this._model=c(t,n);var i=this;this._model.readBuildTree().then(function(e){for(var r=e.pop(),o=_channelData(t+n.id(),r,[]),s=e.pop();s;)o._journalPointer=0,o._journal.length=0,s.forEach(function(t){o.execCmd(t)}),s=e.pop();var a=o.getData();a.__acl&&(i._acl=nfs4_acl(a.__acl)),i._tManager=_channelTransaction(t+n.id(),o),i._chData=o,i.resolve(!0)}),this._initCmds()}),t.run=function(t,n,i){var e=this._cmds[t.cmd];e&&this._commands.addCommands(function(r){e(t,function(t){n(t),r()},i)})}}(this)},h=function(t,n,i,e,r,o,s,a){var u,f=this;if(!(f instanceof h))return new h(t,n,i,e,r,o,s,a);var c=[t,n,i,e,r,o,s,a];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){u=t.apply(f,c)}),"function"==typeof u){if(u._classInfo.name!=h._classInfo.name)return new u(t,n,i,e,r,o,s,a)}else if(u)return u;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,c)}):"function"==typeof f.init&&f.init.apply(f,c)};l.prototype=r.prototype,h._classInfo={name:"_channelController"},h.prototype=new l,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._channelController=h,this._channelController=h):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._channelController=h:this._channelController=h}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},i=function(t,n,e,r,o,s,a,u){var f,c=this;if(!(c instanceof i))return new i(t,n,e,r,o,s,a,u);var l=[t,n,e,r,o,s,a,u];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,l)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,r,o,s,a,u)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};i._classInfo={name:"_channels"},i.prototype=new n,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());