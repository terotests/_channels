# _channels 

This a work in progress for multichannel databroadcasting service with forking capabilities over socket.io.

The first milestone is to create simulation environment in browser.

# What is a channel?

Channel is basicly a directory containing information about some Object, usually a JSON object and it's change history, known as `journal`. A server can have multiple channels, but each channel  has a message queue where messages to the channel are processed sequentially.

The directory for channel contains usually following files

 1. *Journal files*, which collect the commands that alter the tree
 2. *Main files*, which are the root files which the journal commands alter
 3. settings of the channel
 4. list of forks out from this channel

Journal collects all operations for the channel objects, like writes, deletes, moves of items etc.

The Main file could have following structure:

```javascript
{
   data : {},
   __id : "myGuid"
}
```
The journal is file has changes to the main file Object, the might look like this:

```javascript
[4,"x",50,null, "myGuid"]
[4,"y",100,null, "myGuid"]
```

Where first item `4` means command "set value", "x" is the property, then followed by new value, old value and object ID.

After which the main file would look something like this:

```javascript
{
   data : { x: 50, y: 100},
   __id : "myGuid"
}
```

If the journal gets too big, `snapshot` can be created, the version number of the channel is then incremented
and a new Main file is created according to new empty journal file. The settings file is always updated to have the 
current version and number of lines in the journal - usually the number of lines is kept in the memory too.

If a new channel can be created from the existing channel it will be a `fork`. The fork's settings file will have a pointer to it's parent channel and information about the branching point. The channel which was forked will also have the "forks" file updated.

From the forks from and to the channels a "tree of life" can be constructed. Tree of life contains all the forks out of the current channel, thus creating some kind of document or data taxonomy system.

Newly created channel has version number 1 and does not have a main file. Creating a fork creates always a new channel.
 
In JSON format the directory files could be shown as follows:

```javascript
{
    "journal.1"  : "<newline separated JSON encoded commands for version 1>",
    "journal.2"  : "<newline separated JSON encoded commands for version 2>",
    "file.2"     : "<JSON object Main file of version 2>",
    "ch.settings" : "<JSON encoded settings object>",
    "forks" : "<newline separated forks from this channel>",
    
}
```

The settings file has information about the current version and if the channel has been forked from other channel.

If the channel is a fork, also the forking point, including version and journal line number is saved into settings.
The settings object is essentially same as the object in "forks".

```javascript
{
    fromJournalLine : 23,               // from which line the fork starts
    version : 1,                        // version of the channel
    channelId : "path/to/my/channel",   // ID of this channel
    fromVersion : 2,                    // version of the fork's source
    from : "path/to/forked/channel",    // the fork channels ID
    to :  "path/to/my/channel",         // forks target channel
    name : "reason for the forking",
    utc : 14839287897                   // UTC timestamp of creation
}
```



## Setting a virtual filesystem for server

The virtual server needs a virtual filesystem, the [jayFuzz](https://github.com/terotests/jayFuzz) virtual filesystem is supported.

```javascript
// create virtual filesystem for in-memory testing
var filesystem = fsServerMemory("memoryServer1", {});
```

Also node.js and IndexedDB virtual filesystem is available

## Setting a virtual socket.io server 

The socket.io abstraction can simulate multiple servers in browser. To create server socket accepting incoming connections use 
[Socket emulator](https://github.com/terotests/socketEmulator) 

```javascript
var server = _serverSocket("localhost", 1234);  
```

## Create authentication manager

See [authFuzz](https://github.com/terotests/authFuzz) on how to create authentication filesystem.

```javascript
var authManager = authFuzz(fsRoot);  
```

## Creating a server side channel manager

Before was created

1. Filesystem
2. Socket listener
3. Authentication manager

To connect these to server side channel manager:

```javascript
var manager = _serverChannelMgr( server, filesystem.getRootFolder(), authManager );
```

The filesystem and socket.io server could be real, but in this phase we use only virtual sockets and virtual filesystem.

## Creating a client side socket

```javascript
var client = _clientSocket("localhost", 1234);  
```

## Starting to communicate with the server


```javascript
client.on("connect", function() {
    // The client is now connected and can send packets to the server
});
```

# Protocol

Protocol is still "under construction"

## Authentication : "auth" 

Currently the authentication does not really authenticate, however it is still required.

```javascript
    client.send("auth", {userId : "username", password : "password"})
       .then( function(response) {
        // response.success == true if authenticated
    })
```   

Success message:
```javascript
{ success : true, 
  userId  : "theUserId", 
  groups : []              // the groups for the user, "users", "admins" etc.
}
``` 

## Requesting access to channel : "requestChannel" 

The channel has ID which is in path format like `path/to/myChannel`. After authentication the client should ask to join a channel like this:

```javascript
    client.send("requestChannel", {
                channelId : "path/to/myChannel"
            });
    })
    .then( function(response) {
    });
        
``` 

Success message:
```javascript
{ success : true, channelId: "path/to/myChannel" }
``` 

## Sending commands to Channel : "channelCommand"

After joining the channel client can send commands to the servers Channel Controller.

```javascript
    client.send("channelCommand", {
                channelId : "path/to/myChannel",
                cmd : "channelStatus",
                data : ""
        }).then( function(response) {
        
        });
``` 

### Channel Commands

The channel protocol messages have following format:

```javascript
{
    channelId : "path/to/myChannel",    // channel Id
    cmd : "<command name>",             // treeOfLife, fork, readMain etc.
    data : ""                           // optional data to be sent
}
``` 
The best documentation of commands is the [Source Code starting from here](https://github.com/terotests/_channels/blob/master/README.md#_localChannelModel_fork)

The supported commands at the moment are:

1. treeOfLife
2. readBuildTree
3. getForks
4. channelStatus 
5. fork 
6. snapshot
7. writeMain
8. readMain
9. readMainVersion 
10. writeJournal
11. readJournal
12. readJournalVersion
    
Current for documentation see source code of _localChannelModel or _channelController.




















   

 


   
#### Class _channels





   
    
    
    
    
    
    
    
    
    
    
    
    


   
      
            
#### Class later


- [add](README.md#later_add)
- [asap](README.md#later_asap)
- [every](README.md#later_every)
- [once](README.md#later_once)
- [onFrame](README.md#later_onFrame)
- [polyfill](README.md#later_polyfill)
- [removeFrameFn](README.md#later_removeFrameFn)



   


   



      
    
      
            
#### Class _promise


- [all](README.md#_promise_all)
- [collect](README.md#_promise_collect)
- [fail](README.md#_promise_fail)
- [fulfill](README.md#_promise_fulfill)
- [isFulfilled](README.md#_promise_isFulfilled)
- [isPending](README.md#_promise_isPending)
- [isRejected](README.md#_promise_isRejected)
- [onStateChange](README.md#_promise_onStateChange)
- [reject](README.md#_promise_reject)
- [rejectReason](README.md#_promise_rejectReason)
- [resolve](README.md#_promise_resolve)
- [state](README.md#_promise_state)
- [then](README.md#_promise_then)
- [triggerStateChange](README.md#_promise_triggerStateChange)
- [value](README.md#_promise_value)



   
    
##### trait util_fns

- [isArray](README.md#util_fns_isArray)
- [isFunction](README.md#util_fns_isFunction)
- [isObject](README.md#util_fns_isObject)


    
    


   
      
    



      
    
      
            
#### Class sequenceStepper


- [_classFactory](README.md#sequenceStepper__classFactory)
- [addCommands](README.md#sequenceStepper_addCommands)
- [step](README.md#sequenceStepper_step)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    
      
            
#### Class _serverChannelMgr


- [addSocketToCh](README.md#_serverChannelMgr_addSocketToCh)
- [getSocketsFromCh](README.md#_serverChannelMgr_getSocketsFromCh)
- [removeSocketFromCh](README.md#_serverChannelMgr_removeSocketFromCh)



   


   



      
    
      
            
#### Class _localChannelModel


- [_classFactory](README.md#_localChannelModel__classFactory)
- [_createChannelDir](README.md#_localChannelModel__createChannelDir)
- [_createChannelSettings](README.md#_localChannelModel__createChannelSettings)
- [_isFreeToFork](README.md#_localChannelModel__isFreeToFork)
- [_textLinesToArray](README.md#_localChannelModel__textLinesToArray)
- [_writeSettings](README.md#_localChannelModel__writeSettings)
- [childForkTree](README.md#_localChannelModel_childForkTree)
- [fork](README.md#_localChannelModel_fork)
- [get](README.md#_localChannelModel_get)
- [getCurrentVersion](README.md#_localChannelModel_getCurrentVersion)
- [getForks](README.md#_localChannelModel_getForks)
- [incrementVersion](README.md#_localChannelModel_incrementVersion)
- [readBuildTree](README.md#_localChannelModel_readBuildTree)
- [readJournal](README.md#_localChannelModel_readJournal)
- [readMain](README.md#_localChannelModel_readMain)
- [set](README.md#_localChannelModel_set)
- [snapshot](README.md#_localChannelModel_snapshot)
- [status](README.md#_localChannelModel_status)
- [treeOfLife](README.md#_localChannelModel_treeOfLife)
- [writeMain](README.md#_localChannelModel_writeMain)
- [writeToJournal](README.md#_localChannelModel_writeToJournal)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    
      
            
#### Class _channelController


- [_askChUpgrade](README.md#_channelController__askChUpgrade)
- [_classFactory](README.md#_channelController__classFactory)
- [_doClientUpdate](README.md#_channelController__doClientUpdate)
- [_groupACL](README.md#_channelController__groupACL)
- [_initCmds](README.md#_channelController__initCmds)
- [_updateLoop](README.md#_channelController__updateLoop)
- [run](README.md#_channelController_run)



   


   



      
    





   
# Class _channels


The class has following internal singleton variables:
        
        
### _channels::constructor( host )

```javascript

```
        


   
    
    
    
    
    
    
    
    
    
    
    
    


   
      
            
# Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later_add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later_asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later_every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {

   var frame, cancelFrame;
   
   this.polyfill();
 
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   v.fn();
                   v.nextTime = ms + v.step;
               }
               if(v.until) {
                   if(v.until < ms) {
                       delete _everies[n];
                   }
               }
           }
       }       
       
       frame(_callQueQue);
       lastMs = ms;
    };
    _callQueQue();
    _initDone = true;
}
```
        
### <a name="later_once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later_onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later_polyfill"></a>later::polyfill(t)


```javascript
// --- let's not ---
```

### <a name="later_removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    
      
            
# Class _promise


The class has following internal singleton variables:
        
        
### <a name="_promise_all"></a>_promise::all(firstArg)


```javascript

var args;
if(this.isArray(firstArg)) {
  args = firstArg;
} else {
  args = Array.prototype.slice.call(arguments, 0);
}
// console.log(args);
var targetLen = args.length,
    rCnt = 0,
    myPromises = [],
    myResults = new Array(targetLen);
    
return this.then(
    function() {
 
        var allPromise = _promise();
        if(args.length==0) {
            allPromise.resolve([]);
        }
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    myResults[index] = v;
                    rCnt++;
                    if(rCnt==targetLen) {

                        allPromise.resolve(myResults);
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });



    

```

### <a name="_promise_collect"></a>_promise::collect(collectFn, promiseList, results)


```javascript

var args;
if(this.isArray(promiseList)) {
  args = promiseList;
} else {
  args = [promiseList];
}

// console.log(args);
var targetLen = args.length,
    isReady = false,
    noMore = false,
    rCnt = 0,
    myPromises = [],
    myResults = results || {};
    
return this.then(
    function() {
 
        var allPromise = _promise();
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if( (isReady && !noMore) || (noMore==false && targetLen == rCnt) ) {
                        allPromise.resolve(myResults);
                        noMore = true;
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });

```

### <a name="_promise_fail"></a>_promise::fail(fn)


```javascript
return this.then(null, fn);
```

### <a name="_promise_fulfill"></a>_promise::fulfill(withValue)


```javascript
// if(this._fulfilled || this._rejected) return;

if(this._rejected) return;
if(this._fulfilled && withValue != this._stateValue) {
    return;
}

var me = this;
this._fulfilled = true;
this._stateValue = withValue;

var chCnt = this._childPromises.length;

while(chCnt--) {
    var p = this._childPromises.shift();
    if(p._onFulfill) {
        try {
            var x = p._onFulfill(withValue);
            // console.log("Returned ",x);
            if(typeof(x)!="undefined") {
                p.resolve(x);
            } else {
                p.fulfill(withValue);
            }
        } catch(e) {
            // console.error(e);
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.fulfill(withValue);
    }
};
// this._childPromises.length = 0;
this._state = 1;
this.triggerStateChange();

```

### _promise::constructor( onFulfilled, onRejected )

```javascript
// 0 = pending
// 1 = fullfilled
// 2 = error

this._state = 0;
this._stateValue = null;
this._isAPromise = true;
this._childPromises = [];

if(this.isFunction(onFulfilled))
    this._onFulfill = onFulfilled;
if(this.isFunction(onRejected))
    this._onReject = onRejected;
    
if(!onRejected && this.isFunction(onFulfilled) ) {

    var me = this;
    later().asap(
        function() {
            onFulfilled( function(v) {
                me.resolve(v)
            }, function(v) {
                me.reject(v);
            });           
        });
 
}
```
        
### <a name="_promise_isFulfilled"></a>_promise::isFulfilled(t)


```javascript
return this._state == 1;
```

### <a name="_promise_isPending"></a>_promise::isPending(t)


```javascript
return this._state == 0;
```

### <a name="_promise_isRejected"></a>_promise::isRejected(v)


```javascript
return this._state == 2;
```

### <a name="_promise_onStateChange"></a>_promise::onStateChange(fn)


```javascript

if(!this._listeners)
    this._listeners = [];

this._listeners.push(fn);
```

### <a name="_promise_reject"></a>_promise::reject(withReason)


```javascript

// if(this._rejected || this._fulfilled) return;

// conso

if(this._fulfilled) return;
if(this._rejected && withReason != this._rejectReason) return;


this._state = 2;
this._rejected = true;
this._rejectReason = withReason;
var me = this;

var chCnt = this._childPromises.length;
while(chCnt--) {
    var p = this._childPromises.shift();

    if(p._onReject) {
        try {
            p._onReject(withReason);
            p.reject(withReason);
        } catch(e) {
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.reject(withReason);
    }
};

// this._childPromises.length = 0;
this.triggerStateChange();

```

### <a name="_promise_rejectReason"></a>_promise::rejectReason(reason)


```javascript
if(reason) {
    this._rejectReason = reason;
    return;
}
return this._rejectReason;
```

### <a name="_promise_resolve"></a>_promise::resolve(x)


```javascript

// console.log("Resolving ", x);

// can not do this many times...
if(this._state>0) return;

if(x==this) {
    // error
    this._rejectReason = "TypeError";
    this.reject(this._rejectReason);
    return;
}

if(this.isObject(x) && x._isAPromise) {
    
    // 
    this._state = x._state;
    this._stateValue = x._stateValue;
    this._rejectReason = x._rejectReason;
    // ... 
    if(this._state===0) {
        var me = this;
        x.onStateChange( function() {
            if(x._state==1) {
                // console.log("State change");
                me.resolve(x.value());
            } 
            if(x._state==2) {
                me.reject(x.rejectReason());                
            }
        });
    }
    if(this._state==1) {
        // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
        this.fulfill(this._stateValue);    
    }
    if(this._state==2) {
        // console.log("Relved to be Promise was rejected ", x._rejectReason);
        this.reject(this._rejectReason);
    }
    return;
}
if(this.isObject(x) && x.then && this.isFunction(x.then)) {
    // console.log("Thenable ", x);
    var didCall = false;
    try {
        // Call the x.then
        var  me = this;
        x.then.call(x, 
            function(y) {
                if(didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
            },
            function(r) {
                if(didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
            });
    } catch(e) {
        if(!didCall) this.reject(e);
    }
    return;    
}
this._state = 1;
this._stateValue = x;

// fulfill the promise...
this.fulfill(x);

```

### <a name="_promise_state"></a>_promise::state(newState)


```javascript
if(typeof(newState)!="undefined") {
    this._state = newState;
}
return this._state;
```

### <a name="_promise_then"></a>_promise::then(onFulfilled, onRejected)


```javascript

if(!onRejected) onRejected = function() {};

var p = new _promise(onFulfilled, onRejected);
var me = this;

if(this._state==1) {
    later().asap( function() {
        me.fulfill(me.value());
    });
}
if(this._state==2) {
    later().asap( function() {
        me.reject(me.rejectReason());
    });
}
this._childPromises.push(p);
return p;



```

### <a name="_promise_triggerStateChange"></a>_promise::triggerStateChange(t)


```javascript
var me = this;
if(!this._listeners) return;
this._listeners.forEach( function(fn) {
    fn(me); 
});
// one-timer
this._listeners.length = 0;
```

### <a name="_promise_value"></a>_promise::value(v)


```javascript
if(typeof(v)!="undefined") {
    this._stateValue = v;
    return this;
}
return this._stateValue;
```



   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns_isArray"></a>util_fns::isArray(someVar)


```javascript
return Object.prototype.toString.call( someVar ) === '[object Array]';
```

### <a name="util_fns_isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns_isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    


   
      
    



      
    
      
            
# Class sequenceStepper


The class has following internal singleton variables:
        
* _instances
        
        
### <a name="sequenceStepper__classFactory"></a>sequenceStepper::_classFactory(id, manual)


```javascript

if(id===false && manual) return;

if(!_instances) {
    _instances = {};
}

if(_instances[id]) {
    return _instances[id];
} else {
    _instances[id] = this;
}
```

### <a name="sequenceStepper_addCommands"></a>sequenceStepper::addCommands(cmdFunction, failure)


```javascript

if(this.isArray(cmdFunction)) {
    var me = this;
    cmdFunction.forEach( function(c) {
        me.addCommands( c );
    });
    return this;
}

this._commands.push( { 
                        fnCmd : cmdFunction, 
                        fnFail: failure, 
                        async : true }  );
```

### sequenceStepper::constructor( myId, manual )

```javascript

if(!this._commands) {
    this._commands = [];
    this.waitingList = [];
    this._index = 0;
}

var me = this;
if(!manual) {
    var _secStep = function() {
        me.step();
    }
    later().every(1/30, _secStep);
}

```
        
### <a name="sequenceStepper_step"></a>sequenceStepper::step(t)


```javascript
var i = this._index,
    len = this._commands.length;
    
if(i==len) return;

var first = _promise(),
    currentProm = first,
    myPromise = _promise(),
    me = this;

while(i<len) {
    var fn = this._commands[i];
    (function(fn) {
        currentProm = currentProm.then( function() {
            
            var p = _promise();
            
            // if(fn.async) {

            fn.fnCmd( function(res) {
                p.resolve(true); 
            }, function(failReason) {
                p.resolve(true);
                if(fn.fnFail) fn.fnFail( failReason );
            });                   

            return p; 
        }).fail( function(reason) {
            if(fn.fnFail) fn.fnFail( reason );
        });
    }(fn));
    this._index++;
    i++;
}

currentProm.then( function() {
   me.waitingList.shift(); // remvoe this promise from the queque
   myPromise.resolve(true);
   if(me.waitingList.length) {
       var newP = me.waitingList[0];
       newP.resolve(true);
   } 
}).fail( function(m) {
    
});


this.waitingList.push(first);
if(this.waitingList.length==1) {
    first.resolve(true);
} 
return myPromise;

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript

return t === Object(t);
```


    
    


   
      
    



      
    
      
            
# Class _serverChannelMgr


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _rooms
        
* _socketRooms
        
        
### <a name="_serverChannelMgr_addSocketToCh"></a>_serverChannelMgr::addSocketToCh(chId, socket)


```javascript

if(!this._channelSockets[chId]) {
    this._channelSockets[chId] = [];
}
if(this._channelSockets[chId].indexOf(socket) < 0 ) {
    this._channelSockets[chId].push(socket);
}
```

### <a name="_serverChannelMgr_getSocketsFromCh"></a>_serverChannelMgr::getSocketsFromCh(chId)


```javascript
if(!this._channelSockets[chId]) return [];

return this._channelSockets[chId];
```

### _serverChannelMgr::constructor( serverSocket, fileSystem, authManager )

```javascript

this._server = serverSocket;
this._auth = authManager;

this._channelSockets = {};

var me = this;

// The server which manages the client connections is here..

this._server.on("connect", function( socket ) {

    // keeps track of channels the socket is registered into    
    var _socketChannels = [];
    var ctrl; // the channel controller

    socket.on("requestChannel", function(cData, responseFn) {
        fileSystem.findPath(cData.channelId).then( function(fold) {
            if(fold) {
                
                // require first to authenticate, at least read access to join
                ctrl = _channelController( cData.channelId, fileSystem, me );
                ctrl.then( 
                    function() {
                        if(ctrl._groupACL(socket, "r")) {
                            socket.join(cData.channelId);
                            me.addSocketToCh(  cData.channelId, socket );
                            _socketChannels.push( cData.channelId );
                            responseFn({ success : true, channelId: cData.channelId});
                        } else {
                            responseFn({ success : false, channelId: null});
                        }
                    });
                
            } else {
                responseFn({ success : false, channelId: null});
            }
            
        })
    });
    
    socket.on("disconnect", function() {
        // console.log("--- channel manager got disconnect to the service pool ---- "); 
        // console.log("TODO: remove the channel so that it will not leak memory");
        // me.removeSocketFromCh(  socket );
        _socketChannels.forEach( function(chId) {
            me.removeSocketFromCh(chId, socket );
        });
    });
    
    socket.on("auth", function(cData, responseFn) {

        if(authManager) {
            authManager.login(cData.userId, cData.password).then( function(res) {
                if(res.result === true) {
                    var UID = res.userId;
                    var groups = res.groups;
                    console.log("AUTH groups ", res.groups);
                    socket.setAuthInfo( UID, groups);
                    responseFn( { success : true, userId: socket.getUserId(), groups : res.groups });
                } else {
                    responseFn( { success : false, userId: null });
                }
            })
        } else {
            responseFn( { success : false, userId: null });
        }
        
    });        
  

    // messages to the channel from the socket
    socket.on("channelCommand", function(cmd, responseFn) {

        if(!socket.getUserId()) {
            responseFn( { success : false, reason:"socket is not authenticated." });
            return;            
        }
        
        if(!socket.isInRoom( cmd.channelId) ) {
            responseFn( { success : false, reason:"not in room" });
            return;
        }
        
        // the command for the channel controller...
        ctrl.run( cmd, function(resp) {
            if(responseFn) responseFn( resp );
        }, socket);
        
    });
    
});
```
        
### <a name="_serverChannelMgr_removeSocketFromCh"></a>_serverChannelMgr::removeSocketFromCh(chId, socket)


```javascript
if(!this._channelSockets[chId]) return;

var i=this._channelSockets[chId].indexOf(socket);
if(i >= 0 ) {
    this._channelSockets[chId].splice(i,1);
}
```



   


   



      
    
      
            
# Class _localChannelModel


The class has following internal singleton variables:
        
* _instances
        
        
### <a name="_localChannelModel__classFactory"></a>_localChannelModel::_classFactory(id, fileSystem)


```javascript

if(!_instances) {
    _instances = {};
}

id = id + fileSystem.id();

if(_instances[id]) {
    return _instances[id];
} else {
    _instances[id] = this;
}
```

### <a name="_localChannelModel__createChannelDir"></a>_localChannelModel::_createChannelDir(channelId)

The channel ID should follow a normal path format like path/to/my/channel
```javascript

var str = channelId;
if(str.charAt(0)=="/") str = str.substring(1);

var parts = str.split("/");
var fs = this._fs,
    activeFolder = fs;

var actPromise = _promise();
var originalPromise = actPromise;
var me = this;


parts.forEach( 
    function(pathStr) {
        pathStr = pathStr.trim();
        if(pathStr.length==0) return;

        actPromise = actPromise.then( function() {
                         return activeFolder.isFolder(pathStr);
                    }).then( function(bCreate) {
                        if(!bCreate) {
                            return activeFolder.createDir(pathStr);
                        } else {
                            return true;
                        }
                    }).then( function() {
                        return activeFolder.getFolder(pathStr);         
                    }).then( function(f) {
                        activeFolder =  f;
                    });
    });
    
// after all done, place the active folder for our fs pointer
actPromise = actPromise.then( function() {
   me._folder = activeFolder;
});
originalPromise.resolve(true);

return actPromise;

```

### <a name="_localChannelModel__createChannelSettings"></a>_localChannelModel::_createChannelSettings(t)


```javascript
// The basic settings are like this:
/*
            obj.fromJournalLine = cnt;
            obj.version = 1;
            obj.fromVersion = me._latestVersion;
            obj.from = me._channelId;
            obj.to = forkData.channelId;
            obj.name = forkData.name;
            obj.utc = (new Date()).getTime();
*/

var folder = this._folder;
var me = this;
return _promise( function(result) {
   var bIsNew = false;
   folder.isFile("ch.settings").then( function(is_file) {
       if(!is_file) {
           bIsNew = true;
           return folder.writeFile("ch.settings", JSON.stringify({
               version : 1,
               name : "Initial version",
               utc : (new Date()).getTime(),
               channelId : me._channelId,
               journalLine : 0
           }));
       }
       return true;
   }).then( function() {
      return folder.readFile("ch.settings");
   }).then( function(jsonData) {
       var data = JSON.parse(jsonData);
       me._settings = data;
       result( me._settings );
   });
   
    
});
```

### <a name="_localChannelModel__isFreeToFork"></a>_localChannelModel::_isFreeToFork(channelId)


```javascript
var str = channelId;
if(str.charAt(0)=="/") str = str.substring(1);

var parts = str.split("/");
var fs = this._fs,
    activeFolder = fs;

var actPromise = _promise();
var originalPromise = actPromise;
var me = this,
    isFree = false;

parts.forEach( 
    function(pathStr) {
        
        pathStr = pathStr.trim();
        if(pathStr.length==0) return;
        actPromise = actPromise.then( function() {
                         if(isFree) return isFree;
                         return activeFolder.isFolder(pathStr);
                    }).then( function(isFolder) {
                        if(isFree) return;
                        if(!isFolder) {
                            isFree = true; // the folder path is free...
                            return isFree;
                        } else {
                            return isFree;
                        }
                    }).then( function() {
                        if(isFree) return isFree;
                        // get next level..
                        return activeFolder.getFolder(pathStr);         
                    }).then( function(f) {
                        if(isFree) return isFree;
                        activeFolder =  f;
                    });
    });
    
// after all done, place the active folder for our fs pointer
actPromise = actPromise.then( function() {
   return isFree;
});
originalPromise.resolve(true);

return actPromise;
```

### <a name="_localChannelModel__textLinesToArray"></a>_localChannelModel::_textLinesToArray(str)


```javascript
if(!str || typeof(str) != "string") return [];
var a = str.split("\n");
var res = [];
a.forEach( function(line) {
    if(line.trim().length==0) return;
    res.push( JSON.parse(line) );
})
return res;
```

### <a name="_localChannelModel__writeSettings"></a>_localChannelModel::_writeSettings(t)


```javascript
return this._folder.writeFile("ch.settings", JSON.stringify( this._settings) );
```

### <a name="_localChannelModel_childForkTree"></a>_localChannelModel::childForkTree(t)


```javascript
var local = this._folder, me = this;
return _promise( 
    function(response) {
        me.getForks()
            .then( function(forks) {
                var list = [],
                    results = [];
                if(!forks || forks.length==0) {
                    response([]);
                    return;
                }
                forks.forEach( function(fork) {
                    var forkModel = _localChannelModel( fork.to, me._fs );
                    list.push( forkModel.childForkTree() );
                });
                var prom = _promise();
                prom.all(list).then( function(childTrees) {
                     forks.forEach( function(fork, i) {
                         fork.children = childTrees[i];
                         results.push(fork);
                     });
                     response( results );
                });
                prom.resolve(true);            
            });

    });
```

### <a name="_localChannelModel_fork"></a>_localChannelModel::fork(forkData)
`forkData` Object with { channelId : &quot;path/to/the/challe&quot;,  name:&quot;name&quot;}
 

The forkData is object having properties &quot;channelId&quot; and &quot;name&quot; 
```javascript
var local = this._folder, me = this;
/*
// The basic data is like this
{
   version : 1,
   name : "Initial version",
   utc : (new Date()).getTime(),
   journalLine : 0,
   channelId : "my/channel/fork1/"
}
*/

return _promise( 
    function(response) {

        // ?? should we use the journal line provided by the forkData
        var settings = me._settings;
        
        var fromLine = settings.journalLine || 0;
        if(typeof( forkData.journalLine ) != "undefined" ) {
            fromLine = forkData.journalLine;
        }
        
        
        var obj = {
            fromJournalLine : fromLine,
            version : 1,    // the fork version is always 1 
            channelId : forkData.channelId,
            fromVersion : settings.version,
            from : me._channelId,
            to :  forkData.channelId,
            name : forkData.name,
            utc : (new Date()).getTime()
        };
        console.log("fork called with ");
        console.log(obj);
        
        // got to check first if the channel is free to be forked
        me._isFreeToFork(forkData.channelId).then( function(yesNo) {
            if(yesNo==true) {
                // TODO: check that the forked channel is valid here
                local.appendFile("forks", JSON.stringify(obj)+"\n")
                    .then( function() {
                        var newChann = _localChannelModel( forkData.channelId, me._fs );
                        newChann.then( function() {
                            return newChann.set( obj );
                        }).then( function() {
                            response(obj); 
                        });                
                    });
            } else {
                console.error("Channel already created");
                response({
                    result : false,
                    text : "Channel is already in use"
                }); 
            }
            
        }).fail( function(e) {
                console.error(e);
                response({
                    result : false,
                    text : "Creating the fork failed"
                });             
        })

    });



```

### <a name="_localChannelModel_get"></a>_localChannelModel::get(name)


```javascript
var local = this._db, me = this;
return _promise( 
    function(response) {
        me.then( function() {
            var settings = local.table("settings");
            settings.get(name).then( function(v) {
                response(v.value);   
            });
        })
    });
```

### <a name="_localChannelModel_getCurrentVersion"></a>_localChannelModel::getCurrentVersion(t)


```javascript
var local = this._folder, me = this;
return _promise( function(result) {
    result( me._settings.version );
});
```

### <a name="_localChannelModel_getForks"></a>_localChannelModel::getForks(t)


```javascript
var local = this._folder, me = this;
return _promise( function(result) {

    me.then( function() {
        return local.readFile("forks");
    }).then( function(res) {
        if(res) {
            result( me._textLinesToArray( res) );
        } else {
            result([]);
        }
    }).fail( function() {
        result([]);
    })
});
```

### <a name="_localChannelModel_incrementVersion"></a>_localChannelModel::incrementVersion(t)


```javascript
var local = this._folder, me = this;
return _promise( function(result) {
    me.then(
        function() {
            
            var settings = me._settings;
            
            settings.version++;
            settings.journalLine = 0;
            
            me._writeSettings().then( function() {
                result( settings.version );
            })
        });
});

```

### _localChannelModel::constructor( channelId, fileSystem )

```javascript

this._channelId = channelId;
this._latestVersion = 1;

this._fs = fileSystem; // store the filesystem into "fs" variable

var me = this;

// make sure the channel directory is there, then we are ready almost at least to go...
me._createChannelDir(channelId).then( function() {
    return me._createChannelSettings();
}).then( function() {
    me.resolve(true); 
}).fail( function(e) {
    console.error(e);
})

```
        
### <a name="_localChannelModel_readBuildTree"></a>_localChannelModel::readBuildTree(channelId, version, journalLine)


```javascript

var flatten = function(a) {
    return [].concat.apply([], a);
}

var local = this._folder, me = this;

if(channelId) {
    return _promise( 
         function(response) {
             var ch = _localChannelModel(channelId, me._fs);
             ch.then(
                 function() {
                     ch.readBuildTree(null, version, null).then( function(res) {
                          var jLen = res[0].length;
                          if(jLen > journalLine) {
                              res[0].splice( journalLine, jLen - journalLine );
                          }
                          response(res);
                     });
                 });
         });
}


return _promise( 
    function(response) {
        var repList = [],
            mainFile,
            journalFile;
        
        me.then( function() {
            return me.readMain(version); // first get the main
        }).then( function(mainFileRead) {
            if(mainFileRead) {
                mainFile = JSON.parse( mainFileRead );
            }
//             mainFile = mainFileRead;
            return me.readJournal(version);
        }).then( function(journal)  {
            journalFile = journal;
            
            if(me._settings.from && !mainFile) {

                var settings = me._settings;
                me.readBuildTree(settings.from, 
                                 settings.fromVersion, 
                                 settings.fromJournalLine).then( function(resp) {
                    repList.push(journal);
                    resp.forEach( function(r) {
                        repList.push(r);
                    });
                    response(repList);
                });
            } else {
                response( [journal, mainFile ]);
            }

        }).fail(function(msg) {
            console.error(msg);
        })
    });
```

### <a name="_localChannelModel_readJournal"></a>_localChannelModel::readJournal(version)


```javascript

var local = this._folder, 
    me = this,
    versionNumber = version || me._settings.version;

return _promise(
    function(res) {
        local.readFile( "journal."+versionNumber).then( function(data) {
            if(!data) {
                res([]);
                return;
            }
            res( me._textLinesToArray(data) );
        }).fail( function() {
            res([]);
        })
});
```

### <a name="_localChannelModel_readMain"></a>_localChannelModel::readMain(version)


```javascript

var local = this._folder, 
    me = this,
    versionNumber = version || me._settings.version;

if(versionNumber==1) {

    return _promise(function(r) {
        r(null);
    });
}

return local.readFile( "file."+versionNumber);

```

### <a name="_localChannelModel_set"></a>_localChannelModel::set(name, value)


```javascript
var local = this._folder, me = this,
    settings = this._settings;
    
if(this.isObject(name)) {
    for(var n in name) {
        if(name.hasOwnProperty(n)) {
            settings[n] = name[n];
        }
    }
} else {
    settings[name] = value;
}

return this._writeSettings( settings );

```

### <a name="_localChannelModel_snapshot"></a>_localChannelModel::snapshot(newMainData)


```javascript
var local = this._folder, me = this;

return _promise( 
    function(done) {
        var currentVersion;
        me.incrementVersion().then( function(nextVersion) {
            currentVersion = nextVersion-1;
            return me.writeMain( newMainData );
        }).then( function() {
            // The incrementVersion() call will do the following
            // me._settings.journalLine = 0;
            // me._settings.version = 0;
            done(true);
        });
    });

```

### <a name="_localChannelModel_status"></a>_localChannelModel::status(t)


```javascript
var local = this._folder, me = this;
return _promise( function(result) {
    me.then( function() {
        result( me._settings );
    });
});

```

### <a name="_localChannelModel_treeOfLife"></a>_localChannelModel::treeOfLife(channelId)


```javascript

// loads the whole tree of life for this entry, can be a big operation...

var local = this._folder, me = this;

if(channelId) {
    var model = _localChannelModel(channelId, this._fs);
    return model.treeOfLife();
}

return _promise( 
    function(response) {
        me.then( function() {

            if(me._settings.from) {
                me.treeOfLife(me._settings.from).then( response );
            } else {
                me.childForkTree().then( response );
            }
        })
    });
```

### <a name="_localChannelModel_writeMain"></a>_localChannelModel::writeMain(data, version)


```javascript

// NOTE: this function should not be used in typical situations
var local = this._folder, 
    me = this,
    versionNumber = version || me._settings.version;

if(typeof(data) != "string") data = JSON.stringify(data);

return local.writeFile( "file."+versionNumber, data);

```

### <a name="_localChannelModel_writeToJournal"></a>_localChannelModel::writeToJournal(row)


```javascript

var local = this._folder, me = this;

if(this.isArray(row[0])) {
    var str = "", cnt=0;
    row.forEach(function(r) {
        str+=JSON.stringify(r)+"\n";
        cnt++;
    });
    return _promise(
        function(resp) {
            local.appendFile( "journal."+me._settings.version, str)
                .then( function() {
                    me._settings.journalLine+=cnt;
                    me._writeSettings();
                    resp(true);
                })
        });    
}

return _promise(
    function(resp) {
        local.appendFile( "journal."+me._settings.version, JSON.stringify(row)+"\n")
            .then( function() {
                me._settings.journalLine++;
                me._writeSettings();
                resp(true);
            })
    });

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript

return t === Object(t);
```


    
    


   
      
    



      
    
      
            
# Class _channelController


The class has following internal singleton variables:
        
* _instances
        
* _cmds
        
        
### <a name="_channelController__askChUpgrade"></a>_channelController::_askChUpgrade(t)


```javascript

var sockets = this._chManager.getSocketsFromCh(this._channelId);

var me = this;
sockets.forEach( function(socket) {
    debugger;
    if(!me._serverState.upgrade) me._serverState.upgrade = {};
     me._serverState.upgrade[socket.getId()] = {
         askFull : true,
         socket : socket
     };
});
```

### <a name="_channelController__classFactory"></a>_channelController::_classFactory(id, fileSystem)


```javascript
if(!_instances) {
    _instances = {};
}

id = id + fileSystem.id();

if(_instances[id]) {
    return _instances[id];
} else {
    _instances[id] = this;
}
```

### <a name="_channelController__doClientUpdate"></a>_channelController::_doClientUpdate(t)


```javascript

var updObj, me = this;

if(!me._serverState) return;

if(me._serverState.upgrade) {
    
    for(var n in me._serverState.upgrade) {
        
        if(me._serverState.upgrade.hasOwnProperty(n)) {
            var info = me._serverState.upgrade[n];
            
            if(info.socket) {
                debugger;
                // do we need a full update or partial update?
                if(info.version != me._serverState.version || (info.askFull)) {
                    var fullData = me._serverState.data.getData();
                    info.socket.emit("upgrade_"+me._channelId, {
                        version : me._serverState.version,
                        journal : me._serverState.data._journal,
                        data : fullData
                    });                        
                } else {
                    var lastJournaLine = info.last_update[1];
                    info.socket.emit("upgrade_"+me._channelId, {
                        partialFrom : lastJournaLine,
                        partialEnds : me._serverState.data._journal.length,
                        partial : me._serverState.data._journal.slice(lastJournaLine)
                    });  
                }
                delete me._serverState.upgrade[n];
            }
        }
    }
}

// sending to all the sockets if there is data to be sent
if(me._broadcastSocket && me._policy) {
    var data = me._policy.constructServerToClient( me._serverState );  
    if(data) {
        if(!updObj) updObj = me._broadcastSocket.to( me._channelId );
        updObj.emit( "s2c_"+me._channelId, data );
        me._model.writeToJournal( data.c ).then( function(r) {
            
        });               
    } 
}

```

### <a name="_channelController__groupACL"></a>_channelController::_groupACL(socket, flags)


```javascript
 
 var me = this;
 if(!me._acl) return false;
 
 var roles = socket.getUserRoles();
 var a_ok = false;
 for(var i=0; i<roles.length;i++) {
     // must have "read attributes" and "read ACL flags"
     if( me._acl.find("", roles[i]+"@", flags) ) {
         a_ok = true;
         break;
     }
 }
 return a_ok;
```

### <a name="_channelController__initCmds"></a>_channelController::_initCmds(t)


```javascript

if(!_cmds) _cmds = {};
if(this._cmds) return;

var me = this;
this._cmds = {
    treeOfLife : function(cmd, result, socket) {
        if(!me._groupACL(socket, "r")) { result(null); return; }

        me._model.treeOfLife( ).then( function(r) {
            result(r); 
        });        
    },
    readBuildTree : function(cmd, result, socket) {
        if(!me._groupACL(socket, "r")) { result(null); return; }
        
        // read the build tree and the status...
        me._model.readBuildTree( ).then( function(r) {
            
            me._model.status().then( function(status) {
                result({
                    status : status,
                    build : r
                });
            });
            // result(r); 
        });        
    },
    getForks : function(cmd, result, socket) {
        if(!me._groupACL(socket, "r")) { result(null); return; }
        me._model.getForks( ).then( function(r) {
            result(r); 
        });        
    },     
    channelStatus : function(cmd, result, socket) {
        if(!me._groupACL(socket, "tc")) { result(null); return; }
        me._model.status( ).then( function(r) {
            result(r); 
        });        
    },    
    raw : function(cmd, result, socket) {
        if(me._groupACL(socket, "tc")) {
            result(me._chData.getData()); 
        } else {
            result( null );
        }
    },     
    fork : function(cmd, result, socket) {
        if(!me._groupACL(socket, "w")) { result(null); return; }
        if(!cmd.data) {
            result({ ok : false }); 
            return;
        }
        me._model.fork( cmd.data ).then( function(r) {
            result(r); 
        });        
    },    
    // the snapshot command should cause all the sockets to be upgraded
    snapshot : function(cmd, result, socket) {
        
        console.log("got snapshot command");
        
        if(!me._groupACL(socket, "w")) { result(null); return; }
        
        var fullData = me._serverState.data.getData();
        
        // first, save all the unsaved changes and refresh the clients with unsent data
        me._doClientUpdate();
        
        console.log("About to call me._model.snapshot ");
        debugger;
        // then, create new version of the main file
        me._model.snapshot( fullData ).then( function(r) {
            
            // the _serverState data must be also upgraded...
            me._serverState.version++; // ????
            me._serverState.data._journal.length = 0;
            me._serverState.last_update[0] = 0;
            me._serverState.last_update[1] = 0;
            
            console.log("After snapshot ");
            console.log(me._serverState);
            
            // ask channels to upgrade to the latest version of data
            me._askChUpgrade(me._channelId);
            result({ ok : true }); 
        });        
    },
    writeMain : function( cmd, result, socket ) {
        if(!me._groupACL(socket, "w")) { result(null); return; }
        me._model.writeFile( "main", cmd.data ).then( function(r) {
            result({ ok : true}); 
        });
    },
    readMain : function( cmd, result, socket ) {
        if(!me._groupACL(socket, "r")) { result(null); return; }
        me._model.readMain().then( function(r) {
            result(r); 
        });
    },
    readMainVersion : function( cmd, result, socket ) {
        if(!me._groupACL(socket, "r")) { result(null); return; }
        me._model.readMain(cmd.data).then( function(r) {
            result(r); 
        });
    },
    upgradeRequest : function( cmd, result, socket ) {

        if(!me._groupACL(socket, "r")) { result(null); return; }
        if(!me._serverState.upgrade) {
            me._serverState.upgrade = {};
        }

        // the upgrade request sent by the client...
        cmd.data.socket = socket;
        me._serverState.upgrade[socket.getId()] = cmd.data;
        
        result({ result : true });
    },     
    c2s : function( cmd, result, socket ) {

        if(!me._groupACL(socket, "w")) { result(null); return; }
        
        var uid = socket.getUserId();
        var len = cmd.data.c.length,
            list = cmd.data.c,
            utc = (new Date).getTime();
        for(var i=0; i<len; i++) {
            list[i][5] = utc;
            list[i][6] = uid;
        }
        
        var res = me._policy.deltaClientToServer( cmd.data, me._serverState );
        
        // pick one socket so that we can broadcast if necessary...
        if(! me._broadcastSocket ) me._broadcastSocket = socket;
        
        // in this case we do not write immediately to all clients, just return
        // the result to the client
        result(res);
        
        // TODO: socket, emit to all clients.
        
    },    
    changeFrame : function( cmd, result, socket ) {
        
        if(!me._groupACL(socket, "w")) { result(null); return; }


        var res = me._tManager.execute( cmd.data );
        
        // ERROR: should be checking the results here...
        // might also write to the actual file-buffer here...
        
        if(res.validCnt > 0 ) {
            cmd.data.commands.length = res.validCnt;
            me._model.writeToJournal( cmd.data.commands ).then( function(r) {
                socket.broadcast.to(cmd.channelId).emit("frame_"+cmd.channelId, cmd );
                result(res);
            });        
        } else {
            result(res);
        }
        // result(res);
        
        /*
        me._model.writeToJournal( cmd.data ).then( function(r) {
            socket.broadcast.to(cmd.channelId).emit("ch_"+cmd.channelId, cmd );
            result({ ok : true}); 
        });
        */
    },    
    writeJournal : function( cmd, result, socket ) {
        if(!me._groupACL(socket, "w")) { result(null); return; }
        me._model.writeToJournal( cmd.data ).then( function(r) {
            socket.broadcast.to(cmd.channelId).emit("ch_"+cmd.channelId, cmd );
            result({ ok : true}); 
        });
    },
    readJournal : function( cmd, result, socket ) {
        if(!me._groupACL(socket, "r")) { result(null); return; }
        me._model.readJournal().then( function(r) {
            result(r); 
        });
    },
    readJournalVersion : function( cmd, result, socket ) {
        if(!me._groupACL(socket, "r")) { result(null); return; }
        me._model.readJournal(cmd.data).then( function(r) {
            result(r); 
        });
    }
}
```

### <a name="_channelController__updateLoop"></a>_channelController::_updateLoop(t)


```javascript

var me = this;
later().every(1/5, function() {
    me._doClientUpdate();
});
```

### _channelController::constructor( channelId, fileSystem, chManager )

```javascript

this._channelId = channelId;
this._commands = sequenceStepper(channelId);
this._chManager = chManager;

// important point: the file system is passed here to the local channel model
this._model = _localChannelModel( channelId, fileSystem );

var me = this;

// Then, construct the channel model from the data
this._model.readBuildTree( ).then( function(r) {
    

    // the build tree
    var mainData = r.pop();
    var dataTest = _channelData( channelId+ fileSystem.id(), mainData, [] );
    var list = r.pop();
    
    // NOW, here is a problem, the in-memory channel "journal" should be truncated
    while(list) {
        dataTest._journalPointer = 0;
        dataTest._journal.length = 0; // <-- the journal length, last will be spared
        list.forEach( function(c) {
            dataTest.execCmd(c);
        });
        list = r.pop();
    }
    

    // The state of the server - what should be the "last_update" ?  
    me._serverState = {
        data :          dataTest,                       // The channel data object set here
        version :       me._model._settings.version,    // the version of the channel model
        last_update :   [0, dataTest.getJournalLine()],             // the range of last commands sent to the client
        _done :         {}              // hash of handled packet ID's
    };    
    
    
    var data = dataTest.getData();
    if(data.__acl) {
        me._acl = nfs4_acl( data.__acl );
    }
    
    me._tManager = _channelTransaction(channelId + fileSystem.id(), dataTest);
    
    // The channel policy might replace the transaction manager...
    me._policy = _chPolicy();
    
    me._updateLoop(); // start the update loop
    
    // And, here it is finally then...
    me._chData = dataTest;
    me.resolve(true);
    
}); 


this._initCmds();

```
        
### <a name="_channelController_run"></a>_channelController::run(cmd, responseFn, socket)


```javascript

// 1. selecting the command to be run here...
var fn = this._cmds[cmd.cmd];
if(fn) {
    this._commands.addCommands(function(contFn) {
            fn(cmd, function(result) {
                responseFn(result);
                contFn();
            }, socket);
        });
}

```



   


   



      
    




