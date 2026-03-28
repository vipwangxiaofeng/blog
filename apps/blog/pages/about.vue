<template>
  <div class="container mx-auto px-4 py-12">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight mb-8">关于我</h1>

      <UiCard class="mb-8">
        <UiCardContent class="pt-6">
          <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div class="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-2xl font-bold mb-2">你的名字</h2>
              <p class="text-muted-foreground mb-4">全栈开发者 / AI爱好者</p>
              <p class="leading-relaxed">
                你好！我是一名热爱技术的全栈开发者。这个博客是我分享技术心得、
                AI见解和编程经验的地方。希望通过我的文章，能帮助更多人了解前端开发
                和人工智能的最新动态。
              </p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">技术栈</h2>
        <div class="flex flex-wrap gap-2">
          <UiBadge v-for="skill in ['Vue', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Nuxt', 'Python', 'AI/ML']" :key="skill">
            {{ skill }}
          </UiBadge>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">博客主题</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-lg">前端开发</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-muted-foreground">Vue、React、TypeScript等现代前端技术的实践经验</p>
            </UiCardContent>
          </UiCard>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-lg">人工智能</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-muted-foreground">AI大模型、Agent、Prompt Engineering等前沿技术分享</p>
            </UiCardContent>
          </UiCard>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-lg">效率工具</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-muted-foreground">提升开发效率的工具和方法论</p>
            </UiCardContent>
          </UiCard>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-lg">开源项目</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-muted-foreground">优秀的开源项目推荐和使用心得</p>
            </UiCardContent>
          </UiCard>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">联系方式</h2>
        <UiCard>
          <UiCardContent class="pt-6">
            <div class="space-y-3">
              <p class="flex items-center gap-2">
                <span class="text-muted-foreground">GitHub:</span>
                <a href="https://github.com" target="_blank" class="text-primary hover:underline">
                  github.com/yourusername
                </a>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-muted-foreground">邮箱:</span>
                <a href="mailto:you@example.com" class="text-primary hover:underline">
                  you@example.com
                </a>
              </p>
            </div>
          </UiCardContent>
        </UiCard>
      </section>
    </div>
  </div>
</template>
