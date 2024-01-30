<template>
    <div class="col-lg-4">
          <h2>Product</h2>
          <div class="card mb-3" :class="{'border-primary': defaultTheme==='dark'}">
            <img :src="itemSelect.imageUrl" class="card-img-top object-fit-contain"
            :alt="itemSelect.title" height="400">
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
          <div class="d-flex flex-wrap mb-3">
            <img :src="pic" :alt="'小圖' + key" v-for="(pic,key) in itemSelect.imagesUrl"
            :key="'小圖' + key" height="200" class="me-3 mb-3">
          </div>
        </div>
</template>
<script>
export default {
  props: ['itemSelect', 'defaultTheme'],
};
</script>
