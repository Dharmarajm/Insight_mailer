import { Injectable } from '@angular/core';
import { IWindow } from './window.interface';

function _window() : IWindow {
   return window;
}
@Injectable()
export class WindowService {
   get nativeWindow() : any {
      return _window();
   }
}