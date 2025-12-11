# Akash Rentals - All Project Links

## 🌐 Live Website URLs

### Frontend (S3 Static Website)
```
http://car-rental-frontend-838240020984.s3-website.ap-south-1.amazonaws.com
```

Alternative format:
```
http://car-rental-frontend-838240020984.s3-website-ap-south-1.amazonaws.com
```

---

## 🔧 Backend API URLs

### Main Backend Endpoint
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com
```

### API Endpoints

**Health Check:**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/health
```

**API Root (Info):**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/
```

**Get All Cars:**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/api/cars
```

**Get Car by ID (replace 1 with actual car ID):**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/api/cars/1
```

**Get All Bookings:**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/api/bookings
```

**Get Booking by ID (replace 1 with actual booking ID):**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/api/bookings/1
```

**Create Booking (POST):**
```
http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com/api/bookings
```

---

## ☁️ AWS Console Links

### Elastic Beanstalk (Backend)
```
https://ap-south-1.console.aws.amazon.com/elasticbeanstalk/home?region=ap-south-1#/environment/dashboard?applicationName=CarRentalApp&environmentId=e-m4b27hipxh
```

### S3 Bucket (Frontend)
```
https://s3.console.aws.amazon.com/s3/buckets/car-rental-frontend-838240020984?region=ap-south-1&tab=objects
```

### RDS Database (PostgreSQL)
```
https://console.aws.amazon.com/rds/home?region=ap-south-1#database:id=rentaldb;is-cluster=true
```

### RDS Query Editor
```
https://ap-south-1.console.aws.amazon.com/rds/home?region=ap-south-1#query-editor:
```

### EC2 Instances
```
https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Instances:
```

### CloudWatch Logs
```
https://ap-south-1.console.aws.amazon.com/cloudwatch/home?region=ap-south-1#logsV2:log-groups
```

---

## 📊 Database Connection Details

### RDS Aurora PostgreSQL Cluster
**Cluster Endpoint (Writer):**
```
rentaldb.cluster-chg6i2uwovsv.ap-south-1.rds.amazonaws.com
```

**Reader Endpoint:**
```
rentaldb.cluster-ro-chg6i2uwovsv.ap-south-1.rds.amazonaws.com
```

**Port:** 5432
**Database:** rentaldb
**Username:** postgres
**Region:** ap-south-1 (Mumbai)

---

## 🔑 AWS Account Information

**Account ID:** 838240020984
**Region:** ap-south-1 (Mumbai, India)
**Environment Name:** carrental-env
**Application Name:** CarRentalApp

---

## 📝 Quick Reference

### Test Your Backend API
1. Health Check: Open `/health` endpoint in browser
2. Get Cars: Open `/api/cars` endpoint in browser
3. Test Frontend: Open S3 website URL

### Test Your Frontend
1. Open S3 website URL in browser
2. Browse cars
3. Make a test booking

---

## 🛠️ Deployment Commands

### Rebuild & Deploy Frontend
```powershell
cd frontend
$env:VITE_API_URL="http://carrental-env.eba-p3punujz.ap-south-1.elasticbeanstalk.com"
npm run build
cd ..
aws s3 sync .\frontend\dist\ s3://car-rental-frontend-838240020984 --region ap-south-1 --delete
```

### Rebuild & Deploy Backend
```powershell
cd backend
Compress-Archive -Path * -DestinationPath ..\backend.zip -Force
# Then upload backend.zip to Elastic Beanstalk via AWS Console
```

---

## 📧 Support & Documentation

**AWS Documentation:**
- Elastic Beanstalk: https://docs.aws.amazon.com/elasticbeanstalk/
- S3 Static Hosting: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- RDS: https://docs.aws.amazon.com/rds/

---

**Last Updated:** November 11, 2025



