// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var _channels_prototype = function _channels_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var later_prototype = function later_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;

        // Initialize static variables here...

        /**
         * @param function fn
         * @param float thisObj
         * @param float args
         */
        _myTrait_.add = function (fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === "[object Array]") {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        };

        /**
         * @param function fn
         */
        _myTrait_.asap = function (fn) {
          this.add(fn);
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.every = function (seconds, fn, name) {

          if (!name) {
            name = "time" + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (interval, fn) {
          if (!_initDone) {

            var frame, cancelFrame;

            this.polyfill();

            if (typeof window != "undefined") {
              var frame = window["requestAnimationFrame"],
                  cancelFrame = window["cancelRequestAnimationFrame"];
              ["", "ms", "moz", "webkit", "o"].forEach(function (x) {
                if (!frame) {
                  frame = window[x + "RequestAnimationFrame"];
                  cancelFrame = window[x + "CancelAnimationFrame"] || window[x + "CancelRequestAnimationFrame"];
                }
              });
            }

            if (!frame) frame = function (cb) {
              return setTimeout(cb, 16);
            };

            if (!cancelFrame) cancelFrame = function (id) {
              clearTimeout(id);
            };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function _callQueQue() {
              var ms = new Date().getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === "[object Array]") {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }
              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    v.fn();
                    v.nextTime = ms + v.step;
                  }
                  if (v.until) {
                    if (v.until < ms) {
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
        });

        /**
         * @param  key
         * @param float fn
         * @param float value
         */
        _myTrait_.once = function (key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        };

        /**
         * @param function fn
         */
        _myTrait_.onFrame = function (fn) {

          _framers.push(fn);
        };

        /**
         * @param float t
         */
        _myTrait_.polyfill = function (t) {};

        /**
         * @param float fn
         */
        _myTrait_.removeFrameFn = function (fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        };
      })(this);
    };

    var later = function later(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    later._classInfo = {
      name: "later"
    };
    later.prototype = new later_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _promise_prototype = function _promise_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float someVar
         */
        _myTrait_.isArray = function (someVar) {
          return Object.prototype.toString.call(someVar) === "[object Array]";
        };

        /**
         * @param Function fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param Object obj
         */
        _myTrait_.isObject = function (obj) {
          return obj === Object(obj);
        };
      })(this);

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param Array firstArg
         */
        _myTrait_.all = function (firstArg) {

          var args;
          if (this.isArray(firstArg)) {
            args = firstArg;
          } else {
            args = Array.prototype.slice.call(arguments, 0);
          }
          // console.log(args);
          var targetLen = args.length,
              rCnt = 0,
              myPromises = [],
              myResults = new Array(targetLen);

          return this.then(function () {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  myResults[index] = v;
                  rCnt++;
                  if (rCnt == targetLen) {

                    allPromise.resolve(myResults);
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject("Not list of promises");
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function collectFn
         * @param array promiseList
         * @param Object results
         */
        _myTrait_.collect = function (collectFn, promiseList, results) {

          var args;
          if (this.isArray(promiseList)) {
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

          return this.then(function () {

            var allPromise = _promise();
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if (isReady && !noMore || noMore == false && targetLen == rCnt) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject("Not list of promises");
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function fn
         */
        _myTrait_.fail = function (fn) {
          return this.then(null, fn);
        };

        /**
         * @param float withValue
         */
        _myTrait_.fulfill = function (withValue) {
          // if(this._fulfilled || this._rejected) return;

          if (this._rejected) return;
          if (this._fulfilled && withValue != this._stateValue) {
            return;
          }

          var me = this;
          this._fulfilled = true;
          this._stateValue = withValue;

          var chCnt = this._childPromises.length;

          while (chCnt--) {
            var p = this._childPromises.shift();
            if (p._onFulfill) {
              try {
                var x = p._onFulfill(withValue);
                // console.log("Returned ",x);
                if (typeof x != "undefined") {
                  p.resolve(x);
                } else {
                  p.fulfill(withValue);
                }
              } catch (e) {
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
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error

          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled)) this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected)) this._onReject = onRejected;

          if (!onRejected && this.isFunction(onFulfilled)) {

            var me = this;
            later().asap(function () {
              onFulfilled(function (v) {
                me.resolve(v);
              }, function (v) {
                me.reject(v);
              });
            });
          }
        });

        /**
         * @param float t
         */
        _myTrait_.isFulfilled = function (t) {
          return this._state == 1;
        };

        /**
         * @param float t
         */
        _myTrait_.isPending = function (t) {
          return this._state == 0;
        };

        /**
         * @param bool v
         */
        _myTrait_.isRejected = function (v) {
          return this._state == 2;
        };

        /**
         * @param function fn
         */
        _myTrait_.onStateChange = function (fn) {

          if (!this._listeners) this._listeners = [];

          this._listeners.push(fn);
        };

        /**
         * @param Object withReason
         */
        _myTrait_.reject = function (withReason) {

          // if(this._rejected || this._fulfilled) return;

          // conso

          if (this._fulfilled) return;
          if (this._rejected && withReason != this._rejectReason) return;

          this._state = 2;
          this._rejected = true;
          this._rejectReason = withReason;
          var me = this;

          var chCnt = this._childPromises.length;
          while (chCnt--) {
            var p = this._childPromises.shift();

            if (p._onReject) {
              try {
                p._onReject(withReason);
                p.reject(withReason);
              } catch (e) {
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
        };

        /**
         * @param Object reason
         */
        _myTrait_.rejectReason = function (reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        };

        /**
         * @param Object x
         */
        _myTrait_.resolve = function (x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = "TypeError";
            this.reject(this._rejectReason);
            return;
          }

          if (this.isObject(x) && x._isAPromise) {

            //
            this._state = x._state;
            this._stateValue = x._stateValue;
            this._rejectReason = x._rejectReason;
            // ...
            if (this._state === 0) {
              var me = this;
              x.onStateChange(function () {
                if (x._state == 1) {
                  // console.log("State change");
                  me.resolve(x.value());
                }
                if (x._state == 2) {
                  me.reject(x.rejectReason());
                }
              });
            }
            if (this._state == 1) {
              // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
              this.fulfill(this._stateValue);
            }
            if (this._state == 2) {
              // console.log("Relved to be Promise was rejected ", x._rejectReason);
              this.reject(this._rejectReason);
            }
            return;
          }
          if (this.isObject(x) && x.then && this.isFunction(x.then)) {
            // console.log("Thenable ", x);
            var didCall = false;
            try {
              // Call the x.then
              var me = this;
              x.then.call(x, function (y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              }, function (r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
            } catch (e) {
              if (!didCall) this.reject(e);
            }
            return;
          }
          this._state = 1;
          this._stateValue = x;

          // fulfill the promise...
          this.fulfill(x);
        };

        /**
         * @param float newState
         */
        _myTrait_.state = function (newState) {
          if (typeof newState != "undefined") {
            this._state = newState;
          }
          return this._state;
        };

        /**
         * @param function onFulfilled
         * @param function onRejected
         */
        _myTrait_.then = function (onFulfilled, onRejected) {

          if (!onRejected) onRejected = function () {};

          var p = new _promise(onFulfilled, onRejected);
          var me = this;

          if (this._state == 1) {
            later().asap(function () {
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            later().asap(function () {
              me.reject(me.rejectReason());
            });
          }
          this._childPromises.push(p);
          return p;
        };

        /**
         * @param float t
         */
        _myTrait_.triggerStateChange = function (t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function (fn) {
            fn(me);
          });
          // one-timer
          this._listeners.length = 0;
        };

        /**
         * @param float v
         */
        _myTrait_.value = function (v) {
          if (typeof v != "undefined") {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        };
      })(this);
    };

    var _promise = function _promise(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _promise._classInfo = {
      name: "_promise"
    };
    _promise.prototype = new _promise_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var sequenceStepper_prototype = function sequenceStepper_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === "[object Array]";
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {

          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instances;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id, manual) {

          if (id === false && manual) return;

          if (!_instances) {
            _instances = {};
          }

          if (_instances[id]) {
            return _instances[id];
          } else {
            _instances[id] = this;
          }
        });

        /**
         * @param float cmdFunction
         * @param float failure
         */
        _myTrait_.addCommands = function (cmdFunction, failure) {

          if (this.isArray(cmdFunction)) {
            var me = this;
            cmdFunction.forEach(function (c) {
              me.addCommands(c);
            });
            return this;
          }

          this._commands.push({
            fnCmd: cmdFunction,
            fnFail: failure,
            async: true
          });
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (myId, manual) {

          if (!this._commands) {
            this._commands = [];
            this.waitingList = [];
            this._index = 0;
          }

          var me = this;
          if (!manual) {
            var _secStep = function _secStep() {
              me.step();
            };
            later().every(1 / 30, _secStep);
          }
        });

        /**
         * @param float t
         */
        _myTrait_.step = function (t) {
          var i = this._index,
              len = this._commands.length;

          if (i == len) return;

          var first = _promise(),
              currentProm = first,
              myPromise = _promise(),
              me = this;

          while (i < len) {
            var fn = this._commands[i];
            (function (fn) {
              currentProm = currentProm.then(function () {

                var p = _promise();

                // if(fn.async) {

                fn.fnCmd(function (res) {
                  p.resolve(true);
                }, function (failReason) {
                  p.resolve(true);
                  if (fn.fnFail) fn.fnFail(failReason);
                });

                return p;
              }).fail(function (reason) {
                if (fn.fnFail) fn.fnFail(reason);
              });
            })(fn);
            this._index++;
            i++;
          }

          currentProm.then(function () {
            me.waitingList.shift(); // remvoe this promise from the queque
            myPromise.resolve(true);
            if (me.waitingList.length) {
              var newP = me.waitingList[0];
              newP.resolve(true);
            }
          }).fail(function (m) {});

          this.waitingList.push(first);
          if (this.waitingList.length == 1) {
            first.resolve(true);
          }
          return myPromise;
        };
      })(this);
    };

    var sequenceStepper = function sequenceStepper(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof sequenceStepper) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != sequenceStepper._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new sequenceStepper(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    sequenceStepper._classInfo = {
      name: "sequenceStepper"
    };
    sequenceStepper.prototype = new sequenceStepper_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _serverChannelMgr_prototype = function _serverChannelMgr_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _channelIndex;
        var _rootData;
        var _rooms;
        var _socketRooms;

        // Initialize static variables here...

        /**
         * @param float chId
         * @param float socket
         */
        _myTrait_.addSocketToCh = function (chId, socket) {

          if (!this._channelSockets[chId]) {
            this._channelSockets[chId] = [];
          }
          if (this._channelSockets[chId].indexOf(socket) < 0) {
            this._channelSockets[chId].push(socket);
          }
        };

        /**
         * @param float chId
         */
        _myTrait_.getSocketsFromCh = function (chId) {
          if (!this._channelSockets[chId]) return [];

          return this._channelSockets[chId];
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (serverSocket, fileSystem, authManager) {

          this._server = serverSocket;
          this._auth = authManager;

          this._channelSockets = {};

          var me = this;

          // The server which manages the client connections is here..

          this._server.on("connect", function (socket) {

            // keeps track of channels the socket is registered into   
            var _socketChannels = [];
            var ctrl; // the channel controller

            socket.on("requestChannel", function (cData, responseFn) {
              fileSystem.findPath(cData.channelId).then(function (fold) {
                if (fold) {

                  // require first to authenticate, at least read access to join
                  ctrl = _channelController(cData.channelId, fileSystem, me);
                  ctrl.then(function () {
                    if (ctrl._groupACL(socket, "r")) {
                      socket.join(cData.channelId);
                      me.addSocketToCh(cData.channelId, socket);
                      _socketChannels.push(cData.channelId);
                      responseFn({
                        success: true,
                        channelId: cData.channelId
                      });
                    } else {
                      responseFn({
                        success: false,
                        channelId: null
                      });
                    }
                  });
                } else {
                  responseFn({
                    success: false,
                    channelId: null
                  });
                }
              });
            });

            socket.on("disconnect", function () {
              // console.log("--- channel manager got disconnect to the service pool ---- ");
              // console.log("TODO: remove the channel so that it will not leak memory");
              // me.removeSocketFromCh(  socket );
              _socketChannels.forEach(function (chId) {
                me.removeSocketFromCh(chId, socket);
              });
            });

            socket.on("auth", function (cData, responseFn) {

              if (authManager) {
                authManager.login(cData.userId, cData.password).then(function (res) {
                  if (res.result === true) {
                    var UID = res.userId;
                    var groups = res.groups;
                    console.log("AUTH groups ", res.groups);
                    socket.setAuthInfo(UID, groups);
                    responseFn({
                      success: true,
                      userId: socket.getUserId(),
                      groups: res.groups
                    });
                  } else {
                    responseFn({
                      success: false,
                      userId: null
                    });
                  }
                });
              } else {
                responseFn({
                  success: false,
                  userId: null
                });
              }
            });

            // messages to the channel from the socket
            socket.on("channelCommand", function (cmd, responseFn) {

              if (!socket.getUserId()) {
                responseFn({
                  success: false,
                  reason: "socket is not authenticated."
                });
                return;
              }

              if (!socket.isInRoom(cmd.channelId)) {
                responseFn({
                  success: false,
                  reason: "not in room"
                });
                return;
              }

              // the command for the channel controller...
              ctrl.run(cmd, function (resp) {
                if (responseFn) responseFn(resp);
              }, socket);
            });
          });
        });

        /**
         * @param float chId
         * @param float socket
         */
        _myTrait_.removeSocketFromCh = function (chId, socket) {
          if (!this._channelSockets[chId]) return;

          var i = this._channelSockets[chId].indexOf(socket);
          if (i >= 0) {
            this._channelSockets[chId].splice(i, 1);
          }
        };
      })(this);
    };

    var _serverChannelMgr = function _serverChannelMgr(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _serverChannelMgr) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != _serverChannelMgr._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new _serverChannelMgr(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _serverChannelMgr._classInfo = {
      name: "_serverChannelMgr"
    };
    _serverChannelMgr.prototype = new _serverChannelMgr_prototype();

    (function () {
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        __amdDefs__["_serverChannelMgr"] = _serverChannelMgr;
        this._serverChannelMgr = _serverChannelMgr;
      } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
        module.exports["_serverChannelMgr"] = _serverChannelMgr;
      } else {
        this._serverChannelMgr = _serverChannelMgr;
      }
    }).call(new Function("return this")());

    // the subclass definition comes around here then

    // The class definition is here...
    var _localChannelModel_prototype = function _localChannelModel_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === "[object Array]";
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {

          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instances;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id, fileSystem) {

          if (!_instances) {
            _instances = {};
          }

          id = id + fileSystem.id();

          if (_instances[id]) {
            return _instances[id];
          } else {
            _instances[id] = this;
          }
        });

        /**
         * The channel ID should follow a normal path format like path/to/my/channel
         * @param String channelId
         */
        _myTrait_._createChannelDir = function (channelId) {

          var str = channelId;
          if (str.charAt(0) == "/") str = str.substring(1);

          var parts = str.split("/");
          var fs = this._fs,
              activeFolder = fs;

          var actPromise = _promise();
          var originalPromise = actPromise;
          var me = this;

          parts.forEach(function (pathStr) {
            pathStr = pathStr.trim();
            if (pathStr.length == 0) return;

            actPromise = actPromise.then(function () {
              return activeFolder.isFolder(pathStr);
            }).then(function (bCreate) {
              if (!bCreate) {
                return activeFolder.createDir(pathStr);
              } else {
                return true;
              }
            }).then(function () {
              return activeFolder.getFolder(pathStr);
            }).then(function (f) {
              activeFolder = f;
            });
          });

          // after all done, place the active folder for our fs pointer
          actPromise = actPromise.then(function () {
            me._folder = activeFolder;
          });
          originalPromise.resolve(true);

          return actPromise;
        };

        /**
         * @param float t
         */
        _myTrait_._createChannelSettings = function (t) {
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
          return _promise(function (result) {
            var bIsNew = false;
            folder.isFile("ch.settings").then(function (is_file) {
              if (!is_file) {
                bIsNew = true;
                return folder.writeFile("ch.settings", JSON.stringify({
                  version: 1,
                  name: "Initial version",
                  utc: new Date().getTime(),
                  channelId: me._channelId,
                  journalLine: 0
                }));
              }
              return true;
            }).then(function () {
              return folder.readFile("ch.settings");
            }).then(function (jsonData) {
              var data = JSON.parse(jsonData);
              me._settings = data;
              result(me._settings);
            });
          });
        };

        /**
         * @param string channelId
         */
        _myTrait_._isFreeToFork = function (channelId) {
          var str = channelId;
          if (str.charAt(0) == "/") str = str.substring(1);

          var parts = str.split("/");
          var fs = this._fs,
              activeFolder = fs;

          var actPromise = _promise();
          var originalPromise = actPromise;
          var me = this,
              isFree = false;

          parts.forEach(function (pathStr) {

            pathStr = pathStr.trim();
            if (pathStr.length == 0) return;
            actPromise = actPromise.then(function () {
              if (isFree) return isFree;
              return activeFolder.isFolder(pathStr);
            }).then(function (isFolder) {
              if (isFree) return;
              if (!isFolder) {
                isFree = true; // the folder path is free...
                return isFree;
              } else {
                return isFree;
              }
            }).then(function () {
              if (isFree) return isFree;
              // get next level..
              return activeFolder.getFolder(pathStr);
            }).then(function (f) {
              if (isFree) return isFree;
              activeFolder = f;
            });
          });

          // after all done, place the active folder for our fs pointer
          actPromise = actPromise.then(function () {
            return isFree;
          });
          originalPromise.resolve(true);

          return actPromise;
        };

        /**
         * @param string str
         */
        _myTrait_._textLinesToArray = function (str) {
          if (!str || typeof str != "string") return [];
          var a = str.split("\n");
          var res = [];
          a.forEach(function (line) {
            if (line.trim().length == 0) return;
            res.push(JSON.parse(line));
          });
          return res;
        };

        /**
         * @param float t
         */
        _myTrait_._writeSettings = function (t) {
          return this._folder.writeFile("ch.settings", JSON.stringify(this._settings));
        };

        /**
         * @param float t
         */
        _myTrait_.childForkTree = function (t) {
          var local = this._folder,
              me = this;
          return _promise(function (response) {
            me.getForks().then(function (forks) {
              var list = [],
                  results = [];
              if (!forks || forks.length == 0) {
                response([]);
                return;
              }
              forks.forEach(function (fork) {
                var forkModel = _localChannelModel(fork.to, me._fs);
                list.push(forkModel.childForkTree());
              });
              var prom = _promise();
              prom.all(list).then(function (childTrees) {
                forks.forEach(function (fork, i) {
                  fork.children = childTrees[i];
                  results.push(fork);
                });
                response(results);
              });
              prom.resolve(true);
            });
          });
        };

        /**
         * The forkData is object having properties &quot;channelId&quot; and &quot;name&quot;
         * @param Object forkData  - Object with { channelId : &quot;path/to/the/challe&quot;,  name:&quot;name&quot;}
         */
        _myTrait_.fork = function (forkData) {
          var local = this._folder,
              me = this;
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

          return _promise(function (response) {

            // ?? should we use the journal line provided by the forkData
            var settings = me._settings;

            var fromLine = settings.journalLine || 0;
            if (typeof forkData.journalLine != "undefined") {
              fromLine = forkData.journalLine;
            }

            var obj = {
              fromJournalLine: fromLine,
              version: 1, // the fork version is always 1
              channelId: forkData.channelId,
              fromVersion: settings.version,
              from: me._channelId,
              to: forkData.channelId,
              name: forkData.name,
              utc: new Date().getTime()
            };
            console.log("fork called with ");
            console.log(obj);

            // got to check first if the channel is free to be forked
            me._isFreeToFork(forkData.channelId).then(function (yesNo) {
              if (yesNo == true) {
                // TODO: check that the forked channel is valid here
                local.appendFile("forks", JSON.stringify(obj) + "\n").then(function () {
                  var newChann = _localChannelModel(forkData.channelId, me._fs);
                  newChann.then(function () {
                    return newChann.set(obj);
                  }).then(function () {
                    response(obj);
                  });
                });
              } else {
                console.error("Channel already created");
                response({
                  result: false,
                  text: "Channel is already in use"
                });
              }
            }).fail(function (e) {
              console.error(e);
              response({
                result: false,
                text: "Creating the fork failed"
              });
            });
          });
        };

        /**
         * @param String name
         */
        _myTrait_.get = function (name) {
          var local = this._db,
              me = this;
          return _promise(function (response) {
            me.then(function () {
              var settings = local.table("settings");
              settings.get(name).then(function (v) {
                response(v.value);
              });
            });
          });
        };

        /**
         * @param float t
         */
        _myTrait_.getCurrentVersion = function (t) {
          var local = this._folder,
              me = this;
          return _promise(function (result) {
            result(me._settings.version);
          });
        };

        /**
         * @param float t
         */
        _myTrait_.getForks = function (t) {
          var local = this._folder,
              me = this;
          return _promise(function (result) {

            me.then(function () {
              return local.readFile("forks");
            }).then(function (res) {
              if (res) {
                result(me._textLinesToArray(res));
              } else {
                result([]);
              }
            }).fail(function () {
              result([]);
            });
          });
        };

        /**
         * @param float t
         */
        _myTrait_.incrementVersion = function (t) {
          var local = this._folder,
              me = this;
          return _promise(function (result) {
            me.then(function () {

              var settings = me._settings;

              settings.version++;
              settings.journalLine = 0;

              me._writeSettings().then(function () {
                result(settings.version);
              });
            });
          });
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (channelId, fileSystem) {

          this._channelId = channelId;
          this._latestVersion = 1;

          this._fs = fileSystem; // store the filesystem into "fs" variable

          var me = this;

          // make sure the channel directory is there, then we are ready almost at least to go...
          me._createChannelDir(channelId).then(function () {
            return me._createChannelSettings();
          }).then(function () {
            me.resolve(true);
          }).fail(function (e) {
            console.error(e);
          });
        });

        /**
         * @param float channelId
         * @param float version
         * @param float journalLine
         */
        _myTrait_.readBuildTree = function (channelId, version, journalLine) {

          var flatten = function flatten(a) {
            return [].concat.apply([], a);
          };

          var local = this._folder,
              me = this;

          if (channelId) {
            return _promise(function (response) {
              var ch = _localChannelModel(channelId, me._fs);
              ch.then(function () {
                ch.readBuildTree(null, version, null).then(function (res) {
                  var jLen = res[0].length;
                  if (jLen > journalLine) {
                    res[0].splice(journalLine, jLen - journalLine);
                  }
                  response(res);
                });
              });
            });
          }

          return _promise(function (response) {
            var repList = [],
                mainFile,
                journalFile;

            me.then(function () {
              return me.readMain(version); // first get the main
            }).then(function (mainFileRead) {
              if (mainFileRead) {
                mainFile = JSON.parse(mainFileRead);
              }
              //             mainFile = mainFileRead;
              return me.readJournal(version);
            }).then(function (journal) {
              journalFile = journal;

              if (me._settings.from && !mainFile) {

                var settings = me._settings;
                me.readBuildTree(settings.from, settings.fromVersion, settings.fromJournalLine).then(function (resp) {
                  repList.push(journal);
                  resp.forEach(function (r) {
                    repList.push(r);
                  });
                  response(repList);
                });
              } else {
                response([journal, mainFile]);
              }
            }).fail(function (msg) {
              console.error(msg);
            });
          });
        };

        /**
         * @param float version
         */
        _myTrait_.readJournal = function (version) {

          var local = this._folder,
              me = this,
              versionNumber = version || me._settings.version;

          return _promise(function (res) {
            local.readFile("journal." + versionNumber).then(function (data) {
              if (!data) {
                res([]);
                return;
              }
              res(me._textLinesToArray(data));
            }).fail(function () {
              res([]);
            });
          });
        };

        /**
         * @param float version
         */
        _myTrait_.readMain = function (version) {

          var local = this._folder,
              me = this,
              versionNumber = version || me._settings.version;

          if (versionNumber == 1) {

            return _promise(function (r) {
              r(null);
            });
          }

          return local.readFile("file." + versionNumber);
        };

        /**
         * @param String name
         * @param float value
         */
        _myTrait_.set = function (name, value) {
          var local = this._folder,
              me = this,
              settings = this._settings;

          if (this.isObject(name)) {
            for (var n in name) {
              if (name.hasOwnProperty(n)) {
                settings[n] = name[n];
              }
            }
          } else {
            settings[name] = value;
          }

          return this._writeSettings(settings);
        };

        /**
         * @param Object newMainData
         */
        _myTrait_.snapshot = function (newMainData) {
          var local = this._folder,
              me = this;

          return _promise(function (done) {
            var currentVersion;
            me.incrementVersion().then(function (nextVersion) {
              currentVersion = nextVersion - 1;
              return me.writeMain(newMainData);
            }).then(function () {
              // The incrementVersion() call will do the following
              // me._settings.journalLine = 0;
              // me._settings.version = 0;
              done(true);
            });
          });
        };

        /**
         * @param float t
         */
        _myTrait_.status = function (t) {
          var local = this._folder,
              me = this;
          return _promise(function (result) {
            me.then(function () {
              result(me._settings);
            });
          });
        };

        /**
         * @param float channelId
         */
        _myTrait_.treeOfLife = function (channelId) {

          // loads the whole tree of life for this entry, can be a big operation...

          var local = this._folder,
              me = this;

          if (channelId) {
            var model = _localChannelModel(channelId, this._fs);
            return model.treeOfLife();
          }

          return _promise(function (response) {
            me.then(function () {

              if (me._settings.from) {
                me.treeOfLife(me._settings.from).then(response);
              } else {
                me.childForkTree().then(response);
              }
            });
          });
        };

        /**
         * @param string data
         * @param float version
         */
        _myTrait_.writeMain = function (data, version) {

          // NOTE: this function should not be used in typical situations
          var local = this._folder,
              me = this,
              versionNumber = version || me._settings.version;

          if (typeof data != "string") data = JSON.stringify(data);

          return local.writeFile("file." + versionNumber, data);
        };

        /**
         * @param Object row
         */
        _myTrait_.writeToJournal = function (row) {

          var local = this._folder,
              me = this;

          if (this.isArray(row[0])) {
            var str = "",
                cnt = 0;
            row.forEach(function (r) {
              str += JSON.stringify(r) + "\n";
              cnt++;
            });
            return _promise(function (resp) {
              local.appendFile("journal." + me._settings.version, str).then(function () {
                me._settings.journalLine += cnt;
                me._writeSettings();
                resp(true);
              });
            });
          }

          return _promise(function (resp) {
            local.appendFile("journal." + me._settings.version, JSON.stringify(row) + "\n").then(function () {
              me._settings.journalLine++;
              me._writeSettings();
              resp(true);
            });
          });
        };
      })(this);
    };

    var _localChannelModel = function _localChannelModel(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _localChannelModel) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != _localChannelModel._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new _localChannelModel(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    _localChannelModel_prototype.prototype = _promise.prototype;

    _localChannelModel._classInfo = {
      name: "_localChannelModel"
    };
    _localChannelModel.prototype = new _localChannelModel_prototype();

    (function () {
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        __amdDefs__["_localChannelModel"] = _localChannelModel;
        this._localChannelModel = _localChannelModel;
      } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
        module.exports["_localChannelModel"] = _localChannelModel;
      } else {
        this._localChannelModel = _localChannelModel;
      }
    }).call(new Function("return this")());

    // the subclass definition comes around here then

    // The class definition is here...
    var _channelController_prototype = function _channelController_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _instances;
        var _cmds;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_._askChUpgrade = function (t) {

          var sockets = this._chManager.getSocketsFromCh(this._channelId);

          var me = this;
          sockets.forEach(function (socket) {
            debugger;
            if (!me._serverState.upgrade) me._serverState.upgrade = {};
            me._serverState.upgrade[socket.getId()] = {
              askFull: true,
              socket: socket
            };
          });
        };

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id, fileSystem) {
          if (!_instances) {
            _instances = {};
          }

          id = id + fileSystem.id();

          if (_instances[id]) {
            return _instances[id];
          } else {
            _instances[id] = this;
          }
        });

        /**
         * @param float t
         */
        _myTrait_._doClientUpdate = function (t) {

          var updObj,
              me = this;

          if (!me._serverState) return;

          if (me._serverState.upgrade) {

            for (var n in me._serverState.upgrade) {

              if (me._serverState.upgrade.hasOwnProperty(n)) {
                var info = me._serverState.upgrade[n];

                if (info.socket) {
                  debugger;
                  // do we need a full update or partial update?
                  if (info.version != me._serverState.version || info.askFull) {
                    var fullData = me._serverState.data.getData();
                    info.socket.emit("upgrade_" + me._channelId, {
                      version: me._serverState.version,
                      journal: me._serverState.data._journal,
                      data: fullData
                    });
                  } else {
                    var lastJournaLine = info.last_update[1];
                    info.socket.emit("upgrade_" + me._channelId, {
                      partialFrom: lastJournaLine,
                      partialEnds: me._serverState.data._journal.length,
                      partial: me._serverState.data._journal.slice(lastJournaLine)
                    });
                  }
                  delete me._serverState.upgrade[n];
                }
              }
            }
          }

          // sending to all the sockets if there is data to be sent
          if (me._broadcastSocket && me._policy) {
            var data = me._policy.constructServerToClient(me._serverState);
            if (data) {
              if (!updObj) updObj = me._broadcastSocket.to(me._channelId);
              updObj.emit("s2c_" + me._channelId, data);
              me._model.writeToJournal(data.c).then(function (r) {});
            }
          }
        };

        /**
         * @param float socket
         * @param float flags
         */
        _myTrait_._groupACL = function (socket, flags) {

          var me = this;
          if (!me._acl) return false;

          var roles = socket.getUserRoles();
          var a_ok = false;
          for (var i = 0; i < roles.length; i++) {
            // must have "read attributes" and "read ACL flags"
            if (me._acl.find("", roles[i] + "@", flags)) {
              a_ok = true;
              break;
            }
          }
          return a_ok;
        };

        /**
         * @param float t
         */
        _myTrait_._initCmds = function (t) {

          if (!_cmds) _cmds = {};
          if (this._cmds) return;

          var me = this;
          this._cmds = {
            treeOfLife: function treeOfLife(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }

              me._model.treeOfLife().then(function (r) {
                result(r);
              });
            },
            readBuildTree: function readBuildTree(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }

              // read the build tree and the status...
              me._model.readBuildTree().then(function (r) {

                me._model.status().then(function (status) {
                  result({
                    status: status,
                    build: r
                  });
                });
                // result(r);
              });
            },
            getForks: function getForks(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }
              me._model.getForks().then(function (r) {
                result(r);
              });
            },
            channelStatus: function channelStatus(cmd, result, socket) {
              if (!me._groupACL(socket, "tc")) {
                result(null);
                return;
              }
              me._model.status().then(function (r) {
                result(r);
              });
            },
            raw: function raw(cmd, result, socket) {
              if (me._groupACL(socket, "tc")) {
                result(me._chData.getData());
              } else {
                result(null);
              }
            },
            fork: function fork(cmd, result, socket) {
              if (!me._groupACL(socket, "w")) {
                result(null);
                return;
              }
              if (!cmd.data) {
                result({
                  ok: false
                });
                return;
              }
              me._model.fork(cmd.data).then(function (r) {
                result(r);
              });
            },
            // the snapshot command should cause all the sockets to be upgraded
            snapshot: function snapshot(cmd, result, socket) {

              console.log("got snapshot command");

              if (!me._groupACL(socket, "w")) {
                result(null);
                return;
              }

              var fullData = me._serverState.data.getData();

              // first, save all the unsaved changes and refresh the clients with unsent data
              me._doClientUpdate();

              console.log("About to call me._model.snapshot ");
              debugger;
              // then, create new version of the main file
              me._model.snapshot(fullData).then(function (r) {

                // the _serverState data must be also upgraded...
                me._serverState.version++; // ????
                me._serverState.data._journal.length = 0;
                me._serverState.last_update[0] = 0;
                me._serverState.last_update[1] = 0;

                console.log("After snapshot ");
                console.log(me._serverState);

                // ask channels to upgrade to the latest version of data
                me._askChUpgrade(me._channelId);
                result({
                  ok: true
                });
              });
            },
            writeMain: function writeMain(cmd, result, socket) {
              if (!me._groupACL(socket, "w")) {
                result(null);
                return;
              }
              me._model.writeFile("main", cmd.data).then(function (r) {
                result({
                  ok: true
                });
              });
            },
            readMain: function readMain(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }
              me._model.readMain().then(function (r) {
                result(r);
              });
            },
            readMainVersion: function readMainVersion(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }
              me._model.readMain(cmd.data).then(function (r) {
                result(r);
              });
            },
            upgradeRequest: function upgradeRequest(cmd, result, socket) {

              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }
              if (!me._serverState.upgrade) {
                me._serverState.upgrade = {};
              }

              // the upgrade request sent by the client...
              cmd.data.socket = socket;
              me._serverState.upgrade[socket.getId()] = cmd.data;

              result({
                result: true
              });
            },
            c2s: function c2s(cmd, result, socket) {

              if (!me._groupACL(socket, "w")) {
                result(null);
                return;
              }

              var uid = socket.getUserId();
              var len = cmd.data.c.length,
                  list = cmd.data.c,
                  utc = new Date().getTime();
              for (var i = 0; i < len; i++) {
                list[i][5] = utc;
                list[i][6] = uid;
              }

              var res = me._policy.deltaClientToServer(cmd.data, me._serverState);

              // pick one socket so that we can broadcast if necessary...
              if (!me._broadcastSocket) me._broadcastSocket = socket;

              // in this case we do not write immediately to all clients, just return
              // the result to the client
              result(res);

              // TODO: socket, emit to all clients.
            },
            changeFrame: function changeFrame(cmd, result, socket) {

              if (!me._groupACL(socket, "w")) {
                result(null);
                return;
              }

              var res = me._tManager.execute(cmd.data);

              // ERROR: should be checking the results here...
              // might also write to the actual file-buffer here...

              if (res.validCnt > 0) {
                cmd.data.commands.length = res.validCnt;
                me._model.writeToJournal(cmd.data.commands).then(function (r) {
                  socket.broadcast.to(cmd.channelId).emit("frame_" + cmd.channelId, cmd);
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
            writeJournal: function writeJournal(cmd, result, socket) {
              if (!me._groupACL(socket, "w")) {
                result(null);
                return;
              }
              me._model.writeToJournal(cmd.data).then(function (r) {
                socket.broadcast.to(cmd.channelId).emit("ch_" + cmd.channelId, cmd);
                result({
                  ok: true
                });
              });
            },
            readJournal: function readJournal(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }
              me._model.readJournal().then(function (r) {
                result(r);
              });
            },
            readJournalVersion: function readJournalVersion(cmd, result, socket) {
              if (!me._groupACL(socket, "r")) {
                result(null);
                return;
              }
              me._model.readJournal(cmd.data).then(function (r) {
                result(r);
              });
            }
          };
        };

        /**
         * @param float t
         */
        _myTrait_._updateLoop = function (t) {

          var me = this;
          later().every(1 / 5, function () {
            me._doClientUpdate();
          });
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (channelId, fileSystem, chManager) {

          this._channelId = channelId;
          this._commands = sequenceStepper(channelId);
          this._chManager = chManager;

          // important point: the file system is passed here to the local channel model
          this._model = _localChannelModel(channelId, fileSystem);

          var me = this;

          // Then, construct the channel model from the data
          this._model.readBuildTree().then(function (r) {

            // the build tree
            var mainData = r.pop();
            var dataTest = _channelData(channelId + fileSystem.id(), mainData, []);
            var list = r.pop();

            // NOW, here is a problem, the in-memory channel "journal" should be truncated
            while (list) {
              dataTest._journalPointer = 0;
              dataTest._journal.length = 0; // <-- the journal length, last will be spared
              list.forEach(function (c) {
                dataTest.execCmd(c);
              });
              list = r.pop();
            }

            // The state of the server - what should be the "last_update" ? 
            me._serverState = {
              data: dataTest, // The channel data object set here
              version: me._model._settings.version, // the version of the channel model
              last_update: [0, dataTest.getJournalLine()], // the range of last commands sent to the client
              _done: {} // hash of handled packet ID's
            };

            var data = dataTest.getData();
            if (data.__acl) {
              me._acl = nfs4_acl(data.__acl);
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
        });

        /**
         * @param float cmd
         * @param float responseFn
         * @param float socket
         */
        _myTrait_.run = function (cmd, responseFn, socket) {

          // 1. selecting the command to be run here...
          var fn = this._cmds[cmd.cmd];
          if (fn) {
            this._commands.addCommands(function (contFn) {
              fn(cmd, function (result) {
                responseFn(result);
                contFn();
              }, socket);
            });
          }
        };
      })(this);
    };

    var _channelController = function _channelController(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _channelController) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != _channelController._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new _channelController(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    _channelController_prototype.prototype = _promise.prototype;

    _channelController._classInfo = {
      name: "_channelController"
    };
    _channelController.prototype = new _channelController_prototype();

    (function () {
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        __amdDefs__["_channelController"] = _channelController;
        this._channelController = _channelController;
      } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
        module.exports["_channelController"] = _channelController;
      } else {
        this._channelController = _channelController;
      }
    }).call(new Function("return this")());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (host) {});
    })(this);
  };

  var _channels = function _channels(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof _channels) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != _channels._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new _channels(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  _channels._classInfo = {
    name: "_channels"
  };
  _channels.prototype = new _channels_prototype();

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());

// --- let's not ---