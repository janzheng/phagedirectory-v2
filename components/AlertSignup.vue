
<template>

  <div class="AlertSignup _margin-top _margin-bottom" :class="classes">
    <form 
      class="alerts-form" 
      action="https://tinyletter.com/phagedirectory" 
      method="post" target="popupwindow" 
      onsubmit="window.open('https://tinyletter.com/phagedirectory', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
    >
      <label for="tlemail" class=" _v-middle _inline-block _margin-right-half"> 
        <span class="" >Sign up for phage alerts:</span>
        <!-- <div  class="alerts-note _font-small ">No spam. <a href="https://tinyletter.com" target="_blank">TinyLetter</a></div> -->
      </label> 
      <input type="text" name="email" id="tlemail" 
             class="_form-input --short --phage _inline _margin-right"
             placeholder="email@address.com" required/>
      <input type="hidden" value="1" name="embed"/>
      <input class="alerts-cta _inline _button --phage --outline --short _margin-none-i" type="submit" value="Sign Up" />
      <!-- <div class="alerts-note _right _font-small _padding-top-half">Only to be used for phage requests, not spam. <a href="https://tinyletter.com" target="_blank">TinyLetter</a></div> -->
    </form>
  </div>

</template>


<script>

export default {
  props: ['classes']
}

</script>