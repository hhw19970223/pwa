/// <reference path="./serviceWorker/index.ts" />
/// <reference path="./test.ts" />
namespace HHW.PWA {
  /** 添加pwa到桌面 */
  export let addPWA: null | (() => void) = null;

  //是否安装webAPP
  let isInstalled = true;
  //当前是否是webAPP
  let isWebApp = false;

  const title_dom = document.getElementById("title");
  const install_dom = document.getElementById("install");  
  
  export function judgementsIsWebApp() {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      isWebApp = true;
      install_dom.style.display = "none";
    }
  }

  export function registerPWA() {
    judgementsIsWebApp();
    
    window.addEventListener("beforeinstallprompt", function (e: any) {
      console.warn("e ================>", e);

      title_dom.innerText = "还未安装webApp";
      install_dom.style.display = "block";
      isInstalled = false;

      e?.preventDefault();
      addPWA = () => {
        e.prompt();
      };
    });

    window.addEventListener("appinstalled", (event) => {
      console.warn("PWA 已成功安装");
      title_dom.innerText = "已安装web app";
      isInstalled = true;
      isWebApp = false;
      install_dom.style.display = "none";

      judgementsIsWebApp();
    });

    TEST.init();
  }
}
