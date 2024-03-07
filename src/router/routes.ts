const routes = [
  // 首页
  {
    path: "/home",
    redirect: "/home/workbench",
    meta: {
      icon: "HomeFilled",
      title: "首页"
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "workbench",
        name: "workbench",
        component: () => import("@/views/Home/Workbench/index.vue"),
        meta: {
          title: "工作台"
        }
      }
      // {
      //   path: "data-center",
      //   name: "data-center",
      //   component: () => import("@/views/Home/DataCenter/index.vue"),
      //   meta: {
      //     title: "数据中心"
      //   }
      // },
      // {
      //   path: "ks-details",
      //   name: "ks-details",
      //   component: () => import("@/views/Home/KsDetails/index.vue"),
      //   meta: {
      //     title: "快手明细"
      //   }
      // },
      // {
      //   path: "performance",
      //   name: "performance",
      //   component: () => import("@/views/Home/Performance/index.vue"),
      //   meta: {
      //     title: "绩效统计"
      //   }
      // }
    ]
  },
  
  // 达人管理
  {
    path: "/master",
    redirect: "/master/master-list",
    meta: {
      icon: "Shop",
      title: "达人管理"
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "master-list",
        name: "master-list",
        component: () => import("@/views/Master/MasterList/index.vue"),
        meta: {
          title: "达人列表"
        }
      }
      // {
      //   path: "master-seas",
      //   name: "master-seas",
      //   component: () => import("@/views/Master/MasterSeas/index.vue"),
      //   meta: {
      //     title: "公海达人"
      //   }
      // }
    ]
  },
  
  // 选品库
  {
    path: "/product",
    redirect: "/product/product-store",
    meta: {
      icon: "GoodsFilled",
      title: "选品库"
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "product-store",
        name: "product-store",
        component: () => import("@/views/Product/ProductStore/index.vue"),
        meta: {
          title: "选品库"
        }
      }
      // {
      //   path: "product-album",
      //   name: "product-album",
      //   component: () => import("@/views/Product/ProductAlbum/index.vue"),
      //   meta: {
      //     title: "选品专辑"
      //   }
      // },
      // {
      //   path: "product-album-details",
      //   name: "product-album-details",
      //   component: () => import("@/views/Product/ProductAlbumDetails/index.vue"),
      //   meta: {
      //     title: "专辑详情",
      //     hidden: true
      //   }
      // },
      // {
      //   path: "product-collect",
      //   name: "product-collect",
      //   component: () => import("@/views/Product/ProductCollect/index.vue"),
      //   meta: {
      //     title: "选品收藏"
      //   }
      // },
      // {
      //   path: "require-square",
      //   name: "require-square",
      //   component: () => import("@/views/Product/RequireSquare/index.vue"),
      //   meta: {
      //     title: "需求广场"
      //   }
      // },
      // {
      //   path: "require-publish",
      //   name: "require-publish",
      //   component: () => import("@/views/Product/RequirePublish/index.vue"),
      //   meta: {
      //     title: "需求发布"
      //   }
      // }
    ]
  },
  
  // 领样管理
  {
    path: "/sample",
    redirect: "/sample/sample-order",
    meta: {
      icon: "List",
      title: "领样管理"
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "sample-order",
        name: "sample-order",
        component: () => import("@/views/Sample/SampleOrder/index.vue"),
        meta: {
          title: "领样订单"
        }
      }
      // {
      //   path: "sample-secondary",
      //   name: "sample-secondary",
      //   component: () => import("@/views/Sample/SampleSecondary/index.vue"),
      //   meta: {
      //     title: "二级团列表"
      //   }
      // }
    ]
  },
  
  // 我的团队
  {
    path: "/team",
    redirect: "/team/team-data",
    meta: {
      icon: "UserFilled",
      title: "我的团队"
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "invite-user",
        name: "invite-user",
        component: () => import("@/views/Team/InviteUser/index.vue"),
        meta: {
          title: "邀请用户"
        }
      }
      // {
      //   path: "team-data",
      //   name: "team-data",
      //   component: () => import("@/views/Team/TeamData/index.vue"),
      //   meta: {
      //     title: "团队数据"
      //   }
      // },
      // {
      //   path: "team-master",
      //   name: "team-master",
      //   component: () => import("@/views/Team/TeamMaster/index.vue"),
      //   meta: {
      //     title: "团队达人"
      //   }
      // },
      // {
      //   path: "team-product",
      //   name: "team-product",
      //   component: () => import("@/views/Team/TeamProduct/index.vue"),
      //   meta: {
      //     title: "团队找品"
      //   }
      // }
    ]
  }
]

export default routes
