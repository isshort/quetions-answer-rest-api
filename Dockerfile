FROM node:14-slim
WORKDIR /opt/question
COPY . .
RUN npm install
#Server Variable 
ENV PORT=3000
ENV NODE_ENV=development

#MongoDB connections

# ENV MONGO_URL=Your Database link
#Json web Token
ENV JWT_SECRET_KEY=HelloNamatullahwahidithatisyourlastOkfunction.1
ENV JWT_EXPIRE=10m

#Cookie
ENV JWT_COOKIE=10

#Password Reset 1 hour
ENV RESET_PASSWORD_EXPIRE=3600000

#NodeMailer
ENV SMTP_HOST=smtp.gmail.com
ENV SMTP_PORT=587
ENV SMTP_USER=namatullahwahidi@gmail.com
ENV SMTP_PASS=mypassword
CMD ["node", "server.js"]