<template>
  <VContainer>
    <VRow>
      <VCol>
         <VCard>
            <VCardTitle>Card Title - หัวข้อหน้าหลัก</VCardTitle>
            <VCardText>Card Text</VCardText>
         </VCard>
      </VCol>
    </VRow>
    <!-- Button -->
    <VRow>
      <VCol>
        <VBtn color="primary">Primary</VBtn>
        <VBtn color="secondary">Secondary</VBtn>
        <VBtn color="success">Success</VBtn>
        <VBtn color="danger">Danger</VBtn>
        <VBtn color="warning">Warning</VBtn>
        <VBtn color="info">Info</VBtn>
        <VBtn color="light">Light</VBtn>
        <VBtn color="dark">Dark</VBtn>
        <VBtn color="link">Link</VBtn>
      </VCol>
    </VRow>
   </VContainer>
</template>

<script setup lang="ts">
import { VBtn } from 'vuetify/components';


</script>

<style scoped>

</style>