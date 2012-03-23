Socked.ready(function(){
	try {
    var uri = parseUri(window.location);
    var serverId = uri.queryKey['s'];
    var server = servers[serverId] || servers[0];

    var connectionId = 'connection1';
    var channelName = 'batataChannel';
    Socked.createConnection({id:connectionId, server:server, appKey:'myKey',
        channels: [{name:channelName}]
      });
    
    var ref = Socked.subscribe(connectionId, channelName, {role: 'both', interests: null})
    if (ref === null) {
      DocLogger.log('Channel not found: ', channelName);
    }
    ref.onConnect(function() {
      DocLogger.log('client connected');
      ref.send('hello');
    }).onMessage(function(msg) {
      DocLogger.log('client got msg: ', msg);
    }).onDisconnect(function() {
      DocLogger.log('client disconnected');
    });
    setTimeout(function(){
      ref.unsubscribe();
    }, 5000);
    
  } catch(e) {
    DocLogger.log('Error setting up connection!', e);
    return;
  }
});
