import Http from '@/service/request'

export default new class main extends Http {

    /**
     * 获取热门文章，自定义返回类型可以通过Promise<T>设置，不设置就是any
     */
    public getHot(): Promise<any> {
        return this.get('/app/v1/article/hotView')
    }

    /**
     * 获取文章详情
     * @param { Number } id 文章id
     */
    public getDetail(id: number) {
        return this.get('/app/v1/article/detail/' + id)
    }
}