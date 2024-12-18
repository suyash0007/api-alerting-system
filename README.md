
# API Alerting System

A backend system designed to monitor and handle failed POST requests, identify suspicious activities based on IP addresses, and send email alerts when a threshold is breached.



## **Features**

- Monitors POST requests to `/api/submit`.
- Tracks failed attempts caused by invalid headers or tokens within a perticular time period.
- Logs metrics such as source IP, timestamp, and failure reason into DB.
- Sends email alerts via Google SMTP when a threshold is exceeded.
- Provides an endpoint to fetch stored metrics.
- Scalable to handle high traffic using Redis for caching.

## **Tech Stack**

- **Backend**: Node.js (Express.js)  
- **Database**: MongoDB (for metrics storage)  
- **Caching**: Redis (ioredis)  
- **Email Service**: Google SMTP  

## **Getting Started**

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud)  
- [Redis](https://redis.io/docs/getting-started/) (local or cloud)  
- A [Google account](https://support.google.com/mail/answer/7126229) for SMTP credentials.

---

## **Environment Variables**

Create a `.env` file in the project root with the following variables:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<db_name>
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASSWORD=<your-redis-password> # Optional if no password is set
SMTP_USER=<your-email>@gmail.com
SMTP_PASS=<your-email-password-or-app-password>
```
---

## **Setup Instructions**
1. **Clone the repository**
```bash
git clone
cd api-alerting-system
```

2. **Install the dependencies**
```bash
npm install
```

3. **Setup MongoDB**
- **For local MongoDB:**
  Start the MongoDB server:
  ```bash
  mongod
  ```
  Update `MONGODB_URI` in the `.env `file to  mongodb://localhost:27017/<db_name>.

- **For cloud MongoDB:**
  Set up a cluster on MongoDB Atlas and use the provided connection string.

4. **Setup Redis**
- **For local Redis:**
   Start the Redis server:
```bash
redis-server
```
- **For cloud Redis:**
  Create an account on [Redis Cloud](https://cloud.redis.io) and use your credentials in the `.env` file

5. **Enable Google SMTP**
- Enable "Allow less secure apps" in your Google account settings or create an App Password by first enabling 2-factor authentication on your google account and then creating an App Password, copy it to the `.env` file.

- Update `SMTP_USER` and `SMTP_PASS` in the `.env` file with your credentials.

6. **Run the Application**
 Start the server:
 ```bash
    npx nodemon app.js
```

---

## **Testing**

**Using Postman**

1. Send a POST request to http://localhost:5000/api/submit with valid or invalid headers to test the functionality. Use `Bearer valid-token` as authorization header for valid post requests

2. Use the GET /api/metrics endpoint to view logged metrics.

3. Simulate multiple invalid requests to test the alerting system. Check your email for alerts.
