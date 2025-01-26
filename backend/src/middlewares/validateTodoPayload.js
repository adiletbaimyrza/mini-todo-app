"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodoPayload = void 0;
const validateTodoPayload = (req, res, next) => {
    const { name, dueDate, isCompleted, completionDate, id } = req.body;
    const errors = [];
    if (name !== undefined &&
        (typeof name !== 'string' || name.trim().length === 0)) {
        errors.push({
            field: 'name',
            message: "'name' should be a non-empty string.",
        });
    }
    if (id !== undefined) {
        errors.push({
            field: 'id',
            message: 'The id field should not be provided.',
        });
    }
    const validateDate = (date, field, isCompletionDate = false) => {
        if (date !== undefined && date !== null) {
            if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                errors.push({
                    field,
                    message: `'${field}' should be a string in the format 'yyyy-mm-dd'.`,
                });
            }
            else {
                const dateParts = date.split('-').map(Number);
                const isValidDate = !isNaN(new Date(dateParts[0], dateParts[1] - 1, dateParts[2]).getTime());
                if (!isValidDate) {
                    errors.push({
                        field,
                        message: `'${field}' should be a valid date.`,
                    });
                }
                else if (isCompletionDate) {
                    const currentDate = new Date();
                    const inputDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                    if (inputDate > currentDate) {
                        errors.push({
                            field,
                            message: `'${field}' cannot be a future date.`,
                        });
                    }
                }
            }
        }
    };
    validateDate(dueDate, 'dueDate');
    validateDate(completionDate, 'completionDate', true);
    if (isCompleted === false &&
        completionDate !== undefined &&
        completionDate !== null) {
        errors.push({
            field: 'completionDate',
            message: "'completionDate' should be null or undefined when 'isCompleted' is false.",
        });
    }
    if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        errors.push({
            field: 'isCompleted',
            message: "'isCompleted' should be a boolean.",
        });
    }
    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            errorCode: 'VALIDATION_ERROR',
            message: 'Validation failed for the provided input.',
            details: errors,
        });
        return;
    }
    next();
};
exports.validateTodoPayload = validateTodoPayload;
