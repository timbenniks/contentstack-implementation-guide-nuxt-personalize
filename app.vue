<script lang="ts" setup>
const { data: page, refresh } = await useGetPage("/");

onMounted(() => {
  const { $preview, $ContentstackLivePreview, $Personalize, $variantAlias } =
    useNuxtApp();
  $preview && $ContentstackLivePreview.onEntryChange(refresh);

  // send Personalize analytics impression for the experience with shortID '0'.
  // see: Contentstack Dashboard > Personalize project > Experiences > Experience
  $Personalize.triggerImpression("0");
});
</script>
<template>
  <main class="max-w-screen-2xl mx-auto">
    <section class="p-4">
      <p class="mb-4">
        debug: <code>{{ $variantAlias }}</code>
      </p>

      <div className="mb-8">
        <PersonalizeButton type="Marketer" class="mb-4" />
        <PersonalizeButton type="Developer" class="mb-4" />
        <PersonalizeButton type="Reset" class="mb-4" />
      </div>

      <h1
        v-if="page?.title"
        class="text-4xl font-bold mb-4"
        v-bind="page?.$ && page?.$.title"
      >
        {{ page?.title }}
      </h1>

      <p
        v-if="page?.description"
        class="mb-4"
        v-bind="page?.$ && page?.$.description"
      >
        {{ page?.description }}
      </p>

      <img
        v-if="page?.image"
        class="mb-4"
        width="300"
        height="300"
        :src="page?.image.url"
        :alt="page?.image.title"
        v-bind="page?.image?.$ && page?.image?.$.url"
      />

      <div
        v-if="page?.rich_text"
        v-bind="page?.$ && page?.$.rich_text"
        v-html="page?.rich_text"
      />
    </section>
  </main>
</template>
