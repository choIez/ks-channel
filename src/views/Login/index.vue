<!-- 登录 -->
<script setup lang="ts">
  import { ref, reactive, onMounted } from "vue"
  import { storeToRefs } from "pinia"
  import { ElMessageBox } from "element-plus"
  import { useTitle } from "@vueuse/core"
  import { useRouter } from "vue-router"
  import { useUserInfoStore } from "@/stores/user"
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
    useTitle("渠道 - 登录")
    
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
  <div class="root flex-center">
    <div class="mb-[148px]">
      <div class="title">快手-渠道后台管理系统</div>
      <div class="main">
        <!-- 背景 -->
        <div class="back-container">
          <div class="back" />
        </div>
        <div class="form-container">
          <div class="form-title">用户登录</div>
          <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
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
  .root {
    width: 100%;
    min-width: 1200px;
    height: 100vh;
    background: url('/images/login_bg.png') 0 0 no-repeat;
    background-size: cover;
  }
  
  .title {
    margin-bottom: 90px;
    font-size: 48px;
    font-family: "BDZongYi-A001";
    color: #333333;
    font-weight: bold;
    text-align: center;
  }
  
  .main {
    display: flex;
    width: 1110px;
    height: 520px;
    margin: 0 auto;
    box-shadow: 0 7px 34px 1px #1212121a;
    border-radius: 10px;
    
    .back-container {
      width: 640px;
      padding: 75px 72px 66px 100px;
      box-sizing: border-box;
      
      .back {
        width: 468px;
        height: 379px;
        background: url('/images/login_icon.png') 0 0 no-repeat;
        background-size: 100%;
      }
    }
    
    .form-container {
      width: 470px;
      padding: 35px 50px;
      box-sizing: border-box;
      background-color: white;
      border-radius: 6px;
      
      .form-title {
        margin: 85px 0 30px;
        text-align: center;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
      }
    }
  }
</style>
