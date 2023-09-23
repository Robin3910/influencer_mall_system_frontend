<template>
  <div>
    <!-- 搜索模块 start-->
    <div class="search-wrap p-5 bg-white select-none">
      <div class="item flex flex-wrap md:flex-nowrap	 items-start text-neutral-600">
        <div class="leading-8    md:w-auto md:flex-0-auto">产品目录:</div>
        <div class="pl-3 cursor-pointer  md:w-auto text-sm	">
          <span @click="handlerCategoryChange(item,index as number)" v-for="(item,index) in categoryList" :key="index"
                class="mr-3   inline-block leading-8 "
                :class="{'text-primary-color':currentCategoryIndex==index}">
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
    <!-- 搜索模块 end-->
    <!--列表展示 start-->
    <el-row class="mt-5" :gutter="20">
      <el-col :sm="12" class="mb-5 " v-for="item in list">
        <div class="bg-white rounded-md overflow-hidden">
          <div class="flex flex-wrap ">
            <div class="w-full xl:w-1/2  h-[380px] md:h-[280px]">
              <el-image lazy class="w-full h-full" fit="cover" :src="item.headImageUrl"></el-image>
            </div>
            <div class="w-full xl:w-1/2  px-2 flex flex-col text-slate-800	">
              <div class="leading-10"><span>红人编号:</span><span>666</span></div>
              <div class="leading-10"><span>粉丝数<el-icon><QuestionFilled/></el-icon>:</span><span
                  class="text-primary-color">开通会员即可查看</span></div>
              <div class="leading-10">需要科学上网后点击案例查看视频:</div>
              <div class="flex flex-wrap  justify-start">
                <el-tag class="mb-2 mr-2 cursor-pointer" type="success" v-for="item in 10">
                  <div class="flex items-center">
                    <el-icon>
                      <VideoPlay/>
                    </el-icon>
                    {{ Math.floor(Math.random() * 10000) }}芝麻
                  </div>
                </el-tag>
              </div>
            </div>
          </div>
          <div class=" flex items-center justify-between p-4 border border-x-0	 border-b-0	">
            <div>
              <span class="text-lg text-primary-color mr-2">会员价:￥410</span><span class="text-sm text-slate-800">非会员价:￥450</span>
            </div>
            <div>
              <el-button color="#FF5500" type="primary">选择</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--列表展示 end-->
    <div class="py-2">
      <el-config-provider>
        <!--        <el-pagination-->
        <!--            :current-page="currentPage"-->
        <!--            :background="false"-->
        <!--            :small="false"-->
        <!--            :page-sizes="[100, 200, 300, 400]"-->
        <!--            layout="total,sizes,prev, pager, next"-->
        <!--            :total="1000"-->
        <!--        >-->

        <!--        </el-pagination>-->
      </el-config-provider>
    </div>
  </div>
</template>


<script setup lang="ts">
const {MainApi} = useApi()
const pageSize = ref(10);
const pageNum = ref(1)
const categoryList = ref<any[]>()
const list = ref<any[]>()
const queryParams = ref({
  pageSize: pageSize,
  pageNum: pageNum,
  categoryId: ""
})
const currentPage = ref(0)
let images = ref<any>()
let currentCategoryIndex = ref<(number | null)>()
let handlerCategoryChange = (item: any, index: number): void => {
  currentCategoryIndex.value = index
  queryParams.value.categoryId = item.id

}
const fetchData = async () => {
  await nextTick()
  // 如果数据不存在那么直接重新拉取数据
  if (!categoryList.value || categoryList.value.length == 0) {
    // 参数列表
    let categoryData = await MainApi.getCateGoryList({
      pageSize: 99999,
      pageNum: 1,
    })
    categoryList.value = [{title: "全部", id: ""}, ...categoryData.list];
  }
  console.log('>>>>>>>>>>开始请求接口')
  //网红列表
  const userData = await MainApi.getUserList(queryParams.value)
  console.log('>>>>接口数据', userData)
  list.value = userData?.list||[]
}
watch(queryParams, () => {
  fetchData()
}, {
  deep: true
})
onMounted(() => {
  fetchData()
})


</script>
