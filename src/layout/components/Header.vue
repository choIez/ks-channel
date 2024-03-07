<script setup lang="ts">
  import { ref, computed, onMounted } from "vue"
  import { storeToRefs } from "pinia"
  import { useRouter, useRoute, RouterLink } from "vue-router"
  import routes from "@/router/routes"
  import { useUserInfoStore } from "@/stores/user"
  import { groupRoutes } from "@/utils/auth"
  import { TEXT_COLOR } from "@/constants/color"
  import Icon from "@/components/Icon/index.vue"
  
  defineOptions({ name: "Header" })
  
  const router = useRouter()
  const route = useRoute()
  
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const { userLogout } = userInfoStore
  
  onMounted(() => {
  
  })
  
  const currentPath = computed(() => route.path)
  
  const navigations = computed(() => routes.map(route => {
    return {
      icon: route.meta.icon,
      title: route.meta.title,
      children: route.children.filter((child: RouteChildren) => {
        if (groupRoutes.includes(child.name) && userInfo.value?.is_has_child !== 1) {
          child.meta.hidden = true
        }
        else if (groupRoutes.includes(child.name) && userInfo.value?.is_has_child === 1) {
          child.meta.hidden = false
        }
        
        return !child.meta.hidden
      }).map((child: RouteChildren) => ({
        path: route.path + "/" + child.path,
        title: child.meta.title
      }))
    }
  }))
</script>

<template>
  <div>
    <div class="root">
      <div class="main">
        <RouterLink class="flex-center-pointer" to="/">
          <el-image
            class="flex-center-pointer h-[50px]"
            v-if="userInfo?.company.logo"
            :src="userInfo?.company.logo"
            fit="scale-down"
          />
        </RouterLink>
        
        <!-- !! ellipsis 一定要设置为 false -->
        <el-menu
          :default-active="currentPath"
          :active-text-color="TEXT_COLOR.PRIMARY"
          :text-color="TEXT_COLOR.DEFAULT"
          mode="horizontal"
          :ellipsis="false"
          router
        >
          <el-sub-menu
            v-for="navigation in navigations"
            :key="navigation.title"
            :index="navigation.title"
          >
            <template #title>
              <Icon :name="navigation.icon" />
              <span class="menu-item-title">{{ navigation.title }}</span>
            </template>
            <el-menu-item
              v-for="subNavigation in navigation.children"
              :key="subNavigation.path"
              :index="subNavigation.path"
            >
              {{ subNavigation.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
        
        <div class="flex-center-pointer">
          <el-popover width="254px" trigger="hover" placement="bottom">
            <template #reference>
              <div class="flex-center-pointer">
                <el-avatar :src="userInfo?.avatar" />
                <div class="mx-[6px] text-[16px] text-white font-normal">{{ userInfo?.nickname }}</div>
                <Icon name="ArrowDown" :style="{ fontSize: '14px', color: '#fff' }" />
              </div>
            </template>
            
            <div>
              <div class="flex items-center px-[30px] py-[20px] bg-[#409eff]">
                <el-avatar :src="userInfo?.avatar" />
                <div class="ml-[20px]">
                  <div class="text-white">{{ userInfo?.nickname }}</div>
                  <el-button class="share-button" size="small">分享邀请海报</el-button>
                </div>
              </div>
              
              <div class="recent-login">最近登录：{{ userInfo?.login_at }}</div>
              <div class="flex flex-wrap">
                <RouterLink class="user-button" to="/user-profile">个人资料</RouterLink>
                <div class="user-button">修改密码</div>
                <RouterLink class="user-button" to="/study-center">学习中心</RouterLink>
                <div class="user-button danger">退出登录</div>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/color" as color;
  
  .root {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 80px;
    background: url(https://xingshanonline.oss-cn-shanghai.aliyuncs.com/web/bg_1.png) 0 0 no-repeat;
    background-size: 100% 100%;
  }
  
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 1200px;
    height: 80px;
    margin: 0 auto;
  }
  
  .share-button {
    margin-top: 10px;
    background-color: #7bbdff;
    border: 1px solid transparent;
    color: color.$white;
  }
  
  .recent-login {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background-color: #337cc9;
    font-size: 12px;
    color: #fff;
  }
  
  .user-button {
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #787878;
    cursor: pointer;
    text-decoration: none;
    
    &:hover {
      background-color: #ecf5ff;
      color: #50a6ff;
    }
    
    &.danger {
      color: #f56c6c;
    }
  }
  
  .flex-center-pointer {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .el-menu.el-menu--horizontal {
    background: color.$transparent;
    border-bottom: 0;
    height: 42px;
    line-height: 42px;
    
    & > .el-sub-menu {
      :deep(.el-sub-menu__title) {
        background: color.$transparent;
        border-bottom: none;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 400;
        
        .menu-item-title, i {
          color: color.$white;
        }
        
        &:hover, &.is-active {
          background: color.$white;
          
          .menu-item-title, i {
            color: color.$primary;
          }
        }
      }
      
      &.is-active {
        :deep(.el-sub-menu__title) {
          background: color.$white;
        }
        
        .menu-item-title, :deep(i) {
          color: color.$primary;
        }
      }
    }
  }
  
  .el-menu-item:hover {
    outline: 0;
    color: #409eff !important;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  :deep(.el-button) {
    &:hover, &:focus {
      color: #21abf2;
      border-color: #bce6fb;
      background-color: #e9f7fe;
    }
  }
  
  :deep(.el-dialog) {
    border-radius: 12px;
  }
</style>
