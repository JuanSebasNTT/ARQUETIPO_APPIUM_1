import fs from 'fs';
import path from 'path';

const jsonDir = path.join('.', 'reports', 'json');

if (!fs.existsSync(jsonDir)) {
  console.log('📂 Carpeta de reports/json no existe, nada que limpiar.');
  process.exit(0);
}

const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const fullPath = path.join(jsonDir, file);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  if (!raw.trim()) {
    console.log(`🗑️ Eliminando archivo vacío: ${file}`);
    fs.unlinkSync(fullPath);
  } else {
    try {
      JSON.parse(raw);
    } catch {
      console.log(`🗑️ Eliminando archivo corrupto: ${file}`);
      fs.unlinkSync(fullPath);
    }
  }
});

console.log('✅ Limpieza de JSON completada.');