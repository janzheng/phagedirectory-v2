
<template>

  <div v-if="inputs" class="Formlet item--fields" >
    <div v-for="input in inputs" :class="input.required ? '--required' : '' " :key="input.name" class="item--field" >
      <!-- <div>INPUT: {{ input }}</div> -->
      <div v-if="input.type==INPUT_TYPES.TEXT" class="_form-control" >
        <label :for="input.name" class="_form-label" v-html="markdown(input.label)" />
        <label v-if="markdown(input.description)" :for="input.name" class="_form-label _form-desc" v-html="markdown(input.description)" />
        <input v-model.trim="fieldData[input.name]" 
               :class="inputClasses" 
               :name="input.name"
               :id="input.name"
               :placeholder="input.placeholder"
               :required="input.required"
               class="_form-input --width-full" type="text"
               @input="delayValidation($v.fieldData[input.name])" >
        <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label>
      </div>

      <div v-if="input.type==INPUT_TYPES.EMAIL" class="_form-control" >
        <label :for="input.name" class="_form-label" v-html="markdown(input.label)" />
        <label v-if="markdown(input.description)" :for="input.name" class="_form-label _form-desc" v-html="markdown(input.description)" />
        <input v-model.trim="fieldData[input.name]"
               :class="inputClasses"
               :name="input.name"
               :id="input.name"
               :placeholder="input.placeholder"
               :required="input.required"
               class="_form-input --width-full" type="email"
               @input="delayValidation($v.fieldData[input.name])">
        <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label>
      </div>

      <div v-if="input.type==INPUT_TYPES.NUMBER" class="_form-control" >
        <label :for="input.name" class="_form-label" v-html="markdown(input.label)" />
        <label v-if="markdown(input.description)" :for="input.name" class="_form-label _form-desc" v-html="markdown(input.description)" />
        <input v-model.trim="fieldData[input.name]"
               :class="inputClasses"
               :name="input.name"
               :id="input.name"
               :placeholder="input.placeholder"
               :required="input.required"
               class="_form-input --width-full" type="number" 
               @input="delayValidation($v.fieldData[input.name])" >
        <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label>
      </div>

      <div v-if="input.type==INPUT_TYPES.TEXTAREA" class="_form-control" >
        <label :for="input.name" class="_form-label" v-html="markdown(input.label)" />
        <label v-if="markdown(input.description)" :for="input.name" class="_form-label _form-desc" v-html="markdown(input.description)" />
        <textarea v-model.trim="fieldData[input.name]"
                  :id="input.name"
                  :name="input.name"
                  :placeholder="input.placeholder"
                  :required="input.required" 
                  class="_form-input" type="text" rows="4"
                  @input="delayValidation($v.fieldData[input.name])" />
        <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label>
      </div>

      <div v-if="input.type==INPUT_TYPES.RADIO" class="_form-control _form-radiogroup" >
        <label :for="input.name" class="_form-radiogroup-title" v-html="markdown(input.label)" />
        <label v-if="markdown(input.description)" :for="input.name" class="_form-label _form-desc" v-html="markdown(input.description)" />
        <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label>
        <div v-for="option in input.options" :key="option.value" class="_form-radio --inline" >
          <label :for="option.value" class="_form-radio-label"> 
            <input v-model.trim="fieldData[input.name]"
                   :value="option.value"
                   :id="option.value"
                   :name="input.name" 
                   type="radio" >
            <span :for="option.value">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <div v-if="input.type==INPUT_TYPES.CHECKBOX" class="_form-control" >
        <label :for="input.name" class="_form-group-title" v-html="markdown(input.label)" />
        <label v-if="markdown(input.description)" :for="input.name" class="_form-label _form-desc" v-html="markdown(input.description)" />
        <label v-if="isFieldInvalid(input)" class="_error" >{{ errorMessage(input) }}</label>
        <div v-for="option in input.options" :key="option.value" class="_form-checkbox --inline" >
          <label :for="option.value">
            <input v-model.trim="fieldData[input.name+'.'+option.value]"
                   :id="option.value"
                   :name="option.value"
                   type="checkbox" >
            <span :for="option.value">{{ option.label }}</span>
          </label>
        </div>
      </div>
      
    </div>
  </div>

</template>

<script>

const INPUT_TYPES = {
  "TEXT":     'TEXT', // input text, generic; default
  "EMAIL":    'EMAIL', // email input
  "NUMBER":   'NUMBER', // number input
  "TEXTAREA": 'TEXTAREA', // text area
  "RADIO":    'RADIO', // radio button group
  "CHECKBOX": 'CHECKBOX', // checkbox group        
}

// used for validation
import { validationMixin } from 'vuelidate'
import { required, email, numeric,  } from 'vuelidate/lib/validators'
const touchMap = new WeakMap() 


export default {

  mixins: [validationMixin],
  props: {
    inputs: Array,
    inputClasses: String
  },

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
          // console.log('is valid! ')
          _this.$emit('handler', _this.$v.fieldData)
        }
        else {
          // console.log('not valid')
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
    markdown (input) {
      if(input)
        return this.$md.render(input)

      return ''
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

