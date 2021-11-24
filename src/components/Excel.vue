<template>
  <div>
    <el-button type="primary" icon="el-icon-document" @click="handleDownload">
      导出Excel
    </el-button>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { reactive, defineComponent, toRefs } from "vue";
import XLSX from "xlsx";
import { exportJson2Excel } from "@/service/excel";
// import { formatJson } from "@/utils";

export default {
  name: "Excel",
  setup() {
    const dataMap = reactive({
      listLoading: true,
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
    });

    // const changeinput = (value: any) => {
    //   dataMap.bookType = value
    // }

    const handleDownload = () => {
      dataMap.downloadLoading = true;
      const tHeader = ["Id"];
      const filterVal = ["id"];
      const list = dataMap.list;
      const data = [
        [1, 2, 3],
        [1, 2, 3],
      ];
      exportJson2Excel(
        tHeader,
        data,
        dataMap.filename !== "" ? dataMap.filename : undefined,
        undefined,
        undefined,
        dataMap.autoWidth,
        dataMap.bookType
      );
      dataMap.downloadLoading = false;
    };

    return { ...toRefs(dataMap), handleDownload };
  },
};
</script>

<style>
</style>