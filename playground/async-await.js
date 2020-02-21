// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(a+b);
//   }, 2000);
// });

const addAfterSomeTime = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Don't Fucking Enter Negative Numbers !");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await addAfterSomeTime(10, 20);
  const sum2 = await addAfterSomeTime(sum, 10);

  return sum2;
};
doWork()
  .then(res => console.log(res))
  .catch(e => console.log(e));
