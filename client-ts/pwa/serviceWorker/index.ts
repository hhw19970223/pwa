/// <reference path="./request.ts" />
namespace HHW.PWA.WORKER {
  if ("serviceWorker" in navigator) {
    //注册serviceWorker
    if ("serviceWorker" in navigator && navigator.serviceWorker) {
      navigator.serviceWorker
        .register("./sw.js")
        .then(async function (registration) {
          console.warn("navigator.serviceWorker ==============>", registration);

          // const promise = await registration.pushManager.permissionState({userVisibleOnly: true});//granted: 已授权 Push 权限  denied: 已拒绝 Push 权限 prompt 未授权 Push 权限
          // console.log('promise ============>', promise);

          registration.onupdatefound = function () {
            const serviceWorker = registration.installing;
            if (serviceWorker) {
              serviceWorker.onstatechange = function () {
                // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
                switch (serviceWorker.state) {
                  case "installed":
                    WORKER.sendMessageToSW({ action: 'paused' });
                    navigator.serviceWorker.controller
                      ? console.log("New or updated content is available.")
                      : console.log("Content is now available offline!");
                    break;
                  case "redundant"://新的 Service Worker 正在替换当前的 Service Worker，或者当前的 Service Worker 由于安装失败而被丢弃。
                    console.error(
                      "The installing service worker became redundant."
                    );
                }
              };
            }
          };
        })
        .catch(function (e) {
          console.error("Error during service worker registration:", e);
        });
    }
  }
}
