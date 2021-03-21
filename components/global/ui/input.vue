<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">
      <slot />
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="name"
        v-model="modelValue"
        :name="name"
        :type="type"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete ? autocomplete : name"
        class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        :class="{
          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': hasError,
          'border-gray-300 placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300': !hasError,
        }"
      />
      <svg-exclamation-circle :has-error="hasError" />
    </div>
    <p v-if="hasError" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
    <p v-if="hasCustomError" class="mt-2 text-sm text-red-600">
      {{ customError }}
    </p>
    <p v-if="status" class="mt-2 text-sm text-green-600">{{ status }}</p>
  </div>
</template>
<script>
export default {
  name: 'Input',

  props: {
    type: {
      type: String,
      default: 'text',
    },

    error: {
      type: String,
      default: '',
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    customError: {
      type: String,
      default: '',
    },

    hasCustomError: {
      type: Boolean,
      default: false,
    },

    autocomplete: {
      type: String,
      default: '',
    },

    required: {
      type: Boolean,
      default: true,
    },

    name: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
</script>
