
.PHONY: apidoc config run

config:
	cp config.template.json config.json
	cp dev-tools/git/pre-push .git/hooks/pre-push
	npm install

apigen:
	apidoc -i routes/ -o apidoc

run:
	node bin/www.js
