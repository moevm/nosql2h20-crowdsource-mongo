<template>
  <ckeditor
    :editor="editor"
    v-model="value"
    :config="schema.editorConfig"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component
export default class CKEditor5Field extends Mixins(abstractField) {
  get editor() {
    return ClassicEditor
  }
}
</script>
