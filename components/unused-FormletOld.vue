
<template>

  <div class="item--fields" v-if="inputs">
    <div class="item--field" v-for="input in inputs" :class="input.required ? '--required' : '' " :key="input.name">
      <!-- <div>INPUT: {{ input }}</div> -->
      <div class="_form-control" v-if="input.type==INPUT_TYPES.TEXT">
        <label :for="input.name" class="_form-label">{{ input.label }}</label>
        <input v-model.trim="fieldData[input.name]" @input="delayValidation($v.fieldData[input.name])" class="_form-input --width-full" :class="inputClasses" type="text" :name="input.name" :id="input.name" :placeholder="input.placeholder" :required="input.required"/>
        <label class="_error" v-if="isFieldInvalid(input)">{{ errorMessage(input) }}</label>
      </div>

      <div class="_form-control" v-if="input.type==INPUT_TYPES.EMAIL">
        <label :for="input.name" class="_form-label">{{ input.label }}</label>
        <input v-model.trim="fieldData[input.name]" @input="delayValidation($v.fieldData[input.name])" class="_form-input --width-full" :class="inputClasses" type="email" :name="input.name" :id="input.name" :placeholder="input.placeholder" :required="input.required"/>
        <label class="_error" v-if="isFieldInvalid(input)">{{ errorMessage(input) }}</label>
      </div>

      <div class="_form-control" v-if="input.type==INPUT_TYPES.NUMBER">
        <label :for="input.name" class="_form-label">{{ input.label }}</label>
        <input v-model.trim="fieldData[input.name]" @input="delayValidation($v.fieldData[input.name])" class="_form-input --width-full" :class="inputClasses" type="number" :name="input.name" :id="input.name" :placeholder="input.placeholder" :required="input.required"/>
        <label class="_error" v-if="isFieldInvalid(input)">{{ errorMessage(input) }}</label>
      </div>

      <div class="_form-control" v-if="input.type==INPUT_TYPES.TEXTAREA">
        <label :for="input.name" class="_form-label">{{ input.label }}</label>
        <textarea v-model.trim="fieldData[input.name]" @input="delayValidation($v.fieldData[input.name])" rows="4" :id="input.name" class="_form-input" type="text" :name="input.name" :placeholder="input.placeholder" :required="input.required"></textarea>
        <label class="_error" v-if="isFieldInvalid(input)">{{ errorMessage(input) }}</label>
      </div>

      <div class="_form-control _form-radiogroup" v-if="input.type==INPUT_TYPES.RADIO">
        <label class="_form-radiogroup-title" :for="input.name">{{ input.label }}</label>
        <label class="_error" v-if="isFieldInvalid(input)">{{ errorMessage(input) }}</label>
        <div class="_form-radio --inline" v-for="option in input.options" :key="option.value">
          <label :for="option.value" class="_form-radio-label"> 
            <input v-model.trim="fieldData[input.name]" :value="option.value" type="radio" :id="option.value" :name="input.name" />
            <span :for="option.value">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <div class="_form-control" v-if="input.type==INPUT_TYPES.CHECKBOX">
        <label class="_form-group-title" :for="input.name">{{ input.label }}</label>
        <label class="_error" v-if="isFieldInvalid(input)">{{ errorMessage(input) }}</label>
        <div class="_form-checkbox --inline" v-for="option in input.options" :key="option.value">
          <label :for="option.value">
            <input v-model.trim="fieldData[input.name+'.'+option.value]" :id="option.value" type="checkbox" :name="option.value" />
            <span :for="option.value">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { INPUT_TYPES } from '~/assets/helpers.js'

// used for validation
import { validationMixin } from 'vuelidate'
import { required, email, numeric,  } from 'vuelidate/lib/validators'
const touchMap = new WeakMap() 


export default {

  props: ['inputs','inputClasses'],
  mixins: [validationMixin],

  data: function () {
    return {
      INPUT_TYPES: INPUT_TYPES,
      fieldData: {},
      isValidating: false, // false when not validating anymore; for delay validation
    }
  },

  // vuelidate
  validations: function() {
    // generate dynamic validation from db fields
    let fieldData = {} // needs same name to sync w/ data.fieldData;

    if (this.inputs) {
      this.inputs.forEach(function(input) {
        fieldData[input.name] = {}

        if (input.required) { 
          fieldData[input.name]['required'] = required 
        } 
        if (input.type == INPUT_TYPES.EMAIL) { 
          fieldData[input.name]['email'] = email
        }
        if (input.type == INPUT_TYPES.NUMBER) { 
          fieldData[input.name]['numeric'] = numeric
        }
      })

      return {
        fieldData
      }
    }
    return {}
    
  },

  computed: {
  },


  methods: {
    touch() {
      this.$v.$touch()
    },
    delayValidation ($v, ms=300) { // delay form validation 
      const _this = this
      this.isValidating = true

      const delay = function() {
        $v.$touch()
        _this.isValidating = false

        if(_this.isFormValid()) {
          console.log('is valid! ')
          _this.$emit('handler', _this.$v.fieldData)
        }
        else {
          console.log('not valid')
          _this.$emit('handler', undefined)
        }
      }
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout(delay, ms))
    },
    isFieldInvalid (input) {
      // given input field, do we display an error message?
      // yes if:
      //    required
      //    AND error
      if (this.$v.fieldData !== undefined )
        return this.$v.fieldData[input.name].$error
      return false // no error
    },
    isFormValid () {
      // console.log('validating: ', this.isValidating, ' valid', !this.$v.$invalid, ' combo ', !this.isValidating && !this.$v.$invalid)
      return !this.isValidating && !this.$v.$invalid
    },
    errorMessage (input) {
      if (this.$v.fieldData !== undefined ) {
        let message
        if (this.$v.fieldData[input.name].$error)
          message = input.error
        if (!message && this.$v.fieldData[input.name].$required)
          message = "This field is required"

        return message
      }
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

