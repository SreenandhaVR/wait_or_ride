import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink: '#111827', muted: '#64748B', line: '#E5E7EB', surface: '#F8FAFC', brand: '#2563EB', sky: '#0EA5E9' }, boxShadow: { soft: '0 3px 14px rgba(15,23,42,.07)' } } }, plugins: [] };
export default config;
