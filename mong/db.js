const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const todo = new Schema({
    title: String,
    userID: ObjectId,
    completed: Boolean
});

const UserModel = mongoose.model('Users', user);
const TodoModel = mongoose.model('Todos', todo);

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}
