const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    profession: { type: String, required: true },
    city: [{
        label: { type: String },
        id: { type: String },
    }],
    photo: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    birthday: { type: Date },
    salary: { type: String },
    skills: { type: String },
    about_me: { type: String },
    status: { type: String, default: "Новый" },
    education: [
        {
            level: { type: String },
            institution: { type: String },
            faculty: { type: String },
            specialization: { type: String },
            yearOfGraduation: { type: String },
        },
    ],
});

module.exports = mongoose.model("Resume", resumeSchema);
