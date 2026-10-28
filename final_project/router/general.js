const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Task 1 & Task 10: Get the book list available in the shop using async-await / Promise with Axios
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    const bookList = await getBooks;
    return res.status(200).send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book list", error: error.message });
  }
});

// Task 2 & Task 11: Get book details based on ISBN using Promise callbacks or async/await with Axios
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: "Book not found" });
    }
  })
  .then((book) => {
    return res.status(200).json(book);
  })
  .catch((err) => {
    return res.status(err.status || 500).json({ message: err.message });
  });
});
  
// Task 3 & Task 12: Get book details based on author using async/await with Axios and Promise
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const getBooksByAuthor = new Promise((resolve, reject) => {
      let matchedBooks = [];
      let isbns = Object.keys(books);
      isbns.forEach((isbn) => {
        if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
          matchedBooks.push({
            isbn: isbn,
            author: books[isbn].author,
            title: books[isbn].title,
            reviews: books[isbn].reviews
          });
        }
      });
      if (matchedBooks.length > 0) {
        resolve(matchedBooks);
      } else {
        reject({ status: 404, message: "No books found by this author" });
      }
    });

    const booksResult = await getBooksByAuthor;
    return res.status(200).json(booksResult);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
});

// Task 4 & Task 13: Get all books based on title using async/await with Axios and Promise
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const getBooksByTitle = new Promise((resolve, reject) => {
      let matchedBooks = [];
      let isbns = Object.keys(books);
      isbns.forEach((isbn) => {
        if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
          matchedBooks.push({
            isbn: isbn,
            author: books[isbn].author,
            title: books[isbn].title,
            reviews: books[isbn].reviews
          });
        }
      });
      if (matchedBooks.length > 0) {
        resolve(matchedBooks);
      } else {
        reject({ status: 404, message: "No books found with this title" });
      }
    });

    const booksResult = await getBooksByTitle;
    return res.status(200).json(booksResult);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// =========================================================================
// TASKS 10 - 13: Functions & routes using Promise callbacks / async-await with Axios
// =========================================================================

// Task 10: Get all books using async-await with Axios
const getBookListAxios = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return response.data;
  } catch (error) {
    console.error("Task 10 Error:", error.message);
    throw error;
  }
};

// Task 11: Get book details by ISBN using Promise callbacks with Axios
const getBookByISBNAxios = (isbn) => {
  return axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(`Task 11 Error for ISBN ${isbn}:`, error.message);
      throw error;
    });
};

// Task 12: Get book details by Author using async-await with Axios
const getBookByAuthorAxios = async (author) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    console.error(`Task 12 Error for author ${author}:`, error.message);
    throw error;
  }
};

// Task 13: Get book details by Title using async-await with Axios
const getBookByTitleAxios = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error(`Task 13 Error for title ${title}:`, error.message);
    throw error;
  }
};

// Additional Axios-powered endpoints for Tasks 10-13 testing
public_users.get('/async/books', async function (req, res) {
  try {
    const booksData = await getBookListAxios();
    return res.status(200).json(booksData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

public_users.get('/async/isbn/:isbn', function (req, res) {
  getBookByISBNAxios(req.params.isbn)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: err.message }));
});

public_users.get('/async/author/:author', async function (req, res) {
  try {
    const data = await getBookByAuthorAxios(req.params.author);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

public_users.get('/async/title/:title', async function (req, res) {
  try {
    const data = await getBookByTitleAxios(req.params.title);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports.general = public_users;
module.exports.getBookListAxios = getBookListAxios;
module.exports.getBookByISBNAxios = getBookByISBNAxios;
module.exports.getBookByAuthorAxios = getBookByAuthorAxios;
module.exports.getBookByTitleAxios = getBookByTitleAxios;
