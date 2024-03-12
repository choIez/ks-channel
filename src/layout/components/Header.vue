<script setup lang="ts">
  import { computed, onMounted } from "vue"
  import { storeToRefs } from "pinia"
  import { useRouter, useRoute, RouterLink } from "vue-router"
  import { useUserInfoStore } from "@/stores/user"
  import Icon from "@/components/Icon/index.vue"
  
  defineOptions({ name: "Header" })
  
  const router = useRouter()
  const route = useRoute()
  
  const userInfoStore = useUserInfoStore()
  const { userInfo, menuRoutes } = storeToRefs(userInfoStore)
  const { userLogout } = userInfoStore
  
  onMounted(() => {
  
  })
  
  const mode = "horizontal"
  
  const activeIndex = computed(() => route.path)
  
  const logout = async () => {
    await userLogout()
    
    router.push({ name: "login" })
  }
</script>

<template>
  <div>
    <div class="root">
      <div class="main">
        <RouterLink class="flex-center-pointer" to="/" exact>
          <el-image
            class="flex-center-pointer h-[50px]"
            v-if="userInfo?.company.logo"
            :src="userInfo?.company.logo"
            fit="scale-down"
          />
        </RouterLink>
        
        <!-- !! ellipsis 一定要设置为 false -->
        <el-menu
          popper-class="menu"
          :default-active="activeIndex"
          active-text-color="#409eff"
          text-color="#303133"
          :mode
          :ellipsis="false"
          router
        >
          <el-sub-menu
            v-for="route in menuRoutes"
            :key="route.title"
            :index="route.title"
          >
            <template #title>
              <Icon :name="route.icon" />
              <span class="menu-item-title">{{ route.title }}</span>
            </template>
            <el-menu-item
              v-for="subRoute in route.children"
              :key="subRoute.path"
              :index="subRoute.path"
            >
              <div>{{ subRoute.title }}</div>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
        
        <div class="flex-center-pointer">
          <el-popover width="254px" trigger="hover" placement="bottom">
            <template #reference>
              <div class="flex-center-pointer">
                <el-avatar :src="userInfo?.avatar" />
                <div class="user-name">{{ userInfo?.nickname }}</div>
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
              
              <div class="login-info">最近登录：{{ userInfo?.login_at }}</div>
              <div class="flex flex-wrap">
                <RouterLink class="user-button" :to="{ name: 'user-profile' }" exact>个人资料</RouterLink>
                <div class="user-button">修改密码</div>
                <RouterLink class="user-button" :to="{ name: 'study-center' }" exact>学习中心</RouterLink>
                <div class="user-button danger" @click="logout">退出登录</div>
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
  
  .menu :global(.el-menu--popup) {
    min-width: 160px !important;
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
  }
  
  .user-name {
    margin: 0 6px;
    font-size: 16px;
    color: white;
    font-weight: normal;
  }
  
  .share-button {
    margin-top: 10px;
    background-color: #7bbdff;
    border: 1px solid transparent;
    color: color.$white;
  }
  
  .login-info {
    height: 40px;
    line-height: 40px;
    text-align: center;
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
  
  .flex-center-pointer {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
