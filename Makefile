build:
	docker build -t thinger/plugins .

serve:
	docker run -v ${PWD}:/app -v ${PWD}/vendor/bundle:/usr/local/bundle -p 4000:4000 -it --rm --name thinger_plugins thinger/plugins
