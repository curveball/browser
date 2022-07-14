SOURCE_FILES:=$(shell find src/ -type f -name '*.ts' )

.PHONY:all
all: build

.PHONY:build
build: dist/build assets

.PHONY:test
test: build
	node_modules/.bin/nyc node_modules/.bin/mocha

.PHONY:lint
lint:
	node_modules/.bin/eslint --quiet 'src/**/*.ts' 'test/*.ts' 'src/**/*.tsx'

.PHONY:lint-fix
lint-fix: fix

.PHONY:fix
fix:
	node_modules/.bin/eslint --quiet 'src/**/*.ts' 'test/**/*.ts' 'src/**/*.tsx'  --fix

.PHONY:watch
watch:
	node_modules/.bin/tsc --watch

.PHONY:start
start: build

.PHONY:clean
clean:
	rm -r dist assets/js/*.js

dist/build: $(SOURCE_FILES)
	node_modules/.bin/tsc
	@# Creating a small file to keep track of the last build time
	touch dist/build

.PHONY:assets
assets: assets/js/html-form-enhancer.js assets/js/serialize-json-form.js

assets/js/html-form-enhancer.js: node_modules/html-form-enhancer/dist/html-form-enhancer.js
	mkdir -p assets/js
	cp node_modules/html-form-enhancer/dist/html-form-enhancer.* assets/js

assets/js/serialize-json-form.js: node_modules/html-form-enhancer/dist/serialize-json-form.js
	cp node_modules/html-form-enhancer/dist/serialize-json-form.* assets/js
