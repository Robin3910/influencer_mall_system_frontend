export const useMenu = () => useState('menu', () => [
    {
        title: "红人视频",
        path: "/",
        active: true
    },
    {
        title: "推广资源",
        path: "/resource",
        active: false
    },
    {
        title: "品牌推广",
        path: "/contact",
        url: "https://snow123.com/contact_us/",
        active: false
    },
    // {
    //     title: "折扣计算器",
    //     path: "/",
    //     active: false,
    //     children: [
    //         {
    //             title: "红人视频1",
    //             path: "/xx"
    //         }
    //     ]
    // }
])

export const useLayoutStatus = () => {
    return useState('LayoutStatus', () =>false)
}
