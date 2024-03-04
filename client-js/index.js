var HHW;
(function (HHW) {
    var MEDIADEVICES;
    (function (MEDIADEVICES) {
        /**
         * 请求当前可用的媒体输入和输出设备的列表，例如麦克风、摄像头、耳机等
         * https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId
         */
        function enumerateDevices() {
            if (!navigator.mediaDevices?.enumerateDevices) {
                console.log("enumerateDevices() not supported.");
            }
            else {
                // List cameras and microphones.
                navigator.mediaDevices
                    .enumerateDevices()
                    .then((devices) => {
                    console.log('devices ==========>', devices);
                })
                    .catch((err) => {
                    console.error(`${err.name}: ${err.message}`);
                });
            }
        }
        MEDIADEVICES.enumerateDevices = enumerateDevices;
        /**
         * 用户代理支持的约束
         * @returns
         */
        function getSupportedConstraints() {
            if (!navigator.mediaDevices?.getSupportedConstraints) {
                return {};
            }
            else {
                return navigator.mediaDevices.getSupportedConstraints();
            }
        }
        MEDIADEVICES.getSupportedConstraints = getSupportedConstraints;
    })(MEDIADEVICES = HHW.MEDIADEVICES || (HHW.MEDIADEVICES = {}));
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    var PWA;
    (function (PWA) {
        var WORKER;
        (function (WORKER) {
            // Also go to the next or previous songs if the SW asks us to do so.
            navigator.serviceWorker?.addEventListener?.("message", (event) => {
                console.warn("serviceWorker event ==========>", event);
            });
            async function sendMessageToSW(data) {
                // navigator.serviceWorker?.ready?.then((registration) => {
                //   registration.active?.postMessage(
                //     data
                //   );
                // });
                if (navigator.serviceWorker.controller) { // 需要判断是否受控
                    navigator.serviceWorker.controller.postMessage('消息');
                }
            }
            WORKER.sendMessageToSW = sendMessageToSW;
        })(WORKER = PWA.WORKER || (PWA.WORKER = {}));
    })(PWA = HHW.PWA || (HHW.PWA = {}));
})(HHW || (HHW = {}));
/// <reference path="./request.ts" />
var HHW;
/// <reference path="./request.ts" />
(function (HHW) {
    var PWA;
    (function (PWA) {
        var WORKER;
        (function (WORKER) {
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
                                        case "redundant": //新的 Service Worker 正在替换当前的 Service Worker，或者当前的 Service Worker 由于安装失败而被丢弃。
                                            console.error("The installing service worker became redundant.");
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
        })(WORKER = PWA.WORKER || (PWA.WORKER = {}));
    })(PWA = HHW.PWA || (HHW.PWA = {}));
})(HHW || (HHW = {}));
/** 测试代码  */
var HHW;
/** 测试代码  */
(function (HHW) {
    var PWA;
    (function (PWA) {
        var TEST;
        (function (TEST) {
            function init() {
                isSidebarPWA();
            }
            TEST.init = init;
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
        })(TEST = PWA.TEST || (PWA.TEST = {}));
    })(PWA = HHW.PWA || (HHW.PWA = {}));
})(HHW || (HHW = {}));
/// <reference path="./serviceWorker/index.ts" />
/// <reference path="./test.ts" />
var HHW;
/// <reference path="./serviceWorker/index.ts" />
/// <reference path="./test.ts" />
(function (HHW) {
    var PWA;
    (function (PWA) {
        /** 添加pwa到桌面 */
        PWA.addPWA = null;
        //是否安装webAPP
        let isInstalled = true;
        //当前是否是webAPP
        let isWebApp = false;
        const title_dom = document.getElementById("title");
        const install_dom = document.getElementById("install");
        function judgementsIsWebApp() {
            if (window.matchMedia("(display-mode: standalone)").matches) {
                isWebApp = true;
                install_dom.style.display = "none";
            }
        }
        PWA.judgementsIsWebApp = judgementsIsWebApp;
        function registerPWA() {
            judgementsIsWebApp();
            window.addEventListener("beforeinstallprompt", function (e) {
                console.warn("e ================>", e);
                title_dom.innerText = "还未安装webApp";
                install_dom.style.display = "block";
                isInstalled = false;
                e?.preventDefault();
                PWA.addPWA = () => {
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
            PWA.TEST.init();
        }
        PWA.registerPWA = registerPWA;
    })(PWA = HHW.PWA || (HHW.PWA = {}));
})(HHW || (HHW = {}));
/// <reference path="./mediaDevices/index.ts" />
/// <reference path="./pwa/index.ts" />
var HHW;
/// <reference path="./mediaDevices/index.ts" />
/// <reference path="./pwa/index.ts" />
(function (HHW) {
    HHW.PWA.registerPWA();
    function onInstall() {
        HHW.PWA.addPWA?.();
    }
    HHW.onInstall = onInstall;
    HHW.MEDIADEVICES.enumerateDevices();
})(HHW || (HHW = {}));
window.HHW = HHW;
var HHW;
(function (HHW) {
    var MEDIADEVICES;
    (function (MEDIADEVICES) {
        let audioBlobs = [];
        let mediaRecorder = null;
        let stream = null;
        let start = 0;
        async function startRecordingAudio() {
            if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
                console.error("mediaDevices API or getUserMedia method is not supported in this browser.");
                return false;
            }
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioBlobs = [];
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.addEventListener("dataavailable", (event) => {
                audioBlobs.push(event.data);
            });
            start = Date.now();
            mediaRecorder.start();
            return true;
        }
        MEDIADEVICES.startRecordingAudio = startRecordingAudio;
        function stopRecordingAudio() {
            return new Promise((resolve) => {
                const mimeType = mediaRecorder.mimeType;
                mediaRecorder.addEventListener("stop", () => {
                    const duration = (Date.now() - start) / 1000;
                    const audioBlob = new Blob(audioBlobs, { type: mimeType });
                    resolve({ blob: audioBlob, duration });
                });
                mediaRecorder.stop();
                stream.getTracks().forEach((track) => track.stop());
                mediaRecorder = null;
                stream = null;
            });
        }
        MEDIADEVICES.stopRecordingAudio = stopRecordingAudio;
    })(MEDIADEVICES = HHW.MEDIADEVICES || (HHW.MEDIADEVICES = {}));
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    var PWA;
    (function (PWA) {
        var NOTICE;
        (function (NOTICE) {
            (async function () {
                const promise = await Notification.requestPermission(); //granted: 已授权权限  denied: 已拒绝权限 default 未授权权限
                console.log('promise ============>', promise);
            })();
            async function requestPermission() {
                Notification.requestPermission().then(() => {
                    const n = new Notification('消息提醒', {
                        body: '这是一条普通消息',
                        icon: '/images/favicon.png',
                        requireInteraction: true,
                        data: 'https://baidu.com',
                        timestamp: Date.now(),
                        // vibrate: [300,100,400],//振动 300ms，暂停 100ms，然后振动 400ms
                    });
                    n.onclick = event => {
                        n.close();
                        const currentTarget = event.currentTarget;
                        if (currentTarget.data) {
                            window.open(currentTarget.data);
                        }
                    };
                }).catch(() => {
                    console.log('通知权限已禁止，请设置打开权限');
                });
            }
            NOTICE.requestPermission = requestPermission;
            //actions 必须在 serviceWorker 中使用
            async function requestPermissionInSw() {
                navigator.serviceWorker.ready.then(swReg => {
                    Notification.requestPermission().then(() => {
                        swReg.showNotification('你好', {
                            body: '你想要钱吗?',
                            icon: '/images/favicon.png',
                            requireInteraction: true,
                            actions: [{
                                    action: 'yes',
                                    title: '想',
                                }, {
                                    action: 'no',
                                    title: '不想'
                                }]
                        });
                    }).catch(() => {
                        console.log('通知权限已禁止，请设置打开权限');
                    });
                });
            }
            NOTICE.requestPermissionInSw = requestPermissionInSw;
        })(NOTICE = PWA.NOTICE || (PWA.NOTICE = {}));
    })(PWA = HHW.PWA || (HHW.PWA = {}));
})(HHW || (HHW = {}));
