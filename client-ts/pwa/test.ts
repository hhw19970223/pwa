/** 测试代码  */
namespace HHW.PWA.TEST {
  export function init() {
    isSidebarPWA();
  }

  // Whether the app is running in the Microsoft Edge sidebar.
  function isSidebarPWA() {
    if (navigator["userAgentData"]) {
      return navigator["userAgentData"].brands.some((b) => {
        if (b.brand === "Edge Side Panel") {
          console.warn("Edge Side Panel");
        }
        return b.brand === "Edge Side Panel";
      });
    }
    return false;
  }
}
