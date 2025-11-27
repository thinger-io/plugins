build:
	docker build -t thinger/plugins .

serve:
	docker run --rm -p 9000:9000 -v ${PWD}:/docs --entrypoint sh thinger/plugins -c "python3 build_docs.py && mkdocs serve -a 0.0.0.0:9000"
