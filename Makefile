SOURCE_FILES:=$(shell find src/ -type f -name '*.ts')
TEST_FILES:=$(shell find test/ -type f -name '*.ts')

.PHONY:all
all: build

.PHONY:build
build: dist/build

.PHONY:test
test:
	npx tsx --test ${TEST_FILES}

.PHONY:lint
lint:
	npx eslint --quiet

.PHONY:lint-fix
lint-fix: fix

.PHONY:fix
fix:
	npx eslint --quiet  --fix

.PHONY:watch
watch:
	npx tsc --watch

.PHONY:start
start: build

.PHONY:clean
clean:
	rm -rf dist

dist/build: $(SOURCE_FILES)
	npx tsc
	touch dist/build

.PHONY:assets
assets: assets/js/html-form-enhancer.js assets/js/serialize-json-form.js

assets/js/html-form-enhancer.js: node_modules/html-form-enhancer/dist/html-form-enhancer.js
	mkdir -p assets/js
	cp node_modules/html-form-enhancer/dist/html-form-enhancer.* assets/js

assets/js/serialize-json-form.js: node_modules/html-form-enhancer/dist/serialize-json-form.js
	cp node_modules/html-form-enhancer/dist/serialize-json-form.* assets/js

data/iana-links.json:
	node util/fetch-link-relation-data.mjs > data/iana-links.json
