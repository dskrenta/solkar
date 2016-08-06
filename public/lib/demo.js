export default async function () {
  return await stuff();
}

function stuff() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello!');
    }, 1000);
  });
}
