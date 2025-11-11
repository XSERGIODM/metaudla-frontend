const { writeFile, existsSync, mkdirSync } = require('fs');
const yargs = require('yargs');
const dotenv = require('dotenv');

dotenv.config();
const argv = yargs(process.argv.slice(2)).argv;
const env = argv.environment || 'dev';

const writeFileUsingFs = (targetPath, environmentFileContent) => {
    writeFile(targetPath, environmentFileContent, (err) => {
        if (err) console.log(err);
        if (environmentFileContent !== '') console.log(`File ${targetPath} has been created`);
    });
};

const envDirectory = './src/environments';
if (!existsSync(envDirectory)) mkdirSync(envDirectory);

const envProductionPath = `${envDirectory}/environment.ts`;
const envDevelopmentPath = `${envDirectory}/environment.development.ts`;

// Clear existing files
writeFileUsingFs(envProductionPath, '');
writeFileUsingFs(envDevelopmentPath, '');

// Generate content for production environment
const productionContent = `export const environment = {
    production: true,
    //-----------------------Informacion de la Aplicacion-----------------------
    LOGO_APLICACION: '${process.env.LOGO_APLICACION}',
    NOMBRE_APLICACION: '${process.env.NOMBRE_APLICACION}',
    DESCRIPTION_APLICACION: '${process.env.DESCRIPTION_APLICACION}',
    LOGO_EMPRESA: '${process.env.LOGO_EMPRESA}',
    NOMBRE_EMPRESA: '${process.env.NOMBRE_EMPRESA}',
    DESCRIPTION_EMPRESA: '${process.env.DESCRIPTION_EMPRESA}',
    //---------------------------------------------------------------------------------------
    FOTO_MILLAN: '${process.env.FOTO_MILLAN}',
    FOTO_SERGIO: '${process.env.FOTO_SERGIO}',
    //------------------------API-------------------------------------
    API_URL: '${process.env.API_URL}',
    API_VERSION: '${process.env.API_VERSION}',
    API_TOKEN: '${process.env.API_TOKEN}'
    //---------------------------------------------------------------------------------------
};`;

// Generate content for development environment
const developmentContent = `export const environment = {
    production: false,
    //-----------------------Informacion de la Aplicacion-----------------------
    LOGO_APLICACION: '${process.env.LOGO_APLICACION}',
    NOMBRE_APLICACION: '${process.env.NOMBRE_APLICACION}',
    DESCRIPTION_APLICACION: '${process.env.DESCRIPTION_APLICACION}',
    LOGO_EMPRESA: '${process.env.LOGO_EMPRESA}',
    NOMBRE_EMPRESA: '${process.env.NOMBRE_EMPRESA}',
    DESCRIPTION_EMPRESA: '${process.env.DESCRIPTION_EMPRESA}',
    //---------------------------------------------------------------------------------------
    FOTO_MILLAN: '${process.env.FOTO_MILLAN}',
    FOTO_SERGIO: '${process.env.FOTO_SERGIO}',
    //------------------------API-------------------------------------
    API_URL: 'http://localhost:8081/api',
    API_VERSION: '${process.env.API_VERSION}',
    API_TOKEN: '${process.env.API_TOKEN}'
    //---------------------------------------------------------------------------------------
};`;

writeFileUsingFs(envProductionPath, productionContent);
writeFileUsingFs(envDevelopmentPath, developmentContent);


