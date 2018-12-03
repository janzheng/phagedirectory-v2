<template>

	<div>
		What? A test for IE11. ::: {{ output }}

		<div class="_button" @click="clicker">CLICK</div>
	</div>
</template>

<script>

export default {

  components: {
  },


  data: function () {
    return {
    	output: ''
    }
  },

  computed: {
  },


  layout: 'contentframe',
  methods: {
  	clicker() {
  		this.output = "CLICKED"
  		console.log('clicked')
  		alert('clicked!')
  	}
	}

}
</script>

<style lang="scss" scoped>

</style>

