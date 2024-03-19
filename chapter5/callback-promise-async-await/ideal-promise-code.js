function goodPromise(val) {
  return new Promise((resolve, reject) => {
    resolve(val);
  })
}

goodPromise('세상에')
  .then(val => val + ' 이런')
  .then(val => val + ' 코드는')
  .then(val => val + ' 없습니다.')
  .then(val => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });
