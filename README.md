<!-- ## Overview of the Provided Project Files

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

First, install the project's dependencies using `npm`.

  npm install

Second, seed the SQLite database.

  npm run seed

And lastly, start the application.

  npm start


To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/). -->




# Project 9 - Full Stack JavaScript Techdegree

### REST API
A REST API that lets users create, list, update and delete items from a school database.

---

<!-- <img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1558622280/portfolio/library-book-database.png" width="899px"> -->

## View project
1. Download this repo.
2. Navigate to the project directory in the command line/terminal.
3. Run 'npm install' (or view the required dependencies listed in the package.json file and install each manually).
3. Run 'npm start' to view the project in your browser at: localhost:3000

<!-- TODO: Set up live version using Heroku -->

<!-- :mag: Live version available at [nickhericks.github.io/techdegree-project-6/](https://nickhericks.github.io/techdegree-project-6/) -->

## Project objective
In this project, I used the popular Express web application framework and a SQL database to create a REST API that lets users create, list, update, and delete items from a school database.

<!-- In this project, you’ll create a REST API using Express. The API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database. -->

<!-- In addition, the project will require users to create an account and log-in to make changes to the database. -->

<!-- In a future project, you'll complete your full stack JavaScript application by using React to create a client for your REST API. -->

<!-- To complete this project, you’ll use your knowledge of REST API design, Node.js, and Express to create API routes, along with the Sequelize ORM for data modeling, validation, and persistence. To test your application, you'll use Postman, a popular application for exploring and testing REST APIs. -->

<!-- old -->
<!-- In this project, I was given HTML designs and an existing SQLite database. I was required to implement a dynamic website using JavaScript, Node.js, Express, Pug, and the SQL ORM Sequelize. The application includes pages to list, add, update, and delete books from an SQLite database.

I used Sequelize to access the data in the library.db SQLite database file. Express.js routes were created to handle the needed url requests, with corresponding Pug template files. Sequelize methods are used to create, read, update and delete data from the SQLite database. Sequelize model validation is used for validating form fields. -->


## Techniques and tools
- REST API design
- Node.js
- Express.js
- Sequelize ORM (data modeling, validation, persistence)
- Postman (REST API testing)

<!-- ## Code example
Using the Book object to access the Sequelize book.js model, along with the Sequelize `.findByPk()` method to retrieve the book data we're looking for.

```javascript
/* GET individual book */
router.get('/:id', (req, res) => {
	Book.findByPk(req.params.id)
		.then(function(book) {
			if(book) {
				res.render('update-book', { book: book, title: book.title });
			} else {
				res.render('error');
			}
		})
		.catch(function(err) {
			res.render('error');
		});
});
``` -->

## Acknowledgements
This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:

Also, a big thank you to the creators and maintainers of [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/). 👍