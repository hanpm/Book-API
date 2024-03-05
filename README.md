# Book-API
Creating an API with Node.js, Express, and MongoDB to manage a collection of books. 

### About me
> 👋 Hello, everyone!
> Allow me to introduce myself. **I'm [Han](https://www.linkedin.com/in/hmp36/), a recent, 1st-gen. CS grad from California State University, Long Beach, who's *hungry* for a chance at Erewhon!** While I'm still a novice when it comes to implementing the MERN stack, this project has been a enjoyable experience for me. There is certainly room for improvement, and I hope to talk further about the project and Erewhon's technology soon.  

## Project Description 
### Technologies Used
Technology used in this project are [Node.js](https://nodejs.org/en/about), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/). 

### Features to implement in the future
There are couple things that I came in mind when completing (& researching) for this project. 

1) Implementing more features to the API
- *I frequent the library a lot and here's some useful features to include:*
    - Adding genres and sorting by genres. 
    - Having a count of each inventory. 

2) Refactoring with better [MVC architecture](https://medium.com/@ansari028amaan/understanding-mvc-architecture-in-the-mern-stack-5cc083828298#:~:text=The%20MVC%20architecture%20provides%20a,a%20more%20efficient%20development%20process.)
- Adhering to a structured architecture is important for creating scalable, reusable, and organized applications. I have already began to separate the code into its appropriate folders. With more time, I would better organize my code according to the embedded link.

3) Complete the [MERN stack](https://www.mongodb.com/mern-stack)
- Currently, this project is only a part of the MERN stack. 
- We need to also implement a frontend, **React**, to complete this stack and make this project a full-stack application.

4) Fix my unit test (book.test.js)
- This is my first time writing unit test with Jest. I can't seem to figure out how to stop "asynchronous operations" in my test. Therefore, the test fails, but nonetheless, I decided to put my attempt here. 

## How to install and run project
This guide will walk you through the steps to run an API built with Node.js, Express, and MongoDB.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installation
1. Clone the repository of your Node.js API project or download into your computer and save into your Desktop
   ```bash
   git clone https://github.com/hanpm/Book-API.git

2. Navigate to the project directory.
    ```bash
    cd Desktop/Book-API

2. Install dependencies 
    ```bash
    npm install 

### Running the API 
1. Run the server 
    ```bash
    npm run dev 

2. Download [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download) & start making request to the API
- Get all books 
    ```bash
    localhost:3000/books

- Get books with pagination 
    ```bash
    localhost:3000/books?page=4&limit=10

- Get book by ID
    ```bash
    localhost:3000/books/<insert ID>

- Post books 
    ```bash
    localhost:3000/books
 
    {
    "title": "Insert title",
    "author": "Insert author",
    "publicationYear": 0
    }

- Update books
    ```bash
    localhost:3000/books/<insert ID>

    {
    "title": "Insert updated title",
    "author": "Insert updated author",
    "publicationYear": 0
    }

- Search books
    ```bash
    localhost:3000/books/search?q=maryshelley&page=4&limit=10

- Get book stats
    ```bash
    localhost:3000/books/stats

## Test and how to run them
1. Install dependencies
    ```bash
    npm install --save-dev jest

2. Run test in terminal
   ```bash
    npx jest
