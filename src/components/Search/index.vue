<template>
    <el-card shadow="never" :body-style="{ padding: '20px 20px 0px 20px' }">
        <el-form ref="searchFormRef" :model="searchForm" inline>
            <el-form-item v-for="item in props.config" :key="item.prop" :label="item.label" :prop="item.prop">
                <el-input
                    v-if="item.type === 'input'"
                    v-model="searchForm[item.prop]"
                    :placeholder="item.placeholder ? item.placeholder : '请输入'"
                    clearable
                ></el-input>
                <el-select
                    v-if="item.type === 'select'"
                    v-model="searchForm[item.prop]"
                    filterable
                    clearable
                    :placeholder="item.placeholder ? item.placeholder : '请选择'"
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
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="x"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="reset">重置</el-button>
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
/**
 * @description 格式化日期
 */
// const getFormat = (type: string) => {
//     let formatType = 'YYYY-MM-DD';
//     switch (type) {
//         case 'datetimerange':
//             formatType = 'YYYY-MM-DD HH:mm:ss';
//             break;
//         case 'year':
//             formatType = 'YYYY';
//             break;
//         case 'monthrange':
//             formatType = 'YYYY-MM';
//             break;
//         default:
//             formatType = 'YYYY-MM-DD';
//             break;
//     }
//     return formatType;
// };
const search = () => {
    emits('search', searchForm);
};
const reset = () => {
    searchFormRef.value?.resetFields();
    search();
};
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
