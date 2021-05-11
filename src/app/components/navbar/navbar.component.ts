import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import * as KioskBoard from 'kioskboard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private router: Router) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });

         // Initialize KioskBoard (default/all options)

KioskBoard.Init({

    /*!
    * Required
    * Have to define an Array of Objects for the custom keys. Hint: Each object creates a row element (HTML) on the keyboard.
    * e.g. [{"key":"value"}, {"key":"value"}] => [{"0":"A","1":"B","2":"C"}, {"0":"D","1":"E","2":"F"}]
    */
    keysArrayOfObjects: null,
  
    /*!
    * Required only if "keysArrayOfObjects" is "null".
    * The path of the "kioskboard-keys-${langugage}.json" file must be set to the "keysJsonUrl" option. (XMLHttpRequest to getting the keys from JSON file.)
    * e.g. '/Content/Plugins/KioskBoard/dist/kioskboard-keys-english.json'
    */
    keysJsonUrl: "assets/js/kioskboard-keys-english.json",
  
    /*
    * Optional: (Special Characters Object)* Can override default special characters object with the new/custom one.
    * e.g. {"key":"value", "key":"value", ...} => {"0":"#", "1":"$", "2":"%", "3":"+", "4":"-", "5":"*"}
    */
    specialCharactersObject: null,
  
    // Optional: (Other Options)
  
    // Language Code (ISO 639-1) for custom keys (for language support) => e.g. "en" || "tr" || "es" || "de" || "fr" etc.
    language: 'en',
  
    // The theme of keyboard => "light" || "dark" || "flat" || "material" || "oldschool"
    theme: 'light',
  
    // Uppercase or lowercase to start. Uppercase when "true"
    capsLockActive: true,
  
    // Allow or prevent real/physical keyboard usage. Prevented when "false"
    allowRealKeyboard: false,
  
    // CSS animations for opening or closing the keyboard
    cssAnimations: true,
  
    // CSS animations duration as millisecond
    cssAnimationsDuration: 360,
  
    // CSS animations style for opening or closing the keyboard => "slide" || "fade"
    cssAnimationsStyle: 'slide',
  
    // Allow or deny Spacebar on the keyboard. The keyboard is denied when "false"
    keysAllowSpacebar: true,
  
    // Text of the space key (spacebar). Without text => " "
    keysSpacebarText: 'Space',
  
    // Font family of the keys
    keysFontFamily: 'sans-serif',
  
    // Font size of the keys
    keysFontSize: '22px',
  
    // Font weight of the keys
    keysFontWeight: 'normal',
  
    // Size of the icon keys
    keysIconSize: '25px',
  
    // v1.1.0 and the next versions
    // Allow or prevent mobile keyboard usage. Prevented when "false"
    allowMobileKeyboard: false,
  
    // v1.3.0 and the next versions
    // Scrolls the document to the top of the input/textarea element. The default value is "true" as before. Prevented when "false"
    autoScroll: true,
  });
  
  KioskBoard.Run('.virtual-keyboard');
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
}
