# React template with Vite

1. npm create vite
2. npm install
3. npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev

4. vite.config.js >
```
import eslint from "vite-plugin-eslint";
plugins: [react(), eslint()]
```

## Tailwind
1. npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

__Create__
```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

2. npx tailwindcss init

## Rename
Project name is present in:
* package-lock.json
* package.json


