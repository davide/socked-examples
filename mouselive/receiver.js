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

  var cursor = document.getElementById("cursor");

  var subscriptionOptions = {role: "receiver"};
  var ref = Socked.subscribe(connectionId, channelName, subscriptionOptions);
  if (ref === null) {
    DocLogger.log('Channel not found: ', channelName);
  }
  ref.onConnect(function() {
      DocLogger.log('connected to ', channelName);
	}).onMessage(function(msg) {
      var mousePosition = JSON.parse(msg);
      var x = mousePosition.shift();
      var y = mousePosition.shift();
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
	}).onDisconnect(function() {
      DocLogger.log('disconnected from ', channelName);
	});
});
