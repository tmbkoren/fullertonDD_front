<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Front End for FullertonDD project for CPSC 362](#front-end-for-fullertondd-project-for-cpsc-362)
    - [An e-commerce web app](#an-e-commerce-web-app)
  - [Project Description](#project-description)
  - [Installation Instructions](#installation-instructions)
      - [Git clone the repo to your machine :](#git-clone-the-repo-to-your-machine-)
      - [After cloning the repo to your machine, run to install dependencies:](#after-cloning-the-repo-to-your-machine-run-to-install-dependencies)
      - [Create a .env file](#create-a-env-file)
      - [Run the dev server:](#run-the-dev-server)
      - [Important](#important)
      - [Docs](#docs)
  - [TO-DO:](#to-do)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Front End for FullertonDD project for CPSC 362

### An e-commerce web app

## Project Description
A react based web application that serves as a frontend for the fullertonDD project.
The main features of the project:
- Fetching products from the backend
- Searching through the products
- Submitting a new product(vendor-only feature)
- Sorting products by name and tags
- Optional user account system for tracking previous purchases

## Installation Instructions

#### Git clone the repo to your machine :
```shellscript
git clone https://github.com/tmbkoren/fullertonDD_front.git
```

#### After cloning the repo to your machine, run to install dependencies:

```shellscript
npm i
```

You only need to do it once, or if new packages were installed

#### Create a .env file

Create a .env file following example file .env.example, and put your deployed backend URL there(if there is one)

#### Run the dev server:

```shellscript
npm run dev
```
#### Important
Do not touch context.tsx, entry.client\entry.server.tsx, createEmotionCache.ts, and root.tsx 

#### Docs

- 📖 [Remix docs](https://remix.run/docs)
- [Chakra UI docs](https://v2.chakra-ui.com/docs/components)


## TO-DO:

- Fix styling for light/dark theme
- Create an "About" page
- Create a "Contact" page
- Work on the "Cart" page