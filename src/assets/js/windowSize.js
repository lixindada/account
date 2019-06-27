(() => {
  const onFooEndFunc = (fn) => {
    //延迟运行计算
    let executionTimer = 0;
    // 根据实际情况可调整延时时间
    const delay = 300;
    clearTimeout(executionTimer);
    //这里延时执行你的函数
    executionTimer = setTimeout(() => {
      fn();
    }, delay);
  };
  (function GetSize() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    width = width < 320 ? 320 : width;
    let wid = width * (100 / 750);
    wid = wid > 50 ? 50 : wid;
    document.documentElement.style.fontSize = wid + "px";
    if (!window.onresize) {
      window.onresize = () => {
        onFooEndFunc(GetSize);
      };
    }
  })();
})();
