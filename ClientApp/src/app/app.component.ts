import { Component, OnInit, Renderer2} from '@angular/core';
//import { ScriptService } from "./services/script.service";

//const SCRIPT_PATH = 'https://apis.google.com/js/api.js';
//const ALT_SCRIPT_PATH = 'lib/jquery/dist/jquery.js';
//declare let gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit*/ {
  title = 'FIASchoolApp';

  constructor(
    //private renderer: Renderer2,
    //private scriptService: ScriptService
  ) { }

  /*ngOnInit() {
    const scriptElement = this.scriptService.loadJsScript(this.renderer, SCRIPT_PATH);
    scriptElement.onload = () => {
     console.log('Google API Script loaded');
      console.log(gapi);

      // Load the JavaScript client library.
      // (the init() method has been omitted for brevity)
      //gapi.load('client', this.init);
    }
    scriptElement.onerror = () => {
      console.log('Could not load the Google API Script!');

      //load a fallback script if it fails
      const altScript = this.scriptService.loadJsScript(this.renderer, ALT_SCRIPT_PATH);
      
      altScript.onload = () => {
        console.log('jquery library Script loaded');
      }
      altScript.onerror = () => {
        console.log('cannot load jquery library Script loaded');
      }
    }
}*/
}
