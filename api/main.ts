import Http from '@/service/request'

export default new class main extends Http {
    // 获取分类列表
    public getCateGoryList(obj?: (any | null)): Promise<any> {
        return this.get('/wh/get_category_list', obj)
    }

    public getUserList(obj?: (any | null)): Promise<any> {
        return this.get('/wh/user', obj)
    }
}
