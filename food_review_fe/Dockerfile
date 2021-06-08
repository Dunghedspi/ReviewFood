FROM node:14

WORKDIR /app

COPY ./food_review_fe /app

RUN npm install -g npm && \
    npm install -f

EXPOSE 3000
ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm", "run", "start"]