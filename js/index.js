/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    network : false,

    firstRun : {  
        space : { bh : true},
        peopleAndPlaces : true,
        naturalWorld : true,
        ancient : { greece : true},
        languages : true,
        wos : {iw : true},
        humanBody : true,
        artAndMusic : true,
        modrenWorld : true,
        animals : true
    },

    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    /*onDeviceReady: function() {navigator.notification.alert('sdfsf');
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.gotFS, this.fail);
        //app.receivedEvent('deviceready');//
        //navigator.notification.alert('dfdsfs');
    },*/
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    fail : function() {navigator.notification.alert('documentRoot');
        console.log("oh! There is something wrong with fileSystem");
    },
    
    AGTrackTime : 600,
    BHTrackTime : 500,
    IWTrackTime : 500
};

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    checkConnection();
}

function gotFS(fileSystem) {
    FS.fs = fileSystem;
    $(document).trigger('fsready');
}
function fail(evt) {
    console.log(evt.target.error.code);
} 

function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = false;
    states[Connection.ETHERNET] = true;
    states[Connection.WIFI]     = true;
    states[Connection.CELL_2G]  = true;
    states[Connection.CELL_3G]  = true;
    states[Connection.CELL_4G]  = true;
    states[Connection.CELL]     = true;
    states[Connection.NONE]     = false;

    app.network = states[networkState];
    return app.network;
}


function changeImageSrc(pageid) {
    $('#'+pageid).find('img').each(function(){
        var $this = $(this);
        var fileSrc = $this.attr('src');
        if(fileSrc.indexOf(appBasePath) == -1 && $this.data('local') == undefined)
            $this.attr('src',appBasePath + fileSrc);
    });
}

function changeVideoSrc() {
    $('video').each(function(){
        var videoSrcEle = $(this).find('source');
        videoSrcEle.each(function(){
            var $this = $(this);
            var fileSrc = $this.attr('src');
            if(fileSrc.indexOf(appBasePath) == -1) {
                $this.attr('src',appBasePath + fileSrc);
            }
        });
    });
}

function changeAudioSrc() {
    $('audio').find('source').each(function(){
        var $this = $(this),
        fileSrc = $this.attr('src');
        if(fileSrc.indexOf(appBasePath) == -1) {
            $this.attr('src', appBasePath+fileSrc);
        }
    });
}

function changeAudioVideoSrc() {
    changeAudioSrc();
    changeVideoSrc();
}

function findElementsWithBgImage(pageid) {
    //var tags = document.getElementsByTagName('*'),
    var tags = $('#'+pageid).find('*').andSelf(),
    el;

    for (var i = 0, len = tags.length; i < len; i++) {
        el = tags[i];
        if (el.currentStyle) {
            if( el.currentStyle['backgroundImage'] !== 'none' ) {
                var oldsrc = extractBgUrl($(el).css('background-image'));
                changeBgImage($(el), oldsrc)
            }
        }
        else if (window.getComputedStyle) {
            if( document.defaultView.getComputedStyle(el, null).getPropertyValue('background-image') !== 'none' ) {
                var oldsrc = extractBgUrl($(el).css('background-image'));
                changeBgImage($(el), oldsrc);                
            }
        }
    }
}

function changeBgImage(ele, src) {
    if(src != '' && src.indexOf(appBasePath) == -1 && ele.data('local') == undefined) {
        var newSrc = 'url("'+appBasePath+src+'")';
        ele.css('background-image', newSrc);
    }
}

function extractBgUrl(bgStyle) {
    if(bgStyle.indexOf('url') != -1 && bgStyle.indexOf('(',bgStyle.indexOf('url')) ){
        var startPos = bgStyle.indexOf('(',bgStyle.indexOf('url')),
        endPos = bgStyle.indexOf(')', startPos);
        var imageFullPath = bgStyle.substring(startPos+1,endPos);
        if(imageFullPath.indexOf('images/')) {
            return imageFullPath.substring(imageFullPath.indexOf('images/'));
        }
    }

    return '';
}


function appendDocumentRootPath(src) {
    return appBasePath+src;
}

function htmlLightbox(src, content) {
    html5Lightbox.showLightbox(0, appBasePath+src, content);
}


function trackUserPageVisit() {
    $(document).delegate('.ui-page', 'pageshow', function () {
        mworldPageVisit(app.kidid, $.mobile.activePage.attr('id'));
    });
}

function playClickSound(){
    btnClickSound.play();
}

function bottomHomeBtnSound(currentPageId) {
    currentPageId.find('.botlogoholder').on('tap', function(){
        buttonClickEffects($(this));
        btnClickSound.play();
    });
}

/*function extractLastPart(bgStyle) {
    if(bgStyle.indexOf('url') != -1 && bgStyle.indexOf('(',bgStyle.indexOf('url')) ){
        var startPos = bgStyle.indexOf('(',bgStyle.indexOf('url'));
        startPos = bgStyle.indexOf(')',startPos);
        if(startPos != -1){
            return bgStyle.substring(startPos+1);
        }
    }
}*/


var globalSounds = [
    {id : 'btnClickSound', src : 'audio/ButtonClick-Blip.mp3'},
    {id : 'cardSlideSound', src : 'audio/CardSlide.mp3'},
    {id : 'menuOpenSound', src : 'audio/MenuOpen.mp3'},
    {id : 'menuCloseSound', src : 'audio/MenuClose.mp3'}
];

var preloadGlobalSound = new createjs.LoadQueue(false);
preloadGlobalSound.addEventListener('complete', function() {
}); 
preloadGlobalSound.addEventListener('progress', function(){
    navigator.notification.alert(preloadGlobalSound.progress*100|0)
}); 
preloadGlobalSound.loadManifest(globalSounds);



function pageTrackOnPageShow(pageid, title) {
    $('#'+pageid).on('pageshow', function(evt, data){
        mworldPageVisit(app.kidid, title);
    });
}

//increase 10% size of button 
function buttonClickEffects(btn) {
  btn.find('img').css("-webkit-transform", "scale(1.1, 1.1)");
  setTimeout(function() {
      btn.find('img').css("-webkit-transform", "scale(1, 1)");
    }, 300);
}


//Preloading assets initialization 
function initiatePreload(ele, asset, callbackFun) {
    var assetsArr, runStatus, firstRunVar = [];
    if(ele.find('.preloadingStatus').length < 1) {
        var loadingDiv = $('<div></div>', {
          class : 'preloadingStatus',
          style : 'position:absolute;',
          height : ele.find('img').height(),
          width : ele.find('img').width()
        }).prependTo(ele);
        $('<h3>Loading</h3>').appendTo(loadingDiv);
    }
    else {

    }
    switch(asset) {
      case 'bh' :
        assetsArr = FS.assets.space;
        if(assetsArr.length > 0 ) {
          firstRunVar = ['space','bh'];
        }
        break;
      case 'greece' :
        assetsArr = FS.assets.aGreece;
        if(assetsArr.length > 0 ) {
          firstRunVar = ['ancient','greece'];
        }
        break;
      default:
        assetsArr = [];
    }
    if(assetsArr.length > 0 ) {
      loadAppFiles(assetsArr, ele.find('h3'), callbackFun, true, firstRunVar);
    }
}
