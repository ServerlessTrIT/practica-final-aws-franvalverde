# Configuración en Cloudfront
Debe tener un dominio y certificado SSL de distribución CloudFront.

###Steps
1. Creación de la distrución
    ```
   aws cloudfront create-distribution --origin-domain-name
   franvalverde-website.s3.amazonaws.com 
   --default-root-object index.html
    ```   

###Verificación
🔗 https://dp628skk6mqx.cloudfront.net

   