<template>
  <div>
    <ul class="star">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" @mousemove="hovered($event)" :data-index="index" class="star-item" :key="index"></span>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props:['score'],
  mounted() {
      this.width = parseInt(getComputedStyle(document.getElementsByClassName('star-item')[0]).width,10)
  },
  data() {
    return {
        width:''
    };
  },
  computed:{
      itemClasses() {
          const result = []
          const score = Math.floor(this.score * 2)/2
          const hasDecimal = score % 1 !== 0
          const integer = Math.floor(score)
          for (let i = 0; i < integer; i++) {
              result.push('on')
          }
          if (hasDecimal) {
              result.push('half')
          }
          while (result.length < 5){
              result.push('off')
          }
          return result
      }
  },
  methods: {
      hovered(evt) {
          this.$emit('choose-star',{evt,width:this.width})
      }
  }
};
</script>
<style lang='' scoped>
</style>