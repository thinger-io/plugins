FROM jekyll/jekyll

WORKDIR /app

COPY . ./

EXPOSE 4000

CMD ["jekyll", "serve"]
