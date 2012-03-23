Socked.ready(function(){
	try {
    var uri = parseUri(window.location);
    var serverId = uri.queryKey['s'];
    var server = servers[serverId] || servers[0];

    var connectionId = 'connection1';
    var channelName = 'interestsChannel';
    try {
      Socked.createConnection({id:connectionId, server:server, appKey:'myKey',
          channels: [{name:channelName}]
        });
    } catch(e) {
      console.log('Error setting up connection:', e);
      return;
    }
    
    var setup = function(ref, name) {
      ref.onConnect(function() {
        console.log(name, ' connected');
      }).onMessage(function(msg) {
        console.log(name, ' got msg: {', msg.action,',', msg.user, '}');
      }).onDisconnect(function() {
        console.log(name, ' disconnected');
      });
    };
    
    var ref1 = Socked.subscribe(connectionId, channelName, {role: 'both', interests: null})
    if (ref1 === null) {
      console.log('Channel not found: ', channelName);
    }
    // here channelInterests should be null
    setup(ref1, 'c1');

    ref1.send({action:'x', user:'c1'});
    
    var ref2 = Socked.subscribe(connectionId, channelName, {role: 'both', interests: ['a']})
    // here channelInterests should be null
    setup(ref2, 'c2');

    ref1.send({action:'x', user:'c1'});
    ref1.send({action:'y', user:'c1'});
    ref1.send({action:'a', user:'c1'});
    
    var ref3 = Socked.subscribe(connectionId, channelName, {role: 'both', interests: ['b']})
    // here channelInterests should be null
    setup(ref3, 'c3');

    ref1.send({action:'x', user:'c1'});
    ref1.send({action:'y', user:'c1'});
    ref1.send({action:'a', user:'c1'});
    ref1.send({action:'b', user:'c1'});

    // the timeout below are required to give some time to receive the messages before unsubscribing
    setTimeout(function() {

      ref1.unsubscribe();
      // here channelInterests should be ['a', 'b']

      ref2.send({action:'x', user:'c2'});
      ref2.send({action:'y', user:'c2'});
      ref2.send({action:'a', user:'c2'});
      ref2.send({action:'b', user:'c2'});

      setTimeout(function() {

        ref2.unsubscribe();
        // here channelInterests should be ['b']

        ref3.send({action:'x', user:'c3'});
        ref3.send({action:'a', user:'c3'});
        ref3.send({action:'b', user:'c3'});
        
        setTimeout(function() {
        
          ref3.unsubscribe();
          // here channelInterests should be null
        
        }, 500);

      }, 500);

    }, 500);
              
  } catch(e) {
    console.log('Socked error: ', e);
    return;
  }
});