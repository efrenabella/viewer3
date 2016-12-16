function getForgeToken() {
  var token = '';
  jQuery.ajax({
    url: '/forge/oauth/token',
    success: function (res) {
      token = res;
    },
    async: false // this request must be synchronous for the Forge Viewer
  });
  if (token != '') console.log('2 legged token: ' + token); // debug
  return token;
}
