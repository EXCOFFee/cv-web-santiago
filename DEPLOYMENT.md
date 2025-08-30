# 🚀 Guía de Deployment - CV Web Profesional

Esta guía te ayudará a deployar tu CV web en diferentes plataformas, con énfasis en **Hostinger** como opción principal.

## 📋 Preparación Previa

### ✅ Lista de Verificación
Antes de hacer el deployment, asegúrate de que:

- [ ] La aplicación funciona correctamente en local (`npm start`)
- [ ] Todas las dependencias están instaladas (`npm install`)
- [ ] No hay errores de compilación
- [ ] Has personalizado tu información en `src/constants/personalData.js`
- [ ] Has probado en diferentes dispositivos/navegadores
- [ ] Has optimizado imágenes (si agregaste alguna)

### 🔨 Build de Producción

```bash
# Crear build optimizado para producción
npm run build

# Esto creará una carpeta 'build' con todos los archivos optimizados
```

## 🌐 Deployment en Hostinger

### 📝 **Opción 1: Manual (Recomendada)**

#### **Paso 1: Preparar Archivos**
```bash
# 1. Crear build de producción
npm run build

# 2. La carpeta 'build' contendrá todos los archivos necesarios
```

#### **Paso 2: Configurar Hostinger**

1. **Acceder al Panel de Control**
   - Inicia sesión en tu cuenta de Hostinger
   - Ve a la sección "Hosting"
   - Selecciona tu dominio

2. **Administrador de Archivos**
   - Abre el "File Manager" (Administrador de Archivos)
   - Navega a la carpeta `public_html` (o la carpeta raíz de tu dominio)

3. **Subir Archivos**
   ```
   # Sube TODO el contenido de la carpeta 'build' a public_html/
   # NO subas la carpeta 'build' en sí, sino su contenido
   
   public_html/
   ├── static/
   ├── index.html
   ├── manifest.json
   ├── favicon.ico
   └── ... (otros archivos del build)
   ```

#### **Paso 3: Configurar .htaccess (Importante para SPA)**

Crea un archivo `.htaccess` en `public_html/` con este contenido:

```apache
# Configuración para React SPA
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Manejar rutas de React Router
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Configuración de cache para mejor performance
<IfModule mod_expires.c>
  ExpiresActive on
  
  # Cache para recursos estáticos
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Comprimir archivos para mejor performance
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Headers de seguridad
<IfModule mod_headers.c>
  Header always set X-Frame-Options DENY
  Header always set X-Content-Type-Options nosniff
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

### 📝 **Opción 2: Git Deployment (Avanzada)**

Si Hostinger soporta Git (en planes superiores):

```bash
# 1. Subir tu código a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tuusuario/tu-cv-web.git
git push -u origin main

# 2. En Hostinger, configurar Git Deployment
# (Seguir las instrucciones específicas de tu plan)
```

### 🔧 **Configuración del Dominio**

#### **Subdominio (Gratis)**
```
# Si usas un subdominio de Hostinger:
http://tuusuario.hostinger-sites.com
```

#### **Dominio Personalizado**
```
# Si tienes un dominio propio:
1. Apuntar el dominio a los nameservers de Hostinger
2. Configurar DNS en el panel de Hostinger
3. Esperar propagación (24-48 horas máximo)
```

### 🔒 **SSL/HTTPS (Recomendado)**

1. **En el Panel de Hostinger:**
   - Ve a "SSL Certificates"
   - Activa "Free SSL" para tu dominio
   - Espera a que se active (puede tomar hasta 24 horas)

2. **Forzar HTTPS** (agregar al .htaccess):
```apache
# Forzar HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

## ☁️ Alternativas de Deployment

### 🟢 **Vercel (Recomendado para React)**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Seguir las instrucciones
# - Vincular con GitHub (opcional)
# - Configurar dominio personalizado
```

**Ventajas:**
- ✅ Deploy automático desde GitHub
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Optimización automática
- ✅ Plan gratuito generoso

### 🟦 **Netlify**

```bash
# Opción 1: Drag & Drop
# 1. Ve a netlify.com
# 2. Arrastra la carpeta 'build' al área de deploy

# Opción 2: Git Integration
# 1. Conecta tu repositorio de GitHub
# 2. Configura build: npm run build
# 3. Carpeta de publicación: build
```

### 🐙 **GitHub Pages**

```bash
# 1. Instalar gh-pages
npm install --save-dev gh-pages

# 2. Agregar scripts a package.json
"homepage": "https://tuusuario.github.io/tu-repo",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# 3. Deploy
npm run deploy
```

### 🔴 **Otras Opciones**

#### **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

#### **Surge.sh**
```bash
npm install -g surge
npm run build
cd build
surge
```

## 🛠️ Configuraciones Específicas

### 📱 **PWA (Progressive Web App)**

Si quieres que tu CV funcione como app móvil:

1. **Descomentar en `src/index.js`:**
```javascript
// serviceWorkerRegistration.register();
```

2. **Configurar `public/manifest.json`:**
```json
{
  "short_name": "Tu Nombre",
  "name": "Tu Nombre - CV Web",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#00d4ff",
  "background_color": "#0a0a0a"
}
```

### 📊 **Analytics**

#### **Google Analytics 4**
```html
<!-- En public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### **Variables de Entorno**
```bash
# Crear .env.production
REACT_APP_GA_ID=GA_MEASUREMENT_ID
REACT_APP_SITE_URL=https://tudominio.com
```

### 🔍 **SEO Optimizado**

#### **Sitemap.xml**
Crear `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tudominio.com</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

#### **Robots.txt**
Crear `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://tudominio.com/sitemap.xml
```

## 🚨 Solución de Problemas

### ❌ **Errores Comunes**

#### **1. Rutas no funcionan (404 en refresh)**
**Solución:** Configurar `.htaccess` correctamente (ver arriba)

#### **2. Recursos no cargan**
**Solución:** Verificar paths relativos en `package.json`:
```json
{
  "homepage": "."
}
```

#### **3. Build falla**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **4. Imágenes no se ven**
**Solución:** Usar paths relativos desde `public/`:
```javascript
// ❌ Incorrecto
<img src="./images/photo.jpg" />

// ✅ Correcto
<img src="/images/photo.jpg" />
```

### 🔧 **Debugging**

#### **Verificar Build Local**
```bash
# Servir build localmente
npx serve -s build
# Abrir http://localhost:3000
```

#### **Inspeccionar en Producción**
- Abrir DevTools (F12)
- Verificar errores en Console
- Revisar Network tab para recursos que fallan

## 📈 Performance

### ⚡ **Optimizaciones**

#### **1. Lazy Loading**
Ya implementado en el código para componentes.

#### **2. Comprimir Imágenes**
```bash
# Herramientas recomendadas:
# - TinyPNG.com
# - ImageOptim
# - Squoosh.app
```

#### **3. Optimizar Fonts**
```css
/* En src/index.css */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

#### **4. Bundle Analysis**
```bash
# Analizar bundle size
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🎯 Checklist Final

### ✅ **Antes del Deploy**
- [ ] Build funciona sin errores
- [ ] Todos los links funcionan
- [ ] Responsive en móviles
- [ ] Performance optimizado
- [ ] SEO configurado
- [ ] Analytics configurado (opcional)

### ✅ **Después del Deploy**
- [ ] Verificar que el sitio carga
- [ ] Probar navegación entre secciones
- [ ] Verificar formulario de contacto
- [ ] Probar en diferentes dispositivos
- [ ] Verificar SSL/HTTPS
- [ ] Configurar dominio personalizado (opcional)

### ✅ **Mantenimiento**
- [ ] Actualizar información regularmente
- [ ] Agregar nuevos proyectos/certificados
- [ ] Mantener dependencias actualizadas
- [ ] Backup del código en GitHub

## 📞 Soporte

### 🆘 **Si necesitas ayuda:**

1. **Hostinger Support**
   - Chat 24/7 en español
   - Base de conocimientos
   - Tutoriales en video

2. **Comunidad React**
   - Stack Overflow
   - Reddit r/reactjs
   - Discord de React

3. **Documentación**
   - [Create React App](https://create-react-app.dev/)
   - [Hostinger Help Center](https://support.hostinger.com/)

---

¡Tu CV web está listo para conquistar el mundo! 🚀

> **Tip Pro**: Mantén siempre una copia de seguridad de tu código en GitHub y actualiza tu CV regularmente con nuevos proyectos y habilidades. 