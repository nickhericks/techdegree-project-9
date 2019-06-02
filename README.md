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


<!-- In this project, I was given HTML designs and an existing SQLite database. I was required to implement a dynamic website using JavaScript, Node.js, Express, Pug, and the SQL ORM Sequelize. The application includes pages to list, add, update, and delete books from an SQLite database.

I used Sequelize to access the data in the library.db SQLite database file. Express.js routes were created to handle the needed url requests, with corresponding Pug template files. Sequelize methods are used to create, read, update and delete data from the SQLite database. Sequelize model validation is used for validating form fields. -->


<!-- ## Techniques and tools
- Sequelize
- SQLite database
- Node.js
- Express.js
- Pug template engine
- npm -->

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

Also, a big thank you to the creators and maintainers of [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), and [Pug](https://www.npmjs.com/package/pug). 👍