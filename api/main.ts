import Http from '@/service/request'

export default {
    // 获取分类列表
    getCateGoryList(obj?: (any | null)): Promise<any> {
        return Http.get('/wh/get_category_list', obj)
    },

    getUserList(obj?: (any | null)): Promise<any> {
        return Http.get('/wh/user', obj)
    },

    getResourceList(obj?: (any | null)): Promise<any> {
        return Http.get('/wh/resource', obj)
    },
    getRegionList(obj?: (any | null)): Promise<any> {
        return Http.get('/wh/region', obj)
    }
}
