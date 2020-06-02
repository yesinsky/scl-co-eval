This is a sample monorepo Angular+NestJS based application.
The solution has DDD-inspired structure based on nrwl solutions and own experience. 
It has JWT BE&FE auth, 3 lazy-loaded feature-modules, user management API, and a lot more inside.
Users-service and Auth-service have simple Jest tests (other tests are just dummies by the moment) to cover API.
The UI has a login form which further leads to 3 image-buttons, which in turn load lazy modules.
