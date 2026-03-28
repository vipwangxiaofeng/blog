<template>
  <div class="container mx-auto px-4 py-12">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight mb-8">About Me</h1>

      <UiCard class="mb-8">
        <UiCardContent class="pt-6">
          <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div class="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl">
              👤
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-2xl font-bold mb-2">Your Name</h2>
              <p class="text-muted-foreground mb-4">Software Developer</p>
              <p class="leading-relaxed">
                Hi there! I'm a passionate software developer who loves building things for the web.
                This blog is where I share my thoughts on technology, programming, and everything in between.
              </p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Skills</h2>
        <div class="flex flex-wrap gap-2">
          <UiBadge v-for="skill in ['Vue', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Nuxt']" :key="skill">
            {{ skill }}
          </UiBadge>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Contact</h2>
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
                <span class="text-muted-foreground">Email:</span>
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
