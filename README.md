# todo-list



To run this small application, we need to open three terminals

* Connect to MongoDB
* Run backend server (in /backend directory)
* Run frontend server (in /frontend directory)



### Steps to run the application

1. Firstly, we need to install packages. Following is the project structures.

   > todo-list
   >
   > > frontend
   > >
   > > > src
   > > >
   > > > > App.js
   > > > >
   > > > > index.js
   > > > >
   > > > > style.css
   > > >
   > > > src
   > > >
   > > > > Index.html
   > > >
   > > > package-lock.json
   > > >
   > > > package.json
   > >
   > > backend
   > >
   > > > models
   > > >
   > > > > Task.js
   > > >
   > > > package-lock.json
   > > >
   > > > package.json

   As the structure shows, we need to run  ```npm install``` both in backend and frontend directory.

   * Open a new terminal for ==backend==

     ```cd todo-list/backend```

     ```npm install```

   * Open a new terminal for ==frontend==

     ```cd todo-list/frontend```

     ```npm install```

2. Then we're able to run it.

   * For ==backend== terminal

     ```node server.js```

   * For ==frontend== terminal

     ```npm start```

   * Open a new terminal to connect to ==MongoDB==

     ```mongosh```

     

