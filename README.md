# Mist - Video Game Digital Distribution Platform
Welcome to the Mist platform website! Mist is a PC video game digital distribution platform, where publishers and developers put up their PC games and DLCs on sale digitally for everyone WORLDWIDE! You can register an account with us and purchase games on the Mist platform, where it will belong to you forever!

## Context
Mist is a game project done during my education with Trent Global College. In my third and final project, I will be demonstrating the usage of ReactJS, Adonis.js and MySQL to develop a platform where users can be simulated to buy games.

My goal is to create a simplistic and attractive single page application website using the knowledge of what I have learnt over the course of the bootcamp. I want to ensure that users will enjoy their time on the platform, and at the same time be as close to a real platform as possible.

# Demo
The demo of the site will be available soon...

# Notes
This repository only contains the back-end codes for Project MiST. Front-end codes can be found [here](https://github.com/yuhengen/proj3-mist-react)

# UI/UX
## Identifying the Users (STRATEGY)
The primary purpose of MiST is to have users create accounts and purchase video games on our platform. Our potential targets are gamers in general, as there will be a wide array of games and genre available on MiST.

### Owner Stories
```
- As the owner and developer of MiST, I want to get as many publishers and developers to put their games up on sale on MiST, so that it can attract more users to use our platform to purchase games
- As the owner and developer of MiST, I want as many users as possible on our platform purchasing games, so that we are able to profit from the commissions
- As the owner of MiST, I want to create a user-friendly platform for users to purchase and own games, so that will come back to use MiST
```

### User Stories (Developers/Publishers)
```
- As a developer/publisher of games, I want a platform where my games can reach as many users as possible, so that we are able to gain sales and reputation out of it
- As a developer/publisher of games, I want a user-friendly site/platform, so that I can easily manage my published products
- As a developer/publisher of games, I want information such as my sales numbers to be easily accessed, so that I am able keep track of my sales and targets
```

### User Stories (Gamers/Users)
```
- As a user, I want a platform where I can purchase, store and download my favorite games, so that I don't have to continuously switch between platforms when playing different games
- As a user, I want a platform where I can view my past transactions, so that I am able to keep track of my expenses
- As a user, I want a user-friendly platform, so that I am able to access the information I want to in a couple of clicks
```

# The Requirements (SCOPE)
## Current Features for Publishers (Adonis/Backend)
```
1. Sign up for Publisher account
2. Login to the account
3. Browse list of products that belong to you
4. View or edit details of individual products
5. Delete unwanted products from your list of products
```

## Current Features for Users (React/Frontend)
```
1. Sign up for User account
2. Login to the account
3. Browse for list of products
4. View details of individual products
5. Add/delete products from cart
5. Purchase products via STRIPE
6. Check transaction and order history
7. View product library to see the products you own
```

# Developing the Site Structure (STRUCTURE)
The MiST platform has a side navigation bar attached to every page, allowing publishers to access all pages with ease.

## Sitemap
---

The sitemap of the project will be available soon...

---

# Developing Page Structure and Organize Interactions (SKELETON)
Publishers are required to login to access any pages on the backend platform. Once logged in, the first thing the publishers see are your list of products, with a sidebar to access your games, profile or logout.

## Wireframes
---

The wireframes of the project will be available soon...

---

# Designing the Graphics User Interface (SURFACE)
## Colors
After research and considerations, the main colors I decide to use for the MiST backend website are the neutral colors of minimalism and simplicity.
```
-White, black or grey for the background, as it is able to blend in most situations
-Black, grey or white used for fonts and texts to contrast the background colors
```

## Fonts
The font mainly used on the website is Sans Serif, the default font family, which is often used to convey modernity or minimalism.

# ER Diagram
<img src="./documentation/proj3-erd.jpg" style="margin: 0;">

---

# Logical Schema
<img src="./documentation/proj3-logical-schema.jpg" style="margin: 0;">

---

# Technologies
- [ReactJS](https://reactjs.org/), [AdonisJS](https://adonisjs.com/) and CSS for structuring and styling the website
- [AdonisJS](https://adonisjs.com/) for admin page and data rendering
- MySQL as database to store data via CRUD
- Javascript to implement interactivty with website
- [Bootstrap](https://getbootstrap.com/) for Navbar and other Bootstrap components
- [GitHub](https://github.com/) for version control and repositories
- [GitPod](https://gitpod.io/) as coding platform
- [Axios](https://github.com/axios/axios) to read from JSON files and database
- GIMP for image editing
- [Am I Responsive Checker](http://ami.responsivedesign.is/) to ensure my platform is mobile responsive

# Deployment
## Steps taken to deploy the project to Github pages (Credits to Paul Chor for a detailed and simple guide)
```
1.
```

# Credits
## Acknowledgement
This project would not have been possible without my main lecturer, Paul Chor, for the skills and knowledge imparted to me, and teaching assistant, Shun, for the guidance during the building of the project during the bootcamp in Trent Global College.
Big appreciation to AdonisJS and ReactJS documentations, [Adonis Forums](https://forum.adonisjs.com/), w3schools, Stackoverflow forums, Bootstrap documentation.

- [Adonis Validator](https://adonisjs.com/docs/4.1/validator) documentations and Paul's demo for form validations
- [Cloudinary](https://cloudinary.com/) and Paul's demo for uploading of images
- [Select2](https://select2.org/) for category selection
