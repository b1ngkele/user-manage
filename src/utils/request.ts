// 模仿异步请求的函数
function fetchData(data): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000); // 设置 1 秒钟的延迟来模拟网络请求
  });
}

export { fetchData }
