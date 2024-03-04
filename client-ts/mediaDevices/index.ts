namespace HHW.MEDIADEVICES {
  /**
   * 请求当前可用的媒体输入和输出设备的列表，例如麦克风、摄像头、耳机等 
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId
   */
  export function enumerateDevices() {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
    } else {
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

  /**
   * 用户代理支持的约束
   * @returns 
   */
  export function getSupportedConstraints(): MediaTrackSupportedConstraints {
    if (!navigator.mediaDevices?.getSupportedConstraints) {
      return {};
    } else {
      return navigator.mediaDevices.getSupportedConstraints();
    }
  }
}