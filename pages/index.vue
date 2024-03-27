<template>
  <div v-loading="loading" class="mt-5 md:container page-wrap mx-auto  pl-5 pr-5 md:pl-0 md:pr-0">
    <!-- 搜索模块 start-->
    <div class="search-wrap p-5 bg-white select-none">
      <div class="item flex flex-wrap md:flex-nowrap	 items-start text-neutral-600">
        <div class="leading-8    md:w-auto md:flex-0-auto text-base">产品目录:</div>
        <div class="pl-3 md:cursor-pointer  md:w-auto text-sm	">
          <span @click="handlerCategoryChange(item,index as number)" v-for="(item,index) in categoryList" :key="index"
                class="mr-3   inline-block leading-8 "
                :class="{'text-primary-color':currentCategoryIndex==index}">
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
    <!--排序-->
    <div class="search-wrap   px-5 pb-5 bg-white select-none">
      <div class="item flex flex-wrap md:flex-nowrap	 items-start text-neutral-600">
        <div class="leading-8    md:w-auto md:flex-0-auto text-base">排序:</div>
        <div class="pl-3 md:cursor-pointer  md:w-auto text-sm	">
          <span class="mr-3   inline-block leading-8 " :class="{'text-primary-color':searchParams.priceSort==``}"
                @click="()=>{
searchParams.priceSort=``;
fetchSearchInfo()
                }

">综合排序</span>
          <span class="mr-3   inline-block leading-8 " :class="{'text-primary-color':searchParams.priceSort==`asc`}"
                @click="()=>{
        searchParams.priceSort=`asc`
        fetchSearchInfo()
                }

">按价格升序</span>
          <span class="mr-3   inline-block leading-8 " :class="{'text-primary-color':searchParams.priceSort==`desc`}"
                @click="()=>{
searchParams.priceSort=`desc`
fetchSearchInfo()
                }

">按价格降序</span>
        </div>
      </div>
    </div>
    <div class="search-wrap px-5 pb-5 bg-white select-none ">
      <div class="item flex flex-wrap md:flex-nowrap	 items-start text-neutral-600 ">

        <el-row class="w-full" :gutter="10" >
          <el-col :span="24" :sm="24" :md="8" :lg="6" class="mb-2">
            <div class="flex items-center">
              <span>国家：</span>
              <el-select v-model="searchParams.regionId" style="margin-right: 10px;flex: 1" clearable placeholder="请选择">
                <el-option v-for="(item,index) in selectRegionList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>

            </div>
          </el-col>
          <el-col :span="24" :sm="24" :md="8" :lg="6" class="mb-2">
            <div class="flex items-center">
              <span>视频类型：</span>
              <el-select placeholder="请选择" v-model="searchParams.videoType" style="margin-right: 10px;flex: 1"  clearable>
                <el-option v-for="(item,index) in videoTypeList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="24" :sm="24" :md="8" :lg="6" class="mb-2">
            <div class="flex items-center">
              <span>编号：</span>
              <el-input clearable v-model="searchParams.no" class="flex-1" color="#FF5500" @keyup.enter="handleSearch"
                        placeholder="编号搜索"></el-input>

            </div>
          </el-col>
          <el-col :span="24" :sm="24" :md="8" :lg="6" class="mb-2">
            <div class="flex items-center ">
              <span>名称：</span>
              <el-input clearable v-model="searchParams.name" class="flex-1" color="#FF5500" @keyup.enter="handleSearch"
                        placeholder="网红名称/简介搜索"></el-input>

            </div>
          </el-col>
          <el-col :span="24" :sm="24" :md="8" :lg="6" class=" ">
            <el-button type="primary" color="#FF5500" :icon="Search" @click="handleSearch">查询
            </el-button>
          </el-col>
        </el-row>

      </div>
    </div>

    <!--列表展示 start-->
    <el-row class="mt-5" :gutter="20">
      <template v-if="list&&list.length>0">
        <el-col :sm="12" class="mb-5 " v-for="item in list">
          <div class="bg-white rounded-md overflow-hidden text-base">
            <div class="flex flex-wrap ">
              <div class="w-full xl:w-1/2  h-[380px] md:h-[280px]">
                <el-image lazy class="w-full h-full" fit="cover"
                          :src="item.headImageUrl.replace('http://114.132.77.118:9000','https://image.snow123.com')||'https://snow123.com/wp-content/uploads/2023/01/806031e1776755b7176f060101548f94_1.jpg'">
                  <template #error>
                    <img src="https://snow123.com/wp-content/uploads/2023/01/806031e1776755b7176f060101548f94_1.jpg"
                         class="w-full h-full object-cover"/>
                  </template>
                </el-image>
              </div>
              <div class="w-full xl:w-1/2  px-4 flex flex-col text-slate-800	">
                <div class="leading-10"><span>编号：</span><span class="cursor-pointer">{{ item.no || "--" }}</span>
                </div>
                <div class="leading-10" v-if="item.isShowNameAndFans==0">
                  <template v-if="item.isShowName==0">
                    <span>姓名：</span><span class="cursor-pointer">{{ item.name || "--" }}</span>
                  </template>
                </div>
                <div class="">{{ item.descript }}</div>
                <template v-if="item.fansList&&item.fansList.length>0&&item.isShowNameAndFans==0" >
                  <template  v-if="item.isShowFans==0">
                  <div class="leading-10" ><span>社媒粉丝数<el-icon v-if="false"><QuestionFilled/></el-icon>：</span>
                    <span v-if="false" class="text-primary-color">开通会员即可查看</span></div>
                  <div class="flex flex-wrap  justify-start">
                    <el-tag class="mb-2 mr-2 cursor-pointer" v-for="(_item,_index) in item.fansList"
                            :key="_index">
                      <a class="flex items-center" :href="_item.url" target="_blank">

                        <span>{{ _item.platform }}：</span>

                          <el-icon>
                            <Star/>
                          </el-icon>
                          {{ _item.count > 1000 ? _item.count / 1000 + "k" : _item.count }}
                      </a>
                    </el-tag>
                  </div>
                  </template>
                </template>
                <template v-if="item.userVideos&&item.userVideos.length>0">
                  <div class="leading-10">视频案例：</div>
                  <div class="flex flex-wrap  justify-start">
                    <el-tag class="mb-2 mr-2 cursor-pointer" type="success" v-for="(_item,_index) in item.userVideos"
                            :key="_index" @click="()=>{
                      currentTitle=`红人：`+item.name
                      handlerPlay(_item)
                    }">
                      <a class="flex items-center">
                        <el-icon>
                          <VideoPlay/>
                        </el-icon>
                        {{ _item.title }}
                      </a>
                    </el-tag>
                  </div>
                </template>

              </div>
            </div>
            <div class=" flex items-center justify-between p-4 border border-x-0	 border-b-0	">
              <div>
                <span class="text-lg text-primary-color mr-2">价格：￥{{ item.realPrice || 0 }}</span>
              </div>
              <div>
                <el-button color="#FF5500" type="primary" v-if="false">选择</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </template>
      <template v-else>
        <el-col :span="24" class="flex justify-center items-center">
          <el-empty :image-size="200" description="暂无数据"/>
        </el-col>
      </template>
    </el-row>
    <el-row class="mb-3 ">

      <el-col :span="24" :md="24" >
       <div class="flex justify-end items-center ">
         <ClientOnly>
           <el-config-provider :locale="zhCn">
             <el-pagination
                 background
                 :page-sizes="[10, 20, 30, 40,50,100]"
                 v-model:current-page="searchParams.pageNum"
                 v-model:page-size="searchParams.pageSize"
                 @current-change="handlerSizeChange"
                 @size-change="handlerPageSizeChange"
                 layout="total, prev, pager, next, jumper, sizes"
                 :total="total"
             />
           </el-config-provider>
         </ClientOnly>
       </div>
      </el-col>

    </el-row>

  </div>
  <client-only>
    <el-dialog v-model="dialogShow" class="!w-full md:!w-2/3 lg:!w-2/3 xl:!w-1/3">
      <template #header>
        <div class="text-base">{{ currentTitle }}</div>
      </template>
      <div class="max-w-full h-[40vh] md:h-[40vh] ">
        <video v-if="dialogShow" autoplay style="width: 100%;height: 100%;object-fit: cover" :src="currentVideoUrl"
               controls="controls"></video>
      </div>
      <template #footer>
        <el-button type="primary" @click="dialogShow = false">
          确认
        </el-button>
      </template>
    </el-dialog>
  </client-only>
</template>


<script setup lang="ts">
// definePageMeta({
//   layout: false
// })
const selectRegionList=ref([])
import {Search} from "@element-plus/icons-vue";
// 中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const       videoTypeList=ref([
  {
    id: "",
    name: '默认'
  },
  {
    id: 1,
    name: '影响者视频'
  },
  {
    id: 2,
    name: '影响者视频(提供原视频)'
  },
  {
    id: 3,
    name: '素人视频(提供原视频)'
  }
])
const currentTitle = ref("")
const currentVideoUrl = ref("")
const dialogShow = ref(false)
const {MainApi} = useApi()
const pageSize = ref(10);
const pageNum = ref(1)
const name = ref("")
const categoryList = ref<any[]>()
const list = ref([] as any[])
const category_id = ref("")
const total = ref(0)
const loading = ref(false)
// const queryParams = ref({
//   pageSize: pageSize,
//   pageNum: pageNum,
//   categoryId: category_id
// })

const searchParams = ref({
  categoryId: category_id,
  regionId: "",
  videoType: "",
  pageSize: pageSize,
  pageNum: pageNum,
  name: name,
  no: "",
  priceSort: "",
})
const fetchRegoinData = async () => {
  await nextTick()
  let data = await MainApi.getRegionList()
  if (data && data.data.list && data.data.list.length > 0) {
    selectRegionList.value = data.data.list
  }
}
onMounted(() => {
  fetchRegoinData()
  fetchData()
})

const currentCategoryIndex = ref<(number | null)>()
const handlerCategoryChange = (item: any, index: number): void => {
  currentCategoryIndex.value = index
  searchParams.value.categoryId =item.id
  searchParams.value.pageNum = 1
  list.value = []
  fetchData()
}

const handleSearch = () => {
  searchParams.value.pageNum = 1
  fetchSearchInfo()
  list.value = []
}

const fetchSearchInfo = async () => {
  loading.value = true
  await nextTick()
  //网红列表
  const userData = await MainApi.getUserList({...searchParams.value})
  list.value = [ ...userData.data.list]
  total.value = userData.data.total
  loading.value = false

}

const fetchData = async () => {
  loading.value = true
  await nextTick()
  // 如果数据不存在那么直接重新拉取数据
  if (!categoryList.value || categoryList.value.length == 0) {
    // 参数列表
    let categoryData = await MainApi.getCateGoryList({
      pageSize: 99999,
      pageNum: 1,
    })
    categoryList.value = [{title: "全部", id: ""}, ...categoryData.data.list];
  }
  //网红列表
  const userData = await MainApi.getUserList({...searchParams.value})
  total.value = userData.data.total
  list.value = [...userData.data.list]
  loading.value = false
}
const handlerSizeChange = (val: number) => {
  searchParams.value.pageNum = val
  list.value = []
  fetchData()
}
const handlerPageSizeChange = (val: number) => {
  searchParams.value.pageNum = 1
  list.value = []
  fetchData()
}
// watch(queryParams, () => {
//   fetchData()
// }, {
//   immediate: true,
//   deep: true
// })

// 处理分页
const handlerPageNext = () => {
  console.log('>>>>>下一页触发')
  searchParams.value.pageNum = searchParams.value.pageNum + 1
}
// 处理点击播放
const handlerPlay = (item: { url: string, [key: string]: any }) => {
  dialogShow.value = true
  setTimeout(() => {
    currentVideoUrl.value = item.url.replace("embedded.cc.", "")
  }, 100)
}

</script>
