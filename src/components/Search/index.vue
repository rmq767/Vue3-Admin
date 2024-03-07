<template>
    <el-card shadow="never" :body-style="{ padding: '20px 20px 0px 20px' }">
        <el-form ref="searchFormRef" :model="searchForm" inline>
            <el-form-item
                v-for="item in props.config"
                :key="item.prop"
                :label="$t(item.label)"
                :prop="item.prop"
            >
                <el-input
                    v-if="item.type === 'input'"
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder ? item.placeholder : $t('global.inputPlaceholder')"
                    clearable
                ></el-input>
                <el-select
                    v-if="item.type === 'select'"
                    v-model="searchForm[item.prop]"
                    filterable
                    clearable
                    :placeholder="item.placeholder ? item.placeholder : $t('global.selectPlaceholder')"
                >
                    <el-option
                        v-for="opt in item.option"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-if="
                        item.type === 'daterange' ||
                        item.type === 'datetimerange' ||
                        item.type === 'year' ||
                        item.type === 'monthrange'
                    "
                    v-model="searchForm[item.prop]"
                    :type="item.type"
                    :range-separator="$t('global.to')"
                    :start-placeholder="$t('global.startDate')"
                    :end-placeholder="$t('global.endDate')"
                    value-format="x"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">{{ $t('home.search') }}</el-button>
                <el-button @click="reset">{{ $t('home.reset') }}</el-button>
                <slot></slot>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { SearchComponentConfig } from '@/typings/common';
import { FormInstance } from 'element-plus';
import { onActivated, onMounted, ref } from 'vue';

const props = defineProps<{ config: SearchComponentConfig[] }>();
const searchForm = ref<any>({});
const searchFormRef = ref<FormInstance>();
const emits = defineEmits(['search']);
// 定义一个search函数，用于搜索
const search = () => {
    // 复制一份searchForm，不改变源数据
    const params = {
        ...searchForm.value,
    };
    // 遍历props.config，如果item.timeResult存在，且item.type包含range，则进行处理
    props.config.forEach(item => {
        if (item.timeResult && item.type.includes('range')) {
            if (Array.isArray(item.timeResult)) {
                if (params[item.prop]) {
                    // 设置params[item.timeResult[0]]和params[item.timeResult[1]]的值
                    Reflect.set(params, item.timeResult[0], params[item.prop][0]);
                    Reflect.set(params, item.timeResult[1], params[item.prop][1]);
                    // 删除params[item.prop]
                    Reflect.deleteProperty(params, item.prop);
                }
            }
        }
    });
    // 触发search事件，参数为params
    emits('search', params);
};
// 定义一个reset函数，用于重置搜索表单
const reset = () => {
    // 重置searchFormRef表单
    searchFormRef.value?.resetFields();
    // 触发search函数
    search();
};
// 定义onMounted和onActivated函数，用于触发search函数
onMounted(() => {
    search();
});
onActivated(() => {
    search();
});
</script>

<style lang="scss" scoped>
.el-card {
    margin-bottom: 20px;
}
</style>
