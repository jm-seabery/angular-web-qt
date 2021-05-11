import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare const google: any;
declare var qtAccessObject : any;
declare var $: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    example1URL;
    example2URL;
    example3URL;
    constructor(private sanitizer: DomSanitizer) {
        this.example1URL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/s4LAAYHnbn0?ecver=2');
        this.example2URL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/X8hBKX2lgn4?ecver=2');
        this.example3URL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/OWThL97tq3k?ecver=2');
  
      }

  ngOnInit() {
/*
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]

    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
      */  

/*      qtAccessObject.jsStringChanged.connect(this.jsFunc);
     qtAccessObject.frameRateStringChanged.connect(this.frameRateUpdate);
     qtAccessObject.sendMessage.connect(this.jsMessageReceive); */
  }

  public jsMessageReceive(msg) {
    //console.log("Received: %j", msg); 
    //console.log(JSON.stringify(msg));
    //console.dir(msg);
    console.log("%o", JSON.parse(msg)); 
    //var jsonPretty = JSON.stringify(JSON.parse(msg),null,2);
    //console.dir(JSON.parse(msg));
  }

  public jsFunc(text) {

    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    const from = 'bottom';
    const align = 'center';
    $.notify({
        icon: "notifications",
        message: text

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          //'<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  public frameRateUpdate(text) {
      //alert(text);
    var el = document.getElementById("frameText");
    if( el && el.textContent )
       el.textContent = "Framerate = " + text;
  }

  public callCPlusPlus() {
    //myObj.jscallme();
    window["qtAccessObject"].JavaScriptCallFunction('I am calling C++ from javascript');
    //alert("js call");
   } 

   public scaleModelUp() {
    window["qtAccessObject"].ScaleModel('10');
   } 
   
   public scaleModelDown() {
    window["qtAccessObject"].ScaleModel('-10');
   }  
     
   public toggleFullscreen() {
    window["qtAccessObject"].FullscreenToggle();
   }
}
