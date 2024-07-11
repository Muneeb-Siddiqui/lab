const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// Add new person and generate/send PDF
router.post('/', async (req, res) => {
    const { name, email, phone, education, experience } = req.body;

    try {
        const person = new Person({ name, email, phone, education, experience });
        await person.save();

        const pdfDoc = new PDFDocument();
        let buffers = [];
        pdfDoc.on('data', buffers.push.bind(buffers));
        pdfDoc.on('end', async () => {
            let pdfData = Buffer.concat(buffers);

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Resume',
                text: 'Please find your resume attached.',
                attachments: [{ filename: 'resume.pdf', content: pdfData }]
            });

            res.status(201).json(person);
        });

        pdfDoc.text(`Name: ${name}`);
        pdfDoc.text(`Email: ${email}`);
        pdfDoc.text(`Phone: ${phone}`);
        pdfDoc.text(`Education: ${education}`);
        pdfDoc.text(`Experience: ${experience}`);
        pdfDoc.end();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// View resume
router.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        res.render('profile', { person });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;