const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const AppError = require('./utils/appError');
const errorGlobal = require('./controllers/errorController');
// Start express app
const app = express();
// 1) GLOBAL MIDDLEWARES
// Implement CORS
//سماح للمواقع من الاتصال بالخدمة
app.use(cors());
//تحديد المواقع المسموح لها بالاتصال
// في حال وجود اكثر من موقع يتم تمرير مصفوفة بعناوين المواقع
// app.use(cors({
//   origin: 'https://www.website.com'
// }))
//السماح بالاتصال على جميع الموارد
app.options('*', cors());
//تحديد المسار او المورد المسموح الاتصال به
// app.options('/api/v1/resource', cors());

// Set security HTTP headers
//مكتبة لحماية الموقع في حال الرفع على استضافة
app.use(helmet());

// Development logging
//تتبع الطلبات في وضعية التطوير
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same API
// منع اغراق السرفر بطلبات وهمية
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
// منع استلام بينات كبيرة قادمة من الفرونت
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// القادم مع الطلب jwt لقرائة
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Data sanitization against NoSQL query injection
// لمنع استلام بينات تشابه تعليمات قاعدة البيانات
app.use(mongoSanitize());

// Data sanitization against XSS
// html تعديل البيانات القادمة على شكل
app.use(xss());

// Prevent parameter pollution
// منع تكرار الحقول داخل الروت الى للحالات التالية
app.use(
  hpp({
    whitelist: ['duration', 'difficulty', 'price'],
  }),
);
//ضغط البيانات قبل ارسالها من اجل تسريع النقل
app.use(compression());
//R <dont remove this line>
const userRouter = require('./routes/userRoutes');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
//ROUTES <dont remove this line>
app.use('/api/v1.0.0/users', userRouter);
//في حال طلب مورد غير موجود
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorGlobal);

//4)
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Example app listening at http://localhost:${process.env.PORT}
Example app listening at http://localhost:${process.env.PORT}/docs`,
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// //4) اتصال مع قاعدة البيانات الخارجية في اطلس باستخدام مكتبة مونغوس
// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//   );
//   mongoose
//     .connect(DB,{
//        useNewUrlParser: true,
//        useCreateIndex: true,
//        useFindAndModify: false
//      }
//   )
//     .then(() => console.log('DB connection successful!'));
//   const port = process.env.PORT ;
//   const server = app.listen(port, () => {
//     console.log(  `Example app listening at http://localhost:${process.env.PORT}`
//   );});
