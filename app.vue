<template>
  <div id="root">
    <NuxtLayout :name="$route.meta.layout ?? 'default'">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()
const title = computed(()=>route.meta.title ?? 'deyt')

useHead({
  title, 
})
</script>