<template>
  <div>
    <div class="formItem">
      <label
        class="flex1"
        :style="{textAlign: labelPosition === 'right' ? 'right' : 'left', whiteSpace: 'nowrap'}"
        v-if="label"
      >{{label}}</label>
      <div class="slot flex1">
        <slot></slot>
      </div>
    </div>
    <div class="error center">
      <span v-if="roles && roles.isShow">{{roles.message}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FormItem',
    props: {
      label: {
        type: String,
        default: ''
      },
      roles: Object,
      labelPosition: String
    }
  };
</script>

<style scoped>
  .formItem {
    display: flex;
    color: #333333;
    padding: 20px 15px 0 15px;
    height: 35px;
  }

  label {
    line-height: 35px;
    float: left;
  }
  .slot {
    float: left;
    margin-left: 10px;
    line-height: 35px;
  }
  .error {
    color: red;
    height: 20px;
  }
</style>
