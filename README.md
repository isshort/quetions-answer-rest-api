# quetions-answer-rest-api
babel
    
    npm install @babel/cli @babel/core @babel/polyfill @babel/preset-env --save-dev

if you want to use some of requirements to install all modules you can write modeule name with its version and open your terminal and write
    
    #npm install 

Run JSON server
    
    json-server --watch fake-api/employee.json
if you want to run the  nodemon in terminal you can write 
     
    $npm run dev

Create create a file  config/env/config.env
    
    #Server Variable 
    PORT=5000
    NODE_ENV=development

    #MongoDB connections

    MONGO_URL=Your Database link
    #Json web Token
    JWT_SECRET_KEY=Your Secreate key "Secret key... "
    JWT_EXPIRE=10m

    #Cookie
    JWT_COOKIE=10

    #Password Reset 1 hour
    RESET_PASSWORD_EXPIRE=3600000

    #NodeMailer
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=Your gamil address
    SMTP_PASS=your gmail password
