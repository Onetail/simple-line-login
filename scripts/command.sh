
RED='\033[0;31m'
GREEN="\[\033[0;32m\]"
BLUE="\[\033[0;34m\]"    
NC='\033[0m' # No Color

CMD=$1
FILENAME=$2

FLODERPATH='app/lib/domain/'
APPMODULE='app.module.js'
Module='module/'

controller() {
  echo "${BLUE}"
  Controller='controller/'
  if [ -z "$FILENAME" ] || [ $FILENAME == '$1' ]
  then
    usage
  else
    echo "Creating $FLODERPATH$Controller$FILENAME.controller.js"
    touch $FLODERPATH$Controller$FILENAME".controller.js" 
    echo "
const service = require('../service/${FILENAME}.service');
module.exports = {
    exec: app => { module.exports.domain(app) },
    domain: app => { 
        /*
        * app.get('/', (req, res) => {}) 
        */
    }
}
      " > $FLODERPATH$Controller$FILENAME".controller.js"


      if [ -f "$FLODERPATH$Module$FILENAME.module.js" ]
      then 
        echo "import $FILENAME controller in $FLODERPATH$Module$FILENAME.module.js"
        sed -i '' -e "1i\ 
const ${FILENAME}Controller = require('../controller/$FILENAME.controller.js') " "$FLODERPATH$Module$FILENAME.module.js"
        echo "use $FILENAME.exec "
        sed -i '' -e "/controller: app => {/a\\
\ \ \ \ ${FILENAME}Controller.exec(app);" "$FLODERPATH$Module$FILENAME.module.js"
      fi

  fi
  echo "${NC}"
}

middleware() {
  echo "${BLUE}"
  Middleware='middleware/'
  if [ -z "$FILENAME" ] || [ $FILENAME == '$1' ]
  then
    usage
  else
    echo "Creating $FLODERPATH$Middleware$FILENAME.middleware.js"
    touch $FLODERPATH$Middleware$FILENAME".middleware.js" 
    echo "module.exports = {
    exec: app => { module.exports.domain(app) },
    domain: app => { 
        /*
        * app.get('/', (req, res, next) => {
        *   next(); 
        * }) 
        */
    }
}
      " > $FLODERPATH$Middleware$FILENAME".middleware.js"

      if [ -f "$FLODERPATH$Module$FILENAME.module.js" ]
      then 
        echo "import $FILENAME middleware in $FLODERPATH$Module$FILENAME.module.js"
        sed -i '' -e "1i\ 
const ${FILENAME}Middleware = require('../middleware/$FILENAME.middleware.js') " "$FLODERPATH$Module$FILENAME.module.js"
        echo "use $FILENAME.exec "
        sed -i '' -e "/middleware: app => {/a\\
\ \ \ \ ${FILENAME}Middleware.exec(app);" "$FLODERPATH$Module$FILENAME.module.js"
      fi
  fi
  echo "${NC}"
}
module() {
  echo "${BLUE}"
  if [ -z "$FILENAME" ] || [ $FILENAME == '$1' ]
  then
    usage
  else
    echo "Creating $FLODERPATH$Module$FILENAME.module.js"
    touch "$FLODERPATH$Module$FILENAME.module.js"
    echo "
module.exports = {
  exec: (app, mongoDB) => {
    module.exports.domain(app, mongoDB);
  },
  domain: async (app, mongoDB) => {
    await module.exports.middleware(app);
    await module.exports.controller(app);
    await module.exports.service(app, mongoDB);
  },
  controller: app => {
    
  },
  middleware: app => {
    
  },
  service: (app, mongoDB) => {
    
  }
};
      " > "$FLODERPATH$Module$FILENAME.module.js"


    
    # 增加 require
    sed -i '' -e "1i\ 
const $FILENAME = require('./$FILENAME.module.js') " $FLODERPATH$Module$APPMODULE

    sed -i '' -e "/domain: (app, mongoDB) => {/a\\
\ \ \ \ $FILENAME.exec(app, mongoDB) " $FLODERPATH$Module$APPMODULE
  fi
}
service() {
  Service='service/'
  if [ -z "$FILENAME" ] || [ $FILENAME == '$1' ]
  then
    usage
  else
    echo "Creating $FLODERPATH$Service$FILENAME.service.js"
    touch $FLODERPATH$Service$FILENAME".service.js" 
    echo "
var mongo = '';
module.exports = {
  exec: async (app, mongoDB) => {
    await module.exports.initializeValue(mongoDB);
  },
  initializeValue: mongoDB => {
    mongo = mongoDB.getValue();
  },
}
      " > $FLODERPATH$Service$FILENAME".service.js"

      if [ -f "$FLODERPATH$Module$FILENAME.module.js" ]
      then 
        echo "import $FILENAME service in $FLODERPATH$Module$FILENAME.module.js"
        sed -i '' -e "1i\ 
const ${FILENAME}Service = require('../service/$FILENAME.service.js') " "$FLODERPATH$Module$FILENAME.module.js"
        echo "use $FILENAME.exec "
        sed -i '' -e "/service: (app, mongoDB) => {\\
      \ \ \ \ ${FILENAME}Service.exec(app, mongoDB);" "$FLODERPATH$Module$FILENAME.module.js"
      fi
  fi
  echo "${NC}"
}

usage() {
    echo -e "${RED}Usage: $0 [controller|ct] [name]${NC}"
    echo -e "${RED}Usage: $0 [module|mo] [name]${NC}"
    echo -e "${RED}Usage: $0 [middleware|md] [name]${NC}"
    echo -e "${RED}Usage: $0 [service|sv] [name]${NC}"
    exit 1
}


case "$CMD" in
  controller|ct)
    controller
    ;;
  module|mo)
    module
    ;;
  middleware|md)
    middleware
    ;;
  service|sv)
    service
    ;;
  *)
    usage
    ;;
esac