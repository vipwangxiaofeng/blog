<script setup lang="ts">
import { useRouter } from "vue-router";
import { ShieldX, ArrowLeft } from "lucide-vue-next";
import { Button } from "@/components/ui";

const router = useRouter();

function goBack() {
  router.back();
}

function goHome() {
  router.push("/");
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="text-center">
      <div
        class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
      >
        <ShieldX class="h-12 w-12 text-destructive" />
      </div>
      <h1 class="mb-2 text-6xl font-bold text-foreground">403</h1>
      <h2 class="mb-4 text-xl font-semibold text-foreground">访问被拒绝</h2>
      <p class="mb-8 text-muted-foreground">抱歉，您没有权限访问此页面</p>
      <div class="flex items-center justify-center gap-4">
        <Button variant="outline" @click="goBack">
          <ArrowLeft class="mr-2 h-4 w-4" />
          返回上一页
        </Button>
        <Button @click="goHome"> 回到首页 </Button>
      </div>
    </div>
  </div>
</template>
