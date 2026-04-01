<script setup lang="ts">
import { useRouter } from "vue-router";
import { ServerCrash, ArrowLeft, RefreshCw } from "lucide-vue-next";
import { Button } from "@/components/ui";

const router = useRouter();

function goBack() {
  router.back();
}

function goHome() {
  router.push("/");
}

function refresh() {
  window.location.reload();
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="text-center">
      <div
        class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-warning/10"
      >
        <ServerCrash class="h-12 w-12 text-warning" />
      </div>
      <h1 class="mb-2 text-6xl font-bold text-foreground">500</h1>
      <h2 class="mb-4 text-xl font-semibold text-foreground">服务器错误</h2>
      <p class="mb-8 text-muted-foreground">
        抱歉，服务器出现了问题，请稍后重试
      </p>
      <div class="flex items-center justify-center gap-4">
        <Button variant="outline" @click="goBack">
          <ArrowLeft class="mr-2 h-4 w-4" />
          返回上一页
        </Button>
        <Button variant="outline" @click="refresh">
          <RefreshCw class="mr-2 h-4 w-4" />
          刷新页面
        </Button>
        <Button @click="goHome"> 回到首页 </Button>
      </div>
    </div>
  </div>
</template>
