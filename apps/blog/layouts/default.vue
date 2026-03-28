<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-14 items-center px-4">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <span class="font-bold text-xl">My Blog</span>
        </NuxtLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink
            to="/"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            active-class="text-foreground"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            active-class="text-foreground"
          >
            Blog
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            active-class="text-foreground"
          >
            About
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t py-6 md:py-0">
      <div class="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p class="text-center text-sm leading-loose text-muted-foreground">
          Built with Nuxt 3, Tailwind CSS & shadcn-vue.
        </p>
      </div>
    </footer>
  </div>
</template>
