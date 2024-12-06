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
