const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000';

const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();

    console.log('MongoDB 접속 성공');

    const collection = client.db('test').collection('person');

    await collection.insertOne({name: 'son', age: 50});
    console.log('문서 추가 완료');

    const document = await collection.find({name: 'son'}).toArray();
    console.log('찾은 문서: ', document);

    await collection.updateOne({name: 'son'}, {$set: {age: 51}});
    console.log('문서 업데이트')

    const updatedDocuments = await collection.find({name: 'son'}).toArray();
    console.log('갱신된 문서 : ', updatedDocuments);

    // await collection.deleteOne({name: 'son'});
    // console.log('문서 삭제')

    await client.close();
  } catch (err) {
    console.error(err);
  }
};

main();