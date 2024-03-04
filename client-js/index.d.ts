declare namespace HHW.MEDIADEVICES {
    /**
     * 请求当前可用的媒体输入和输出设备的列表，例如麦克风、摄像头、耳机等
     * https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId
     */
    function enumerateDevices(): void;
    /**
     * 用户代理支持的约束
     * @returns
     */
    function getSupportedConstraints(): MediaTrackSupportedConstraints;
}
declare namespace HHW.PWA.WORKER {
    function sendMessageToSW(data: any): Promise<void>;
}
declare namespace HHW.PWA.WORKER {
}
/** 测试代码  */
declare namespace HHW.PWA.TEST {
    function init(): void;
}
declare namespace HHW.PWA {
    /** 添加pwa到桌面 */
    let addPWA: null | (() => void);
    function judgementsIsWebApp(): void;
    function registerPWA(): void;
}
declare namespace HHW {
    function onInstall(): void;
}
declare namespace HHW.MEDIADEVICES {
    function startRecordingAudio(): Promise<boolean>;
    function stopRecordingAudio(): Promise<unknown>;
}
declare namespace HHW.PWA.NOTICE {
    function requestPermission(): Promise<void>;
    function requestPermissionInSw(): Promise<void>;
}
