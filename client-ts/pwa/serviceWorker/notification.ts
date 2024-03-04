namespace HHW.PWA.NOTICE {
  (async function() {
    const promise = await Notification.requestPermission();//granted: 已授权权限  denied: 已拒绝权限 default 未授权权限
    console.log('promise ============>', promise);
  })()

  export async function requestPermission() {
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
        
        const currentTarget = event.currentTarget as any;
        if(currentTarget.data) {
          window.open(currentTarget.data);
        }
      };
    }).catch(() => {
      console.log('通知权限已禁止，请设置打开权限');
    })
  }

  //actions 必须在 serviceWorker 中使用
  export async function requestPermissionInSw() {
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
      })
    })
  }
}