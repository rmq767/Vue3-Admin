<template>
    <div>
        <el-dropdown trigger="click" @command="handleSetLang">
            <div class="size-icon--style">
                <svg-icon class-name="lang-icon" icon-class="lang" />
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="item of langOptions"
                        :key="item.value"
                        :disabled="lang === item.value"
                        :command="item.value"
                    >
                        {{ item.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import useAppStore from '@/store/modules/app';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const appStore = useAppStore();
const lang = computed(() => appStore.lang);
// const route = useRoute();
// const router = useRouter();
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const langOptions = ref([
    { label: '中文', value: 'zh-cn' },
    { label: 'English', value: 'en' },
]);

function handleSetLang(lang: any) {
    // proxy!.$modal.loading('正在设置布局大小，请稍候...');
    appStore.setLang(lang);
    locale.value = lang;
    // setTimeout('window.location.reload()', 1000);
}
</script>

<style lang="scss" scoped>
.size-icon--style {
    font-size: 20px;
    line-height: 50px;
}
</style>
