function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.5956031, lng: 120.306859 },
        zoom: 14
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('您目前所在位置');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://raw.githubusercontent.com/Qm1ng/html/master/Data.json');
    xhr.send();

    xhr.onload = function() {
        const data = JSON.parse(xhr.responseText);

        //建立標記
        for (i = 0; i < data.length; i++) {
            var str = {};
            var place = {};

            place.lat = parseFloat(data[i]['座標緯度']);
            place.lng = parseFloat(data[i]['座標經度']);

            str.map = map;
            str.title = data[i]['創業空間名稱']
            str.position = place;
            str.animation = google.maps.Animation.DROP;
            str.contentString = data[i]['創業空間名稱'];
            console.log(str);
            new google.maps.Marker(str);


        }
    }



    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            '發生錯誤 : 取得用戶位置失敗' :
            '發生錯誤 : 您的瀏覽器不支援定位功能');
    }
}




$(document).ready(function() {

    $("#getRegion").change(function() {
        alert($(this).val());
    });


});