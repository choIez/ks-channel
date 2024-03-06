<!-- 登录 -->
<script setup lang="ts">
  import { ref, reactive, onMounted } from "vue"
  import { storeToRefs } from "pinia"
  import { ElMessageBox } from "element-plus"
  import { useRouter } from "vue-router"
  import { useUserInfoStore } from "@/stores/userInfo"
  import { useLogInfoStore } from "@/stores/logInfo"
  import type { LoginParams } from "@/api/user/types"
  import Icon from "@/components/Icon/index.vue"
  
  defineOptions({ name: "Login" })
  
  const router = useRouter()
  
  const userInfoStore = useUserInfoStore()
  const { userToken, userType } = storeToRefs(userInfoStore)
  const { userLogin, userReset } = userInfoStore
  
  const { getLogInfo } = useLogInfoStore()
  
  onMounted(() => {
    if (import.meta.env.MODE === "development") {
      loginForm.username = "快手渠道测试003"
      loginForm.password = "111000..."
    }
  })
  
  const loginForm = reactive<LoginParams>({
    username: "",
    password: ""
  })
  
  const loginFormRef = ref()
  
  const loginFormRules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  }
  
  const submitLoginForm = async () => {
    try {
      await loginFormRef.value.validate()
      
      await userLogin(loginForm)
      
      if (userToken.value && userType.value === 1) {
        userReset()
        
        await ElMessageBox.confirm("您登录的是抖音账号，确认跳转到抖音系统！！！", "警告", {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false
        })
        
        window.location.replace("https://channel.shangboyx.com")
      }
      else if (userToken.value) {
        await getLogInfo()
        
        await router.push({ name: "workbench" })
      }
    }
    catch {
      // ...
    }
  }
</script>

<template>
  <div class="app-login flex-center">
    <div class="mb-[148px]">
      <div
        class="text-[48px] text-[#333] font-bold text-center mb-[90px]"
        :style="{ fontFamily: 'BDZongYi-A001' }"
      >
        快手-渠道后台管理系统
      </div>
      <div class="content">
        <div class="w-[640px] pt-[75px] pr-[72px] pb-[66px] pl-[100px] box-border">
          <div class="placeholder" />
        </div>
        <div class="w-[470px] px-[50px] py-[35px] box-border bg-white rounded-[6px]">
          <div class="mt-[85px] mb-[30px] text-center text-[18px] text-[#333] font-bold">用户登录</div>
          <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" size="default">
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                @keyup.enter="submitLoginForm"
                placeholder="请输入账号"
              >
                <template #prefix>
                  <Icon name="User" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model.trim="loginForm.password"
                @keyup.enter="submitLoginForm"
                show-password
                placeholder="请输入密码"
              >
                <template #prefix>
                  <Icon name="Lock" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="w-full" type="primary" @click="submitLoginForm">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .app-login {
    width: 100%;
    min-width: 1200px;
    height: 100vh;
    background: url('/images/login_bg.png') 0 0 no-repeat;
    background-size: cover;
    overflow-x: scroll;
    
    .content {
      display: flex;
      width: 1110px;
      height: 520px;
      margin: 0 auto;
      box-shadow: 0 7px 34px 1px #1212121a;
      border-radius: 10px;
      
      .placeholder {
        width: 468px;
        height: 379px;
        background: url('/images/login_icon.png') 0 0 no-repeat;
        background-size: 100%;
      }
    }
  }
</style>
