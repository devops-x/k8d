RELEASE_DIR        = out/release/
RELEASE_SOURCE_DIR = out/release/source
RELEASE_COPY       = app config

VERSION = $(shell cat package.json | awk -F '"' '/version" *: *"/{print $$4}')
SERVER_NAME = $(shell cat package.json | awk -F '"' '/name" *: *"/{print $$4}')


install:
	@npm i --registry https://registry.npm.taobao.org

production:
	@npm i --production --registry https://registry.npm.taobao.org

build: clean
	@echo 'Copy files...'
	@mkdir -p $(RELEASE_DIR)
	@if [ `echo $$OSTYPE | grep -c 'darwin'` -eq 1 ]; then \
		cp -r $(RELEASE_COPY) $(RELEASE_DIR); \
	else \
		cp -rL $(RELEASE_COPY) $(RELEASE_DIR); \
	fi

	@cp package.json $(RELEASE_DIR)
	@cp .autod.conf.js $(RELEASE_DIR)
	@cd $(RELEASE_DIR) && npm install --production --color=false --registry https://registry.npm.taobao.org
	@echo "all codes are in \"$(RELEASE_DIR)\""
	@mv $(RELEASE_DIR) out/$(SERVER_NAME)_$(VERSION)
	@cd out && tar czf $(SERVER_NAME)_$(VERSION).tgz $(SERVER_NAME)_$(VERSION)

clean:
	@echo 'Clean files...'
	@rm -rf ./out

.PHONY: install