SRC_DIR=src
SRC_FILES=getargs.js
DIST_DIR=dist
TEST_DIR=test
FUME=../node_modules/.bin/fume
MOCHA=./node_modules/.bin/mocha
_MOCHA=./node_modules/.bin/_mocha
ISTANBUL=./node_modules/.bin/istanbul
COVERALLS=./node_modules/coveralls/bin/coveralls.js

install:
	npm install

dist_cjs:
	cd src && $(FUME) $(SRC_FILES) -cjsify -o ../$(DIST_DIR)/cjs && cd ..

dist_amd:
	cd src && $(FUME) $(SRC_FILES) -amdify -o ../$(DIST_DIR)/amd && cd ..

dist_umd:
	cd src && $(FUME) $(SRC_FILES) -umdify -o ../$(DIST_DIR) && cd ..

rm_dist:
	rm -rf $(DIST_DIR)

build: rm_dist dist_umd

test: build
	$(MOCHA) --recursive --reporter spec $(TESTS_DIR)

coverage: build
	$(ISTANBUL) cover $(_MOCHA) -- --recursive --reporter spec $(TESTS_DIR)

travis: install build
	$(ISTANBUL) cover --report lcovonly $(_MOCHA) -- --recursive --reporter spec --bail $(TESTS_DIR) && cat ./coverage/lcov.info | $(COVERALLS)
