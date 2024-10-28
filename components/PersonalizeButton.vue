<script setup lang="ts">
type PersonalizeType = "Marketer" | "Developer" | "Reset";

const props = defineProps<{
  type: PersonalizeType;
}>();

const clicked = ref(false);
const { $Personalize } = useNuxtApp();

const handleClick = async () => {
  let p13nAttributes: { marketer: boolean; developer: boolean };
  let eventName: string;

  switch (props.type.toLowerCase()) {
    case "marketer":
      p13nAttributes = { marketer: true, developer: false };
      eventName = "CtaMarketer";
      break;
    case "developer":
      p13nAttributes = { marketer: false, developer: true };
      eventName = "CtaDeveloper";
      break;
    case "reset":
      p13nAttributes = { marketer: false, developer: false };
      eventName = "CtaReset";
      break;
    default:
      console.error("Invalid personalization type");
      return;
  }

  clicked.value = true;

  // set Personalize attribute for p13nAttributes (marketer, CtaDeveloper, CtaReset).
  // see: Contentstack Dashboard > Personalize project > Events
  await $Personalize.set(p13nAttributes);

  // send Personalize event for the experience for eventName (CtaMarketer, CtaDeveloper, CtaReset).
  // see: Contentstack Dashboard > Personalize project > Events
  await $Personalize.triggerEvent(eventName);

  window.location.href = "http://localhost:3000";
};
</script>
<template>
  <div class="flex space-x-4 items-center">
    <button
      @click="handleClick"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {{ type === "Reset" ? "Reset attributes" : `Set Attribute: ${type}` }}
    </button>
    <p v-if="clicked">Setting {{ type }} Personalization</p>
  </div>
</template>
