# Listing APP
Simple listing app with cached requests using IndexedDB. 

## Setup

### Install deps
```
 npm i
```

### Run tests
```
 npm run test
```

### Run proyect in dev mode 
```
 npm start
```

### Build for production
```
 npm run build
```

### Run production build with express
```
 npm run serve
```

## Key concepts
REST request are being handled using a custom aproach to reproduce how apollo does with graphql. There are two methods (useQuery() and useMutation()) wich uses predefenied queries for fetching data. 

xState has been used to track fetching states, integrating it with the custom hooks mentioned above.