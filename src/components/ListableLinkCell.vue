<template v-if="processedList !== null">
  <template v-for="item in processedList" :key="item.key">
    <a :href="item.value" target="_blank">
      {{ item.displayName }}
    </a>
  </template>
</template>
<script>
export default {
  name: 'ListableLinkCell',
  props: {
    sourceList: Array,
    keyName: String,
    valueName: String,
  },
  computed: {
    processedList() {
      return this.sourceList.map(item => {
        return {
          key: item[this.keyName],
          value: item.url,
          displayName: item[this.valueName],
        };
      });
    },
  },
};
</script>
<style scoped>
a {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: #2c3e50;
}

a:hover {
  color: white;
  background-color: #f8604c;
}
</style>
