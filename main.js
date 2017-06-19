//全域變數
var data; //json parse
var placeMarker = [];
var placeInfo = [];
var contentString = [];
var map;



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 22.5956031,
            lng: 120.306859
        },
        zoom: 13
    });
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    //取得json資料
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://raw.githubusercontent.com/Qm1ng/html/master/Data.json');
    xhr.send(null);
    xhr.onload = function () {
        data = JSON.parse(xhr.responseText);
        for (i = 0; i < data.length; i++) {
            placeMarker[i] = new google.maps.Marker({
                map: map,
                title: data[i]['創業空間名稱'],
                position: {
                    lat: parseFloat(data[i]['座標緯度']),
                    lng: parseFloat(data[i]['座標經度'])
                },
                animation: google.maps.Animation.DROP
                //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            });
        }
    }






    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            '發生錯誤 : 取得用戶位置失敗' :
            '發生錯誤 : 您的瀏覽器不支援定位功能');
    }
    // Try HTML5 geolocation.
    //取得地區資訊
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('您目前所在位置');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}



function getRegion($area) {
    $area = document.getElementById("getRegion").value;

    for (i = 0; i < placeMarker.length; i++) {
        placeMarker[i].setVisible(false);

        if (data[i]['縣市區域'] == $area) {
            placeMarker[i].setVisible(true);
            placeMarker[i].setAnimation(google.maps.Animation.DROP);
        }
    }
}