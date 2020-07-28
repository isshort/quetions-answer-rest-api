const mongose = require("mongoose");
const Question = require("../models/Questions")
const Schema = mongose.Schema
const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minLength: [10, "Please provide a content lease 10 character"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongose.Schema.ObjectId,
        required: true,
        ref: "User"  //Here we can connect Answer database to User
    },
    likes: [
        {
            type: mongose.Schema.ObjectId,
            ref: "User"
        }
    ],
    question: {
        type: mongose.Schema.ObjectId,
        required: true,
        ref: "Question"
    },
});
AnswerSchema.pre("save", async function (next) {
    if (!this.isModified("user")) return next();
    try {
        const question = await Question.findById(this.question)// Here we are on Answer object and answer object have a field
        // with question name

        question.answers.push(this._id);// we can add to question model id of the answer
        question.answerCount=question.answers.length
        await question.save();
        next();
    } catch (err) {
        return next(err);
    }

});
module.exports = mongose.model("Answer", AnswerSchema)