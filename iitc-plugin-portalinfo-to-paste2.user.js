// ==UserScript==
// @id             iitc-plugin-portalinfo-to-paste2
// @name           IITC plugin: Portal Info to paste 2
// @category       Portal Info
// @version        0.2.2.1
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://tarmn3.bitbucket.io/files/IITC_plugin-Portal_Info_to_paste2.user.js
// @downloadURL    https://tarmn3.bitbucket.io/files/IITC_plugin-Portal_Info_to_paste2.user.js
// @author         tarmn3
// @description    make it easy to copy and paste portal name and intel url
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////
window.plugin.thanks4lmfyp_2 = function () {};

window.plugin.thanks4lmfyp_2.portalDetail = function(data) {
  $('#thanks4lmfyp_2').remove();

  var title = data.portalData.title;
  var guid = data.guid;
  var pdetails = portalDetail.get(guid);
  var owner = pdetails.owner;
  var name = escapeJavascriptString(title);

  if (pdetails) {
    data = getPortalSummaryData(pdetails);
  }

  var lat = data.latE6/1E6;
  var lng = data.lngE6/1E6;
  var permalinkUrl  = 'https://www.ingress.com/intel?pll='+lat+','+lng+'&z=15';
  var permalinkUrl2 = 'https://link.ingress.com/?link=https%3a%2f%2fintel.ingress.com%2fportal%2f'+guid+'&apn=com.nianticproject.ingress&isi=576505181&ibi=com.google.ingress&ifl=https%3a%2f%2fapps.apple.com%2fapp%2fingress%2fid576505181&ofl=https%3a%2f%2fintel.ingress.com%2fintel%3fpll%'+lat+','+lng;



  var copiedtext = name+'\t'+permalinkUrl2;

  $('.linkdetails').append('<aside><a href="'+permalinkUrl2+'">スキャナで見る</a></aside>');
  $('.linkdetails').append('<textarea id="thanks4lmfyp_2" name="thanks4lmfyp_2" onclick="javascript:this.focus();this.select()" >'+copiedtext+'</textarea>');
}

var setup = function () {
  $('<style>').prop('type', 'text/css').html('#thanks4lmfyp_2 {display: block; width: 100%; height: 3.5em; margin: 5px; font-size: 50%}').appendTo('head');
  window.addHook('portalDetailsUpdated', window.plugin.thanks4lmfyp_2.portalDetail);
}

// PLUGIN END //////////////////////////////////////////////////////////

setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end


var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
