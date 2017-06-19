//全域變數
var pos = {};
var data; //json parse
var placeMarker = [];
var placeInfo = [];
var contentString = [];
var map;
var cityCircle;


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
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('您目前所在位置');
            map.setCenter(pos);
            if (pos != null) {
                cityCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.1,
                    strokeWeight: 2,
                    fillColor: '#1100ff',
                    fillOpacity: 0.1,
                    map: map,
                    center: pos,
                    radius: 5000
                });
                //reccommandList
                var string='';
                for (var i = 0; i < data.length; i++) {
                    if (data[i]['縣市區域'] == '高雄市') {
                        string = string + '<div class="recommandLi"><h3>' + data[i]['創業空間名稱'] + '</h3><p><strong>' + data[i]['地址'] + '</strong></p><p>' + data[i]['所屬單位'] + '</p><p>連絡電話: ' + data[i]['連絡電話'] + '</p></div>';
                       
                    }
                }
                document.getElementById('recommandList').innerHTML = string;
            }


        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

//select 區域 只顯示選擇的區域
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


$(document).ready(function () {


});