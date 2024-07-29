const { enviroment } = require("./enviroment");

export let url = '';
if(enviroment==='development'){
url = 'http://localhost:4000'
}else{
url=''
}