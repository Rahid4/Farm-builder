const { validationResult } = require('express-validator');
const Form = require('../models/form-model');
const formCltr = {}

formCltr.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, inputs } = req.body;


        const newForm = new Form({ title, inputs });


        await newForm.save();

        res.status(201).json(newForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


formCltr.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find();
        if (forms.length === 0) {
            return res.status(404).json({ error: 'No forms found' });
        }
        res.json(forms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


formCltr.getForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

formCltr.submit = async (req, res) => {
    try {
        const { formId, data } = req.body;
        const form = await Form.findById(formId);

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        form.submissions.push({ data });
        await form.save();

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

formCltr.update = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, inputs } = req.body;
        const form = await Form.findByIdAndUpdate(
            req.params.id,
            { title, inputs },
            { new: true }
        );

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.json(form);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
formCltr.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Form.findByIdAndDelete(id);

        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = formCltr;
