const user = require("../course/routes/user");

mongoose.connect("mongodb+srv://alisha_31:gwXLqx5G62Ja5v8u@cluster0.svvzack.mongodb.net/");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
});

const AdminModel = mongoose.model('Admin', adminSchema);
const UserModel = mongoose.model('User', UserSchema);
const CourseModel = mongoose.model('Course', CourseSchema);

model.exports = {
    AdminModel: AdminModel,
    UserModel: UserModel,
    CourseModel: CourseModel
}