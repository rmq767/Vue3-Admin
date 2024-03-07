// index.js
import { createI18n } from 'vue-i18n';
import zh from './zh-cn';
import en from './en';
import useAppStore from '@/store/modules/app';
import { createPinia } from 'pinia';

const messages = {
    en,
    zh,
};
const language = useAppStore(createPinia()).lang;
const i18n = createI18n({
    locale: language || localStorage.getItem('lang') || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: ['zh-cn', 'en'], // 设置备用语言
    messages,
    globalInjection: true,
    missingWarn: false,
    legacy: false,
    fallbackWarn: false,
});

export default i18n;
