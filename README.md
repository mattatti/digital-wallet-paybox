user-service folder:
npm install
npm run dev

notification-service folder:
npm install
npm run dev

transaction-service folder:
npm install
npm run dev

run mongo db server
run rabbitmq server

root folder:
npm install
ts-node init-database.ts

The urls for mongo and rabbit can be found in the common folder in the constant files (for simplicity of the task but should be at a .env file).


Since there's no UI, use these http requests to test the services:

Step 1:
First create some users:
POST http://localhost:3000/users request body reference:
{
    "username": "user1",
    "balance": 100
}

(It will return an insertedId field, this is the userId)

Step 2:
Then send a transaction between two users (userIds created in the first step are the sender and reciever ids)
POST http://localhost:4000/transactions request body reference:
{ 
    "senderId": "65858e618a3f5b6d1da647a9",
    "receiverId": "65858f4b8084fdc935d9c7c9",
    "amount": 1 
}

This call will send the data to the message queue and the notification service will consume the messages and send them to the sendNotification function.