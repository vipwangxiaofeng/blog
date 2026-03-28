interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const searchQuery = ref('')
  const selectedTag = ref('')

  const filteredPosts = computed(() => {
    let result = posts.value
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }
    if (selectedTag.value) {
      result = result.filter((p) => p.tags.includes(selectedTag.value))
    }
    return result
  })

  const allTags = computed(() => {
    const tags = new Set<string>()
    posts.value.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return Array.from(tags)
  })

  function setPosts(data: Post[]) {
    posts.value = data
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setSearch(query: string) {
    searchQuery.value = query
  }

  function setTag(tag: string) {
    selectedTag.value = tag
  }

  return {
    posts,
    loading,
    searchQuery,
    selectedTag,
    filteredPosts,
    allTags,
    setPosts,
    setLoading,
    setSearch,
    setTag,
  }
})
