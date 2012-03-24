var uri = parseUri(window.location);
var serverId = uri.queryKey['s'];
var server = servers[serverId] || servers[0];

var create_qrcode = function(text, typeNumber, errorCorrectLevel, table) {
	var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
	qr.addData(text);
	qr.make();

	return qr.createTableTag();
	//	return qr.createImgTag();
};

var update_qrcode = function() {
	var url = window.location + '';
	var text = url.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
	var qrCode = create_qrcode(url);
	document.getElementById('qr').innerHTML = qrCode;
};
update_qrcode();