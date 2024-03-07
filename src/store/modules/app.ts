import { AppStore, Device, Lang, Size } from '@/typings/store';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
    state: (): AppStore => ({
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!+(Cookies.get('sidebarStatus') ?? '') : true,
            withoutAnimation: false,
            hide: false,
        },
        device: 'desktop',
        size: (localStorage.getItem('size') as Size) || 'default',
        lang: (localStorage.getItem('lang') as Lang) || 'zh-cn',
    }),
    actions: {
        toggleSideBar(withoutAnimation?: boolean) {
            if (this.sidebar.hide) {
                return false;
            }
            this.sidebar.opened = !this.sidebar.opened;
            this.sidebar.withoutAnimation = Boolean(withoutAnimation);
            if (this.sidebar.opened) {
                Cookies.set('sidebarStatus', '1');
            } else {
                Cookies.set('sidebarStatus', '0');
            }
        },
        closeSideBar({ withoutAnimation }: { withoutAnimation: boolean }) {
            Cookies.set('sidebarStatus', '0');
            this.sidebar.opened = false;
            this.sidebar.withoutAnimation = withoutAnimation;
        },
        toggleDevice(device: Device) {
            this.device = device;
        },
        setSize(size: Size) {
            this.size = size;
            localStorage.setItem('size', size);
        },
        setLang(lang: Lang) {
            this.lang = lang;
            localStorage.setItem('lang', lang);
        },
        toggleSideBarHide(status: boolean) {
            this.sidebar.hide = status;
        },
    },
});

export default useAppStore;
