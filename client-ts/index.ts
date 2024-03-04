/// <reference path="./mediaDevices/index.ts" />
/// <reference path="./pwa/index.ts" />
namespace HHW {
  PWA.registerPWA();
  export function onInstall() {
    PWA.addPWA?.();
  }

  MEDIADEVICES.enumerateDevices();
}

window.HHW = HHW;