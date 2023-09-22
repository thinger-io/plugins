build:
	docker build -t thinger/monorepo .

serve:
	docker run --rm -it -p 8000:8000 -v ${PWD}:/docs --name thinger_monorepo thinger/monorepo
