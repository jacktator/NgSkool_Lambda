# NgSkool

This repo contains the Back End code for a technical test for a very innovative company in Sydney. For the Front End, please see [NgSkool_NG](https://github.com/jacktator/NgSkool_NG).

For more info, please see the [Introduction](https://github.com/jacktator/NgSkool_NG).

## Architecture

This repo follows the DynamoDB, Lambda, Serverless, Express and NodeJS architecture. For more information, please see [this guide](https://serverless.com/blog/serverless-express-rest-api/).

For more info on AWS DynamoDB & Lambda Stack, please see [AWS Tutorial](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/).
Considering majority of NgSkool users will be in Australia. AWS ap-southeast-2 node, aka the Sydney Region is selected.

For more info on Serverless Architecture, please see [ServerLess](https://serverless.com).

![](./assets/architecture.jpg)

## Features

- DynamoDB
- Lambda
- Express
- NodeJS
- Offline Development (Depending on time)

## Roadmap

### Local Dev Environment

[x] Serverless

### AWS Cognito

[x] Create User Pool - NgSkoolUsers created.
[x] Create App Client - NgSkoolWebApp created. App ID: 2i4tpsipubcfl5g378m4jh0n50

### AWS DynamoDB

[x] Create Table
    [x] School
[ ] Fine tune IAM Permission for Tables

### Amazon API Gateway

[ ] Create, Read, Update, Delete Schools
[ ] Name
[ ] Address
[ ] Amount of Students
[ ] Administrators
[ ] Keywords
[ ] Postman API
[ ] Postman Collection (Depending on Time)

## Issues

[ ] Delete duplicate application created in [AWS N. Virginia](https://console.aws.amazon.com/lambda/home?region=us-east-1#/applications)
