## Local Dev Environment

- [x] Serverless
- [x] Offline Development

## Authentication 

- [ ] JWT Auth (Depending on Time)

## AWS Cognito

- [x] Create User Pool - NgSkoolUsers created.
- [x] Create App Client - NgSkoolWebApp created. App ID: 2i4tpsipubcfl5g378m4jh0n50

## AWS DynamoDB

Though AWS documents suggest that attributes to be named in Pascal Case, from experience JS applications reads better when columns are camelCase.

- [x] Create Table
  - [x] School
- [ ] Fine tune IAM Permission for Tables (Depending on Time)

To safe guard column/attribute/key name for NoSQL, I'm using an SDK `dynamodb-data-mapper` to shield the REST APIs.

## REST APIs

- [x] POST /schools
- [x] POST /schools/:id
- [x] GET /schools      (TODO: Query Params. Currently limit to 100 items, and Front End searching/filtering only.)
- [x] GET /schools/:id  (TODO: Select keys to return.)
- [ ] DEL /schools/:id  (TODO: Debug)

## Amazon API Gateway (Handled by Serverless yml file)

- [x] Create, Read, Update, Delete Schools
- [x] Name
- [x] Address
- [x] Amount of Students
- [ ] Administrators (Depending on Time)
- [ ] Keywords (Depending on Time)

## Documentation 

- [ ] Swagger (Dependin on Time)

## Testing

### Unit Test

- [ ] Unit Tests (Depending on Time)

### REST API Test

- [x] [Postman Requests](./testing#postman-requrests)
- [x] [Postman Collection](./testing/#postman-collection)
- [x] [Postman Test Scripts](./testing/postman-test-scripts)
- [ ] Postman Collection Runs (Depending on Time)

### Automation

- [ ] Unit Tests (Depending on Time)
- [ ] Postman Collection Runs (Depending on Time)
