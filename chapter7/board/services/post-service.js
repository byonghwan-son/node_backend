async function writePost(collection, post) {
  post.hits = 0;
  post.createdDt = new Date().toISOString();
  return await collection.insertOne(post);
}

async function list(collection, page, search) {

  return await collection.find({});
}

module.exports = {
  writePost,
  list
}