export async function hellos () {
  try {
    let message = await getMessage('Bill');
    return message;
  } catch (err) {
    console.log(err);
  }
}

function getMessage (name) {
  return new Promise((resolve, reject) => {
    resolve(`Hello, ${name}`);
  });
}
