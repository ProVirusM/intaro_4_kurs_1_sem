// routes/resume.js
const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();
router.post('/cv', async (req, res) => {
    try {
        const resumeData = {
            profession: req.body.profession,
            city: req.body.city,
            photo: req.body.photo,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birthday: req.body.birthday,
            salary: req.body.salary,
            skills: req.body.skills,
            about_me: req.body.about_me,
            status: req.body.status,
            education: req.body.education || [],  // Если данные об образовании передаются
        };

        const newResume = new Resume(resumeData);
        await newResume.save();

        res.status(201).json(newResume); // Возвращаем созданное резюме
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании резюме' });
    }
});

// [GET] /api/cv - получение списка всех резюме
router.get('/cv', async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении резюме' });
    }
});

// [GET] /api/cv/:id - получение резюме по ID
router.get('/cv/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Резюме не найдено' });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении резюме' });
    }
});
// PUT запрос для обновления всего резюме
router.put('/cv/:id', async (req, res) => {
    const { id } = req.params;  // Получаем id резюме из URL
    const updatedResume = req.body;  // Получаем новые данные резюме из тела запроса

    try {
        // Проверка на наличие резюме с таким id
        const resume = await Resume.findById(id);
        if (!resume) {
            return res.status(404).json({ message: 'Резюме не найдено' });
        }

        // Обновление всего документа резюме
        const updated = await Resume.findByIdAndUpdate(id, updatedResume, { new: true });

        if (!updated) {
            return res.status(500).json({ message: 'Ошибка при обновлении резюме' });
        }

        // Возвращаем обновленное резюме в ответе
        res.status(200).json(updated);
    } catch (error) {
        console.error('Ошибка обновления резюме:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// [POST] /api/cv/:id/add - добавление новой записи в резюме
router.post('/cv/:id/add', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Резюме не найдено' });
        }

        // Добавляем новое образование или другую информацию
        const newEducation = {
            level: req.body.level,
            institution: req.body.institution,
            faculty: req.body.faculty,
            specialization: req.body.specialization,
            yearOfGraduation: req.body.yearOfGraduation,
        };
        resume.education.push(newEducation);

        await resume.save();
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении записи' });
    }
});

// [POST] /api/cv/:id/edit - редактирование резюме
router.post('/cv/:id/edit', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Резюме не найдено' });
        }

        // Обновляем поля резюме
        resume.profession = req.body.profession;
        resume.city = req.body.city;
        resume.photo = req.body.photo;
        resume.name = req.body.name;
        resume.email = req.body.email;
        resume.phone = req.body.phone;
        resume.birthday = req.body.birthday;
        resume.salary = req.body.salary;
        resume.skills = req.body.skills;
        resume.about_me = req.body.about_me;
        resume.status = req.body.status;

        await resume.save();
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при редактировании резюме' });
    }
});

// [POST] /api/cv/:id/status/update - обновление статуса резюме
// [PUT] /api/cv/:id/status/update - обновление статуса резюме
// Обновление только статуса резюме
// PUT запрос для обновления только статуса резюме
router.put('/cv/:id/status/update', async (req, res) => {
    try {
        console.log('Получен запрос на обновление статуса:', req.body);

        const resume = await Resume.findById(req.params.id);  // Ищем резюме по ID
        if (!resume) {
            // Если резюме не найдено, отправляем ошибку
            return res.status(404).json({ message: 'Резюме не найдено' });
        }

        // Обновляем только статус
        resume.status = req.body.status || resume.status;

        // Сохраняем обновленное резюме
        await resume.save();
        console.log('Резюме обновлено:', resume);
        res.status(200).json(resume);  // Отправляем обновленное резюме в ответе
    } catch (error) {
        console.error('Ошибка при обновлении статуса:', error);
        res.status(500).json({ message: 'Ошибка при обновлении статуса' });  // Возвращаем ошибку сервера
    }
});










module.exports = router;
