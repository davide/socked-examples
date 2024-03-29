// http://bitdaddys.com/javascript/example3run.html
var trackMousePosition = function(period, callback){
  var isIE = document.all?true:false;
  if (!isIE) document.captureEvents(Event.MOUSEMOVE);
  var _x = null, _y = null;
  document.onmousemove = function (mp) {
    if (isIE) {
      _x = event.clientX + document.body.scrollLeft;
      _y = event.clientY + document.body.scrollTop;
    } else {
      _x = mp.pageX;
      _y = mp.pageY;
    }
    return true;
  };
  var sentX, sentY;
  return setInterval(function(){
    if ((_x !== sentX) && (_y !== sentY)) {
      sentX = _x;
      sentY = _y;
      callback(_x, _y);
    }
  }, period);
};

Socked.ready(function(){
  var uri = parseUri(window.location);
  var serverId = uri.queryKey['s'];
  var server = servers[serverId] || servers[0];

  var connectionId = 'connection1';
  var channelName = 'mouselive';
  try {
    Socked.createConnection({id:connectionId, server:server, appKey:'myKey',
        channels: [{name:channelName}]
      });
  } catch(e) {
    DocLogger.log('Error setting up connection!');
    return;
  }
  
  var subscriptionOptions = {role: "sender"};
  var ref = Socked.subscribe(connectionId, channelName, subscriptionOptions);
  if (ref === null) {
    DocLogger.log('Channel not found: ', channelName);
  }
  var tracker = null;
  ref.onConnect(function() {
      DocLogger.log('connected to ', channelName);
      var period = 25;
      tracker = trackMousePosition(period, function(x,y){
        var mousePosition = JSON.stringify([x,y]);
        ref.send(mousePosition);
      });
    }).onMessage(function(msg) {
    	// nothing to do here
    }).onDisconnect(function() {
      DocLogger.log('disconnected from ', channelName);
      if (tracker != null) {
        clearInterval(tracker);
      }
    });
});