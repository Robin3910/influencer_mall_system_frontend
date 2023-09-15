export const useMenu = () => useState('menu', () => [
    {
        title: "推广资源",
        path: "/",
        active: true
    },
    {
        title: "红人视频",
        path: "/test",
        active: false
    },
    {
        title: "折扣计算器",
        path: "/",
        active: false,
        children: [
            {
                title: "红人视频1",
                path: "/xx"
            }
        ]
    }
])