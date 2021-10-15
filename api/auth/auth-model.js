const db = require('../../data/dbConfig.js')


module.exports = {

    add,
    findById,
    findBy,
    find

}

function find() {
    return db('users')
    .select('user_id', 'username')
}

function findById(id) {
    return db('users as u')
        .select("u.user_id")
        .where("u.user_id", id)
        .first()
}

function findBy(filter) {

    return db('users as u')
    .select("u.user_id", "u.username", "u.password")
    .where(filter)
}

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}