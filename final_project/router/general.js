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
      return res.status(200).json({ message: "Customer successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "Customer already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register customer. Username and password required." });
});

// Task 1 & Task 10: Get the book list available in the shop using Promises / async-await
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });

  getBooks.then((bks) => {
    return res.status(200).send(JSON.stringify(bks, null, 4));
  }).catch((err) => {
    return res.status(500).json({ message: "Error retrieving books", error: err });
  });
});

// Task 2 & Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  const getBookByISBN = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: "Book not found with specified ISBN" });
    }
  });

  getBookByISBN
    .then((book) => {
      return res.status(200).json(book);
    })
    .catch((err) => {
      return res.status(err.status || 500).json({ message: err.message });
    });
});
  
// Task 3 & Task 12: Get book details based on author using async/await with Promise
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const getBooksByAuthor = new Promise((resolve, reject) => {
      let matchedBooks = {};
      for (let key in books) {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
          matchedBooks[key] = books[key];
        }
      }
      if (Object.keys(matchedBooks).length > 0) {
        resolve(matchedBooks);
      } else {
        reject({ status: 404, message: "No books found by this author" });
      }
    });

    const result = await getBooksByAuthor;
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
});

// Task 4 & Task 13: Get all books based on title using async/await with Promise
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const getBooksByTitle = new Promise((resolve, reject) => {
      let matchedBooks = {};
      for (let key in books) {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
          matchedBooks[key] = books[key];
        }
      }
      if (Object.keys(matchedBooks).length > 0) {
        resolve(matchedBooks);
      } else {
        reject({ status: 404, message: "No books found with this title" });
      }
    });

    const result = await getBooksByTitle;
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
});

// Task 5: Get book review based on ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found with specified ISBN" });
  }
});

// =========================================================================
// TASKS 10 - 13: Asynchronous methods using Promise callbacks / async-await with Axios
// =========================================================================

// Task 10: Get all books using async-await with Axios
const getBookListAxios = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log("Task 10 - All Books:", response.data);
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
      console.log(`Task 11 - Book for ISBN ${isbn}:`, response.data);
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
    console.log(`Task 12 - Books by ${author}:`, response.data);
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
    console.log(`Task 13 - Books with title ${title}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Task 13 Error for title ${title}:`, error.message);
    throw error;
  }
};

module.exports.general = public_users;
module.exports.getBookListAxios = getBookListAxios;
module.exports.getBookByISBNAxios = getBookByISBNAxios;
module.exports.getBookByAuthorAxios = getBookByAuthorAxios;
module.exports.getBookByTitleAxios = getBookByTitleAxios;
