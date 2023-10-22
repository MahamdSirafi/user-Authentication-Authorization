# Authentication Authorization Security

## Description

- features:
  - Node provides the backend environment for this application
  - Express middleware is used to handle requests, routes
  - Mongoose schemas to model the application data

## Database Seed

- The seed command will create an admin user in the database
- The email and password are passed with the command as arguments
- Like below command, replace brackets with email and password.

## Install

Some basic Git commands are:

```
$ git clone https://github.com/MahamdSirafi/user-Authentication-Authorization.git
$ cd project
$ npm install
```

## Setup

```
 Create .env file that include:

  * MONGO_URI & JWT_SECRET
  * PORT & BASE_SERVER_URL & BASE_API_URL & BASE_CLIENT_URL
  * MAILCHIMP_KEY & MAILCHIMP_LIST_KEY => Mailchimp configuration
  * MAILGUN_KEY & MAILGUN_DOMAIN & MAILGUN_EMAIL_SENDER => Mailgun configuration
  * GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET & GOOGLE_CALLBACK_URL => Google Auth configuration
  * FACEBOOK_CLIENT_ID & FACEBOOK_CLIENT_SECRET & FACEBOOK_CALLBACK_URL => Facebook Auth configuration
  * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY & AWS_REGION & AWS_BUCKET_NAME => AWS configuration
```

## Start development

```
$ npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

# وصف المشروع

هذا المشروع هو البنية الاساسية لبناء اي مشروع بستخدام العقدة واكسبريس بحيث يحتوي على المصادقة والترخيص والحماية

# من اجل تشغيل المشروع

## 1)قم بكتابة npm install في قائمة الاوامر لتنصيب المكتبات التي يعتمد عليها المشروع

## 2)قم بإضافة ملف env.

### وقم بتعبئته وفق النموزج التالي

- NODE_ENV=development
- PORT=7000
- DATABASE_LOCAL=mongodb://127.0.0.1:27017/DatabaseName
- JWT_SECRET=asjdhgjed2187yhdkjawh
- JWT_EXPIRES_IN=90d
- JWT_COOKIE_EXPIRES_IN=90
- SERVICE_EMIL=Sendgrid
- EMAIL_HOST=sandbox.smtp.mailtrap.io
- EMAIL_PORT=222
- EMAIL_USERNAME=sjhajd
- EMAIL_PASSWORD=askbhfajs
- EMAIL_FROM=test@gmail.com
- GMAIL_USERNAME=
- GMAIL_PASSWORD=
- SENDGRID_USERNAME=
- SENDGRID_PASSWORD=

## 3)قم بتشغيل المشروع عن طريق الامر

- npm start

# لاتنسى اضافة الجداول الخاصة بمشرعك
