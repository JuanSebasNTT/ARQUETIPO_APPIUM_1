Arquetipo Appium/BrowserStack

https://img.shields.io/badge/BrowserStack-Supported-brightgreen.svg https://img.shields.io/github/actions/workflow/status/JuanSebasNTT/ARQUETIPO_APPIUM_1/main.yml?label=Tests https://img.shields.io/badge/TypeScript-5.9+-007ACC.svg https://img.shields.io/badge/WebdriverIO-9.19+-ea5906.svg https://img.shields.io/badge/Appium-3.0+-1E90FF.svg https://img.shields.io/npm/v/arquetipo_appium_1.svg https://img.shields.io/badge/License-ISC-blue.svg

📋 Descripción

Framework de automatización de pruebas móviles que destaca por el uso de BrowserStack para ejecución en la nube, versatilidad multiplataforma y implementación del patrón Page Object Model (POM). Diseñado para optimizar el proceso de testing con un enfoque data-driven y reportes.

✨ Características Principales

· ✅ Data-Driven Testing: Soporte para múltiples fuentes de datos (JSON, Excel)
· ⚡ Menor tiempo de ejecución: Ejecución paralela en múltiples dispositivos
· 📊 Sistema de reportes avanzado: Reportes HTML, JSON, JUnit, Allure y capturas de pantalla
· 🔄 Integración con GitHub Actions: CI/CD automatizado
· 🌐 BrowserStack Integration: Testing en dispositivos reales en la nube
· 🏗️ Arquitectura escalable: Patrón Page Object Model con TypeScript

🛠️ Stack Tecnológico

📦 Dependencias Principales

Paquete Versión Propósito
@wdio/cli ^9.19.2 CLI de WebdriverIO
@wdio/local-runner ^9.19.2 Ejecutor local
@wdio/mocha-framework ^9.19.2 Framework Mocha
@wdio/types ^9.19.2 Tipos TypeScript
appium ^3.0.1 Automatización móvil
typescript ^5.9.2 Lenguaje tipado
dotenv ^17.2.1 Variables de entorno

📊 Reportes y Servicios

Paquete Versión Propósito
@wdio/browserstack-service ^9.19.2 Integración BrowserStack
@wdio/appium-service ^9.19.2 Servicio Appium
@wdio/allure-reporter ^8.43.0 Reportes Allure
@wdio/json-reporter ^9.19.2 Reportes JSON
@wdio/junit-reporter ^8.43.0 Reportes JUnit
@wdio/spec-reporter ^9.19.2 Reportes en consola
@wdio/visual-service ^9.0.0 Testing visual
allure-commandline ^2.34.1 CLI Allure

📁 Utilidades y Data-Driven

Paquete Versión Propósito
exceljs ^4.4.0 Manipulación de Excel
json-to-html ^0.1.2 Conversión JSON a HTML
ts-node ^10.9.2 Ejecución TypeScript
appium-uiautomator2-driver ^5.0.0 Driver Android UIAutomator2

📁 Estructura del Proyecto

```
ARQUETIPO_APPIUM_1/
├── .github/workflows/          # Configuración de GitHub Actions
│   ├── main.yml                # Workflow principal
│   └── npm-publish.yml         # Publicación de paquetes
├── config/                     # Configuraciones
│   └── TS_wdio.conf.ts         # Configuración WebDriverIO
├── data/                       # Archivos Data-Driven
│   ├── loginData.json          # Datos en formato JSON
│   └── loginData.xlsx          # Datos en formato Excel
├── pageobjects/                # Patrón Page Object Model
│   ├── alert.page.ts           # Page Object para alerts
│   └── login.page.ts           # Page Object para login
├── test/specs/                 # Casos de prueba
│   └── login.test.ts           # Tests de login
├── utils/                      # Utilidades
│   ├── browserstack.ts         # Configuración BrowserStack
│   ├── dataHelper.ts           # Helper para datos
│   ├── html-generator.ts       # Generador de reportes HTML
│   └── screenshot.ts           # Utilidades de captura
├── reports/                    # Reportes generados
│   ├── json/                   # Reportes en JSON
│   ├── screenshots/            # Capturas de pantalla
│   └── test-report.html        # Reporte HTML principal
└── logs/                       # Logs de ejecución
    └── performance-report      # Reportes de performance
```

🚀 Instalación y Ejecución

Prerrequisitos

· Node.js (v18 o superior)
· npm o yarn
· Cuenta de BrowserStack

Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JuanSebasNTT/ARQUETIPO_APPIUM_1.git

# Navegar al directorio
cd ARQUETIPO_APPIUM_1

# Instalar dependencias
npm install
```

Configuración de Variables de Entorno

Crear un archivo .env en la raíz del proyecto:

```env
BROWSERSTACK_USERNAME=tu_usuario_browserstack
BROWSERSTACK_ACCESS_KEY=tu_access_key_browserstack
```

Ejecución de Pruebas

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests específicos
npm run test -- --spec ./test/specs/login.test.ts

# Ejecutar en modo debug
npm run test:debug
```

⚙️ Configuración de GitHub Actions

El proyecto incluye workflows preconfigurados en .github/workflows/:

· Ejecución automática de tests en cada push y pull request
· Generación de reportes múltiples
· Integración con BrowserStack para testing en la nube

Secrets Requeridos en GitHub

1. BROWSERSTACK_USERNAME 
2. BROWSERSTACK_ACCESS_KEY 

📊 Sistema de Reportes

El framework genera múltiples tipos de reportes:

· Allure Reports: Reportes interactivos y detallados
· JUnit Reports: Compatible con CI/CD tools
· JSON Reports: Para procesamiento automatizado
· HTML Reports: Reportes visuales personalizados
· Spec Reports: Output en consola detallado
· Capturas de pantalla: Automáticas en fallos
· Visual Comparisons: Diferencias visuales detectadas

🔧 Configuración Avanzada

BrowserStack Capabilities

Configurado en config/TS_wdio.conf.ts con capacidades para:

· Dispositivos iOS y Android
· Múltiples versiones de navegadores
· Testing en paralelo
· Local testing configuration

Data-Driven Testing

Soporte para:

· Excel files con exceljs
· JSON data estructurado
· Environment variables con dotenv

🔗 Enlaces Útiles

· BrowserStack Documentation
· WebDriverIO Documentation
· Appium Documentation
· TypeScript Documentation