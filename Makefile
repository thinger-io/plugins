build:
	docker build -t thinger/plugins .

serve:
	docker run --rm -it -p 8000:8000 -v ${PWD}:/docs --name thinger_plugins thinger/plugins
