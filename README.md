This is a sample monorepo Angular+NestJS based application.
The solution has DDD-inspired structure based on nrwl solutions and own experience. 
It has JWT BE&FE auth, 3 lazy-loaded feature-modules, user management API, and a lot more inside.
Users-service and Auth-service have simple Jest tests (other tests are just dummies by the moment) to cover API.
The UI has a login form which further leads to 3 image-buttons, which in turn load lazy modules.

Setup instructions:

  - Frontend (uses Angular CLI to host and run the app):
    1. Install cli globally via: "npm install -g @angular/cli".
    2. Navigate to the 'scl-co-eval' solution root in the terminal.
    3. Run server: "ng serve scl-co-eval".
    
  - Backend (uses Docker, MongoDb and docker-compose.yml):
    1. Download and install Docker (https://docs.docker.com/get-docker/).
    2. Download mongodb image via: "docker pull mongo:latest".
    3. Navigate to the 'scl-co-eval' solution root in the terminal.
    4. Run 'docker-compose up'. This command will create 'scl-co-eval-db' container with 'scl-co-eval-mongo' volume and database on 'localhost:27017'.
    5. Run server: "ng serve scl-co-eval-api".
