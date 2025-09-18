# Bill Payment & Reward System  

This project implements a simple backend system where a user can receive a **mock gift card reward** only if they’ve paid their last **3 bills on time**.  

## 📌 Features  
- Create and manage **Users**  
- Generate **Bills** with due dates  
- Accept **Bill Payments** with validation against due date  
- Track last **3 bill payments** for each user  
- Generate a **Reward** (e.g., “$10 Amazon Gift Card”) if all last 3 bills were paid on or before the due date  

---

## 🚀 Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  

---

## 📡 API Endpoints  

### 1. Create User  
`POST /api/v1/users/`  
Creates a new user.

**req.body**  
```json
{
  "username": "abhishek",
  "fullName": "abhishek sharma",
  "email": "abhishek@example.com"
}
```
**output** 
```output
{
    "statusCode": 201,
    "data": {
        "username": "ram",
        "fullName": "ram tiwari",
        "email": "ram@example.com",
        "_id": "68cb80d6d2ec9ea5e6587459",
        "createdAt": "2025-09-18T03:47:34.539Z",
        "updatedAt": "2025-09-18T03:47:34.539Z",
        "__v": 0
    },
    "message": "User created successfully.",
    "success": true
}
```

### 2. Generate Bill  
`POST /api/v1/bill/`  
Creates a bill for a user with a **due date**.  

**req.body**  
```json
{
    "userId" : "68cb80a2d2ec9ea5e6587456",
    "billAmount": 400,
    "currency" : "USD",
    "dueDate": "2025-09-30"
}
```
**output** 
```output
{
    "statusCode": 201,
    "data": {
        "userId": "68cb80a2d2ec9ea5e6587456",
        "billAmount": 400,
        "currency": "USD",
        "dueDate": "2025-09-30T00:00:00.000Z",
        "status": "PENDING",
        "_id": "68cbcc836ae5ba9f1cbe1f7d",
        "createdAt": "2025-09-18T09:10:27.741Z",
        "updatedAt": "2025-09-18T09:10:27.741Z",
        "__v": 0
    },
    "message": "Bill generated successfully.",
    "success": true
}
```

### 3. Pay Bill  
`PATCH /api/v1/bill/pay`  
Accepts bill payment and records the **payment date**.

**req.body**  
```json
{
    "billId" : "68cbca38ec9ed55cc53724d8",
    "transanctionId" : "t03",
    "amountPaid" : 300
}
```
**output** 
```output
{ 
    "statusCode": 200,
    "data": {
        "_id": "68cbca38ec9ed55cc53724d8",
        "userId": "68cb80a2d2ec9ea5e6587456",
        "billAmount": 300,
        "currency": "USD",
        "dueDate": "2025-09-29T00:00:00.000Z",
        "status": "PAID",
        "createdAt": "2025-09-18T09:00:40.822Z",
        "updatedAt": "2025-09-18T09:01:41.464Z",
        "__v": 0,
        "paymentHistory": {
            "transanctionId": "t03",
            "amountPaid": "$300",
            "paymentDate": "2025-09-18T09:01:41.463Z",
            "paidOnTime": true,
            "_id": "68cbca75ec9ed55cc53724db"
        }
    },
    "message": "Bill paid successfully.",
    "success": true
}
```

### 4. Generate Reward  
`POST /api/v1/reward/`  
Checks the last 3 bills of a user.  
If all were paid **on or before the due date**, generates a mock reward (e.g., *“$10 Amazon Gift Card”*).

**req.body**  
```json
{
    "userId" : "68cb80a2d2ec9ea5e6587456",
    "title" : "Amazon Gift Card",
    "rewardAmount" : "10",
    "code" : "AGC321",
    "instructions" : "Redeem this code on Amazon's official site during checkout.",
    "vaildUntil" : "2025-11-01",
    "status" : "ACTIVE"
}
```
**output** 
```output
{
    "statusCode": 201,
    "data": {
        "userId": "68cb80a2d2ec9ea5e6587456",
        "title": "Amazon Gift Card",
        "rewardAmount": 10,
        "code": "AGC321",
        "instructions": "Redeem this code on Amazon's official site during checkout.",
        "vaildUntil": "2025-11-01T00:00:00.000Z",
        "status": "ACTIVE",
        "_id": "68cbe350ca7068e557392c85",
        "createdAt": "2025-09-18T10:47:44.326Z",
        "updatedAt": "2025-09-18T10:47:44.326Z",
        "__v": 0
    },
    "message": "$10 Amazon Gift Card reward generated successfully.",
    "success": true
}
```

---

## ⚙️ Environment Variables  
Create a `.env` file in the root directory and add:  

```env
PORT=3000
CORS_ORIGIN=*
MONGODB_URI=<your-mongodb-connection-uri>
