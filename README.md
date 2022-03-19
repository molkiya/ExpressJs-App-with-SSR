# express-mysql-passport-restapi

## app.use(configSession);

Подключение к MySQL, DB: cookie_users, TABLE: sessions

## app.use(partials());

Использование частиц для рендеринга ejs страниц

## app.use(cors());

Использование middleware в express

## app.use(passport.initialize()) app.use(passport.session());

Настройка paspport.js

## app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

Body-Parser

## app.use(multerConfig);

Использование multig для работы с img,jpeg,jpg/mp4

## app.use(express.static(path.join(__dirname, 'public')));

Статичные файлы public

## app.set("view engine", "ejs");

Использование движка ejs для отрисовки фронтовой части

## app.use(routes);

Подключение роутов

## storage

*   Назначение пути и форматирование имени медиа файла

## fileFilter

*   Фильтр на получение ТОЛЬКО картинок jpg/jpeg/img и видео формата mp4

### Parameters

*   `req`
*   `file`
*   `callback`

## multerConfig

*   Включение вышеуказанных настроек и экспорт к server.js

## mainController

Импорт контроллеров в роуты

### mainController

Прорисовка главной страницы

#### Parameters

*   `req`
*   `res`
*   `next`

## get

Routes

## logoutController

Выход из аккаунта с редиректом на Главную страницу.

### Parameters

*   `req`
*   `res`
*   `next`

## loginController

Контроллер на проверку логина, залогинен или нет, если да, то редирект на главную страницу,
если нет, то редирект на страницу логина.

### Parameters

*   `req`
*   `res`
*   `next`

## loginControllerPost

Контроллер на проверку пароля от логина, с использованием passport, если удачный логин, редирект в Мой блог, иначе редирект на страницу /login-failure.    

## loginFailureController

Страница неудачного логина, редирект обратно на /login

### Parameters

*   `req`
*   `res`
*   `next`

## registerController

Контроллер на проверку регистрации, залогинен или нет, если да, то редирект на главную страницу,
если нет, то редирект на страницу регистрации.

### Parameters

*   `req`
*   `res`
*   `next`

## registerControllerPost

*   Контроллер для регистрации, метод пост, вненесении нового пользователя в базу

### Parameters

*   `req`
*   `res`
*   `next`

## registerControllerFailure

*   Неудачная регистрация (совпадение логина который уже существует)

### Parameters

*   `req`
*   `res`
*   `next`

## customFields

*   Поля из формы для логина

## verifyCallback

*   Верикификация пользователя при обращении к страницам веб приложения

### Parameters

*   `login`
*   `password`
*   `done`

## validPassword

*   Проверка пароля

### Parameters

*   `password`
*   `hash`
*   `salt`

## genPassword

*   Генерация пароля

### Parameters

*   `password`

## postMyPostController

Внесение нового поста в базу данных

### Parameters

*   `req`
*   `res`
*   `next`

## userController

*   Получение постов пользователя в Мой блог

### Parameters

*   `req`
*   `res`
*   `next`

# deleteController

Контроллер по удалению поста и удалению медиа, который находится в посте (если находится)

@request request
@response response
 
## if (!req.isAuthenticated())
Проверка на аутентификацию, путем пробива через куки

 @isAuthenticated Проверка на залогиненность, берется из куки

## connectionBlog.query("SELECT * FROM posts WHERE id=?"
SQL запрос в DB: posts, TABLE: posts, получение строки данных, по ID;
Удаление медиа по названию imgvideo от ID
 
@query  {string}
@id     {number} [id]
@err    Ошибка
@result  Результат запроса
@err     Проброс ошибки (при наличии)
@unlinkSync  Удаление медиа 

## connectionBlog.query("DELETE FROM posts WHERE id=?"
SQL запрос в DB: posts, TABLE: posts, удаление строки данных, по ID;
@query  {string}
@id     {number} [id]
@err    Ошибка
@result  Результат запроса
@err     Проброс ошибки (при наличии)

## res.redirect('/user')
Редирект на страницу "Мои блоги"

## Parameters

*   `req`
*   `res`

## configSession

Конфиг для подключения к сессии

## connection

Создание конфига к базе данных пользователей по root доступу

## connectionBlog

Создание конфига к базе данных постов по root доступу
