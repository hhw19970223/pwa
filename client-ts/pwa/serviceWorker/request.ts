namespace HHW.PWA.WORKER {

  // Also go to the next or previous songs if the SW asks us to do so.
  navigator.serviceWorker?.addEventListener?.("message", (event) => {
    console.warn("serviceWorker event ==========>", event);
  });
  export async function sendMessageToSW(data: any) {
    // navigator.serviceWorker?.ready?.then((registration) => {
    //   registration.active?.postMessage(
    //     data
    //   );
    // });
    if(navigator.serviceWorker.controller) { // 需要判断是否受控
      navigator.serviceWorker.controller.postMessage('消息');
    }
  }
}
