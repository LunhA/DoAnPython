<template>
  <div class="main-container">
    <div class="contact-container">
      <div class="contact-map">
        <iframe
          id="map1"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237106!2d106.68006961535187!3d10.759922362439042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1640685385467!5m2!1svi!2s"
          width="99%"
          height="700"
          allowfullscreen=""
          loading="lazy"
        ></iframe>

        <iframe
          id="map2"
          style="display: none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4145443535717!2d106.68277501535195!3d10.779528062082704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2f38563351%3A0xe2afc7d527483b0e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4gLSBDxqEgU-G7nyAx!5e0!3m2!1svi!2s!4v1640701877453!5m2!1svi!2s"
          width="99%"
          height="700"
          allowfullscreen=""
          loading="lazy"
        ></iframe>

        <iframe
          id="map3"
          style="display: none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3687526039266!2d106.70403251535184!3d10.783043462018812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f49581e1041%3A0x1905114e17b30605!2zxJDhuqFpIEjhu41jIFPDoGkgR8OybiBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1640704164425!5m2!1svi!2s"
          width="99%"
          height="700"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div class="contact-info">
        <div
          class="contact-info-address"
          id="address1"
          v-on:click="changeMap(1)"
        >
          <h4>> TP. Hồ Chí Minh - Cơ sở chính</h4>
          <br />
          <p>273 An D. Vương, Phường 3, Quận 5</p>
          <p>(84-8) 38.354409 - (84-8) 38.352309</p>
        </div>
        <div
          class="contact-info-address"
          id="address2"
          v-on:click="changeMap(2)"
        >
          <h4>> TP. Hồ Chí Minh - Cơ sở 1</h4>
          <br />
          <p>105 Bà Huyện Thanh Quan, Quận 3</p>
          <p>(84-8) 38.354409 - (84-8) 38.352309</p>
        </div>
        <div
          class="contact-info-address"
          id="address3"
          v-on:click="changeMap(3)"
        >
          <h4>> TP. Hồ Chí Minh - Cơ sở 2</h4>
          <br />
          <p>04 Tôn Đức Thắng, Quận 1</p>
          <p>(84-8) 38.354409 - (84-8) 38.352309</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LienHe',
  components: {},
  methods: {
    changeMap(number) {
      const targetMap1 = document.getElementById('map1');
      const targetMap2 = document.getElementById('map2');
      const targetMap3 = document.getElementById('map3');

      if ( number == 1) {
        targetMap1.style.display = 'block';
        targetMap2.style.display = 'none';
        targetMap3.style.display = 'none';
      } else if ( number == 2 ) {
            targetMap1.style.display = 'none';
            targetMap2.style.display = 'block';
            targetMap3.style.display = 'none';
      } else if ( number == 3 ) {
            targetMap1.style.display = 'none';
            targetMap2.style.display = 'none';
            targetMap3.style.display = 'block';
      }
    },
  },
};
</script>
