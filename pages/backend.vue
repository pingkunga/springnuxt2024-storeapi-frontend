<script lang="ts" setup>
    definePageMeta({
        layout: 'backend',
        middleware: ['auth']
    })
</script>

<template>
  <NuxtPage />
</template>