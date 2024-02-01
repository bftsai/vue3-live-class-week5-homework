<template>
    <div class="col-lg-4 productCard z-3" ref="translate">
          <div class="d-flex align-items-center justify-content-between pe-3 mb-3">
            <h2 class="mb-0">詳細內容</h2>
            <button class="btn btn-outline-secondary" @click="closeSelectItem">X</button>
          </div>
          <div class="card mb-3" :class="{'border-primary': defaultTheme==='dark'}">
            <img :src="img" class="card-img-top object-fit-cover"
            :alt="itemSelect.title">
            <div class="card-body">
              <h5 class="card-title">{{ itemSelect.title }}<span class="badge ms-3"
                :class="{' text-bg-secondary': defaultTheme==='light',
                'text-bg-primary': defaultTheme==='dark'}">{{ itemSelect.category }}</span></h5>
              <p class="card-text">商品內容：{{ itemSelect.content }}</p>
              <p class="card-text">商品描述：{{ itemSelect.description }}</p>
              <p class="card-text">{{ itemSelect.price }} <span class="line-through"
                :class="{'text-light': defaultTheme==='dark'}">
                {{ itemSelect.origin_price }}</span>元 / 個</p>
            </div>
          </div>
          <div class="d-flex justify-content-start justify-content-lg-around
          flex-wrap mb-3" ref="picArea">
            <img :src="itemSelect.imageUrl" class="mx-3 mb-3 object-fit-cover"
            :class="{'border-primary': defaultTheme === 'dark'}"
            :alt="itemSelect.title" @click="changeImg(itemSelect.imageUrl, $event)">
            <img :src="pic" :alt="'小圖' + key" v-for="(pic,key) in itemSelect.imagesUrl"
            :key="'小圖' + key" class="mx-3 mb-3 object-fit-cover"
            :class="{'border-primary': defaultTheme === 'dark'}"
            @click="changeImg(pic, $event)">
          </div>
        </div>
</template>
<script>
export default {
  data() {
    return {
      img: '',
    };
  },
  props: ['itemSelect', 'defaultTheme', 'clickItemNum'],
  watch: {
    clickItemNum() {
      [...this.$refs.picArea.children].forEach((item) => {
        item.classList.remove('border', 'border-primary', 'border-3');
      });
      // 可以取得載具寬度
      if (document.defaultView.innerWidth >= 992) {
        this.$refs.translate.setAttribute('style', `transform: translateY(calc(${this.clickItemNum} * 167px));`);
      } else {
        this.$refs.translate.setAttribute('style', `transform: translateY(calc((${this.clickItemNum} - 9) * 167px)); background-color: #fff;padding: 10px; box-shadow: 0 0 10px 3px #000; margin-bottom: -900px;`);
      }
    },
    itemSelect() {
      this.img = this.itemSelect.imageUrl;
    },
  },
  methods: {
    changeImg(pic, e) {
      this.img = pic;
      [...e.target.parentElement.children].forEach((item) => {
        item.classList.remove('border', 'border-primary', 'border-3');
      });
      if (this.defaultTheme === 'dark') {
        e.target.classList.add('border', 'border-primary', 'border-3');
      } else {
        e.target.classList.add('border', 'border-secondary', 'border-3');
      }
    },
    closeSelectItem() {
      this.$emit('emit-closeSelectItem');
      this.omg = '';
      [...this.$refs.picArea.children].forEach((item) => {
        item.classList.remove('border', 'border-primary', 'border-3');
      });
      this.$refs.translate.setAttribute('style', '');
    },
  },
};
</script>
<style lang="scss">
.productCard{
  transition: all 0.8s ease;
}
.line-through{
  text-decoration: line-through;
}
.card-img-top{
  height: 400px;
}
</style>
