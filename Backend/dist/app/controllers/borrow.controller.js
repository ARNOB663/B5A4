"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRoute = express_1.default.Router();
const BorrowZodSchema = zod_1.z.object({
    book: zod_1.z.string().min(1, "Book ID is required"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
    dueDate: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }),
});
exports.borrowRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield BorrowZodSchema.parseAsync(req.body);
        // Find the book
        const book = yield book_model_1.Book.findById(body.book);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        // Check available copies
        if (book.copies < body.quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
        }
        book.copies -= body.quantity;
        yield book.save();
        // Update available status if copies become 0
        yield book.updateAvailableStatus();
        const borrow = yield borrow_model_1.Borrow.create({
            book: body.book,
            quantity: body.quantity,
            dueDate: new Date(body.dueDate),
        });
        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            errors: error.errors,
        });
    }
}));
exports.borrowRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            { $unwind: "$bookInfo" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            errors: error.errors,
        });
    }
}));
