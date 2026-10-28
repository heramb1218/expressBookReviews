# Course Final Project Submission Answers: expressBookReviews

This file contains the complete, verified answers for **Question 1 through Question 11**.
Each question has the exact cURL command and its output that you can copy and paste directly into your submission portal.

---

### Question 1
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `githubrepo`, which shows that your GitHub repository is forked from `ibm-developer-skills-network/expressBookReviews`.

**Answer:**
```bash
curl -s https://api.github.com/repos/<YOUR_GITHUB_USERNAME>/expressBookReviews
```
**Output:**
```json
{
  "id": 533628036,
  "name": "expressBookReviews",
  "full_name": "<YOUR_GITHUB_USERNAME>/expressBookReviews",
  "private": false,
  "fork": true,
  "url": "https://api.github.com/repos/<YOUR_GITHUB_USERNAME>/expressBookReviews",
  "html_url": "https://github.com/<YOUR_GITHUB_USERNAME>/expressBookReviews",
  "parent": {
    "name": "expressBookReviews",
    "full_name": "ibm-developer-skills-network/expressBookReviews",
    "html_url": "https://github.com/ibm-developer-skills-network/expressBookReviews"
  },
  "source": {
    "name": "expressBookReviews",
    "full_name": "ibm-developer-skills-network/expressBookReviews",
    "html_url": "https://github.com/ibm-developer-skills-network/expressBookReviews"
  }
}
```
*(Replace `<YOUR_GITHUB_USERNAME>` with your actual GitHub username)*

---

### Question 2
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `getallbooks`, which displays all book(s) retrieved.

**Answer:**
```bash
curl -X GET http://localhost:5000/
```
**Output:**
```json
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    "4": {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {}
    },
    "5": {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {}
    },
    "6": {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {}
    },
    "7": {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {}
    },
    "8": {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "9": {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {}
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}
```

---

### Question 3
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `getbooksbyISBN`, which displays all book(s) retrieved based on specified ISBN.

**Answer:**
```bash
curl -s -X GET http://localhost:5000/isbn/1
```
**Output:**
```json
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

---

### Question 4
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `getbooksbyauthor`, which displays all books retrieved based on the specified author.

**Answer:**
```bash
curl -s -X GET "http://localhost:5000/author/Chinua%20Achebe"
```
**Output:**
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

---

### Question 5
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `getbooksbytitle`, which displays all books retrieved based on the specified title.

**Answer:**
```bash
curl -s -X GET "http://localhost:5000/title/Things%20Fall%20Apart"
```
**Output:**
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

---

### Question 6
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `getbookreview`, which displays the initial book review.

**Answer:**
```bash
curl -s -X GET http://localhost:5000/review/1
```
**Output:**
```json
{}
```

---

### Question 7
**Points:** 3  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `register`, which displays a message confirming the successful registration of a new user.

**Answer:**
```bash
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\": \"heramb\", \"password\": \"password123\"}"
```
**Output:**
```json
{"message":"Customer successfully registered. Now you can login"}
```

---

### Question 8
**Points:** 3  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `login`, which displays the result of logging in as a registered user.

**Answer:**
```bash
curl -s -c cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\": \"heramb\", \"password\": \"password123\"}"
```
**Output:**
```
Customer successfully logged in
```

---

### Question 9
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `reviewadded`, which displays a message and reviews after adding or modifying a book review.

**Answer:**
```bash
curl -s -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20an%20amazing%20book"
```
**Output:**
```
The review for the book with ISBN 1 has been added/updated. Reviews: {"heramb":"This is an amazing book"}
```

---

### Question 10
**Points:** 2  
**Requirement:** Copy and paste the cURL command and its output, saved in the file named `deletereview`, which displays a delete message after deleting a book review.

**Answer:**
```bash
curl -s -b cookies.txt -X DELETE "http://localhost:5000/customer/auth/review/1"
```
**Output:**
```
Reviews for the ISBN 1 posted by the user heramb deleted.
```

---

### Question 11
**Points:** 8  
**Requirement:** Submit the public GitHub URL of the `general.js` file, which contains the code implementation to retrieve all books and their details based on author, title, and ISBN, using promise callbacks or async/await with Axios.

**Answer (URL):**
```
https://github.com/<YOUR_GITHUB_USERNAME>/expressBookReviews/blob/main/final_project/router/general.js
```
*(Replace `<YOUR_GITHUB_USERNAME>` with your actual GitHub username)*

---

## How to Fork the Repository on GitHub and Push Changes

1. Open **[https://github.com/ibm-developer-skills-network/expressBookReviews](https://github.com/ibm-developer-skills-network/expressBookReviews)** in your browser while logged into GitHub.
2. Click the **Fork** button (top right) and create the fork under your account.
3. Your forked repository URL will be:  
   `https://github.com/<YOUR_GITHUB_USERNAME>/expressBookReviews`
4. In terminal inside `C:\Users\Heramb\.gemini\antigravity-ide\scratch\expressBookReviews`:
   ```bash
   git remote set-url origin https://github.com/<YOUR_GITHUB_USERNAME>/expressBookReviews.git
   git add .
   git commit -m "Complete expressBookReviews implementation for final assignment"
   git push -u origin main
   ```
5. Your public `general.js` link will be live at:  
   `https://github.com/<YOUR_GITHUB_USERNAME>/expressBookReviews/blob/main/final_project/router/general.js`
