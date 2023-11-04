<script setup lang="ts">
// definePageMeta({
//   layout: false
// })
import {Plus, Search} from "@element-plus/icons-vue";
import {onMounted} from "@vue/runtime-core";

const platformList = ref([
  {
    icon: "",
    name: "全部",
    value: "",
    selected: false
  },
  {
    icon: "aws",
    name: "亚马逊",
    value: "亚马逊",
    selected: false
  }, {
    icon: "wam",
    name: "沃尔玛",
    value: "沃尔玛",
    selected: false
  }, {
    icon: "ebay",
    name: "eBay",
    value: "eBay",
    selected: false
  }, {
    icon: "smt",
    name: "速卖通",
    value: "速卖通",
    selected: false
  }, {
    icon: "other",
    name: "其他独立站",
    value: "其他独立站",
    selected: false
  }
])
const loading = ref(false)
const {MainApi} = useApi()
const queryParams = ref({
  productPlatform: "",
  pageSize: 10,
  pageNum: 0,
  title: "",
  priceStart: "",
  priceEnd: "",
  region: "",
  platform: "",
})
const regionData = ref([])
const tableData = ref([])
const fetchData = async () => {
  await nextTick()
  loading.value = true
  let data = await MainApi.getResourceList(queryParams)
  loading.value = false
  if (data && data.data.list && data.data.list.length > 0) {
    (data.data.list as any[]).forEach(item => {
      item.price = "¥" + (item?.whResourceItemsList[0]?.price || 0)
    })
  }
  tableData.value = [...tableData.value, ...data.data.list] as any

}
const fetchRegoinData = async () => {
  await nextTick()
  let data = await MainApi.getRegionList(queryParams)
  if (data && data.data.list && data.data.list.length > 0) {
    regionData.value = data.data.list
  }
}
const handlerSearch = () => {
  queryParams.value.pageNum = 1
  tableData.value = []
  fetchData()
}
// handlerSearch()
const handlerPageNext = () => {
  console.log('>>>>>>>>>>>>请求次数')
  fetchData()
  queryParams.value.pageNum = queryParams.value.pageNum + 1
}
const handlerSearchRegion = (item: any) => {
  queryParams.value.pageNum = 1
  queryParams.value.region = item.name
  queryParams.value.platform = ''
  tableData.value = []
  fetchData()
}
const handlerSearchPlatform = (item: any, _item: any) => {
  regionData.value.forEach(vv => {
    vv.children.forEach((v: any) => {
      v.checked = false
      if (v.id == _item.id) {
        v.checked = true
      }
    })
  })

  queryParams.value.pageNum = 1
  queryParams.value.region = item.name
  queryParams.value.platform = _item.name
  tableData.value = []
  fetchData()
}
const handlerSelectStation = (index: number) => {
  platformList.value.forEach((item, _index) => {
    item.selected = false
    if (index === _index) {
      item.selected = true
      queryParams.value.productPlatform = item.value
      fetchData()
    }
  })
}
const getProductPlatFormIcon = (str: string): string[] => {
  let iconData: string[] = []
  str.split("-").forEach(item => {
    console.log('>>>>>>>>>item',item)
    platformList.value.forEach(p => {

      if (item == p.value) {
        iconData.push(p.icon)
      }
    })
  })
  console.log('>>>>>>>>>>>iconData',iconData)
  return iconData;
}
onMounted(() => {
  fetchRegoinData()
})

</script>

<template>
  <div style="position: relative" class="mt-5 md:container page-wrap mx-auto  pl-5 pr-5 md:pl-0 md:pr-0">
    <el-row class="bg-[white] p-[10px]  ">
      <el-col :span="24" :sm="24" :md="24" :lg="8" class="mb-[10px] px-[10px]">
        <div class="flex items-center">
          <span class="text-sm text-gray-400 px-3">搜索:</span>
          <el-input clearable v-model="queryParams.title" class="flex-1"
                    placeholder="名称、链接、类目、代发描述"></el-input>

        </div>
      </el-col>
      <el-col :span="24" :sm="24" :md="24" :lg="12" class="mb-[10px] px-[10px]  ">
        <div class="flex items-center  h-full flex-wrap">
          <span class="text-sm text-gray-400 px-3 flex-0-auto mb-2">购物平台:</span>
          <div class="flex items-center flex-wrap">
            <div v-for="(_item,_index) in platformList" @click="handlerSelectStation(_index)" :key="_index"
                 class="flex items-center cursor-pointer px-3 mb-2">
              <svg-icon v-if="_item.icon" :name="_item.icon" class="w-[20px] h-[20px] inline-block mr-1"></svg-icon>
              <span class="flex-0-auto text-gray-400 text-sm"
                    :class="[_item.selected?'!text-green-500':'']">{{ _item.name }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24" :sm="4" :md="4" class="mb-[10px] px-[10px]">
        <div class="flex items-center">

          <el-button class="ml-3" type="primary" :icon="Search" color="#FF5500" @click="handlerSearch" plain>查询
          </el-button>

        </div>
      </el-col>

    </el-row>

    <el-row class="mt-[10px] ">
      <el-col :span="0" :md="4" class="pr-3 ">
        <el-scrollbar height="calc( 100vh - 180px )">
          <el-collapse>
            <el-collapse-item :name="index" v-for="(item,index) in regionData" :key="index" class="!pb-0">
              <template #title>
                <div class="flex items-center px-3 hover:text-green-500		" @click="handlerSearchRegion(item)">
                  <el-image class=" rounded-md w-[30px] h-[30px] mr-3" fit="cover"
                            :src="item.icon">
                    <template #error>
                      <img src="https://snow123.com/wp-content/uploads/2023/01/806031e1776755b7176f060101548f94_1.jpg"
                           class="w-full h-full object-cover"/>
                    </template>
                  </el-image>
                  <span class="text-gray-950">{{ item.name }}</span>
                </div>
              </template>
              <div v-for="(_item,_index) in item.children" :key="_index" :class="[_item.checked?'text-green-500':'']"
                   @click="handlerSearchPlatform(item,_item)"
                   class=" pl-6 py-2 hover:text-green-500 cursor-pointer">
                {{ _item.name }}
              </div>

            </el-collapse-item>

          </el-collapse>
        </el-scrollbar>

      </el-col>
      <el-col :span="24" :md="14">
        <el-table
            default-expand-all
            v-el-table-infinite-scroll="handlerPageNext"
            :infinite-scroll-disabled="false"
            v-loading="loading" :data="tableData" width="100%"
            height="calc( 100vh - 180px )">
          <el-table-column prop="name" label="群名称" min-width="400">
            <template #default="{row}">
              <div class="flex  p-[20px]">
                <div class="flex items-center justify-center ">
                  <el-image class=" rounded-md w-[60px] h-[60px]" fit="cover"
                            :src="row.headImageUrl||'https://snow123.com/wp-content/uploads/2023/01/806031e1776755b7176f060101548f94_1.jpg'">
                    <template #error>
                      <img src="https://snow123.com/wp-content/uploads/2023/01/806031e1776755b7176f060101548f94_1.jpg"
                           class="w-full h-full object-cover"/>
                    </template>
                  </el-image>
                </div>
                <div class="flex flex-col justify-between flex-1 ml-[10px]  text-neutral-600">
                  <a :href="row.link||'#'" target="_blank" class="text-gray-950 text-lg">{{ row.title }}
                    <svg-icon class="w-[15px] h-[15px] inline-block" name="link"/>
                  </a>
                  <div>
                    <a :href="`https://www.similarweb.com/website/${row.link.replace('https://www.','').replace('\/','')}/#overview`" target="_blank"><el-tag type="info" effect="plain"
                            class="mr-[10px] mt-[10px] !text-neutral-600 !border-neutral-600">
                      流量分析
                    </el-tag>
                    </a>
<!--                    <el-tag type="info" effect="plain" class="mr-[10px] mt-[10px] !text-blue-500	!border-blue-500	">-->
<!--                      截图反馈-->
<!--                    </el-tag>-->
                    <el-tag v-if="row.dayPush" type="info" effect="plain"
                            class="mr-[10px] mt-[10px] !text-rose-500	!border-rose-500	">
                      {{ row.dayPush }}日发帖数
                    </el-tag>
                    <el-tag v-if="row.members" type="info" effect="plain"
                            class="mr-[10px] mt-[10px] !text-green-600	!border-green-600">
                      {{ row.members }}受众
                    </el-tag>
                  </div>
                  <div class="mt-2">
                    <template v-for="(item,index) in getProductPlatFormIcon(row.productPlatform)" :key="index">
                      <svg-icon class="w-[20px] h-[20px] inline-block mx-2" :name="item" />
                    </template>
                  </div>
                </div>

              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="最低价"/>
          <el-table-column prop="platform" label="平台" width="60" fixed="right">
            <template #default="{row}">
              <div class="flex justify-center ">
                <svg-icon name="message" class="w-[20px] h-[20px] inline-block"></svg-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="expand" fixed="right">
            <template #default="{row}">
              <div class="pb-[30px] pl-[30px]">
                <el-table :data="row.whResourceItemsList">
                  <el-table-column prop="description" label=""/>
                  <el-table-column prop="price" label="价格">
                    <template #default="{row}">
                      {{ "¥" + row.price || 0 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="rate" label="上帖率" fixed="right"/>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <template #empty>
            <div class="flex items-center justify-center">
              <el-empty :image-size="200" description="暂无数据"/>
            </div>
          </template>
        </el-table>
      </el-col>
      <el-col :span="0" :md="6" class="pl-3 ">
        <div class="bg-[white] h-[20vh]">
          <div class="p-[10px] text-lg">代发申请</div>
          <div class="p-[10px] text-gray-500		">资源多样，价格实惠、透明。如果您有好的资源，也可在此提交代发申请</div>
          <div class="p-[10px]">
            <a href="https://docs.qq.com/form/page/DVEVBUFJnQ01IT1lr#/fill" target="_blank">
              <el-button type="primary" color="#FF5500">立即申请</el-button>
            </a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-input {
  --el-input-focus-border-color: var(--color-primary) !important;
}

.el-collapse-item__content {
  padding-bottom: 0;
}

.el-scrollbar__view {
  width: 100% !important;
}
</style>