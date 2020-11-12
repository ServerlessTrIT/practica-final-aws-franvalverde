# Serverless
En pimer lugar es necesario instalar serverless en la maquina local:
- [Getting Started Official Page](https://serverless.com/framework/docs/getting-started/)

####1. Creación del proyecto en nodejs
```
sls create --template aws-nodejs --name apiCourse
```   

####2. Invocar una función en local
```
sls invoke local -f listStudents
```      

####3. desplegar indicando el stage
```
sls deploy --stage prod 
```

###Documentación de la API 
🔗 https://dp628skk6mqx.cloudfront.net
