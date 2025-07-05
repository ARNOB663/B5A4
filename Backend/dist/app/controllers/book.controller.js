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
exports.booksRoute = void 0;
const book_model_1 = require("../models/book.model");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
exports.booksRoute = express_1.default.Router();
const BookZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
    isbn: zod_1.z.string().min(1, "ISBN is required"),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url("Invalid URL format").optional(),
    copies: zod_1.z.number().int().nonnegative(),
    available: zod_1.z.boolean().optional(),
});
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield BookZodSchema.parseAsync(req.body);
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
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
//get all books
exports.booksRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10" } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortObj = {};
        sortObj[sortBy] = sort === "asc" ? 1 : -1;
        const books = yield book_model_1.Book.find(query)
            .sort(sortObj)
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
//get single book with id
exports.booksRoute.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
// Update a book by ID
exports.booksRoute.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield BookZodSchema.partial().parseAsync(req.body);
        const { bookId } = req.params;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, body, { new: true, runValidators: true });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        res.json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
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
// Delete a book by ID
exports.booksRoute.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
