PATH:=./node_modules/.bin:$(PATH)

.PHONY:build
build:
	tsc

.PHONY:test
test:
	nyc mocha

.PHONY:lint
lint:
	tslint -p .

.PHONY:lint-fix
lint-fix: fix

.PHONY: fix
fix:
	tslint -c tslint.json --project tsconfig.json 'src/**/*.ts' 'test/**/*.ts' --fix

.PHONY:watch
watch:
	tsc --watch
