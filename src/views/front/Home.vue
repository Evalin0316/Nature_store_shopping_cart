<template>
  <div class="container-fluid">
    <div class="bg-cover banner">
      <div class="container row g-2">
        <h1
          class="col-12 fs-5 fs-md-3 ls-md-5 fw-normal text-white text-center"
        >
          創造出穿著的樂趣
        </h1>
        <router-link to="/products?category=all&page=1"
          class="col-2 btn btn-outline-light px-5 mx-auto mt-3"
          >走入Nature</router-link
        >
      </div>
    </div>
    <div class="container px-3">
      <h2 class="fs-4 text-center p-5"> 想在夏日好好享受舒適的穿著嗎？</h2>
      <div class="row g-3 mb-5 fade-out">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid"
            src="https://i.imgur.com/5FtxVcx.jpg"
            alt=""
          />
        </div>
        <div
          class="
            col-12 col-md-6
            p-3 p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg
          "
        >
          <h4 class="fs-5 text-primary">純棉布料</h4>
          100%純棉材質
          <br />
          出外居家穿著舒適方便
          <br />
          辦公室上班族最佳首選
        </div>
      </div>
      <div class="row g-3 mb-5 flex-md-row-reverse fade-out">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid"
            src="https://i.imgur.com/cnaIl8q.jpg"
            alt=""
          />
        </div>
        <div
          class="
            col-12 col-md-6
            p-3 p-md-5
            d-flex
            justify-content-center
            align-items-center
            flex-column
            text-center
            lh-lg
          "
        >
          <h4 class="fs-5 text-primary">時尚穿搭</h4>
          精選設計
          <br />
          男士打造自然穿著又不失時尚
          <br />
         不論小隻女高女孩皆可駕馭
        </div>
      </div>
      <FrontSwiper
        class="fade-out"
        :datas="promote"
        :is-disabled="isDisabled"
        title="熱銷商品"
      />
    </div>
     <!-- Scheduler gsap Start-->
    <section class="section1">November Scheduler</section>
      <section class="section2">
      <ul class="container2">
        <li class="boxwrap-half">
          <div>
            <div class="animation-wrapper box2 from-left"></div>
            <p>
              <span class="animation-wrapper typing typing1"></span>
              <span class="cursor">_</span>
            </p>
          </div>
        </li>
        <li class="boxwrap-full">
          <div>
            <div class="animation-wrapper box2 from-right"></div>
            <p>
              <span class="animation-wrapper typing typing2"></span>
              <span class="cursor">_</span>
            </p>
          </div>
        </li>
        <li class="boxwrap-half">
          <div>
            <div class="animation-wrapper box2 from-left"></div>
            <p>
              <span class="animation-wrapper typing typing3"></span>
              <span class="cursor">_</span>
            </p>
          </div>
        </li>
        <li class="boxwrap-full">
          <div>
            <div class="animation-wrapper box2 from-right"></div>
            <p>
              <span class="animation-wrapper typing typing4"></span>
              <span class="cursor">_</span>
            </p>
          </div>
        </li>
      </ul>
    </section>
    <!-- Scheduler gsap END-->
    <div class="bg-cover booking text-light flex-column">
      <h3 class="fs-5 ls-2 fw-normal mb-4">訂閱最新消息</h3>
        <Form class="container row g-2 g-md-0 px-5 w-md-60
          d-md-flex justify-content-md-center"
          :class="show ? '' : 'd-none d-md-none'"
          v-slot="{ errors }" @submit="onSubmit" id="subscribe">
          <p class="col-12 col-md-8 col-lg-5 m-0 me-md-2">
            <Field type="email" id="email" name="Email"
            class="form-control ls-2 ms-auto"
            :class="{ 'is-invalid': errors['Email'] }"
            :disabled="idDisabled"
            placeholder="abc@gmail.com"
            rules="email|required"
            inputmode="email"
            v-model="email"></Field>
            <ErrorMessage name="Email"
            class="invalid-feedback position-md-absolute">
          </ErrorMessage>
          </p>
          <button type="submit" class="btn btn-primary col-12 col-md-3 col-lg-2"
          :disabled="idDisabled"
          @submit="onSubmit">
          訂閱
          <Spinner :spin-item="email" />
        </button>
      </Form>
      <p class="text-warning ls-2 fade" v-if="email" ref="done">
        {{ email }} 已訂閱電子報 <i class="far fa-check-circle"></i>
      </p>
    </div>
    <div
      id="target"
      class="position-fixed vw-100 bottom-50"
    ></div>
  </div>
</template>

<script>
import { apiAllProducts } from '@/scripts/api';
import FrontSwiper from '@/components/FrontSwiper.vue';
import fadeInMix from '@/mixins/FadeInMix.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

export default {
  emits: ['page-loading', 'push-message', 'toggle-spinner'],
  props: ['isDisabled'],
  components: {
    FrontSwiper,
  },
  data() {
    return {
      products: [],
      promote: [],
      email: '',
      idDisabled: false,
      show: true,
    };
  },
  mixins: [fadeInMix],
  methods: {
    getAllProducts() {
      apiAllProducts()
        .then((res) => {
          if (!res.data.success) {
            this.$pushMessage(res);
          }
          this.products = res.data.products.reverse();
          this.promote = this.products.filter((item) => item.title);
          setTimeout(() => {
            this.$emitter.emit('page-loading', false);
            this.fadeInOnLoad();
          }, 1000);
        })
        .catch((err) => {
          this.$emitter.emit('page-loading', false);
          this.$pushMessage(err);
        });
    },
    onSubmit() {
      this.idDisabled = true;
      this.$emitter.emit('toggle-spinner', this.email);
      setTimeout(() => {
        this.idDisabled = false;
        this.$emitter.emit('toggle-spinner', false);
        this.$refs.done.classList.add('show');
        this.show = false;
      }, 1500);
    },
  },
  created() {
    this.getAllProducts();
    this.$emitter.emit('page-loading', true);
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // 打字提示閃爍效果
    gsap.fromTo(
      '.cursor',
      0,
      {
        visibility: 'hidden',
      },
      {
        visibility: 'visible',
        repeat: -1,
        yoyo: true, // 若為true，則動畫repeat運行順序會以倒放的形式回去
        repeatDelay: 0.3, // 下一次repeat的deplay時間
      },
    );

    function hide(element) {
      gsap.set(element, { opacity: 0, visibility: 'hidden' });
    }

    function animated(element) {
      let x = 0;

      // 依照條件設定x初始值
      if (element.classList.contains('from-left')) {
        x = -100; // 元素從左方漸變
      } else if (element.classList.contains('from-right')) {
        x = 100; // 元素從右方漸變
      }

      // 設定元素初始值
      // eslint-disable-next-line no-param-reassign
      element.style.transform = `translate(${x}px, 0px)`;
      gsap.fromTo(
        element,
        {
          x, y: 0, opacity: 0, visibility: 'hidden',
        },
        {
          duration: 1,
          delay: 0.2,
          x: 0,
          y: 0,
          visibility: 'visible',
          opacity: '1',
          ease: 'slow',
          overwrite: 'auto',
        },
      );
    }

    gsap.utils.toArray('.animation-wrapper').forEach((element) => {
      if (
        element.classList.contains('from-left')
        || element.classList.contains('from-right')
      ) {
        hide(element);
        ScrollTrigger.create({
          trigger: element,
          markers: true,
          onEnter() {
            animated(element);
          },
          onEnterBack() {
            animated(element);
          },
          onLeave() {
            hide(element);
          },
        });
      } else if (element.classList.contains('typing')) {
        const typing1Content = '11/01 PM20:00 直播I';
        const typing2Content = '11/02 PM20:00 直播II';
        const typing3Content = '11/04 PM20:00 直播III';
        const typing4Content = '11/05 PM20:00 收單';

        gsap.to('.typing1', {
          text: typing1Content,
          duration: 2,
          scrollTrigger: {
            trigger: '.typing1',
            toggleActions: 'play pause resume reset', // 滑鼠滾動位置
          },
        });

        gsap.to('.typing2', {
          text: typing2Content,
          duration: 2,
          scrollTrigger: {
            trigger: '.typing2',
            toggleActions: 'play pause resume reset',
          },
        });
        gsap.to('.typing3', {
          text: typing3Content,
          duration: 2,
          scrollTrigger: {
            trigger: '.typing3',
            toggleActions: 'play pause resume reset',
          },
        });

        gsap.to('.typing4', {
          text: typing4Content,
          duration: 2,
          scrollTrigger: {
            trigger: '.typing4',
            toggleActions: 'play pause resume reset',
          },
        });
      }
    });
  },
  // unmounted() {
  //   const trigger = ScrollTrigger.getAll();
  //   trigger.kill();
  // },
};
</script>
